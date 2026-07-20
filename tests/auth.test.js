const { createDriver } = require('./support/driver');
const { AuthPage } = require('./pages/auth-page');

describe('Automation Exercise authentication forms', function () {
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

  it('shows login and signup forms', async function () {
    await authPage.gotoLogin();

    await authPage.expectFormsVisible();
  });
});
