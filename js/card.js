'use strict'; // card.js — модуль, который отвечает за создание карточки объявлений;

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var PinTypes = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  // var PIN_TYPES = {
  //   flat: 'Квартира',
  //   bungalo: 'Бунгало',
  //   house: 'Дом',
  //   palace: 'Дворец'
  // };

  // Заполняем карточку данными с сервера
  var renderCard = function (pin) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = pin.offer.title;
    card.querySelector('.popup__text--address').textContent = pin.offer.address;
    card.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = PinTypes[pin.offer.type];
    // card.querySelector('.popup__type').textContent = /*PIN_TYPES[*/pin.offer.type/*]*/;
    card.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    card.querySelector('.popup__description').textContent = pin.offer.description;
    card.querySelector('.popup__avatar').src = pin.author.avatar;


    photoPreview(card, pin.offer.photos);
    renderFeatures(card, pin.offer.features);

    document.querySelector('.map').appendChild(card);

    // определяю коллбэк функцию для удаления карточки после клика на закрытие
    var removeCard = function () {
      card.remove();
    };

    var closeCard = card.querySelector('.popup__close');
    closeCard.addEventListener('click', removeCard);

    // добавляю события на нажание клавиши ESC
    var escKeydownHandler = function (evt) {
      window.util.isEscEvent(evt, removeCard);
      document.removeEventListener('keydown', escKeydownHandler);
    };

    document.addEventListener('keydown', escKeydownHandler);
  };

  // popup__photos - выводить через цикл клонируя img (используя cloneNode) и appendChild после этого.
  var photoPreview = function (card, photos) {
    var popupPhotos = card.querySelector('.popup__photos');
    var imgTemplate = popupPhotos.querySelector('img');

    photos.forEach(function (photo) {
      var cloneImg = imgTemplate.cloneNode(true);
      cloneImg.src = photo;
      popupPhotos.appendChild(cloneImg);
    });

    imgTemplate.remove();
  };

  // удаляем карточку
  var deleteCard = function () {
    var selectCard = document.querySelector('.map__card');
    if (selectCard) {
      selectCard.remove();
    }
  };

  // Для каждого тега обходим все имеющихся удобств апартаментов.
  // Ищем совпадения тега и удобства по классу. Если нет совпадения - то удаляем.
  var renderFeatures = function (card, pinFutures) {

    // обращаемся к методу from который находится в пространстве имён Array,
    // чтобы получить массив из коллекции children
    var features = Array.from(card.querySelector('.popup__features').children);

    features.forEach(function (feature) {
      var isShow = pinFutures.some(function (pinFuture) {
        return feature.classList.contains('popup__feature--' + pinFuture);
      });

      if (!isShow) {
        feature.remove();
      }
    });
  };

  window.card = {
    render: renderCard,
    delete: deleteCard
  };
})();
