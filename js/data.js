'use strict'; // data.js - модуль, который создаёт данные

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

  // добавляем адрес отправки формы
  form.action = 'https://js.dump.academy/keksobooking';
}) ();
