'use strict';

(function () {

  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data', // URL-адрес сервера, с которого загружаем данные.
    UPLOAD: 'https://js.dump.academy/keksobooking' // URL-адрес сервера, на который должны отправиться данные.
  };


  //universal script for load and upload data
  var createRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    // задаю функцию запроса для отображения состояния (ответа) сервера
    var onLoadRequest = function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа' + xhr.status + '' + xhr.statusText);
      }
    };

    xhr.addEventListener('load', onLoadRequest);
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    return xhr;
  };


  // ф-я загрузки данных с сервера
  var load = function (onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);

    xhr.open('GET', Url.LOAD);
    xhr.send();
  };


  // ф-я отправки данных на сервер
  var upload = function (data, onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);

    xhr.open('post', Url.UPLOAD);
    xhr.send(data);
  };


  window.backend = {
    load: load,
    upload: upload
  };

})();

// У файла пока что подвешенное состояние. переписала по критерию Д.10
