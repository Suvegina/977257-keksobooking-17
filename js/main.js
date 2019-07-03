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

// Находим случайный индекс массива
// Для рандомного подбора параметров 'offerTypes'
function getRandomItem(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

// Находим случайное число для координат
function getRandomNumber(min, max) {
  var rand = min + Math.random() * (max - min + 1);
  rand = Math.round(rand);

  return rand;
}

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

function makeButton(pin) {
  var element = pinTemplate.cloneNode(true);
  element.style.left = pin.location.x - PIN_POSITION_X + 'px';
  element.style.top = pin.location.y - PIN_POSITION_Y + 'px';
  element.querySelector('img').src = pin.author.avatar;

  return element;
}

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

// функция циклической генерации пинов
var renderButton = function () {
  for (var i = 0; i < 8; i++) {
    var pin = generatePin(i);

    mapPin.appendChild(makeButton(pin));
    pins.push(pin);
  }
};


/* Временное ТЗ

Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled,
добавленного на них или на их родительские блоки fieldset;
Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form;
Единственное доступное действие в неактивном состоянии — перетаскивание метки
.map__pin--main, являющейся контролом указания адреса объявления.
Первое перемещение метки переводит страницу в активное состояние.
*/

var map = document.querySelector ('.map');

// событие при клике на главную метку пина
var mapClickHandler = function () {
  map.classList.remove('map--faded');
  renderButton();
  mainForm.classList.remove('ad-form--disabled');
  disableFormControl();
  map.removeEventListener('click', mapClickHandler);
};

map.addEventListener('click', mapClickHandler);


var form = document.querySelector('.ad-form');
var allFieldsetForm = form.querySelectorAll('fieldset');

// добавляю всем полям не активное состояние

// var disableFormControl = function (state) {
//   allFieldsetForm.forEach(function(el) {
//     el.disabled = state;
//   });
// };

// циклом задаю недоступность фиелдсетов формы
var enableFormControl = function () {
  for (var j = 0; j <= allFieldsetForm.length; j++) {
    allFieldsetForm.disabled = true;
  };
  return allFieldsetForm[j];
};

// с помощью функции определяю удаление недоступности фиелдсетов в форме
var disableFormControl = function () {
  for (var i = 0; i <= allFieldsetForm.length; i++) {
  allFieldsetForm[i].disabled = false;
  };
};

// сама форма заполнения информации об объявлении;
// Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled,
// добавленного на них или на их родительские блоки fieldset;
// Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form;
// Единственное доступное действие в неактивном состоянии — перетаскивание метки
// .map__pin--main, являющейся контролом указания адреса объявления.
// Первое перемещение метки переводит страницу в активное состояние.

// var inputForm = mainForm.querySelectorAll('input');
// var selectForm = mainForm.querySelectorAll('select');

// inputForm.disabled = true;
// selectForm.disabled = true;

// сделать рабочеспособный код
// ----------------------------------------------------------------

// var employlementsForm = function() {
//   inputForm.classList.remove('disabled');
//   selectForm.classList.remove('disabled');
// };


var currentPin = document.querySelector('.map__pin map__pin--main');
var address = document.querySelector('#address');
// у нас будет срабатывать событие mouseup на главную метку после загрузки страницы
// var pinMouseupHandler = function () {
// };


// и мы должны определить координаты главного пина и
// установить адрес в форме например "100, 300"

// это инпут - там просто строка в нужном формате
