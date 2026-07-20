const { createDriver } = require('./support/driver');
const { ProductsPage } = require('./pages/products-page');

describe('Automation Exercise products', function () {
  let driver;
  let productsPage;

  beforeEach(async function () {
    driver = await createDriver();
    productsPage = new ProductsPage(driver);
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('searches products and opens a product detail page', async function () {
    await productsPage.goto();
    await productsPage.search('dress');
    await productsPage.expectSearchResultsVisible();
    await productsPage.openFirstProductDetail();

    await productsPage.expectProductDetailVisible();
  });
});
