'use strict'; // data.js - модуль, который создаёт данные

(function () {
  // var form = document.querySelector('.ad-form');
  // form.action = 'https://js.dump.academy/keksobooking';

  // Мин и макс. положение location по Y в цикле
  var minRAndomHeight = 130;
  var maxRAndomHeight = 630;
  var MIN_WIDTH = 0;

  // Находим случайный индекс массива
  // Для рандомного подбора параметров 'offerTypes'
  var getRandomItem = function (arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
  };

  // Находим случайное число для координат
  var getRandomNumber = function (min, max) {
    var rand = min + Math.random() * (max - min + 1);
    rand = Math.round(rand);

    return rand;
  };

  // функция для генерации пинов
  var generatePin = function (index) {
    var newPin = {
      author: {
        avatar: 'img/avatars/user0' + (index + 1) + '.png'
      },
      offer: {
        type: getRandomItem(offerTypes)
      },
      location: {
        x: getRandomNumber(MIN_WIDTH, mapPin.offsetWidth),
        y: getRandomNumber(minRAndomHeight, maxRAndomHeight)
      }
    };
    return newPin;
  };

  // создаем область видимости для нескольких объектов
  window.data = {
    generatePin: generatePin,
  };

  // добавляем адрес отправки формы
})();
