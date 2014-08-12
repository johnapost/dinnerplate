var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('lint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
  return gulp.src('src/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/styles'))
})

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(concat('src/scripts/all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', function() {
  gulp.watch('src/scripts/*.js', ['lint', 'scripts']);
  gulp.watch('src/styles/*.scss', ['sass']);
});

gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);