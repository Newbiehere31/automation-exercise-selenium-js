const { By } = require('selenium-webdriver');
const { createDriver } = require('./support/driver');
const { assertTitleIncludes, click, expectText, expectUrlContains, open, visible } = require('./support/actions');

describe('Automation Exercise home page', function () {
  let driver;

  beforeEach(async function () {
    driver = await createDriver();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('loads the home page and shows main navigation', async function () {
    await open(driver, '/');

    await assertTitleIncludes(driver, 'Automation Exercise');
    await visible(driver, By.xpath('//a[contains(normalize-space(.), "Home")]'));
    await visible(driver, By.xpath('//a[contains(normalize-space(.), "Products")]'));
    await visible(driver, By.xpath('//a[contains(normalize-space(.), "Signup / Login")]'));
  });

  it('opens the products page', async function () {
    await open(driver, '/');
    await click(driver, By.xpath('//a[contains(normalize-space(.), "Products")]'));

    await expectUrlContains(driver, '/products');
    await expectText(driver, 'All Products');
  });
});
