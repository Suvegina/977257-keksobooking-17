'use strict';

(function () {
  var filterType = document.querySelector('#housing-type');

  // Функция, которая получает массив пинов и генерирует из тех же пинов новый массив отфильтрованный по значениям фильтра
  var filterPins = function (pins) {
    var filterValue = filterType.value;
    // метод создает новый массив на основе условия, если оно верное - то элемент добавляется в новый массив,
    // если нет - то он просто пропускает
    var filteredPins = pins.filter(function (pin) {
      return (filterValue === 'any' || filterValue === pin.offer.type);
    });
    return filteredPins;
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
