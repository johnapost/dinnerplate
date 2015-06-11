# Dependencies
gulp = require 'gulp'
del = require 'del'
config = require './gulp/config.coffee'

# Cleans your output directory
gulp.task 'del', ->
  del config.path, force: true

# Move static files into dist
require './gulp/static.coffee'

# Process SASS
require './gulp/sass.coffee'

# Process CoffeeScript
require './gulp/coffee.coffee'

# Process Jade
require './gulp/jade.coffee'

# Process images
require './gulp/images.coffee'

# Server
require './gulp/server.coffee'

# Tests
require './gulp/test.coffee'

# Prepares production-ready files
gulp.task 'production', [
  'sassProduction'
  'coffeeProduction'
  'jadeProduction'
  'imagesProduction'
]

# Karma TDD
gulp.task 'tdd', [
  'default'
  'test'
]

# For one-time builds to CI systems
gulp.task 'ci', [
  'vendor'
  'jade'
  'sass'
  'grid'
  'coffee'
  'fonts'
  'images'
]

gulp.task 'default', [
  'vendor'
  'jade'
  'sass'
  'grid'
  'coffee'
  'fonts'
  'images'
  'serve'
]
