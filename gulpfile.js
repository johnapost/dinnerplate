var gulp = require('gulp'),
  watch = require('gulp-watch'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  imagemin = require('gulp-imagemin'),
  pngcrush = require('imagemin-pngcrush'),
  gzip = require('gulp-gzip'),
  jade = require('gulp-jade'),
  coffee = require('gulp-coffee'),
  express = require('express'),
  merge = require('merge-stream'),
  livereload = require('gulp-livereload'),
  chmod = require('gulp-chmod'),
  app = express()

gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
    .pipe(clean())
})

gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(imagemin({
      progressive: false,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(chmod(755))
    .pipe(gulp.dest('dist/images'))
})

gulp.task('fonts', function() {
  return gulp.src('src/fonts/*')
    .pipe(chmod(755))
    .pipe(gulp.dest('dist/fonts'))
})

gulp.task('sass', function() {
  return gulp.src('src/styles/*.scss')
    .pipe(sass({style: 'expanded'}))
    .on('error', errorHandler)
    .pipe(prefix('last 5 versions', '> 1%'))
    .pipe(minifycss())
    .pipe(rename('all.min.css'))
    .pipe(chmod(755))
    .pipe(gulp.dest('dist/styles'))
});

gulp.task('coffee', function() {
  return gulp.src(['src/scripts/*.coffee', 'src/scripts/**/*.coffee'])
    .pipe(coffee({bare: true}))
    .on('error', errorHandler)
    .pipe(concat('src/scripts/all.coffee'))
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(chmod(755))
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('jade', function() {
  return gulp.src([
      'src/*.jade',
      'src/**/*.jade',
      '!src/partials/**.jade',
      '!src/contact/*.jade',
      '!src/contact/**/*.jade'
    ])
    .pipe(jade())
    .on('error', errorHandler)
    .pipe(chmod(755))
    .pipe(gulp.dest('dist'))
});

gulp.task('gzip', function () {
  var html = gulp.src(['dist/*.html', 'dist/**/*.html'])
    .pipe(gzip())
    .pipe(chmod(755))
    .pipe(gulp.dest('dist'))
  var fonts = gulp.src(['dist/fonts/*.eot', 'dist/fonts/*.svg', 'dist/fonts/*.ttf', 'dist/fonts/*.woff'])
    .pipe(gzip())
    .pipe(chmod(755))
    .pipe(gulp.dest('dist/fonts'))
  var images = gulp.src(['dist/images/*.jpg', 'dist/images/*.png', 'dist/images/*.gif', 'dist/images/*.svg'])
    .pipe(gzip())
    .pipe(chmod(755))
    .pipe(gulp.dest('dist/images'))
  var scripts = gulp.src('dist/scripts/*.js')
    .pipe(gzip())
    .pipe(chmod(755))
    .pipe(gulp.dest('dist/scripts'))
  var styles = gulp.src('dist/styles/*.css')
    .pipe(gzip())
    .pipe(chmod(755))
    .pipe(gulp.dest('dist/styles'))

  return merge(html, fonts, images, scripts, styles)
})

gulp.task('reload', ['jade', 'gzip'], function() {
  livereload.changed();
  console.log('LiveReload triggered.')
})

gulp.task('express', function() {
  app.use(express.static(__dirname + '/dist'));
  app.listen(1337);
})

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['src/scripts/*.coffee', 'src/**/*.coffee'], ['coffee', 'gzip', 'reload'])
  gulp.watch('src/styles/*.scss', ['sass', 'gzip', 'reload'])
  gulp.watch(['src/*.jade', 'src/**/*.jade'], ['jade', 'gzip', 'reload']),
  gulp.watch('src/images/*', ['images', 'gzip', 'reload'])
})

function errorHandler(err) {
  console.log(err.toString())
  this.emit('end')
}

gulp.task('default', [
  'jade',
  'sass',
  'coffee',
  'images',
  'fonts',
  'gzip',
  'express',
  'watch',
])