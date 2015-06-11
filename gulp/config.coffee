argv = require('yargs').argv

sandboxPath = '/Volumes/Marketing/eb_homepage'

if argv.sandbox is true
  path = sandboxPath
else
  path = 'dist'

config =
  path: path

module.exports = config