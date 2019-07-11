'use strict';

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

form.action = 'https://js.dump.academy/keksobooking';

// ------------------------------------------------------------------------------------------

// перемещение метки, события на главной метке.
var movingCurrentPin = function () {

  // var map = document.querySelector('.map');
  // var currentPin = map.querySelector('.map__pin--main');

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
        renderButton();
        form.classList.remove('ad-form--disabled');
        setElementDisabled(allFormFieldsets, false);
        setElementDisabled(filtersElements, false);
        updateAddress();
      }
    };

    document.addEventListener('mousemove', currentPinMouseMoveHandler);
    document.addEventListener('mouseup', currentPinMouseUpHandler);
  });

  //  замена в поле адреса координаты пина. Далее вешаем на событие
  var updateAddress = function () {
    var x = parseInt(currentPin.style.left.replace('px', '')) + PIN_POSITION_X;
    var y = parseInt(currentPin.style.top.replace('px', '')) + PIN_POSITION_Y;
    address.value = x + ', ' + y;
  };

  updateAddress();
  currentPin.addEventListener('mouseup', updateAddress);

  // задаю универсальный цикл для недоступности фиелдсетов на форме / и фильтре
  var setElementDisabled = function (elements, isDisabled) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = isDisabled;
    }
  };

  // определяю универсальную функцию на каждый нужный набор классов
  setElementDisabled(allFormFieldsets, true);
  setElementDisabled(filtersElements, true);
};

movingCurrentPin();
// // На перспективу, рабочий код, для того чтобы изменять положение метки
// // с помощью написания координат в поле input:

// // (Событие change выстреливает при изменение полей формы и передает параметры метки выбранного пина.
// // Событие change отслеживает поля <input>, <textarea> и <select>)
// address.addEventListener('change', function () {
//   // console.log(address.value);
//   var addressValue = address.value.split(',');
//   // console.log(addressValue);
//   currentPin.style.top = addressValue[1] + 'px';
//   currentPin.style.left = addressValue[0] + 'px';
// });

// Поле «Заголовок объявления»
var titleField = form.querySelector('.ad-form__element');

// Ограничения, накладываемые на поле ввода заголовка
titleField.addEventListener('invalid', function () {
  if (titleField.validity.tooShort) {
    titleField.setCustomValidity('Минимальная длина — 30 символов');
  } else if (titleField.validity.tooLong) {
    titleField.setCustomValidity('Максимальная длина — 100 символов');
  } else if (titleField.validity.valueMissing) {
    titleField.setCustomValidity('Обязательное текстовое поле');
  }
});


// находим поле select (выпад. список) по id-шнику
buildingType.addEventListener('change', function (evt) {
  var target = evt.currentTarget;
  var selected = target.selectedOptions[0];
  var minLength = selected.getAttribute('minlength');

  nightSelect.setAttribute('min', minLength);
  nightSelect.setAttribute('placeholder', minLength);
});

nightSelect.addEventListener('change', function (evt) {
  var target = evt.currentTarget;
  var value = target.value;
  if (value > 1000000) {
    evt.preventDefault();
  }
});


// Поля «Время заезда» и «Время выезда» синхронизированы:
// при изменении значения одного поля, во втором выделяется
// соответствующее ему. Например, если время заезда указано «после 14»,
// то время выезда будет равно «до 14» и наоборот.

// Определяем универсальную функцию, которая будет синхронизовать 1-е поле (время заезда) со 2-м полем (время выезда)

var synchronizationDate = function (from, to) {
  for (var i = 0; i < from.children.length; i++) {
    if (from.children[i].selected) {
      for (var j = 0; j < to.children.length; j++) {
        if (from.children[i].value === to.children[j].value) {
          to.children[j].selected = true;
        }
      }
    }
  }
};

// вешаем полученные функции на события отслеживания:
// Сначала вешаю событие на 1-е поле (время заезда)

timeIn.addEventListener('change', function () {
  synchronizationDate(timeIn, timeOut);
});

// Потом вешаю событие на 2-е поле (время выезда)
timeOut.addEventListener('change', function () {
  synchronizationDate(timeOut, timeIn);
});
