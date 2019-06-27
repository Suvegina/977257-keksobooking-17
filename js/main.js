'use strict';

var pins = [];
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var mapPin = document.querySelector('.map__pins');
var MIN_WIDTH = 0;
// Проверка размера ширины окна (класса)
var MAX_WIDTH = mapPin.offsetWidth;
// Мин и макс. положение location по Y в цикле
var minRAndomHeight = 130;
var maxRAndomHeight = 630;



function getRandomItem(arr) {
  var index = Math.floor(Math.random() * arr.length); // Случайный индекс массива
  return arr[index];
}

function getRandomNumber(min, max) {
  // на основе предыдущей функции нужно сделать  вычисление со 130 до 630
  // и подобием сделать с объектом location внутри цикла
  var rand = min + Math.random() * (max - min + 1);
  rand = Math.round(rand);

  return rand;
}

for (var i = 0; i < 8; i++) {
  var pin = {
    author: {
      avatar: 'img/avatars/user0' + (i+1) + '.png'
    },
    offer: {
      type: getRandomItem(offerTypes)
    },
    location: {
      x: getRandomNumber(MIN_WIDTH, MAX_WIDTH),
      y: getRandomNumber(minRAndomHeight, maxRAndomHeight)
    }
  };

  mapPin.appendChild(makeButton(pin));
  // console.log(pin);
  pins.push(pin);
}

function makeButton (pin) {
  var element = document.createElement('button');
  element.classList.add('map__pin', 'map__pin--main');
  element.style.left = pin.location.x - 20 + 'px';
  // Нужно убрать свойство border на пине
  // Так же нужно переопределить цвет элемента :before 
  // и перерасчитать его положение на карте
  element.style.top = pin.location.y - 66 + 'px';
  element.appendChild(makeImg(pin.author.avatar));

  return element;
};

function makeImg (src) {
  var element = document.createElement('img');
  element.src = src;
  element.alt = 'Метка объявления';
  element.width = 40;
  element.height = 44;
  element.draggable = false;
  return element;
};

/*

<button class="map__pin map__pin--main" style="left: 570px; top: 375px;">
    <img src="img/muffin-red.svg" width="40" height="44" draggable="false" alt="Метка объявления">
    <svg viewBox="0 0 70 70" width="156" height="156" aria-label="Метка для поиска жилья">
      <defs>
        <path d="M35,35m-23,0a23,23 0 1,1 46,0a23,23 0 1,1 -46,0" id="tophalf" />
      </defs>
      <ellipse cx="35" cy="35" rx="35" ry="35" fill="rgba(255, 86, 53, 0.7)" />
      <text><textPath xlink:href="#tophalf" startOffset="0">Поставь меня куда-нибудь</textPath></text>
    </svg>
  </button>

*/

// var renderMapPins = function(mapPins) {
//   var pinMapping = document.querySelectorAll('.map__pin');
// }

// Это временное решение,
// этот класс переключает карту из неактивного состояния в активное.
var map = document.querySelector('.map');
map.classList.remove('map--faded');
