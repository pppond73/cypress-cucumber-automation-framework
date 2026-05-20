const { defineConfig } = require("cypress");

const createBundler =
  require("@bahmutov/cypress-esbuild-preprocessor");

const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");

const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({

  e2e: {

    // 🔹 feature location
    specPattern: "cypress/e2e/features/**/*.feature",

    // 🔹 support file
    supportFile: "cypress/support/e2e.js",

    // 🔹 base url
    baseUrl: "https://qa-practice.razvanvancea.ro",

    async setupNodeEvents(on, config) {

      // cucumber plugin
      await addCucumberPreprocessorPlugin(on, config);

      // esbuild
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );

      return config;
    },
  },

});