const { createDriver } = require('./support/driver');
const { ContactPage } = require('./pages/contact-page');

describe('Automation Exercise contact form', function () {
  let driver;
  let contactPage;

  beforeEach(async function () {
    driver = await createDriver();
    contactPage = new ContactPage(driver);
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('submits a contact message successfully', async function () {
    await contactPage.goto();
    await contactPage.submitMessage({
      name: 'Exploring World Test',
      email: `exploringworld678+contact-${Date.now()}@gmail.com`,
      subject: 'Selenium JavaScript contact test',
      message: 'This is an automated contact form smoke test.'
    });

    await contactPage.expectSubmissionSuccess();
    await contactPage.returnHome();
  });
});
