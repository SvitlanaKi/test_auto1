/** @format */

import { expect } from "chai";
import { WebDriver } from "webdriverio";

// Конфігурація WebDriverIO
const options = {
  capabilities: {
    browserName: "chrome",
  },
};
const cartButton = await driver.$(".shopping_cart_link");
//Тест 1
(async () => {
  const driver = await new WebDriver(options);

  // Кроки перед тестуванням
  await driver.url("https://www.saucedemo.com"); // Перейти на сторінку входу

  // Кроки тест-кейсу
  await driver.setValue('[data-test="username"]', "standard_user"); // Ввести логін
  await driver.setValue('[data-test="password"]', "secret_sauce"); // Ввести пароль

  const loginButton = await driver.$("#login-button");
  await loginButton.click(); // Клацнути кнопку "Login"

  // Перевірка очікуваних результатів
  expect(await driver.getUrl()).to.equal(
    "https://www.saucedemo.com/inventory.html"
  ); // Перевірити URL на сторінці інвентарю

  // Додаткова перевірка можливого вмісту сторінки (наприклад, наявність товарів та кошика)
  const inventoryTitle = await driver.$(".title");
  expect(await inventoryTitle.getText()).to.equal("Products"); // Перевірити наявність заголовку "Products"

  // Завершення тесту
  await driver.deleteSession();
})();

//Тест 2
(async () => {
  // Перейти на сторінку входу
  await driver.url("https://www.saucedemo.com");

  // Ввести логін (ви можете використовувати той самий елемент)
  await driver.setValue('[data-test="username"]', "standard_user");

  // Ввести невірний пароль (за вашим сценарієм - будь-яке значення)
  await driver.setValue('[data-test="password"]', "invalid_password");

  // Клацнути кнопку "Login"
  const loginButton = await driver.$("#login-button");
  await loginButton.click();

  // Перевірити очікуваний результат
  const errorIcon = await driver.$(".error-icon");
  const loginField = await driver.$('[data-test="username"]');
  const passwordField = await driver.$('[data-test="password"]');
  const errorMessage = await driver.$(".error-message");

  expect(await errorIcon.isDisplayed()).to.be.true; // Перевірити, чи відображається іконка помилки
  expect(await loginField.getCSSProperty("border-color")).to.equal(
    "rgb(255, 0, 0)"
  ); // Перевірити колір рамки логін-поля
  expect(await passwordField.getCSSProperty("border-color")).to.equal(
    "rgb(255, 0, 0)"
  ); // Перевірити колір рамки поля пароля
  expect(await errorMessage.getText()).to.equal(
    "Epic sadface: Username and password do not match any user in this service"
  ); // Перевірити текст помилки
})();

//Тест 3
(async () => {
  // Перейти на сторінку входу
  await driver.url("https://www.saucedemo.com");

  // Ввести невірний логін (за вашим сценарієм - будь-яке невірне значення)
  await driver.setValue('[data-test="username"]', "invalid_user");

  // Ввести дійсний пароль (ви можете використовувати той самий елемент)
  await driver.setValue('[data-test="password"]', "secret_sauce");

  // Клацнути кнопку "Login"
  const loginButton = await driver.$("#login-button");
  await loginButton.click();

  // Перевірити очікуваний результат
  const errorIcon = await driver.$(".error-icon");
  const loginField = await driver.$('[data-test="username"]');
  const passwordField = await driver.$('[data-test="password"]');
  const errorMessage = await driver.$(".error-message");

  expect(await errorIcon.isDisplayed()).to.be.true; // Перевірити, чи відображається іконка помилки
  expect(await loginField.getCSSProperty("border-color")).to.equal(
    "rgb(255, 0, 0)"
  ); // Перевірити колір рамки логін-поля
  expect(await passwordField.getCSSProperty("border-color")).to.equal(
    "rgb(255, 0, 0)"
  ); // Перевірити колір рамки поля пароля
  expect(await errorMessage.getText()).to.equal(
    "Epic sadface: Username and password do not match any user in this service"
  ); // Перевірити текст помилки
})();

//Тест 4
(async () => {
  // Перейти на сторінку входу
  await driver.url("https://www.saucedemo.com");

  // Ввести дійсний логін і пароль (якщо ви не вийшли з облікового запису в попередньому тесті)
  await driver.setValue('[data-test="username"]', "standard_user");
  await driver.setValue('[data-test="password"]', "secret_sauce");
  const loginButton = await driver.$("#login-button");
  await loginButton.click();

  // Клацнути на бургер-меню
  const menuButton = await driver.$(".bm-burger-button");
  await menuButton.click();

  // Перевірити, чи відображається меню та кількість пунктів меню
  const menu = await driver.$(".bm-menu-wrap");
  const menuItems = await menu.$$(".bm-item");

  expect(await menu.isDisplayed()).to.be.true; // Перевірити, чи відображається меню
  expect(menuItems.length).to.equal(4); // Перевірити кількість пунктів меню

  // Клацнути кнопку "Logout"
  const logoutButton = await driver.$("#logout_sidebar_link");
  await logoutButton.click();

  // Перевірити, чи користувач перенаправлений на сторінку входу і поля "Username" та "Password" порожні
  const loginPage = await driver.$('[data-test="login-button"]');
  const usernameField = await driver.$('[data-test="username"]');
  const passwordField = await driver.$('[data-test="password"]');

  expect(await loginPage.isDisplayed()).to.be.true; // Перевірити, чи знову відображається сторінка входу
  expect(await usernameField.getValue()).to.equal(""); // Перевірити, чи поле "Username" порожнє
  expect(await passwordField.getValue()).to.equal(""); // Перевірити, чи поле "Password" порожнє
})();

