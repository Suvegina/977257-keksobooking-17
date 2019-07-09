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
var allFieldsetForm = form.querySelectorAll('fieldset');
var address = document.querySelector('#address');

var filters = document.querySelector('.map__filters');
var filtersChild = filters.children;

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

(function () {

  var map = document.querySelector('.map');
  var currentPinHandler = map.querySelector('.map__pin--main');
  // var currentPin = map.querySelector('.map__pin--main');

  currentPinHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };    

    var dragged = false;

    var currentPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

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
      map.style.top = (map.offsetTop - shift.y) + 'px';
      map.style.left = (map.offsetLeft - shift.x) + 'px';
    };

    var currentPinMouseUpHandler = function(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', currentPinMouseMoveHandler);
      document.removeEventListener('mouseup', currentPinMouseUpHandler);
      
      if (dragged) {
        var preventDefaultClickHandler = function (evt) {
          evt.preventDefault();
          currentPinHandler.removeEventListener('click', preventDefaultClickHandler);
          currentPinHandler.addEventListener('click', preventDefaultClickHandler)

          // перемещаю сюда события ранее находящихся при событии клика по главной метке
          map.classList.remove('map--faded');
          renderButton();
          form.classList.remove('ad-form--disabled');
          disableFormControl();
          disableFiltersControl();
          currentPinHandler.removeEventListener('mousedown', currentPinHandler);
          currentPinHandler.addEventListener('click', currentPinHandler);
        };
      }
    };

    document.addEventListener('mousemove', currentPinMouseMoveHandler);
    document.addEventListener('mouseup', currentPinMouseUpHandler);
  });
  // currentPin.addEventListener('mousedown', currentPinMouseDownHandler);
});

// ------------------------------------------------------------------------------------------

// событие при клике на главную метку пина
var getCoordinatePin = function () {
  var x = currentPin.style.left.replace('px', '');
  var y = currentPin.style.top.replace('px', '');
  address.value = x + ', ' + y;
};

getCoordinatePin();
currentPin.addEventListener('mouseup', getCoordinatePin);


// циклом задаю недоступность фиелдсетов формы
var enableFormControl = function () {
  for (var j = 0; j < allFieldsetForm.length; j++) {
    allFieldsetForm[j].disabled = 'disabled';
  }
};

enableFormControl();

// с помощью функции определяю удаляю добавленные ранее disabled
var disableFormControl = function () {
  for (var i = 0; i < allFieldsetForm.length; i++) {
    allFieldsetForm[i].disabled = '';
  }
};

// тоже самое проделываю с фильтрами
var enableFiltersControl = function () {
  for (var j = 0; j < filtersChild.length; j++) {
    filtersChild[j].disabled = 'disabled';
  }
};

enableFiltersControl();

var disableFiltersControl = function () {
  for (var i = 0; i < filtersChild.length; i++) {
    filtersChild[i].disabled = '';
  }
};

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

