'use strict';

// pin.js — модуль, который отвечает за создание пина
// — метки на карте;

(function () {

  // var pins = [];
  var mapPin = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


  // Проверка размера ширины окна (класса)
  // var MAX_WIDTH = mapPin.offsetWidth;

  // смещение пинов относительно нужной метки
  var PIN_POSITION_X = 20;
  var PIN_POSITION_Y = 62;

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
    // вызываю функци с синхронизацией адреса (положение главного пина)
    // window.form.updateAddress();
    window.load(function (pins) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pins.length; i++) {
        fragment.appendChild(makeButton(pins[i]));
      }
      mapPin.appendChild(fragment);
    });
  };

  // window.renderButton = renderButton;
  window.pin = {
    renderButton: renderButton
  };
})();
