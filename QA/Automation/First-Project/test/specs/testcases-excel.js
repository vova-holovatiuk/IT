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