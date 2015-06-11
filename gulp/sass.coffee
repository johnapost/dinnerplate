gulp = require 'gulp'
rename = require 'gulp-rename'
sourcemaps = require 'gulp-sourcemaps'
sass = require 'gulp-sass'
prefix = require 'gulp-autoprefixer'
csso = require 'gulp-csso'
chmod = require 'gulp-chmod'
filter = require 'gulp-filter'
browserSync = require 'browser-sync'
config = require './config.coffee'
plumber = require 'gulp-plumber'
notify = require 'gulp-notify'

errorAlert = (error) ->
  notify.onError(
    title: 'SASS Error'
    message: 'Check your terminal!'
  )(error)
  console.log error.toString()
  this.emit 'end'

gulp.task 'sass', ->
  gulp.src 'src/styles/app.scss'
    .pipe plumber errorHandler: errorAlert
    .pipe sourcemaps.init()

    .pipe sass(style: 'expanded')
    .pipe prefix(browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'])
    .pipe rename('styles.css')
    .pipe chmod(755)

    .pipe sourcemaps.write()
    .pipe gulp.dest("#{config.path}/styles")
    .pipe filter('**/*.css')
    .pipe browserSync.reload(stream: true)

gulp.task 'sassProduction', ->
  gulp.src 'src/styles/app.scss'
    .pipe plumber errorHandler: errorAlert

    .pipe sass(style: 'expanded')
    .pipe prefix(browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'])
    .pipe csso()
    .pipe rename('styles.css')
    .pipe chmod(755)

    .pipe gulp.dest("#{config.path}/styles")
