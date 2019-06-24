'use strict';

var pins = [];
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
// var coordinateMap = document.querySelector('.map').offsetWidth;

// console.log('.map');

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
      avatar: 'img/avatars/user0' + i + '.png'
    },
    offer: {
      type: getRandomItem(offerTypes)
    },
    location: {
      x: getRandomNumber(0, 1200),
      y: getRandomNumber(130, 630)
    }
  };

  pins.push(pin);
}

// var renderMapPins = function(mapPins) {
//   var pinMapping = document.querySelectorAll('.map__pin');
// }

// Это временное решение,
// этот класс переключает карту из неактивного состояния в активное.
var map = document.querySelector('.map');
map.classList.remove('map--faded');
