const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'k19v3g',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
})