'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  //  определяю параметры для аватарки
  var avatarParameters = {
    width: '40',
    height: '44',
    padding: '0 15px',
    path: 'img/muffin-grey.svg'
  };

  var customAvatarParameters = {
    width: '70',
    height: '70',
    padding: '0'
  };

  //  определяю параметры для фотографий
  var photoParameters = {
    width: '70',
    height: '70'
  };


  // для аватарки
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var avatarPreviewImg = document.querySelector('.ad-form-header__preview img');

  // для фотографий
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');
  var photoPreviewContainer = document.querySelector('.ad-form__photo-container');


  var isFileMatches = function (file) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    return matches;
  };

  // обработка загрузки аватарки
  var avatarUpload = function () {
    var file = avatarChooser.files[0];

    if (isFileMatches(file)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreviewImg.src = reader.result;
        avatarPreviewImg.width = customAvatarParameters.width;
        avatarPreviewImg.height = customAvatarParameters.height;
        avatarPreview.style.padding = customAvatarParameters.padding;
      });

      reader.readAsDataURL(file);
    }
  };

  // обработка загрузки фотографий
  var photoUpload = function () {
    var files = Array.from(photoChooser.files);
    var photo = document.createElement('img');

    files.forEach(function (file) {
      if (isFileMatches(file)) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          photoPreview.appendChild(photo);

          var photoPreviewClone = photoPreview.cloneNode(true);
          var cloneImage = photoPreviewClone.querySelector('img');

          cloneImage.src = reader.result;
          cloneImage.width = photoParameters.width;
          cloneImage.height = photoParameters.height;

          photoPreviewContainer.appendChild(photoPreviewClone);
        });

        reader.readAsDataURL(file);
      }
    });
    photoPreview.remove();
  };


  // сброс значения аватарки
  var resetAvatar = function () {
    avatarPreviewImg.src = avatarParameters.path;
    avatarPreviewImg.width = avatarParameters.width;
    avatarPreviewImg.height = avatarParameters.height;
    avatarPreview.style.padding = avatarParameters.padding;
  };


  // сброс загруженных фотографий
  var resetPhotos = function () {
    var photoPreviewList = photoPreviewContainer.querySelectorAll('.ad-form__photo');
    photoPreviewList.forEach(function (element) {
      element.remove();
    });

    photoPreviewContainer.appendChild(photoPreview);
  };

  avatarChooser.addEventListener('change', avatarUpload);
  photoChooser.addEventListener('change', photoUpload);


  window.images = {
    resetAvatar: resetAvatar,
    resetPhotos: resetPhotos
  };
})();
