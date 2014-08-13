var gulp = require('gulp'),
  watch = require('gulp-watch'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  jade = require('gulp-jade'),
  coffee = require('gulp-coffee');

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

gulp.task('server', function() {
  connect.server({
    root: 'dist',
    livereload: true
  })
})

gulp.task('reload', function() {
  return gulp.src(['src/scripts/*.js', 'src/styles/*.css', 'src/*.html'])
    .pipe(watch())
    .pipe(connect.reload())
})

gulp.task('watch', function() {
  gulp.watch('src/scripts/*.coffee', ['scripts']);
  gulp.watch('src/styles/*.scss', ['sass']);
  gulp.watch('src/*.jade', ['jade']);
});

gulp.task('default', ['sass', 'scripts', 'watch', 'server', 'reload']);