const { defineConfig } = require("cypress");
const AllureWriter = require('@shelex/cypress-allure-plugin/writer');

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
    baseUrl: 'https://dev-web.tezro.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
        AllureWriter(on, config);
        return config;
    },
  },
  screenshotOnRunFailure: true,
  pageLoadTimeout: 100000,
  responseTimeout: 100000,
  requestTimeout: 100000
});
