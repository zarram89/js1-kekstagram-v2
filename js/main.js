import { getPictures } from './data.js';
import { renderPictures } from './picture.js';
import './form.js';

const similarPicturesListElement = document.querySelector('.pictures');

renderPictures(getPictures(), similarPicturesListElement);
