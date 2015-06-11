gulp = require 'gulp'
karma = require('karma').server
config = require './config.coffee'

gulp.task 'test', (done) ->
  karma.start {
    configFile: "#{__dirname}/../tests.js"
  }, done()

module.exports = gulp