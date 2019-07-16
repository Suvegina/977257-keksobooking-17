// Файл upload.js
'use strict';

(function () {
  // Нам нужно знать URL-адрес сервера, на который должны отправиться данные.
  var URL = 'https://js.dump.academy/keksobooking';

  // Функция upload будет принимать на вход 2 параметра:
  // объект с данными, которые необходим отправить — data
  // функцию обратного вызова onSuccess, которая будет вызываться
  // каждый раз, когда данные отправлены успешно.
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа' + xhr.status + '' + xhr.statusText);
      }
    });

    xhr.open('post', URL);
    xhr.send(data);
  };
})();
