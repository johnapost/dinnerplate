var gulp = require('gulp'),
  watch = require('gulp-watch'),
  connect = require('gulp-connect'),
  jshint = require('gulp-jshint'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  jade = require('gulp-jade');

gulp.task('lint', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
  return gulp.src('src/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/styles'))
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(concat('src/scripts/all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('jade', function() {
  return gulp.src('src/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('src'))
});

gulp.task('server', function() {
  connect.server({livereload: true})
})

gulp.task('reload', function() {
  return gulp.src(['src/scripts/*.js', 'src/styles/*.css', 'src/*.html'])
    .pipe(watch())
    .pipe(connect.reload())
})

gulp.task('watch', function() {
  gulp.watch('src/scripts/*.js', ['lint', 'scripts']);
  gulp.watch('src/styles/*.scss', ['sass']);
  gulp.watch('src/*.jade', ['jade']);
});

gulp.task('default', ['lint', 'sass', 'scripts', 'watch', 'server', 'reload']);