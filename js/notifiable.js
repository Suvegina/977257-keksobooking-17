'use strict';

// В этом файле определяем выводы всплывающих окно
// при успешной отправке данных и при возникновении ошибки

(function () {

  var tagMain = document.querySelector('main');

  var notifiableHandler = function (fromTemplate, Message) {
    var node = fromTemplate.cloneNode(true);
    // node.textContent = Message;
    tagMain.appendChild(node);

    return fromTemplate;
  };

  window.notifiable = {
    notifiableHandler: notifiableHandler,
    successClickHandler: successClickHandler
  };

  // var successClickHandler = notifiableHandler;
  // successClickHandler.addEventListener('click', function () {
  //   // remove.pin.renderButton();
  // });

  var errorTemplate = document.querySelector('#error');

  var errorButtonClickHandler = document.querySelector('.error__button');
  errorButtonClickHandler.addEventListener('click', function () {
    // remove.pin.renderButton();
    errorTemplate.style.display = 'none';
    errorButtonClickHandler.removeEventListener('click', function);
  });


})();


// докрутить обработчик событий при возникновении ошибки
// надо выбрать все пины и удалить их с помощью метода remove()


