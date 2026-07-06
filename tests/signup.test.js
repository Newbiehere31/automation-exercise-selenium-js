const { createDriver } = require('./support/driver');
const { signup } = require('./support/actions');

describe('Automation Exercise signup', function () {
  let driver;

  beforeEach(async function () {
    driver = await createDriver();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('creates a new account', async function () {
    const name = 'Exploring World Selenium';
    const email = `exploringworld678+selenium-signup-${Date.now()}@gmail.com`;
    const password = 'Test@12345';

    await signup(driver, { name, email, password });
  });
});
