'use strict';

// В этом файле определяем выводы всплывающих окно
// при успешной отправке данных и при возникновении ошибки

(function () {

  var successTemplate = document.querySelector('#success').content.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('main');

  // var successHandler = function(successMessage) {
  //   // var node = document.createElement('div');
  //   var node = successTemplate.cloneNode(true);
  //   node = document.createElement('div');
  //   node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  //   node.style.position = 'absolute';
  //   node.style.left = 0;
  //   node.style.right = 0;
  //   node.style.fontSize = '30px';

  //   node.textContent = successMessage;
  //   document.body.insertAdjacentElement('afterbegin', node);
  // };

  // var errorHandler = function (errorMessage) {
  //   // var node = document.createElement('div');
  //   var node = errorTemplate.cloneNode(true);
  //   node = document.createElement('div');
  //   node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  //   node.style.position = 'absolute';
  //   node.style.left = 0;
  //   node.style.right = 0;
  //   node.style.fontSize = '30px';

  //   node.textContent = errorMessage;
  //   document.body.insertAdjacentElement('afterbegin', node);
  // };

  // window.notifiable = {
  //   successHandler = successHandler,
  //   errorHandler = errorHandler
  // }

  var notifiableHandler = function (fromTemplate, Message) {
    // var node = document.createElement('div');
    var node = fromTemplate.cloneNode(true);
    node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = Message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.notifiable = {
    notifiableHandler: notifiableHandler
  }

})();
