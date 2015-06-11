gulp = require 'gulp'
changed = require 'gulp-changed'
newer = require 'gulp-newer'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
config = require './config.coffee'

gulp.task 'fonts', ->
  gulp.src 'src/brand/fonts/**/*'
  .pipe changed "#{config.path}/fonts"
  .pipe gulp.dest "#{config.path}/fonts"

gulp.task 'grid', ->
  gulp.src 'src/components/grid/**/*'
  .pipe changed "#{config.path}/styles/grid"
  .pipe gulp.dest "#{config.path}/styles/grid"

gulp.task 'vendor', ->
  gulp.src [
    'bower_components/modernizr/modernizr.js'
    'bower_components/jquery/jquery.js'
    'bower_components/jquery-ui/ui/jquery-ui.js'
    'vendor/jquery.styleselect.js'
    'bower_components/json3/lib/json3.min.js'
    'bower_components/angular/angular.min.js'
    'bower_components/angular-off-click/offClick.js'
    'bower_components/velocity/velocity.min.js'
    'bower_components/velocity/velocity.ui.min.js'
  ]
  .pipe newer "#{config.path}/scripts/vendor.min.js"
  .pipe uglify()
  .pipe concat 'vendor.min.js'
  .pipe gulp.dest "#{config.path}/scripts"

module.exports = gulp