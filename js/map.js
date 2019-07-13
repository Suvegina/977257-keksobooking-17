'use strict';

// map.js — модуль, который управляет карточками объявлений и пинами:
// добавляет на страницу нужную карточку, отрисовывает пины и осуществляет
// взаимодействие карточки и метки на карте;


// перемещение метки, события на главной метке.
var movingCurrentPin = function () {

  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var currentPin = map.querySelector('.map__pin--main');
  var allFormFieldsets = form.querySelectorAll('fieldset');
  var filtersElements = document.querySelector('.map__filters').children;


  currentPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // var dragged = false;

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
      if (newY > 130 && newY < 630) {
        currentPin.style.top = (currentPin.offsetTop - shift.y) + 'px';
      }

      var newX = currentPin.offsetLeft - shift.x;
      // задаем условие, при котором метка не будет выходить за области экрана по X
      if (newX > 10 && newX < 1120) {
        currentPin.style.left = (currentPin.offsetLeft - shift.x) + 'px';
      }
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
        window.form.updateAddress;
      }
    };

    document.addEventListener('mousemove', currentPinMouseMoveHandler);
    document.addEventListener('mouseup', currentPinMouseUpHandler);
  });

  // вызываю функци с синхронизацией адреса (положение главного пина)
  // window.form.updateAddress();
};

movingCurrentPin();
