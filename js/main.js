import { getPictures } from './data';
import { renderPictures } from './picture';

const similarPicturesListElement = document.querySelector('.pictures');

renderPictures(getPictures(), similarPicturesListElement);
