'use strict';

// pin.js — модуль, который отвечает за создание пина
// — метки на карте;

(function () {

  var pins = [];
  var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
  var mapPin = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


  // Проверка размера ширины окна (класса)
  // var MAX_WIDTH = mapPin.offsetWidth;

  // смещение пинов относительно нужной метки
  var PIN_POSITION_X = 20;
  var PIN_POSITION_Y = 62;

  var form = document.querySelector('.ad-form');

  // функция, с помощью которой мы клонируем элемент из Template шаблона в разметке
  var makeButton = function (pin) {
    var element = pinTemplate.cloneNode(true);
    element.style.left = pin.location.x - PIN_POSITION_X + 'px';
    element.style.top = pin.location.y - PIN_POSITION_Y + 'px';
    element.querySelector('img').src = pin.author.avatar;

    return element;
  };

  // функция циклического дублирования пинов
  var renderButton = function () {
    for (var i = 0; i < 8; i++) {
      var pin = window.data.generatePin(i);

      mapPin.appendChild(makeButton(pin));
      pins.push(pin);
    }
  };

   window.renderButton = renderButton;
})();
