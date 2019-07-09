// перемещение метки, события на главной метке.

(function () {

  var map = document.querySelector('.map');
  var currentPinHandler = map.querySelector('.map__pin--main');
  // var currentPin = map.querySelector('.map__pin--main');

  currentPinHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };    

    var dragged = false;

    var currentPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
    
    // При каждом движении мыши нам нужно обновлять
    // смещение относительно первоначальной точки, чтобы диалог
    // смещался на необходимую величину.
      map.style.top = (map.offsetTop - shift.y) + 'px';
      map.style.left = (map.offsetLeft - shift.x) + 'px';
    };

    var currentPinMouseUpHandler = function(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', currentPinMouseMoveHandler);
      document.removeEventListener('mouseup', currentPinMouseUpHandler);
      
      if (dragged) {
        var preventDefaultClickHandler = function (evt) {
          evt.preventDefault();
          currentPinHandler.removeEventListener('click', preventDefaultClickHandler);
          currentPinHandler.addEventListener('click', preventDefaultClickHandler)

          // перемещаю сюда события ранее находящихся при событии клика по главной метке
          map.classList.remove('map--faded');
          renderButton();
          form.classList.remove('ad-form--disabled');
          disableFormControl();
          disableFiltersControl();
          currentPin.removeEventListener('mousedown', currentPinMouseDownHandler);

          currentPinHandler.addEventListener('click', currentPinMouseDownHandler)
        }
      }
    };

    document.addEventListener('mousemove', currentPinMouseMoveHandler);
    document.addEventListener('mouseup', currentPinMouseUpHandler);
  });

  // currentPin.addEventListener('mousedown', currentPinMouseDownHandler);
});

// --------------------------------------------------------------------------------

// var currentPinMouseDownHandler = function (evt) {
//     evt.preventDefault();
//     var startCoords = {
//       x: evt.clientX,
//       y: evt.clientY
//     };

//     var currentPinMouseMoveHandler = function (moveEvt) {
//       moveEvt.preventDefault();

//       var shift = {
//         x: startCoords.x - moveEvt.clientX,
//         y: startCoords.y - moveEvt.clientY
//       };
//     };

//     startCoords = {
//         x: moveEvt.clientX,
//         y: moveEvt.clientY
//     };

//     // При каждом движении мыши нам нужно обновлять
//     // смещение относительно первоначальной точки, чтобы диалог
//     // смещался на необходимую величину.
//     currentPin.style.top = (currentPin.offsetTop - shift.y) + 'px';
//     currentPin.style.left = (currentPin.offsetLeft - shift.x) + 'px';

//     var currentPinMouseUpHandler = function(upEvt) {
//       upEvt.preventDefault();

//       document.removeEventListener('mousemove', currentPinMouseMoveHandler);
//       document.removeEventListener('mouseup', currentPinMouseUpHandler);
//       if (dragged) {
//         var preventDefaultClickHandler = function (evt) {
//           evt.preventDefault();
//           dialogHandler.addEventListener('click', preventDefaultClickHandler)

//           // перемещаю сюда события ранее находящихся при событии клика по главной метке
//           map.classList.remove('map--faded');
//           renderButton();
//           form.classList.remove('ad-form--disabled');
//           disableFormControl();
//           disableFiltersControl();
//           currentPin.removeEventListener('mousedown', currentPinMouseDownHandler);

//           dialogHandler.addEventListener('click', currentPinMouseDownHandler)
//         }
//       }
//     };

//     document.addEventListener('mousemove', currentPinMouseMoveHandler);
//     document.addEventListener('mouseup', currentPinMouseUpHandler);

//   };

//   currentPin.addEventListener('mousedown', currentPinMouseDownHandler);
// });
  
//   // // событие при клике на главную метку пина
//   // var currentPinClickHandler = function () {
//   //   map.classList.remove('map--faded');
//   //   renderButton();
//   //   form.classList.remove('ad-form--disabled');
//   //   disableFormControl();
//   //   disableFiltersControl();
//   //   currentPin.removeEventListener('click', currentPinClickHandler);
//   // };
  
//   // currentPin.addEventListener('click', currentPinClickHandler);