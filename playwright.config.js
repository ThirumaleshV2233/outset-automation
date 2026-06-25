// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  // Max time for a single test
  timeout: 60 * 1000,

  // Max time for each assertion
  expect: {
    timeout: 10 * 1000,
  },

  use: {
    baseURL: 'https://theoutset.com',
    browserName: 'chromium',
    headless: true,

    // Page navigation timeout
    navigationTimeout: 30 * 1000,

    // Actions like click(), fill(), check()
    actionTimeout: 10 * 1000,

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  retries: 1,
  reporter: 'html',
});