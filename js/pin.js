'use strict';

// pin.js — модуль, который отвечает за создание пина
// — метки на карте;

(function () {

  var pins = [];
  var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
  var mapPin = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var MIN_WIDTH = 0;
  // Проверка размера ширины окна (класса)
  // var MAX_WIDTH = mapPin.offsetWidth;

  // Мин и макс. положение location по Y в цикле
  var minRAndomHeight = 130;
  var maxRAndomHeight = 630;

  // смещение пинов относительно нужной метки
  var PIN_POSITION_X = 20;
  var PIN_POSITION_Y = 62;

  var form = document.querySelector('.ad-form');
  var allFormFieldsets = form.querySelectorAll('fieldset');
  var address = document.querySelector('#address');

  var filtersElements = document.querySelector('.map__filters').children;
  // var filtersChild = filters.children;

  var map = document.querySelector('.map');
  var currentPin = document.querySelector('.map__pin--main');

  var buildingType = form.querySelector('#type');
  var nightSelect = form.querySelector('#price');

  // определяем нахождение полей select по id-шникам
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');


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
})();
