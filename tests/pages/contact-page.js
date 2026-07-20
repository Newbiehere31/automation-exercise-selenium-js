const assert = require('node:assert/strict');
const { By, until } = require('selenium-webdriver');
const { click, expectText, expectUrlContains, open, type, visible } = require('../support/actions');

class ContactPage {
  constructor(driver) {
    this.driver = driver;
  }

  async goto() {
    await open(this.driver, '/contact_us');
    await expectText(this.driver, 'Get In Touch');
  }

  async submitMessage({ name, email, subject, message }) {
    await type(this.driver, By.css('[data-qa="name"]'), name);
    await type(this.driver, By.css('[data-qa="email"]'), email);
    await type(this.driver, By.css('[data-qa="subject"]'), subject);
    await type(this.driver, By.css('[data-qa="message"]'), message);
    await click(this.driver, By.css('[data-qa="submit-button"]'));

    const alert = await this.driver.wait(until.alertIsPresent(), 10000);
    await alert.accept();
  }

  async expectSubmissionSuccess() {
    const status = await visible(this.driver, By.css('#contact-page .status'));
    assert.match(await status.getText(), /Success! Your details have been submitted successfully\./);
  }

  async returnHome() {
    await click(this.driver, By.css('a.btn.btn-success[href="/"]'));
    await expectUrlContains(this.driver, '/');
  }
}

module.exports = {
  ContactPage
};
