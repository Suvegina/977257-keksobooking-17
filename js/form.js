'use strict'; // form.js — модуль, который работает с формой объявления.

(function () {

  var form = document.querySelector('.ad-form');
  var buildingType = form.querySelector('#type');

  // Поле «Заголовок объявления»
  var titleField = form.querySelector('.ad-form__element');
  var nightSelect = form.querySelector('#price');

  // определяем нахождение полей select по id-шникам
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

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
})();
