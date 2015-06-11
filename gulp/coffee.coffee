gulp = require 'gulp'
newer = require 'gulp-newer'
sourcemaps = require 'gulp-sourcemaps'
coffee = require 'gulp-coffee'
concat = require 'gulp-concat'
chmod = require 'gulp-chmod'
uglify = require 'gulp-uglify'
config = require './config.coffee'
plumber = require 'gulp-plumber'
notify = require 'gulp-notify'

errorAlert = (error) ->
  notify.onError(
    title: 'Coffee Error'
    message: 'Check your terminal!'
  )(error)
  console.log error.toString()
  this.emit 'end'

gulp.task 'coffee', ->
  gulp.src ['src/**/*.coffee', '!src/**/*.spec.coffee']
    .pipe plumber errorHandler: errorAlert
    .pipe newer "#{config.path}/scripts/app.js"
    .pipe sourcemaps.init()

    .pipe coffee(bare: true)
    .pipe concat('app.js')
    .pipe chmod(755)

    .pipe sourcemaps.write()
    .pipe gulp.dest("#{config.path}/scripts")

gulp.task 'coffeeProduction', ->
  gulp.src ['src/**/*.coffee', '!src/**/*.spec.coffee']
    .pipe plumber errorHandler: errorAlert
    .pipe newer "#{config.path}/scripts/app.min.js"

    .pipe coffee(bare: true)
    .pipe concat('app.js')
    .pipe uglify()
    .pipe chmod(755)

    .pipe gulp.dest("#{config.path}/scripts")

module.exports = gulp