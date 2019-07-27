'use strict';

// В этом файле определяем выводы всплывающих окно
// при успешной отправке данных и при возникновении ошибки

(function () {

  // текстовое содержание при отправки формы
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var tagMain = document.querySelector('main');


  // события для отрисовки и удаления окна после успешной отправки формы
  var successHandler = function () {
    var node = successTemplate.cloneNode(true);
    tagMain.appendChild(node);

    var removesuccess = function () {
      node.remove();
    };

    node.addEventListener('click', removesuccess);

    var escKeydownHandler = function (evt) {
      window.util.isEscEvent(evt, removesuccess);
      document.removeEventListener('keydown', escKeydownHandler);
    };

    document.addEventListener('keydown', escKeydownHandler);
  };


  // события для отрисовки и удаления окна с ошибкой
  var errorHandler = function () {
    var node = errorTemplate.cloneNode(true);
    tagMain.appendChild(node);

    var removeError = function () {
      node.remove();
    };

    var errorButton = node.querySelector('.error__button');
    errorButton.addEventListener('click', removeError);

    var escKeydownHandler = function (evt) {
      window.util.isEscEvent(evt, removeError);
      document.removeEventListener('keydown', escKeydownHandler);
    };

    document.addEventListener('keydown', escKeydownHandler);
  };


  window.notifiable = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
