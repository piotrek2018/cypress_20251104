import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    baseUrl: "https://demo-bank.vercel.app",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      reportPageTitle: "Cypress Test Report - Demo Bank",
      embeddedScreenshots: true,
      inlineAssets: true,
    },

    // Cucumber configuration
    specPattern: "cypress/e2e/**/*.feature",

    async setupNodeEvents(on, config) {
      // Cucumber plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Reporter plugin
      require("cypress-mochawesome-reporter/plugin")(on);

      // Esbuild preprocessor with Cucumber support
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },

    supportFile: "cypress/support/e2e.ts",
  },
});
