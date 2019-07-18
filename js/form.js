'use strict'; // form.js — модуль, который работает с формой объявления.

(function () {

  var map = document.querySelector('.map');
  var currentPin = map.querySelector('.map__pin--main');

  var form = document.querySelector('.ad-form');
  var buildingType = form.querySelector('#type');
  var allFormFieldsets = form.querySelectorAll('fieldset');
  var address = document.querySelector('#address');

  // Поле «Заголовок объявления»
  var titleField = form.querySelector('.ad-form__element');
  var nightSelect = form.querySelector('#price');

  // определяем нахождение полей select по id-шникам
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

  // смещение пинов относительно нужной метки
  var PIN_POSITION_X = 20;
  var PIN_POSITION_Y = 62;

  var filtersElements = document.querySelector('.map__filters').children;

  // текстовое содержание при отправки формы
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

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


  // находим поле select (выпад. список) по id-шнику
  buildingType.addEventListener('change', function (evt) {
    var target = evt.currentTarget;
    var selected = target.selectedOptions[0];
    var minLength = selected.getAttribute('minlength');

    nightSelect.setAttribute('min', minLength);
    nightSelect.setAttribute('placeholder', minLength);
  });

  nightSelect.addEventListener('change', function (evt) {
    var target = evt.currentTarget;
    var value = target.value;
    if (value > 1000000) {
      evt.preventDefault();
    }
  });

  var roomSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

  roomSelect.addEventListener('change', function (evt) {
    var target = evt.currentTarget;
    var selected = target.selectedOptions[0];
    var minLength = selected.getAttribute('minlength');

    capacitySelect.setAttribute('min', minLength);
    capacitySelect.setAttribute('placeholder', minLength);
  });

  capacitySelect.addEventListener('change', function (evt) {
    var target = evt.currentTarget;
    var value = target.value;
    if (value > 1000000) {
      evt.preventDefault();
    }
  });

  // Поля «Время заезда» и «Время выезда» синхронизированы:
  // при изменении значения одного поля, во втором выделяется
  // соответствующее ему. Например, если время заезда указано «после 14»,
  // то время выезда будет равно «до 14» и наоборот.

  // Определяем универсальную функцию, которая будет синхронизовать 1-е поле (время заезда) со 2-м полем (время выезда)

  var synchronizationDate = function (from, to) {
    for (var i = 0; i < from.children.length; i++) {
      if (from.children[i].selected) {
        for (var j = 0; j < to.children.length; j++) {
          if (from.children[i].value === to.children[j].value) {
            to.children[j].selected = true;
          }
        }
      }
    }
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
  var updateAddress = function () {
    var x = parseInt(currentPin.style.left.replace('px', ''), 10) + PIN_POSITION_X;
    var y = parseInt(currentPin.style.top.replace('px', ''), 10) + PIN_POSITION_Y;
    address.value = x + ', ' + y;
  };

  // window.updateAddress = updateAddress;
  currentPin.addEventListener('mouseup', updateAddress);

  // задаю универсальный цикл для недоступности фиелдсетов на форме / и фильтре
  var setElementDisabled = function (elements, isDisabled) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = isDisabled;
    }
  };

  window.form = {
    updateAddress: updateAddress(),
    setElementDisabled: setElementDisabled
  };

  // window.form.setElementDisabled = setElementDisabled;

  // определяю универсальную функцию на каждый нужный набор классов
  window.form.setElementDisabled(allFormFieldsets, true);
  window.form.setElementDisabled(filtersElements, true);

  // навешиваю событие при клике на кнопку 'Отправить'
  form.addEventListener('submit', function (evt, text) {
    evt.preventDefault();
    window.upload(new FormData(form), function () {
      // проверяю на работоспособность отображения окна
      // alert(response);

      // здесь я возвращаю действия на круги своя ... до того момента,
      // когда вся форма имела изначальное состояние ...
      // указываю здесь все по порядку с конца и в начало
      // (в функции currentPinMouseUpHandler в файле map.js)
      window.notifiable.notifiableHandler(successTemplate, text);
      window.form.setElementDisabled(allFormFieldsets, true);
      window.form.setElementDisabled(filtersElements, true);
      form.classList.add('ad-form--disabled');
      map.classList.add('map--faded');

      // Если при отправке данных произошла ошибка запроса, нужно показать
      // соответствующее сообщение в блоке main, используя блок #error из шаблона template
    }, function (text) {
      // window.notifiable.errorHandler(text);
      window.notifiable.notifiableHandler(errorTemplate, text);
    });
  });
})();
