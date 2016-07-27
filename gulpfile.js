var gulp = require('gulp');
var sass = require('gulp-sass');
var gls = require('gulp-live-server');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return gulp.src('./src/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/scss'))
      .pipe(browserSync.stream());
});

gulp.task('images', function () {
  return gulp.src('./src/images/*.jpg')
      .pipe(gulp.dest('./dist/images'));
});

gulp.task('font-awesome', function () {
  return gulp.src('./node_modules/font-awesome/**/*')
      .pipe(gulp.dest('./dist/library/font-awesome/'));
});

gulp.task('server', function() {
  //2. serve at custom port
  var server = gls.static('./', 3030);
  // var server = gls('./', true, 3030);
  server.start();

  browserSync.init({
    server: server
  });

  //use gulp.watch to trigger server actions(notify, start or stop)
  gulp.watch(['./src/*.scss', './index.html', './src/images/***'], ['sass'], ['images'], function (file) {
    server.notify.apply(server, [file]);
  });
});

gulp.task('default', ['images', 'sass', 'font-awesome', 'server']);
