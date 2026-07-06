const { By } = require('selenium-webdriver');
const { createDriver } = require('./support/driver');
const { expectText, open, visible } = require('./support/actions');

describe('Automation Exercise authentication forms', function () {
  let driver;

  beforeEach(async function () {
    driver = await createDriver();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('shows login and signup forms', async function () {
    await open(driver, '/login');

    await expectText(driver, 'Login to your account');
    await visible(driver, By.css('[data-qa="login-email"]'));
    await visible(driver, By.css('[data-qa="login-password"]'));
    await expectText(driver, 'New User Signup!');
    await visible(driver, By.css('[data-qa="signup-name"]'));
  });
});
