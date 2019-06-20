'use strict';

var pins = [];
var offerTypes = ["palace", "flat", "house", "bungalo"];

function getRandomItem(arr) {
  var index = Math.floor(Math.random() * arr.length); // Случайный индекс массива
  return arr[index];
}
function getRandomNumber(min, max) {
  // на основе предыдущей функции нужно сделать  вычисление со 130 до 630
  // и подобием сделать с объектом location внутри цикла
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
      x: 200,
      y: getRandomNumber(130,630)
    }
  };

  pins.push(pin);
  // console.log(pins);
}

// console.log(pins);
