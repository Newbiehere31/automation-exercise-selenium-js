const { By } = require('selenium-webdriver');
const { createDriver } = require('./support/driver');
const { click, expectText, expectUrlContains, open, type, visible } = require('./support/actions');

describe('Automation Exercise products', function () {
  let driver;

  beforeEach(async function () {
    driver = await createDriver();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('searches products and opens a product detail page', async function () {
    await open(driver, '/products');
    await expectText(driver, 'All Products');

    await type(driver, By.id('search_product'), 'dress');
    await click(driver, By.id('submit_search'));

    await expectText(driver, 'Searched Products');
    await visible(driver, By.css('.product-image-wrapper'));

    await click(driver, By.xpath('(//a[contains(normalize-space(.), "View Product")])[1]'));

    await expectUrlContains(driver, '/product_details/');
    await expectText(driver, 'Category:');
    await expectText(driver, 'Availability:');
    await expectText(driver, 'Condition:');
    await expectText(driver, 'Brand:');
  });
});
