'use strict';

// pin.js — модуль, который отвечает за создание пина
// — метки на карте;

(function () {
  // функция, с помощью которой мы клонируем элемент из Template шаблона в разметке
  var makeButton = function (pin) {
    var element = pinTemplate.cloneNode(true);
    element.style.left = pin.location.x - PIN_POSITION_X + 'px';
    element.style.top = pin.location.y - PIN_POSITION_Y + 'px';
    element.querySelector('img').src = pin.author.avatar;

    return element;
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

  // функция циклического дублирования пинов
  var renderButton = function () {
    for (var i = 0; i < 8; i++) {
      var pin = generatePin(i);

      mapPin.appendChild(makeButton(pin));
      pins.push(pin);
    }
  };
}) ();
