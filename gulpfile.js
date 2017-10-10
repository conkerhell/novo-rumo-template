var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var webFolder = 'web';

gulp.task('sync', function () {
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