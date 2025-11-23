// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Инициализируем приложение
tg.expand(); // Раскрываем на весь экран
tg.enableClosingConfirmation(); // Включаем подтверждение закрытия

// Получаем данные пользователя
const user = tg.initDataUnsafe?.user;

// Элементы DOM
const helloButton = document.getElementById("helloButton");
const messageDiv = document.getElementById("message");

// Функция для отображения приветствия
function showGreeting() {
  if (user && user.first_name) {
    const greeting = `Привет, ${user.first_name}!`;
    messageDiv.textContent = greeting;
    messageDiv.style.display = "block";

    // Можно также отправить данные обратно в бота
    tg.sendData(
      JSON.stringify({
        action: "greeting",
        message: greeting,
      })
    );
  } else {
    messageDiv.textContent = "Привет, друг!";
    messageDiv.style.display = "block";
  }
}

// Обработчик клика по кнопке
helloButton.addEventListener("click", showGreeting);

// Обработчик события, когда приложение готово
tg.ready();

// Дополнительные настройки внешнего вида
document.body.style.backgroundColor = tg.themeParams.bg_color || "#ffffff";
