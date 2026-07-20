const { createDriver } = require('./support/driver');
const { HomePage } = require('./pages/home-page');
const { ProductsPage } = require('./pages/products-page');

describe('Automation Exercise home page', function () {
  let driver;
  let homePage;
  let productsPage;

  beforeEach(async function () {
    driver = await createDriver();
    homePage = new HomePage(driver);
    productsPage = new ProductsPage(driver);
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('loads the home page and shows main navigation', async function () {
    await homePage.goto();

    await homePage.expectMainNavigation();
  });

  it('opens the products page', async function () {
    await homePage.goto();
    await homePage.openProducts();

    await productsPage.expectAllProducts();
  });

  it('opens the test cases page from navigation', async function () {
    await homePage.goto();
    await homePage.openTestCases();

    await homePage.expectTestCasesPage();
  });

  it('subscribes from the home page footer', async function () {
    await homePage.goto();
    await homePage.subscribe(`exploringworld678+selenium-subscribe-${Date.now()}@gmail.com`);

    await homePage.expectSubscriptionSuccess();
  });
});
