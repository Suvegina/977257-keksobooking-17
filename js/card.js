'use strict'; // card.js — модуль, который отвечает за создание карточки объявлений;

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var PIN_TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var PIN_PRICE = [];
  var PIN_PHOTOS = [];
  var PIN_DESCRIPTION = [];

  var get= function () {
    for (var i = 0; i < PIN_PHOTOS.length; i++) {
      PIN_PHOTOS[i]
    }
  }

  var renderCard = function (pin) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = pin.offer.title;
    card.querySelector('.popup__text--address').textContent = pin.offer.address;
    card.querySelector('.popup__text--price').textContent = PIN_PRICE[pin.offer.price + '₽/ночь'];
    card.querySelector('.popup__type').textContent = PIN_TYPES[pin.offer.type];
    сard.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    сard.querySelector('.popup__text--time').textContent = 'Заезд после' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    card.querySelector('.popup__description').textContent = PIN_DESCRIPTION[pin.offer.description];
    // ...
    // popup__photos - выводить через цикл клонируя img (используя cloneNode) и appendChild после этого.
    card.querySelector('.popup__photos').;
    document.querySelector('.map').appendChild(card);
  }
  window.card = {
    render: renderCard
  }
}) ();
