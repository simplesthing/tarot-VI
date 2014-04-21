// An example configuration file.
exports.config = {
  // Do not start a Selenium Standalone sever - only run this using chrome.
  chromeOnly: true,
  chromeDriver: './node_modules/protractor/selenium/chromedriver',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['src/**/*.spec.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  baseUrl: 'http://127.0.0.1:9000/'
};
