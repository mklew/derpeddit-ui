exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub', //this tells it to use your local selenium server you started with the webdriver-manager start.  You may want to use your ip address
  capabilities: {
    browserName: 'chrome'
  },
  specs: ['e2e/protractor/**/*.js'],//where you put your protractor scripts
  rootElement: 'body',
  baseUrl: 'http://localhost:9000',//base url 
 
  jasmineNodeOpts: {
    // onComplete will be called just before the driver quits.
    onComplete: null,
    // If true, display spec names.
    isVerbose: true,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    includeStackTrace: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 30000
 
  }
}