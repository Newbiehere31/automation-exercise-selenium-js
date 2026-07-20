const { By } = require('selenium-webdriver');
const { click, expectText, expectUrlContains, open, type, visible } = require('../support/actions');

class ProductsPage {
  constructor(driver) {
    this.driver = driver;
  }

  async goto() {
    await open(this.driver, '/products');
    await this.expectAllProducts();
  }

  async expectAllProducts() {
    await expectText(this.driver, 'All Products');
  }

  async search(query) {
    await type(this.driver, By.id('search_product'), query);
    await click(this.driver, By.id('submit_search'));
    await expectText(this.driver, 'Searched Products');
  }

  async expectSearchResultsVisible() {
    await visible(this.driver, By.css('.product-image-wrapper'));
  }

  async openFirstProductDetail() {
    await click(this.driver, By.xpath('(//a[contains(normalize-space(.), "View Product")])[1]'));
  }

  async expectProductDetailVisible() {
    await expectUrlContains(this.driver, '/product_details/');
    await expectText(this.driver, 'Category:');
    await expectText(this.driver, 'Availability:');
    await expectText(this.driver, 'Condition:');
    await expectText(this.driver, 'Brand:');
  }

  async addFirstProductToCart() {
    const firstProduct = await visible(this.driver, By.css('.product-image-wrapper'));
    const productName = (await firstProduct.findElement(By.css('.productinfo p')).getText()).trim();
    const addToCart = await firstProduct.findElement(By.css('.overlay-content a.add-to-cart'));

    await this.driver.executeScript('arguments[0].scrollIntoView({ block: "center" });', firstProduct);
    await this.driver.executeScript('arguments[0].click();', addToCart);
    await expectText(this.driver, 'Added!');

    return productName;
  }

  async addDetailProductToCart(quantity) {
    const productName = await (await visible(this.driver, By.css('.product-information h2'))).getText();
    const quantityInput = await visible(this.driver, By.id('quantity'));

    await quantityInput.clear();
    await quantityInput.sendKeys(String(quantity));
    await click(this.driver, By.css('button.cart'));
    await expectText(this.driver, 'Added!');

    return productName.trim();
  }

  async viewCartFromModal() {
    const viewCart = await visible(this.driver, By.xpath('//a[contains(normalize-space(.), "View Cart")]'));
    await viewCart.click();
  }
}

module.exports = {
  ProductsPage
};
