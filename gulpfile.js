var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var plugins = {
  sass: require('gulp-sass'),
  notify: require("gulp-notify"),
  cleanCSS: require('gulp-clean-css'),
  rename: require("gulp-rename")
};

function swallowError(error) {
  console.log(error.toString())
  this.emit('end')
}

var webFolder = 'web';
var webJavascriptFolder = `${webFolder}/js`;

var distFolder = 'dist';
var webJavascriptFolder = `${distFolder}/js`;

gulp.task('copy-js-files', function () {
  gulp.src([
    'node_modules/foundation-sites/dist/js/foundation.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/skrollr/dist/skrollr.min.js',
    'node_modules/skrollr-stylesheets/dist/skrollr.stylesheets.min.js'
  ])
    .pipe(gulp.dest(webJavascriptFolder));
});

gulp.task('scss', function () {
  return gulp.src('scss/*.scss')
    .pipe(plugins.sass(
      { includePaths: ['./node_modules/foundation-sites/scss'] }
    ))
    .on('error', swallowError)
    .pipe(gulp.dest('web/css'))
    .pipe(plugins.cleanCSS())
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(gulp.dest('web/css'));
});

gulp.task('sync', ['scss', 'copy-js-files'], function () {
  browserSync.init({
    server: {
      baseDir: webFolder
    }
  });
  gulp.watch("web/js/*.js").on('change', browserSync.reload);
  gulp.watch("web/views/*.html").on('change', browserSync.reload);
  gulp.watch("web/*.html").on('change', browserSync.reload);
  gulp.watch("web/css/*.css").on('change', browserSync.reload);
  gulp.watch("scss/*.scss", ['scss']);
  gulp.watch("scss/**/*.scss", ['scss']);
});