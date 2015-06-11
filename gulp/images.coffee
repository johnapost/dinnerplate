gulp = require 'gulp'
changed = require 'gulp-changed'
chmod = require 'gulp-chmod'
imagemin = require 'gulp-imagemin'
config = require './config.coffee'

gulp.task 'images', ->
  gulp.src 'src/brand/images/**/*'
    .pipe changed("#{config.path}/images")
    .pipe chmod(755)
    .pipe gulp.dest("#{config.path}/images")

gulp.task 'imagesProduction', ->
  gulp.src 'src/brand/images/**/*'
    .pipe changed("#{config.path}/images")
    .pipe imagemin()
    .pipe chmod(755)
    .pipe gulp.dest("#{config.path}/images")

module.exports = gulp
