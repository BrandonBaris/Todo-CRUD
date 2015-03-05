var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-express');
// var jade = require('gulp-jade');
// var tinylr;

// gulp.task('livereload', function() {
//   tinylr = require('tiny-lr')();
//   tinylr.listen(4002);
// });

gulp.task('server', function () {
  // run server
  server.run(['app.js']);

  // restart on file change
  gulp.watch(['public/css/*.css'], server.notify);
  gulp.watch(['views/**/*.jade'], server.notify);
  gulp.watch(['app.js'], [server.run]);
});

// gulp.task('templates', function() {
//   var YOUR_LOCALS = {};

//   gulp.src('views/*.jade')
//     .pipe(jade({
//       locals : YOUR_LOCALS
//     }))
//     .pipe(gulp.dest('public'));
// });

gulp.task('sass', function () {
  return gulp.src('sass/**/*.scss')
    .pipe(sass( { errLogToConsole: true } ))
    .pipe(server.notify())
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('public/**/*',['server']);
  // gulp.watch('views/*.jade', ['templates']);
});

gulp.task('default', ['watch','server','sass'], function(){}); 