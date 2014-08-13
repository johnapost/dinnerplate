var gulp = require('gulp'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  jade = require('gulp-jade'),
  coffee = require('gulp-coffee'),
  express = require('express'),
  livereload = require('gulp-livereload'),
  app = express();

gulp.task('sass', function() {
  return gulp.src('src/styles/*.scss')
    .pipe(sass({style: 'expanded'}))
    .pipe(prefix('last 5 versions', '> 1%'))
    .pipe(minifycss())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('dist/styles'))
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(concat('src/scripts/all.coffee'))
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('jade', function() {
  return gulp.src('src/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'))
});

gulp.task('reload', function() {
  return gulp.src(['dist/scripts/*.js', 'dist/styles/*.css', 'dist/*.html'])
    .pipe(watch())
    .pipe(livereload())
})

gulp.task('express', function() {
  app.use(express.static(__dirname + '/dist'));
  app.listen(1337);
})

gulp.task('watch', function() {
  gulp.watch('src/scripts/*.coffee', ['scripts']);
  gulp.watch('src/styles/*.scss', ['sass']);
  gulp.watch('src/*.jade', ['jade']);
});

gulp.task('default', ['jade', 'sass', 'scripts', 'watch', 'express', 'reload']);