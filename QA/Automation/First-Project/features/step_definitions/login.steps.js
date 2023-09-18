const { Given, When, Then, After } = require('cucumber'); 
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
  const buttonSelector = `button=${buttonText}`;
  await browser.setTimeout({ pageLoad: 20000 });
  await browser.click(buttonSelector);

  // Добавляем ожидание видимости элемента с ошибкой
  const errorSelector = `//*[contains(text(),'Epic sadface: Username is required')]`;
  await browser.waitUntil(async () => {
    const errorElement = await browser.$(errorSelector);
    return await errorElement.isDisplayed();
  }, {
    timeout: 10000,
    timeoutMsg: 'Error message not found.'
  });
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
