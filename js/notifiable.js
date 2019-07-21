'use strict';

// В этом файле определяем выводы всплывающих окно
// при успешной отправке данных и при возникновении ошибки

(function () {

  // текстовое содержание при отправки формы
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var tagMain = document.querySelector('main');

  var notifiableHandler = function (fromTemplate, Message) {
    var node = fromTemplate.cloneNode(true);
    tagMain.appendChild(node);
    return fromTemplate;
  };

  window.notifiable = {
    notifiableHandler: notifiableHandler,
    errorClickHandler: errorClickHandler//,
    // successClickHandler: successClickHandler
  };

  // var successClickHandler = notifiableHandler;
  // successClickHandler.addEventListener('click', function () {
  //   // remove.pin.renderButton();
  // });

  // должен удалять созданный (сгенерированный div с окном ошибки)
  var errorClickHandler =  function (errorTemplate) {
    var errorTemplate;
    errorTemplate.parentNode.removeChild(errorTemplate);
  };

  // errorButtonClickHandler.addEventListener('click', errorClickHandler);

  //   errorTemplate.style.display = 'none';
  //   errorButtonClickHandler.removeEventListener('click', function);
  // });

  // определяю ф-ю при котором будет удаляться сообщение с ошибкой
  // var errorClickHandler = function (nodeName) {
  //   errorTemplate.removeEventListener('click', errorClickHandler);
  // };

  // errorTemplate.addEventListener('click', errorClickHandler);

})();
