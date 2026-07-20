const { createDriver } = require('./support/driver');
const { CartPage } = require('./pages/cart-page');
const { ProductsPage } = require('./pages/products-page');

describe('Automation Exercise cart', function () {
  let driver;
  let cartPage;
  let productsPage;

  beforeEach(async function () {
    driver = await createDriver();
    cartPage = new CartPage(driver);
    productsPage = new ProductsPage(driver);
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('adds the first product to the cart and verifies the cart row', async function () {
    await productsPage.goto();

    const productName = await productsPage.addFirstProductToCart();
    await productsPage.viewCartFromModal();

    await cartPage.expectCartOpen();
    await cartPage.expectProductRow(productName, 1);
  });

  it('adds a product with custom quantity from the detail page', async function () {
    await productsPage.goto();
    await productsPage.openFirstProductDetail();
    await productsPage.expectProductDetailVisible();

    const productName = await productsPage.addDetailProductToCart(3);
    await productsPage.viewCartFromModal();

    await cartPage.expectCartOpen();
    await cartPage.expectProductRow(productName, 3);
  });

  it('removes a product from the cart', async function () {
    await productsPage.goto();

    await productsPage.addFirstProductToCart();
    await productsPage.viewCartFromModal();
    await cartPage.expectCartOpen();
    await cartPage.removeFirstProduct();

    await cartPage.expectEmptyCart();
  });
});
