const { By } = require('selenium-webdriver');
const { assertTitleIncludes, click, expectText, expectUrlContains, open, type, visible } = require('../support/actions');

class HomePage {
  constructor(driver) {
    this.driver = driver;
  }

  async goto() {
    await open(this.driver, '/');
  }

  async expectMainNavigation() {
    await assertTitleIncludes(this.driver, 'Automation Exercise');
    await visible(this.driver, this.headerLink('Home'));
    await visible(this.driver, this.headerLink('Products'));
    await visible(this.driver, this.headerLink('Signup / Login'));
    await visible(this.driver, this.headerLink('Test Cases'));
    await visible(this.driver, this.headerLink('Contact us'));
  }

  async openProducts() {
    await click(this.driver, this.headerLink('Products'));
  }

  async openTestCases() {
    await click(this.driver, this.headerLink('Test Cases'));
  }

  async expectTestCasesPage() {
    await expectUrlContains(this.driver, '/test_cases');
    await visible(this.driver, By.xpath('//b[normalize-space(.)="Test Cases"]'));
  }

  async subscribe(email) {
    const footer = await visible(this.driver, By.css('footer'));
    await this.driver.executeScript('arguments[0].scrollIntoView({ block: "center" });', footer);
    await expectText(this.driver, 'Subscription');
    await type(this.driver, By.id('susbscribe_email'), email);
    await click(this.driver, By.id('subscribe'));
  }

  async expectSubscriptionSuccess() {
    await expectText(this.driver, 'You have been successfully subscribed!');
  }

  headerLink(text) {
    return By.xpath(`//div[contains(@class, "shop-menu")]//a[contains(normalize-space(.), "${text}")]`);
  }
}

module.exports = {
  HomePage
};
