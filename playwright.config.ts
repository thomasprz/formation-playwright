import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    timeout: 50000,
    retries: 0, //retry failing test
    reporter: [['list']],
    use: {
        headless: false, 
        actionTimeout: 15000,
        ignoreHTTPSErrors: true,
        video: "retain-on-failure", 
        screenshot: "only-on-failure",
    },
    projects: [
        {
          name: 'Chromium',
          use: { browserName: 'chromium' },
        },
        {
          name: 'Firefox',
          use: { browserName: 'firefox' },
        },
        {
          name: 'Webkit',
          use: { headless: false, browserName: 'webkit' },
        },
      ],
    };
     
export default config;