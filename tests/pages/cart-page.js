const assert = require('node:assert/strict');
const { By } = require('selenium-webdriver');
const { expectText, expectUrlContains, visible } = require('../support/actions');

class CartPage {
  constructor(driver) {
    this.driver = driver;
  }

  async expectCartOpen() {
    await expectUrlContains(this.driver, '/view_cart');
    await visible(this.driver, By.id('cart_info'));
  }

  async expectProductRow(productName, quantity) {
    const cartInfo = await visible(this.driver, By.id('cart_info'));
    const cartText = await cartInfo.getText();
    const escapedProductName = productName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    assert.match(cartText, new RegExp(escapedProductName));
    assert.match(cartText, /Rs\./);

    const quantityCell = await visible(this.driver, By.css('.cart_quantity'));
    assert.equal((await quantityCell.getText()).trim(), String(quantity));
  }

  async removeFirstProduct() {
    const removeButton = await visible(this.driver, By.css('.cart_quantity_delete'));
    await removeButton.click();
  }

  async expectEmptyCart() {
    await expectText(this.driver, 'Cart is empty!');
  }
}

module.exports = {
  CartPage
};
