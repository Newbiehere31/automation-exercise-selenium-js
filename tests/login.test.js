const { By } = require('selenium-webdriver');
const { createDriver } = require('./support/driver');
const { click, expectText, login, open, signup, type } = require('./support/actions');

describe('Automation Exercise login', function () {
  let driver;

  beforeEach(async function () {
    driver = await createDriver();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('shows an error for invalid login details', async function () {
    await open(driver, '/login');

    await type(driver, By.css('[data-qa="login-email"]'), 'exploringworld678+wrong@gmail.com');
    await type(driver, By.css('[data-qa="login-password"]'), 'WrongPassword123');
    await click(driver, By.css('[data-qa="login-button"]'));

    await expectText(driver, 'Your email or password is incorrect!');
  });

  it('logs in with a valid account after logout', async function () {
    const name = 'Login Test Selenium';
    const email = `exploringworld678+selenium-login-${Date.now()}@gmail.com`;
    const password = 'Login@Test123';

    await signup(driver, { name, email, password });
    await click(driver, By.xpath('//a[contains(normalize-space(.), "Logout")]'));
    await expectText(driver, 'Login to your account');
    await login(driver, { email, password, name });
  });
});
