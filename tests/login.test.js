const { createDriver } = require('./support/driver');
const { AuthPage } = require('./pages/auth-page');
const { createAccountData } = require('./support/test-data');

describe('Automation Exercise login', function () {
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

  it('accepts login credentials in a CSRF-protected form', async function () {
    await authPage.gotoLogin();
    await authPage.expectLoginFormProtectedByCsrf();
    await authPage.fillLoginCredentials('exploringworld678+wrong@gmail.com', 'WrongPassword123');

    await authPage.expectLoginCredentials('exploringworld678+wrong@gmail.com', 'WrongPassword123');
  });

  it('keeps login and signup form data isolated', async function () {
    const account = createAccountData('Login Test');

    await authPage.gotoLogin();
    await authPage.fillSignupIdentity(account);
    await authPage.fillLoginCredentials('exploringworld678+login-check@gmail.com', 'Login@Test123');

    await authPage.expectSignupIdentity(account);
    await authPage.expectLoginCredentials('exploringworld678+login-check@gmail.com', 'Login@Test123');
  });
});
