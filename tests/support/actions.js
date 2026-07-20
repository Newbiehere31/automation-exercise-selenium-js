const assert = require('node:assert/strict');
const { By, until } = require('selenium-webdriver');

async function open(driver, path) {
  const baseUrl = 'https://automationexercise.com';
  await driver.get(`${baseUrl}${path}`);
}

async function find(driver, locator, timeout = 15000) {
  return driver.wait(until.elementLocated(locator), timeout);
}

async function visible(driver, locator, timeout = 15000) {
  const element = await find(driver, locator, timeout);
  await driver.wait(until.elementIsVisible(element), timeout);
  return element;
}

async function click(driver, locator) {
  const element = await visible(driver, locator);
  await driver.executeScript('arguments[0].scrollIntoView({ block: "center" });', element);
  await element.click();
}

async function type(driver, locator, value) {
  const element = await visible(driver, locator);
  await element.clear();
  await element.sendKeys(value);
}

async function expectText(driver, text) {
  await visible(driver, By.xpath(`//*[contains(normalize-space(.), "${text}")]`));
}

async function expectUrlContains(driver, text) {
  await driver.wait(async () => (await driver.getCurrentUrl()).includes(text), 15000);
}

async function assertTitleIncludes(driver, text) {
  const title = await driver.getTitle();
  assert.match(title, new RegExp(text, 'i'));
}

module.exports = {
  assertTitleIncludes,
  click,
  expectText,
  expectUrlContains,
  open,
  type,
  visible
};
