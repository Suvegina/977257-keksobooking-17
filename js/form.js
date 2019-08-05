'use strict'; // form.js — модуль, который работает с формой объявления.

(function () {

  // смещение пинов относительно нужной метки
  var PIN_POSITION_X = 32;
  var PIN_POSITION_Y = 87;

  var PIN_DEFAULT_OFFSET_X = 32;
  var PIN_DEFAULT_OFFSET_Y = 32;

  // Определяю максимальное значение для поля "Цена за ночь"
  var MAX_VALUE = 1000000;

  var map = document.querySelector('.map');
  var currentPin = map.querySelector('.map__pin--main');

  var form = document.querySelector('.ad-form');
  var allFormFieldsets = form.querySelectorAll('fieldset');
  var address = document.querySelector('#address');

  // находим поле select (выпад. список: Тип жилья) по id-шнику
  var buildingType = form.querySelector('#type');
  // находим поле 'Цена за ночь'
  var nightSelect = form.querySelector('#price');

  // Поле «Заголовок объявления»
  var titleField = form.querySelector('.ad-form__element');

  // определяем нахождение полей select по id-шникам
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

  var filtersElements = document.querySelector('.map__filters').children;

  // определяем нахождение полей select (количество комнат и гостей)
  var roomSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');


  // текстовое содержание при отправки формы
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var resetForm = document.querySelector('.ad-form__reset');


  // Ограничения, накладываемые на поле ввода заголовка
  titleField.addEventListener('invalid', function () {
    if (titleField.validity.tooShort) {
      titleField.setCustomValidity('Минимальная длина — 30 символов');
    } else if (titleField.validity.tooLong) {
      titleField.setCustomValidity('Максимальная длина — 100 символов');
    } else if (titleField.validity.valueMissing) {
      titleField.setCustomValidity('Обязательное текстовое поле');
    }
  });

  // навешиваю событие на поле 'Тип жилья'
  buildingType.addEventListener('change', function (evt) {
    var target = evt.currentTarget;
    var selected = target.selectedOptions[0];
    var minLength = selected.dataset.min;

    // добавляю синхронизацию минимального значения для выбранного элемента с полем 'Цена за ночь'
    nightSelect.min = minLength;
    nightSelect.placeholder = minLength;
  });

  // навешиваю событие на поле 'Цена за ночь', определяя условием максимальное значение для выбранного элемента
  nightSelect.addEventListener('change', function (evt) {
    var target = evt.currentTarget;
    var value = target.value;
    if (value > MAX_VALUE) {
      evt.preventDefault();
    }
  });

  // проверяю соответствие количества комнат и гостей с помощью условий соответствия, записывая в callBack функцию
  var roomsForGuests = function (select) {
    if ((roomSelect.value >= capacitySelect.value && capacitySelect.value !== '0' && roomSelect.value !== '100') ||
      (roomSelect.value === '100' && capacitySelect.value === '0')) {
      select.setCustomValidity('');
    } else {
      select.setCustomValidity('Количество комнат не соответствует выбранному количеству гостей.');
    }
  };

  // создаю функцию, в которой указываю нужные селекты полей для применения проверок валидации
  var roomCapacityChangeHandler = function () {
    roomsForGuests(roomSelect);
    roomsForGuests(capacitySelect);
  };

  // навешиваю событие на каждое поле
  roomSelect.addEventListener('change', roomCapacityChangeHandler);
  capacitySelect.addEventListener('change', roomCapacityChangeHandler);


  // Поля «Время заезда» и «Время выезда» синхронизированы:
  // при изменении значения одного поля, во втором выделяется
  // соответствующее ему. Например, если время заезда указано «после 14»,
  // то время выезда будет равно «до 14» и наоборот.

  // Определяем универсальную функцию, которая будет синхронизовать 1-е поле (время заезда)
  // со 2-м полем (время выезда)

  // обращаемся к методу from который находится в пространстве имён Array,
  // чтобы получить массив из коллекции children
  var synchronizationDate = function (from, to) {
    var fromValue = from.value;

    //  метод find - находим среди option 2-го селекта в  option (1-го) с таким же значением
    var toChangeOption = Array.from(to.options).find(function (toOption) {
      return toOption.value === fromValue;
    });

    toChangeOption.selected = true;
  };

  // вешаем полученные функции на события отслеживания:
  // Сначала вешаю событие на 1-е поле (время заезда)

  timeIn.addEventListener('change', function () {
    synchronizationDate(timeIn, timeOut);
  });

  // Потом вешаю событие на 2-е поле (время выезда)
  timeOut.addEventListener('change', function () {
    synchronizationDate(timeOut, timeIn);
  });


  //  замена в поле адреса координаты пина. Далее вешаем на событие
  // parseInt преобразование строки в целое число
  var setAddress = function (offsetX, offsetY) {
    var x = parseInt(currentPin.style.left.replace('px', ''), 10) + offsetX;
    var y = parseInt(currentPin.style.top.replace('px', ''), 10) + offsetY;
    address.value = x + ', ' + y;
  };

  // расположение координат пина: острый конец метки
  var updateAddress = function () {
    setAddress(PIN_POSITION_X, PIN_POSITION_Y);
  };

  // расположение координат пина: центр
  var setDefaulAddress = function () {
    setAddress(PIN_DEFAULT_OFFSET_X, PIN_DEFAULT_OFFSET_Y);
  };


  // задаю универсальный цикл для недоступности фиелдсетов на форме / и фильтре
  var setElementDisabled = function (elements, isDisabled) {
    Array.from(elements).forEach(function (element) {
      element.disabled = isDisabled;
    });
  };

  // определяю универсальную функцию на каждый нужный набор классов
  setElementDisabled(allFormFieldsets, true);
  setElementDisabled(filtersElements, true);

  // перед отправкой формы вызываю функцию валидации для полей "количества комнат и гостей"
  roomCapacityChangeHandler();


  // Возвращаем исходное состояние страницы
  var setPageDefaultState = function () {
    form.reset();
    setElementDisabled(allFormFieldsets, true);
    setElementDisabled(filtersElements, true);
    window.card.delete();
    window.pin.removePins();
    window.images.resetAvatar();
    window.images.resetPhotos();
    window.map.setDefaulMainPinPosition();
    form.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
  };

  // навешиваю событие при клике на кнопку 'Отправить'
  var submitFormHandler = function (evt) {
    evt.preventDefault();

    window.backend.upload(new FormData(form), function () {
      window.notifiableHandler(successTemplate);
      setPageDefaultState();
    }, function () {
      window.notifiableHandler(errorTemplate);
    });
  };

  var resetClickHandler = function (evt) {
    evt.preventDefault();
    setPageDefaultState();
  };

  form.addEventListener('submit', submitFormHandler);
  resetForm.addEventListener('click', resetClickHandler);


  window.form = {
    PIN_POSITION_Y: PIN_POSITION_Y,
    setElementDisabled: setElementDisabled,
    setDefaulAddress: setDefaulAddress,
    updateAddress: updateAddress
  };
})();
