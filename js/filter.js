'use strict';

(function () {
  var filterType = document.querySelector('#housing-type');
  var filterPrice = document.querySelector('#housing-price');
  var filterRooms = document.querySelector('#housing-rooms');
  var filterCapacity = document.querySelector('#housing-guests');
  var filterFeatures = document.querySelector('#housing-features');
  var inputFeatures = filterFeatures.querySelectorAll('input');

  // Функция, которая получает массив пинов и генерирует из тех же пинов новый массив отфильтрованный по значениям фильтра
  var filterPins = function (pins) {
    var filteredPins = pins.filter(function (pin) {
      return (
        isPinTypeFiltered(pin) &&
        isPinPriceFiltered(pin) &&
        isPinRoomsFiltered(pin) &&
        isPinGuestFiltered(pin) &&
        isPinFeauturesFiltered(pin)
      )
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
      (filterPriceValue === 'low' && pin.offer.price < 10000) ||
      (filterPriceValue === 'middle' && pin.offer.price > 10000 && pin.offer.price < 50000) ||
      (filterPriceValue === 'high' && pin.offer.price > 50000)
    );
  };

  // ф-я проверяет зн-е по количеству комнат
  var isPinRoomsFiltered = function (pin) {
    var filterRoomsValue = filterRooms.value;
    return (
      (filterRoomsValue === 'any') ||
      (filterRoomsValue === pin.offer.rooms)
    );
  };

  // ф-я для проверки количества гостей
  var isPinGuestFiltered = function (pin) {
    var filterCapacityValue = filterCapacity.value;
    return (
      (filterCapacityValue === 'any') ||
      (filterCapacityValue === pin.offer.guests)
    );
  };

    // метод создает новый массив на основе условия, если оно верное - то элемент добавляется в новый массив,
    // если нет - то он просто пропускает
  var isPinFeauturesFiltered = function (pin) {
    for (var i = 0; i < inputFeatures.length; i++) {
      if (inputFeatures[i].checked && !pin.offer.features.includes(inputFeatures[i].value)) {
        return false;
      }
    }
    return true;
  };

  // навешиваем события на отображение пинов по выбранному параметру.
  filterType.addEventListener('change', function () {
    var pins = filterPins(window.pin.allPins);
    window.pin.removePins();
    window.pin.renderPins(pins);
  });

  window.filter = {
    filterPins: filterPins
  };
})();
