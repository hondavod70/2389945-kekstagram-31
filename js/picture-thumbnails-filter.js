import { DEBOUNCE_TIMEOUT, Filter, PICTURES_RANDOM_COUNT } from './config';
import { pictures } from './dom-elements';
import { pictureState } from './picture-state';
import { createPictureThumbnails } from './picture-thumbnails';
import {
  comparePicturesComments,
  debounce,
  getUniqueRandomArray,
} from './utils';

// Получение отфильтрованных фотографий
const getFilteredPictures = (evt) => {
  if (evt) {
    pictures
      .querySelectorAll('.picture')
      .forEach((picture) => picture.parentNode.removeChild(picture));

    if (evt.target.id === Filter.DEFAULT) {
      return pictureState.pictures.slice();
    } else if (evt.target.id === Filter.RANDOM) {
      return getUniqueRandomArray(pictureState.pictures, PICTURES_RANDOM_COUNT);
    } else if (evt.target.id === Filter.DISCUSSED) {
      return pictureState.pictures.slice().sort(comparePicturesComments);
    }
  } else {
    return pictureState.pictures.slice();
  }
};

// Устранение "дребезга" при отрисовке миниатюр
const createPictureThumbnailsDebounce = debounce(
  (evt) => createPictureThumbnails(evt),
  DEBOUNCE_TIMEOUT
);

// Изменение отрисовки кнопок фильтрации и отрисовка миниатюр согласно фильтру
const pictureThumbnailsFilter = (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  const filtersButtons = evt.target.parentNode;
  filtersButtons
    .querySelector('.img-filters__button--active')
    .classList.remove('img-filters__button--active');

  evt.target.classList.add('img-filters__button--active');

  createPictureThumbnailsDebounce(evt);
};

export { getFilteredPictures, pictureThumbnailsFilter };
