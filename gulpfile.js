var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var plugins = {
  sass: require('gulp-sass'),
  notify: require("gulp-notify"),
  cleanCSS: require('gulp-clean-css'),
  rename: require("gulp-rename")
};

var webFolder = 'web';

gulp.task('scss', function() {
  return gulp.src('scss/*.scss')
      .pipe(plugins.sass(
         {includePaths: ['./node_modules/foundation-sites/scss']}
      ))
      .pipe(gulp.dest('web/css'))
      .pipe(plugins.cleanCSS())
      .pipe(plugins.rename({ suffix: '.min' }))
      .pipe(gulp.dest('web/css'));
});

gulp.task('sync', ['scss'], function () {
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