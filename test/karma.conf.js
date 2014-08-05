// an example karma.conf.js
module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'], 
    files: [      
    	JASMINE, 
    	JASMINE_ADAPTER,
      // {pattern: 'public/javascripts/**/*.js', included: false },
      {pattern: 'test/spec/**/*.js', watched: true, included: true, served: true}
    ],
    browsers: ['Chrome'],
    autoWatch : true,
    plugins: [
            'karma-chrome-launcher',
            'karma-script-launcher',
            'karma-jasmine'
            ],
  });
};