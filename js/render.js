// render - отрисовка новых элементов на странице

'use strict';

(function () {
  window.render = function(element) {
    document.body.insertBefore(element, document.main.children[0]);
  };
})();
