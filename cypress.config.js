const { defineConfig } = require("cypress");

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.createEsbuildPlugin(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "spec, mochawesome",
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports/mocha",
      overwrite: false,
      html: false,  
      json: true,
      timestamp: "mmddyyyy_HHMMss",
    },
  },

  e2e: {
    specPattern: "cypress/e2e/features/**/*.feature",
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents,
  },
});
