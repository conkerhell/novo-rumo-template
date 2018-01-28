var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var plugins = {
  sass: require('gulp-sass'),
  notify: require("gulp-notify")
};

var webFolder = 'web';

gulp.task('sass', function() {
  return gulp.src('app2.scss')
      .pipe(plugins.sass(
         {includePaths: ['./node_modules/foundation-sites/scss']}
      ))
      .pipe(gulp.dest('web/css'));
});

gulp.task('sync', ['sass'], function () {
  browserSync.init({
    server: {
      baseDir: webFolder
    }
  });
  gulp.watch("web/js/*.js").on('change', browserSync.reload);
  gulp.watch("web/views/*.html").on('change', browserSync.reload);
  gulp.watch("web/*.html").on('change', browserSync.reload);
  gulp.watch("web/css/*.css").on('change', browserSync.reload);
});