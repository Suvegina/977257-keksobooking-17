'use strict';

// В этом файле определяем выводы всплывающих окно
// при успешной отправке данных и при возникновении ошибки

(function () {

  // текстовое содержание при отправки формы
  // var successTemplate = document.querySelector('#success').content.querySelector('.success');
  // var errorTemplate = document.querySelector('#error').content.querySelector('.error');


  var tagMain = document.querySelector('main');


  var notifiableHandler = function (fromTemplate) {
    var node = fromTemplate.cloneNode(true);
    tagMain.appendChild(node);
    return fromTemplate;
  };

  window.notifiable = {
    notifiableHandler: notifiableHandler,
    errorClickHandler: errorClickHandler
    // successClickHandler: successClickHandler
  };

  // var successClickHandler = notifiableHandler;
  // successClickHandler.addEventListener('click', function () {
  //   // remove.pin.renderButton();
  // });
  // --------------------------------------------------------------------------

  // var errorPopup = document.querySelector('.error');

  // var removeError = function () {
  //   errorPopup.remove();
  // }

  // var closeError = errorPopup;

  // должен удалять созданный (сгенерированный div с окном ошибки)
  var errorClickHandler = function (errorTemplate) {
    errorTemplate.parentNode.removeChild(errorTemplate);
    // errorClickHandler.removeEventListener('click', removeError);
  };

  // var isEscErrorKeydownHandler = function () {
  //   errorPopup.remove();
  //   errorClickHandler.removeEventListener('keydown', isEscErrorKeydownHandler);
  // }

  // errorClickHandler.addEventListener('click', removeError);
  // errorClickHandler.addEventListener('keydown', isEscErrorKeydownHandler);
  // --------------------------------------------------------------------------

  // определяю ф-ю при котором будет удаляться сообщение с ошибкой
  // var errorClickHandler = function (nodeName) {
  //   errorTemplate.removeEventListener('click', errorClickHandler);
  // };

  // errorTemplate.addEventListener('click', errorClickHandler);

})();
