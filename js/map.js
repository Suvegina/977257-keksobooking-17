'use strict';

// map.js — модуль, который управляет карточками объявлений и пинами:
// добавляет на страницу нужную карточку, отрисовывает пины и осуществляет
// взаимодействие карточки и метки на карте;


// перемещение метки, события на главной метке.
(function () {

  // задаю начальное положение пина
  var MAIN_PIN_POSITION_X = 570;
  var MAIN_PIN_POSITION_Y = 375;

  // Обозначаем константы координат для области перетаскивания пина
  var START_COORDINATE_Y = 130;
  var END_COORDINATE_Y = 630;
  var START_COORDINATE_X = 0;
  var END_COORDINATE_X = 1137;

  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var currentPin = map.querySelector('.map__pin--main');
  var allFormFieldsets = form.querySelectorAll('fieldset');
  var filtersElements = document.querySelector('.map__filters').children;
  // var dragged = false;


  var setDefaulMainPinPosition = function () {
    currentPin.style.left = MAIN_PIN_POSITION_X + 'px';
    currentPin.style.top = MAIN_PIN_POSITION_Y + 'px';
    window.form.setDefaultAddress();
  };

  window.form.setDefaultAddress();

  currentPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    var currentPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      // dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // При каждом движении мыши нам нужно обновлять
      // смещение относительно первоначальной точки, чтобы диалог
      // смещался на необходимую величину.

      var newY = currentPin.offsetTop - shift.y;
      // задаем условие, при котором метка не будет выходить за области экрана по Y
      if (newY >= START_COORDINATE_Y - window.form.PIN_POSITION_Y && newY <= END_COORDINATE_Y - window.form.PIN_POSITION_Y) {
        currentPin.style.top = (currentPin.offsetTop - shift.y) + 'px';
      }

      var newX = currentPin.offsetLeft - shift.x;
      // задаем условие, при котором метка не будет выходить за области экрана по X
      if (newX > START_COORDINATE_X && newX < END_COORDINATE_X) {
        currentPin.style.left = (currentPin.offsetLeft - shift.x) + 'px';
      }

      window.form.updateAddress();
    };


    var currentPinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', currentPinMouseMoveHandler);
      document.removeEventListener('mouseup', currentPinMouseUpHandler);

      // перемещаю сюда события ранее находящихся при событии клика по главной метке
      // условие <if> помогает отрисовки пинов быть только единожды,
      // и на этом генерация пинов приостанавливается.
      if (map.classList.contains('map--faded')) {
        map.classList.remove('map--faded');
        window.pin.renderButton();
        form.classList.remove('ad-form--disabled');
        // вызываю функции генерации недоступных частей формы
        window.form.setElementDisabled(allFormFieldsets, false);
        window.form.setElementDisabled(filtersElements, false);
        window.form.setPriceMinValue();
      }

      window.form.updateAddress();
    };


    document.addEventListener('mousemove', currentPinMouseMoveHandler);
    document.addEventListener('mouseup', currentPinMouseUpHandler);


    window.map = {
      setDefaulMainPinPosition: setDefaulMainPinPosition
    };
  });
})();
