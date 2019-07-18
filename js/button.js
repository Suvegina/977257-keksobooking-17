// button.js - отрисовка кнопки + навешивание события на кнопку

'use strict';

(function () {


  var successTemplate = document.querySelector('#success').content.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('main');

  window.createButton = function(name, clickHandler) {
    var button = document.createElement('button');

    button.addEventListener('click', clickHandler);
    button.textContent = name;

    return button;
  };
})();