//Тест 5
(async () => {
  // Перейти на сторінку входу
  await driver.url("https://www.saucedemo.com");

  // Ввести дійсний логін і пароль (якщо ви не вийшли з облікового запису в попередньому тесті)
  await driver.setValue('[data-test="username"]', "standard_user");
  await driver.setValue('[data-test="password"]', "secret_sauce");
  const loginButton = await driver.$("#login-button");
  await loginButton.click();

  // Додати продукт до кошика
  const addToCartButton = await driver.$(".btn_inventory");
  await addToCartButton.click();

  // Перевірити, чи збільшилася кількість продуктів у кошику
  const cartItemCount = await driver.$(".shopping_cart_badge");
  expect(await cartItemCount.getText()).to.equal("1");

  // Клацнути на бургер-меню
  const menuButton = await driver.$(".bm-burger-button");
  await menuButton.click();

  // Клацнути кнопку "Logout"
  const logoutButton = await driver.$("#logout_sidebar_link");
  await logoutButton.click();

  // Перейти на сторінку входу
  await driver.url("https://www.saucedemo.com");

  // Ввести той самий логін і пароль ще раз
  await driver.setValue('[data-test="username"]', "standard_user");
  await driver.setValue('[data-test="password"]', "secret_sauce");
  const loginButton2 = await driver.$("#login-button");
  await loginButton2.click();

  // Перевірити, чи користувач перенаправлений на сторінку інвентарю і чи відображаються продукти та кошик
  const inventoryPage = await driver.$(".inventory_container");
  const cartItemCount2 = await driver.$(".shopping_cart_badge");

  expect(await inventoryPage.isDisplayed()).to.be.true;
  expect(await cartItemCount2.getText()).to.equal("1"); // Перевірити, чи продукти та кошик відображаються
})();

//Тест 6
// Перейти на сторінку інвентарю (перевірте, чи користувач вже ввійшов в систему)
await driver.url("https://www.saucedemo.com/inventory.html");

// Опції сортування
const sortingOptions = ["az", "za", "lohi", "hilo"];

for (const option of sortingOptions) {
  // Оберіть одну з опцій сортування
  const sortDropdown = await driver.$(".product_sort_container");
  await sortDropdown.selectByValue(option);

  // Отримайте список продуктів
  const productNames = await driver.$$(".inventory_item_name");

  // Перевірте, чи продукти відсортовані за вибраною опцією
  const sortedProductNames = await Promise.all(
    productNames.map(async (productName) => {
      return await productName.getText();
    })
  );

  if (option === "az") {
    // Перевірка сортування за іменем (A до Z)
    expect(sortedProductNames).to.deep.equal(sortedProductNames.slice().sort());
  } else if (option === "za") {
    // Перевірка сортування за іменем (Z до A)
    expect(sortedProductNames).to.deep.equal(
      sortedProductNames.slice().sort().reverse()
    );
  } else if (option === "lohi") {
    // Перевірка сортування за ціною (низька до висока)
    const productPrices = await driver.$$(".inventory_item_price");
    const sortedProductPrices = await Promise.all(
      productPrices.map(async (productPrice) => {
        return parseFloat(await productPrice.getText().slice(1)); // Парсимо ціну і видаляємо "$"
      })
    );
    expect(sortedProductPrices).to.deep.equal(
      sortedProductPrices.slice().sort((a, b) => a - b)
    );
  } else if (option === "hilo") {
    // Перевірка сортування за ціною (висока до низька)
    const productPrices = await driver.$$(".inventory_item_price");
    const sortedProductPrices = await Promise.all(
      productPrices.map(async (productPrice) => {
        return parseFloat(await productPrice.getText().slice(1)); // Парсимо ціну і видаляємо "$"
      })
    );
    expect(sortedProductPrices).to.deep.equal(
      sortedProductPrices.slice().sort((a, b) => b - a)
    );
  }
}
//Тест 7
// Перейти на сторінку інвентарю (перевірте, чи користувач вже ввійшов в систему)
await driver.url("https://www.saucedemo.com/inventory.html");

// Отримати всі посилання з підвалу
const footerLinks = await driver.$$(".footer_social_icons a");

// Отримати URL-адреси для кожного посилання
const twitterLink = await footerLinks[0].getAttribute("href");
const facebookLink = await footerLinks[1].getAttribute("href");
const linkedinLink = await footerLinks[2].getAttribute("href");

