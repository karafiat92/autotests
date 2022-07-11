const { defineConfig } = require("cypress");

module.exports = defineConfig({
viewportHeight: 950,
viewportWidth: 1800,
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
  e2e: {
    baseUrl: 'http://localhost:1234'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  pageLoadTimeout: 100000,
  responseTimeout: 100000,
  requestTimeout: 100000
});
