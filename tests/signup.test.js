const { createDriver } = require('./support/driver');
const { AuthPage } = require('./pages/auth-page');
const { createAccountData } = require('./support/test-data');

describe('Automation Exercise signup', function () {
  let driver;
  let authPage;

  beforeEach(async function () {
    driver = await createDriver();
    authPage = new AuthPage(driver);
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('accepts signup identity details in a CSRF-protected form', async function () {
    const account = createAccountData('Signup Test');

    await authPage.gotoLogin();
    await authPage.expectSignupFormProtectedByCsrf();
    await authPage.fillSignupIdentity(account);

    await authPage.expectSignupIdentity(account);
  });
});
