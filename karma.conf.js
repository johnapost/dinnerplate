module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'bower_components/modernizr/modernizr.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.min.js',
      'bower_components/velocity/velocity.min.js',
      'bower_components/velocity/velocity.ui.min.js',
      'src/**/*.coffee',
      'tests/**/*.coffee'
    ],

    exclude: [
    ],

    preprocessors: {
      '**/*.coffee': 'coffee',
      'src/**/*.coffee': 'coverage'
    },

    client: {
      captureConsole: true
    },

    reporters: ['progress', 'growl', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      type: 'lcov'
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox'],
    singleRun: false
  });
};
