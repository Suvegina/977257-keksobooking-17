'use strict';

// pin.js — модуль, который отвечает за создание пина
// — метки на карте;

(function () {

  // смещение пинов относительно нужной метки
  var PIN_POSITION_X = 20;
  var PIN_POSITION_Y = 62;

  var mapPin = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Проверка размера ширины окна (класса)
  // var MAX_WIDTH = mapPin.offsetWidth;

  // Отрисовывание максимального количества пинов
  var MAX_PINS = 5;

  // функция, с помощью которой мы клонируем элемент из Template шаблона в разметке
  var makeButton = function (pin) {
    var element = pinTemplate.cloneNode(true);
    element.style.left = pin.location.x - PIN_POSITION_X + 'px';
    element.style.top = pin.location.y - PIN_POSITION_Y + 'px';
    element.querySelector('img').src = pin.author.avatar;

    // Навешиваем обработчик на событие клика для удаления карточки при нажатии клавиш ESC
    element.addEventListener('click', function () {
      var oldCard = document.querySelector('.map__card');
      if (oldCard) {
        oldCard.remove();
      }
      window.card.render(pin);
    });

    return element;
  };

  // функция циклического дублирования пинов
  var renderButton = function () {
    // вызываю функци с синхронизацией адреса (положение главного пина)
    window.load(function (pinsData) {
      window.pin.allPins = pinsData;
      var newPins = window.filterPins(window.pin.allPins);
      renderPins(newPins);
    });
  };


  // функция отрисовки пинов
  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();

    pins.slice(0, MAX_PINS).forEach(function (pin) {
      var element = makeButton(pin);
      fragment.appendChild(element);
    });
    mapPin.appendChild(fragment);
  };

  // функция удаления пина (нужна для того, чтобы при клике
  // на поле фильтра "тип жилья" отрисовка пинов сбрасывалась)
  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };


  window.pin = {
    // Если вначале данного модуля (js/pin.js) задать переменную allPins и задать ей массив,
    // то передав её в ГО видимости (allPins: allPins[] - само значение массивов будет переопределяться)
    // Поэтому, передаем обыекты allPins сразу в глобальную область видимости, для того чтобы данный объект не переопределялся.
    allPins: [],
    renderButton: renderButton,
    renderPins: renderPins,
    removePins: removePins
  };
})();
