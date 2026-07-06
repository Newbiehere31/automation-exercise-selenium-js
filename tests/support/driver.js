const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const BASE_URL = 'https://automationexercise.com';

async function createDriver() {
  const options = new chrome.Options();

  options.addArguments(
    '--disable-notifications',
    '--disable-popup-blocking',
    '--window-size=1366,900'
  );

  if (process.env.HEADLESS !== 'false') {
    options.addArguments('--headless=new');
  }

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  await blockThirdPartyAds(driver);
  return driver;
}

async function blockThirdPartyAds(driver) {
  try {
    await driver.sendDevToolsCommand('Network.enable', {});
    await driver.sendDevToolsCommand('Network.setBlockedURLs', {
      urls: [
        '*://*.doubleclick.net/*',
        '*://*.googleadservices.com/*',
        '*://*.googlesyndication.com/*',
        '*://*.googletagmanager.com/*',
        '*://*.google-analytics.com/*'
      ]
    });
  } catch {
    // Some Selenium/browser combinations do not expose CDP. Tests still run without this.
  }
}

module.exports = {
  BASE_URL,
  createDriver
};
