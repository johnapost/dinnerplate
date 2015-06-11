gulp = require 'gulp'
del = require 'del'
changed = require 'gulp-changed'
concat = require 'gulp-concat'
uglify = require 'gulp-uglifyjs'
config = require './config.coffee'

gulp.task 'corporateComponents', ->
  gulp.src config.corporateSrc
    .pipe changed "#{config.corporateDest}/components/angular"
    .pipe gulp.dest "#{config.corporateDest}/components/angular"

module.exports = gulp