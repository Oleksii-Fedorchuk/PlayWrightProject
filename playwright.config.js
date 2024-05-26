// @ts-check
const {defineConfig, devices} = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,

    // grep: /@smoke/,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',//[["html", {open: "newer"}]]
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'https://qauto2.forstudy.space',
        httpCredentials: {
            username: "guest",
            password: "welcome2qauto",
        },
        // viewport:{width: 1024, height: 768},
        // screenshot: "only-on-failure",
        video: "on",
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'staging',
            use: {
                ...devices['Desktop Chrome'],
                // baseURL: 'https://qauto2.forstudy.space',
                baseURL: 'https://playwright.dev',
                httpCredentials: {
                    username: "guest",
                    password: "welcome2qauto",
                },
            },
            dependencies: ['setup']
        },

        // {
        //     name: 'prod',
        //     use: {...devices['Desktop Firefox']},
        // },
        //
        // {
        //     name: 'smoke',
        //     testMatch: /.*example.spec.js/,
        // },
        // {
        //     name: 'regression',
        //     testIgnore: /.*example.spec.js/,
        // },
        {
            name: 'setup',
            testMatch: /.*setup.setup.js/,
        }

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});