// Клацнути на Twitter посилання
await footerLinks[0].click();

// Отримати вікна браузера та переключитися на нове вікно (Twitter)
const windowHandles = await driver.getWindowHandles();
await driver.switchToWindow(windowHandles[1]);

// Перевірити, чи відкрилася Twitter сторінка
expect(await driver.getUrl()).to.equal(twitterLink);

// Закрити вкладку Twitter і повернутися на основну сторінку
await driver.closeWindow();
await driver.switchToWindow(windowHandles[0]);

// Повторити для Facebook та Linkedin посилань
// Клацнути на Facebook посилання
await footerLinks[1].click();

// Отримати вікна браузера та переключитися на нове вікно (Facebook)
const windowHandlesFacebook = await driver.getWindowHandles();
await driver.switchToWindow(windowHandlesFacebook[1]);

// Перевірити, чи відкрилася Facebook сторінка
expect(await driver.getUrl()).to.equal(facebookLink);

// Закрити вкладку Facebook і повернутися на основну сторінку
await driver.closeWindow();
await driver.switchToWindow(windowHandles[0]);

// Клацнути на Linkedin посилання
await footerLinks[2].click();

// Отримати вікна браузера та переключитися на нове вікно (Linkedin)
const windowHandlesLinkedin = await driver.getWindowHandles();
await driver.switchToWindow(windowHandlesLinkedin[1]);

// Перевірити, чи відкрилася Linkedin сторінка
expect(await driver.getUrl()).to.equal(linkedinLink);

// Закрити вкладку Linkedin і повернутися на основну сторінку
await driver.closeWindow();
await driver.switchToWindow(windowHandles[0]);

//Тест 8
// Перейти на сторінку інвентарю (перевірте, чи користувач вже ввійшов в систему)
await driver.url("https://www.saucedemo.com/inventory.html");

// Клацнути на кнопку "Add to cart" біля будь-якого продукту
const addToCartButton = await driver.$(".btn_primary");
await addToCartButton.click();

// Переконатися, що кількість товарів у кошику збільшилася на 1
const cartItemCount = await driver.$(".shopping_cart_badge");
expect(await cartItemCount.getText()).to.equal("1");

// Клацнути на кнопку "Cart" у верхньому правому куті
await cartButton.click();

// Переконатися, що користувач перенаправлений на сторінку кошика
expect(await driver.getUrl()).to.include("/cart.html");

// Клацнути на кнопку "Checkout"
const checkoutButton = await driver.$(".btn_action.checkout_button");
await checkoutButton.click();

// Переконатися, що користувач перенаправлений на сторінку оформлення замовлення
expect(await driver.getUrl()).to.include("/checkout-step-one.html");

// Заповнити поле "First Name" і "Last Name" з випадковими значеннями
const firstNameField = await driver.$('[data-test="firstName"]');
await firstNameField.setValue("Any random First Name");
const lastNameField = await driver.$('[data-test="lastName"]');
await lastNameField.setValue("Any random Last Name");

// Заповнити поле "Postal Code" з випадковими значеннями
const postalCodeField = await driver.$('[data-test="postalCode"]');
await postalCodeField.setValue("Any random Postal Code");

// Клацнути на кнопку "Continue"
const continueButton = await driver.$(".btn_primary.cart_button");
await continueButton.click();

// Переконатися, що користувач перенаправлений на сторінку огляду замовлення
expect(await driver.getUrl()).to.include("/checkout-step-two.html");

// Клацнути на кнопку "Finish"
const finishButton = await driver.$(".btn_action.cart_button");
await finishButton.click();

// Переконатися, що користувач перенаправлений на сторінку підтвердження замовлення
expect(await driver.getUrl()).to.include("/checkout-complete.html");

// Перевірити, що виведено повідомлення "Thank you for your order!"
expect(await driver.getText(".complete-header")).to.equal(
  "THANK YOU FOR YOUR ORDER!"
);

// Клацнути на кнопку "Back Home" для повернення на сторінку інвентарю
const backHomeButton = await driver.$(".btn_secondary");
await backHomeButton.click();

// Переконатися, що користувач перенаправлений на сторінку інвентарю та кошик порожній
expect(await driver.getUrl()).to.include("/inventory.html");
expect(await cartItemCount.isDisplayed()).to.be.false;

//Тест 9
// Перейти на сторінку інвентарю (перевірте, чи користувач вже ввійшов в систему)
await driver.url("https://www.saucedemo.com/inventory.html");

// Клацнути на кнопку "Cart" у верхньому правому куті
await cartButton.click();

// Переконатися, що користувач перенаправлений на сторінку кошика
expect(await driver.getUrl()).to.include("/cart.html");

// Клацнути на кнопку "Checkout"
await checkoutButton.click();

// Переконатися, що користувач залишився на сторінці кошика та виведено повідомлення "Cart is empty"
expect(await driver.getUrl()).to.include("/cart.html");
expect(await driver.getText(".cart_list .subheader")).to.equal(
  "Your Cart is Empty"
);
