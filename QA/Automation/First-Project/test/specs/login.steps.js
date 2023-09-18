const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const { remote } = require('webdriverio');

let browser;

Given('User is on the main page of {string}', async function (url) {
  browser = await remote({
    capabilities: {
      browserName: 'chrome',
    },
  });
  await browser.url(url);
});

When('User clicks the {string} button', async function (buttonText) {
  const buttonSelector = `//*[text()='${buttonText}']`;
  await browser.click(buttonSelector);
});

Then('User should see the error message {string}', async function (errorMessage) {
  const errorSelector = `//*[contains(text(),'${errorMessage}')]`;
  const errorElement = await browser.$(errorSelector);
  assert.strictEqual(await errorElement.isDisplayed(), true, `Error message "${errorMessage}" not found.`);
});

After(async function () {
  if (browser) {
    await browser.deleteSession();
  }
});
