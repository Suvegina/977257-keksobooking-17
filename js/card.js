'use strict'; // card.js — модуль, который отвечает за создание карточки объявлений;

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var PIN_PRICE = {

  };

  var PIN_TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var renderCard = function (pin) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = pin.offer.title;
    card.querySelector('.popup__text--address').textContent = pin.offer.address;
    card.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = PIN_TYPES[pin.offer.type];
    // popup__photos - выводить через цикл клонируя img (используя cloneNode) и appendChild после этого.
    document.querySelector('.map').appendChild(card);
  }
  window.card = {
    render: renderCard
  }
}) ();
