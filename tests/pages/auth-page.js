const assert = require('node:assert/strict');
const { By, until } = require('selenium-webdriver');
const { expectText, open, type, visible } = require('../support/actions');

class AuthPage {
  constructor(driver) {
    this.driver = driver;
  }

  async gotoLogin() {
    await open(this.driver, '/login');
    await this.waitForCsrfCookie();
  }

  async expectFormsVisible() {
    await expectText(this.driver, 'Login to your account');
    await visible(this.driver, By.css('[data-qa="login-email"]'));
    await visible(this.driver, By.css('[data-qa="login-password"]'));
    await expectText(this.driver, 'New User Signup!');
    await visible(this.driver, By.css('[data-qa="signup-name"]'));
  }

  async expectLoginFormProtectedByCsrf() {
    const token = await this.driver.wait(
      until.elementLocated(By.css('form[action="/login"] input[name="csrfmiddlewaretoken"]')),
      10000
    );
    assert.notEqual(await token.getAttribute('value'), '');
  }

  async expectSignupFormProtectedByCsrf() {
    const token = await this.driver.wait(
      until.elementLocated(By.css('form[action="/signup"] input[name="csrfmiddlewaretoken"]')),
      10000
    );
    assert.notEqual(await token.getAttribute('value'), '');
  }

  async fillLoginCredentials(email, password) {
    await type(this.driver, By.css('form[action="/login"] [data-qa="login-email"]'), email);
    await type(this.driver, By.css('form[action="/login"] [data-qa="login-password"]'), password);
  }

  async expectLoginCredentials(email, password) {
    const emailInput = await visible(this.driver, By.css('form[action="/login"] [data-qa="login-email"]'));
    const passwordInput = await visible(this.driver, By.css('form[action="/login"] [data-qa="login-password"]'));

    assert.equal(await emailInput.getAttribute('value'), email);
    assert.equal(await passwordInput.getAttribute('value'), password);
  }

  async fillSignupIdentity(account) {
    await type(this.driver, By.css('form[action="/signup"] [data-qa="signup-name"]'), account.name);
    await type(this.driver, By.css('form[action="/signup"] [data-qa="signup-email"]'), account.email);
  }

  async expectSignupIdentity(account) {
    const nameInput = await visible(this.driver, By.css('form[action="/signup"] [data-qa="signup-name"]'));
    const emailInput = await visible(this.driver, By.css('form[action="/signup"] [data-qa="signup-email"]'));

    assert.equal(await nameInput.getAttribute('value'), account.name);
    assert.equal(await emailInput.getAttribute('value'), account.email);
  }

  async waitForCsrfCookie() {
    await this.driver.wait(async () => {
      const cookies = await this.driver.manage().getCookies();
      return cookies.some((cookie) => cookie.name === 'csrftoken');
    }, 10000);
  }
}

module.exports = {
  AuthPage
};
