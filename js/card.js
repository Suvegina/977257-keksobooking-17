'use strict'; // card.js — модуль, который отвечает за создание карточки объявлений;

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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
    card.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    card.querySelector('.popup__description').textContent = pin.offer.description;
    card.querySelector('.popup__avatar').src = pin.author.avatar;
    photoPreview(card, pin.offer.photos);
    renderFeatures(card, pin.offer.features);
    document.querySelector('.map').appendChild(card);
  };

  // popup__photos - выводить через цикл клонируя img (используя cloneNode) и appendChild после этого.
  var photoPreview = function (card, photos) {
    var popupPhotos = card.querySelector('.popup__photos');
    var imgTemplate = popupPhotos.querySelector('img');
    for (var i = 0; i < photos.length; i++) {
      var cloneImg = imgTemplate.cloneNode(true);
      cloneImg.src = photos[i];
      popupPhotos.appendChild(cloneImg);
    }
    imgTemplate.remove();
  };

  // Первый цикл - (перебор по тегам)
  // Вторым циклом - для каждого тега обходим все имеющихся удобств апартаментов.
  // Ищем совпадения тега и удобства по классу. Если нет совпадения - то удаляем.
  var renderFeatures = function (card, pinFutures) {

    var features = card.querySelector('.popup__features').children;

    for (var i = 0; i < features.length; i++) {
      // features[i]; // i-ый элемент массива
      var isShow = false;

      for (var j = 0; j < pinFutures.length; j++) {
      // pinFutures[j]; // j-ый элемент массива

        if (features[i].classList.contains('popup__feature--' + pinFutures[j])) {
          isShow = true;
        }
      }

      if (!isShow) {
        features[i].remove();
      }
    }
  }; // Переписать код на цикл .every, .some, .forEach (48 - 66 строки)

  window.card = {
    render: renderCard
  };
})();
