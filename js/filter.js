'use strict';

(function () {
  // Определяем диапазон цен от и до ...
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  // находим элемент родителя фильтров, например: (filtersForm)
  // - для того чтобы навесить события на переотрисовку полученных пинов с сервера
  var filtersForm = document.querySelector('.map__filters');

  var filterType = document.querySelector('#housing-type');
  var filterPrice = document.querySelector('#housing-price');
  var filterRooms = document.querySelector('#housing-rooms');
  var filterCapacity = document.querySelector('#housing-guests');
  var filterFeatures = document.querySelector('#housing-features');
  var inputFeatures = filterFeatures.querySelectorAll('input');


  // Функция, которая получает массив пинов и генерирует из тех же пинов новый массив отфильтрованный по значениям фильтра
  window.filterPins = function (pins) {
    var filteredPins = pins.filter(function (pin) {
      return (
        isPinTypeFiltered(pin) &&
        isPinPriceFiltered(pin) &&
        isPinRoomsFiltered(pin) &&
        isPinGuestFiltered(pin) &&
        isPinFeauturesFiltered(pin)
      );
    });
    return filteredPins;
  };

  // функция проверяет значение типа пина
  var isPinTypeFiltered = function (pin) {
    var filterTypeValue = filterType.value;
    return filterTypeValue === 'any' || filterTypeValue === pin.offer.type;
  };

  // ф-я проверяет значение по цене
  var isPinPriceFiltered = function (pin) {
    var filterPriceValue = filterPrice.value;
    return (
      (filterPriceValue === 'any') ||
      (filterPriceValue === 'low' && pin.offer.price < MIN_PRICE) ||
      (filterPriceValue === 'middle' && pin.offer.price > MIN_PRICE && pin.offer.price < MAX_PRICE) ||
      (filterPriceValue === 'high' && pin.offer.price > MAX_PRICE)
    );
  };

  // ф-я проверяет зн-е по количеству комнат
  // для приведения типов (через строку) используем parseInt или знак +
  var isPinRoomsFiltered = function (pin) {
    var filterRoomsValue = filterRooms.value;
    return (
      (filterRoomsValue === 'any') ||
      (parseInt(filterRoomsValue, 10) === pin.offer.rooms)
    );
  };

  // ф-я для проверки количества гостей
  // для приведения типов (через строку) используем parseInt или знак +
  var isPinGuestFiltered = function (pin) {
    var filterCapacityValue = filterCapacity.value;
    return (
      (filterCapacityValue === 'any') ||
      (parseInt(filterCapacityValue, 10) === pin.offer.guests)
    );
  };

    // метод создает новый массив на основе условия, если оно верное - то элемент добавляется в новый массив,
    // если нет - то он просто пропускает
  var isPinFeauturesFiltered = function (pin) {

    // Конструкция every проверяет каждый элемент на условие, возвращает true (если  каждый элемент удовлетворяет условию)
    return Array.from(inputFeatures).every(function (inputFeature) {

      // при инвертировании выражения, меняем знаки
      return !(inputFeature.checked && !pin.offer.features.includes(inputFeature.value));
    });
  };

  // создаю callback функцию с функцией debounce(), в которой помещаю все действия связанные с отрисовкой пинов по выбору фильтрам
  var filterChangeHandler = window.debounce(function () {
    var pins = window.filterPins(window.pin.allPins);
    window.card.delete();
    window.pin.removePins();
    window.pin.renderPins(pins);
  });

  // Вызываю полученную callback функцию (с функцией устранение дребезга ('debounce()')) на событии формы с фильтрами
  filtersForm.addEventListener('change', filterChangeHandler);
})();
