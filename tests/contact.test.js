const assert = require('node:assert/strict');
const { By, until } = require('selenium-webdriver');
const { createDriver } = require('./support/driver');
const { click, expectText, open, type, visible } = require('./support/actions');

describe('Automation Exercise contact form', function () {
  let driver;

  beforeEach(async function () {
    driver = await createDriver();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('submits a contact message successfully', async function () {
    await open(driver, '/contact_us');
    await expectText(driver, 'Get In Touch');

    await type(driver, By.css('[data-qa="name"]'), 'Exploring World Test');
    await type(driver, By.css('[data-qa="email"]'), 'exploringworld678+contact@gmail.com');
    await type(driver, By.css('[data-qa="subject"]'), 'Selenium JavaScript contact test');
    await type(driver, By.css('[data-qa="message"]'), 'This is an automated contact form smoke test.');

    await click(driver, By.css('[data-qa="submit-button"]'));
    const alert = await driver.wait(until.alertIsPresent(), 10000);
    await alert.accept();

    const status = await visible(driver, By.css('#contact-page .status'));
    assert.match(await status.getText(), /Success! Your details have been submitted successfully\./);
  });
});
