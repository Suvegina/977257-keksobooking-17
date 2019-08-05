'use strict';

// В этом файле определяем выводы всплывающих окно
// при успешной отправке данных и при возникновении ошибки

(function () {

  var tagMain = document.querySelector('main');

  // создаю универсальную функцию, которая будет отрисовывать окно
  // в зависимости от примененного параметра в виде аргумента

  // события для отрисовки и удаления окна после успешной отправки формы
  window.notifiableHandler = function (messageTemplate) {
    var node = messageTemplate.cloneNode(true);
    tagMain.appendChild(node);

    // Создаю функцию для удаления отрисованного окна
    var removePopup = function () {
      node.remove();
    };

    // Навешиваю на событие клик - закрытие всплывающего окна
    node.addEventListener('click', removePopup);

    // создаю событие на нажатие клавиши ESC,
    // которое будет вызывать функцию удаления отрисованного popup - сообщение
    var escKeydownHandler = function (evt) {
      window.util.isEscEvent(evt, removePopup);
      document.removeEventListener('keydown', escKeydownHandler);
    };

    document.addEventListener('keydown', escKeydownHandler);
  };
})();
