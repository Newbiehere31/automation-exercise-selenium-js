const assert = require('node:assert/strict');
const { By } = require('selenium-webdriver');
const { createDriver } = require('./support/driver');
const { expectText, expectUrlContains, open, visible } = require('./support/actions');

describe('Automation Exercise cart', function () {
  let driver;

  beforeEach(async function () {
    driver = await createDriver();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('adds the first product to the cart and verifies the cart row', async function () {
    await open(driver, '/products');
    await expectText(driver, 'All Products');

    const firstProduct = await visible(driver, By.css('.product-image-wrapper'));
    const productName = (await firstProduct.findElement(By.css('.productinfo p')).getText()).trim();
    const addToCart = await firstProduct.findElement(By.css('.overlay-content a.add-to-cart'));

    await driver.executeScript('arguments[0].scrollIntoView({ block: "center" });', firstProduct);
    await driver.executeScript('arguments[0].click();', addToCart);

    await expectText(driver, 'Added!');
    const viewCart = await visible(driver, By.xpath('//a[contains(normalize-space(.), "View Cart")]'));
    await viewCart.click();

    await expectUrlContains(driver, '/view_cart');
    const cartInfo = await visible(driver, By.id('cart_info'));
    const cartText = await cartInfo.getText();
    assert.match(cartText, new RegExp(productName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(cartText, /Rs\./);

    const quantity = await visible(driver, By.css('.cart_quantity'));
    assert.equal((await quantity.getText()).trim(), '1');
  });
});
