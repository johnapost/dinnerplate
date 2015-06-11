gulp = require 'gulp'
changed = require 'gulp-changed'
newer = require 'gulp-newer'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
config = require './config.coffee'

gulp.task 'vendor', ->
  gulp.src [
    'bower_components/modernizr/modernizr.js'
    'bower_components/jquery/dist/jquery.js'
    'bower_components/angular/angular.min.js'
    'bower_components/velocity/velocity.min.js'
    'bower_components/velocity/velocity.ui.min.js'
  ]
  .pipe newer "#{config.path}/scripts/vendor.min.js"
  .pipe uglify()
  .pipe concat 'vendor.min.js'
  .pipe gulp.dest "#{config.path}/scripts"

module.exports = gulp
