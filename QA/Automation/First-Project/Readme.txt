FIRST AUTOMATION PROJECT WITH USING WEBDRIVERIO AND CUCUMBER FRAMEWORK
Briefly:
In GitBash enter command npm install
If you had a problem or error enter command npm install --force
Command for first part test task:
npx wdio wdio.conf.js - This code open browser with your project in test mode with message "Chrome is being controlled by automated test software". A simulation is launched that demonstrates entering a password and login, as well as a logout.
node ./test/specs/testcases-excel.js - a simulation is launched again but you'll seed a site https://www.saucedemo.com where you can using it in automation test mode.
Attention! You'll need Chrome browser!
Second part test task:
Enter command in GitBash npx cucumber-js.


Detailed description
In file "test task" we have test task project.
PART1 
After install Webdriver Io (following the instructions in the test task) we using file "test-cases.xlsx". 
All console command we entering in GitBash.
Next we creating file by command "node ./test/specs/testcases-excel.js".
After creating file we writing code in Sublime Text (or in Visual Studio Code, or in Notepad++).
This code:
const ExcelJS = require('exceljs');
const { remote } = require('webdriverio');

(async () => {
  const browser = await remote({
    capabilities: {
      browserName: 'chrome',
    },
  });
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('test-cases.xlsx');

  for (let sheetNumber = 1; sheetNumber <= 9; sheetNumber++) {
    const sheetName = sheetNumber.toString().padStart(4, '0'); // Преобразуем номер листа в формат "0001", "0002", и так далее
    const worksheet = workbook.getWorksheet(sheetName);

    for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
      const [testCase, action, value] = worksheet.getRow(rowNumber).values;
      console.log(`Лист: ${sheetName}, Тест кейс: ${testCase}, Действие: ${action}, Значение: ${value}`);
      await browser.url('https://www.saucedemo.com'); // Замените на URL вашего веб-приложения
      // Здесь выполняйте действия на веб-странице с использованием WebDriver.io
      // Например, remote(browser, action, value);
      if (action === 'click') {
        await browser.click('#login-button'); // Замените 'your-selector' на CSS или XPath селектор
      } else if (action === 'input') {
        await browser.setValue('#password', value); // Замените 'your-input-selector' на селектор ввода
      }
      // Зарегистрируйте результаты теста в Excel файле, если необходимо
       // worksheet.getCell(`D${rowNumber}`).value = 'Результат теста';
    }

    // Сохраните результаты обратно в Excel файл (если требуется)
     await workbook.xlsx.writeFile('test-cases.xlsx');
  }

  // Завершите сессию WebDriver.io
   // await browser.deleteSession();
})().catch(error => {
  console.error('Произошла ошибка:', error);
});

To debug you should enter command in GitBash npx wdio wdio.conf.js. Attention! You'll need Chrome browser!
This code open browser with your project in test mode with message "Chrome is being controlled by automated test software".
A simulation is launched that demonstrates entering a password and login, as well as a logout.
If you enter in GitBash node ./test/specs/testcases-excel.js - a simulation is launched again 
but you'll seed a site https://www.saucedemo.com where you can using it in automation test mode.

PART2
Project with Cucumber Framework!
Command npm install @wdio/cucumber-framework --save-dev installing Cucumber in your project.
After installing this - open configuration file wdio.conf.js
In chapter framework code should look like this:
framework: ['mocha', 'cucumber'],
reporters: ['spec'],
mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    cucumberOpts: {
        require: ['./path/to/step/definitions']
    },
If it's different fro you - edit the file, look like in the code upper.
After install in GitBash some dependencies for your poject.
For example:
npm install @wdio/local-runner
npm install chai
npm install @babel/core
npm install @babel/preset-env
npm install @babel/register
npm install chai-webdriverio
If you have problems with installing chai-webdriverio use one of this command: npm install chai-webdriverio --force or
npm install chai-webdriverio --save-dev
After all installing you need to have files in root of your project like cucumber.js or cucumber.config.js.
If you don't have them, create them (one of them). And adding this code:
module.exports = {
  // Пути к вашим файлам с определениями шагов (step definitions).
  // Это может быть массив файлов или глобальный путь к папке, содержащей определения шагов.
  // Примеры:
  // - './path/to/step-definitions'
  // - ['./path/to/step-definitions/stepDefinitions.js', './path/to/step-definitions/anotherStepDefinitions.js']
  // - 'features/step_definitions'
  //
  // Убедитесь, что пути соответствуют фактическому расположению ваших определений шагов.
  specs: ['./features/step_definitions'],

  // Другие настройки Cucumber:
  cucumberOpts: {
    // Теги, которые вы хотите использовать для выполнения определенных сценариев.
    // Например, '@smoke' будет выполнен только сценарий с тегом @smoke.
    // Если вы не хотите использовать теги, просто уберите эту настройку.
    // tags: ['@smoke'],

    // Форматы отчетов, которые вы хотите использовать (например, 'pretty', 'json', 'html').
    // Подключайте дополнительные плагины, если необходимо.
    format: ['pretty'],

    // Дополнительные настройки Cucumber, если необходимо.
    // Например, установка таймаута для шагов:
    // timeout: 30000, // в миллисекундах

    // Путь к вашим фича-файлам (по умолчанию, Cucumber будет искать их в './features').
    // Это может быть путь к папке с фича-файлами или массив путей.
    // Пример:
    // featurePaths: ['./features'],
  },
};

Next! Create folder "features" in root of your project. In folder "features" create folder "step_definitions"
In "step_definition" create two file "login.feature" and "login.steps.js"
Code for login.steps.js:
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

Code for login.feature:
Feature: Login Feature

  Scenario: User tries to login with invalid credentials
    Given User is on the main page of "https://www.saucedemo.com"
    When User clicks the "Login" button
    Then User should see the error message "Epic sadface: Username is required"


After all in GitBash in root of your project enter command npx cucumber-js
To opened browser Chrome with site https://www.saucedemo.com in test mode.
Press login without password or incorrect password.
An inscription is visible under the password entry line "Epic sadface: Username is required"

Test task complete!