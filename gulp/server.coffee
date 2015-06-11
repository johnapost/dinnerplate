gulp = require 'gulp'
browserSync = require 'browser-sync'
config = require './config.coffee'

gulp.task 'serve', ['sass'], ->
  browserSync
    server: {baseDir: config.path}
    port: 4000
    open: false
    reloadOnRestart: false
    ghostMode: true
    notify: true

  gulp.watch 'src/**/*.scss', ['sass']
  gulp.watch ['src/**/*.coffee', '!src/**/*.spec.coffee'], ['coffee', browserSync.reload]
  gulp.watch 'src/**/*.jade', ['jade', browserSync.reload]

module.exports = gulp
