'use strict';

var pins = [];
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var mapPin = document.querySelector('.map__pins');
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

var map = document.querySelector('.map');
var currentPin = document.querySelector('.map__pin--main');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Находим случайный индекс массива
// Для рандомного подбора параметров 'offerTypes'
var getRandomItem = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

// Находим случайное число для координат
var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max - min + 1);
  rand = Math.round(rand);

  return rand;
}

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

// событие при клике на главную метку пина
var currentPinClickHandler = function () {
  map.classList.remove('map--faded');
  renderButton();
  form.classList.remove('ad-form--disabled');
  disableFormControl();
  currentPin.removeEventListener('click', currentPinClickHandler);
};

currentPin.addEventListener('click', currentPinClickHandler);

// событие при клике на главную метку пина
var getCoordinatePin = function () {
  var x = currentPin.style.left.replace('px', '');
  var y = currentPin.style.top.replace('px', '');
  address.value = x + ', ' + y;
};

getCoordinatePin();
currentPin.addEventListener('mouseup', getCoordinatePin);

// currentPin.addEventListener('mouseup', currentPinMouseupHandler);

// циклом задаю недоступность фиелдсетов формы
var enableFormControl = function () {
  for (var j = 0; j < allFieldsetForm.length; j++) {
    allFieldsetForm[j].setAttribute('disabled', '');
  }
};

enableFormControl();

// с помощью функции определяю удаляю добавленные ранее disabled
var disableFormControl = function () {
  for (var i = 0; i < allFieldsetForm.length; i++) {
    allFieldsetForm[i].removeAttribute('disabled');
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

// Ограничения, накладываемые на поля ввода
// Поле «Заголовок объявления»

// Обязательное текстовое поле;
// Минимальная длина — 30 символов;
// Максимальная длина — 100 символов.

