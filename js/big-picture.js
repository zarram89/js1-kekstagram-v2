import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
};

const onCancelButtonClick = () => {
  hideBigPicture();
};

function hideBigPicture () {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const createComment = (comment) => {
  const {avatar, message, name} = comment;

  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = (comments) => {
  commentList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.appendChild(commentElement);
  });
  commentList.appendChild(fragment);
};

const renderBigPictureDetails = (picture) => {
  const {url, description, likes} = picture;

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
};

const showBigPicture = (picture) => {
  const {comments} = picture;

  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');

  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');

  renderBigPictureDetails(picture);
  renderComments(comments);

  document.addEventListener('keydown', onDocumentKeydown);
};

cancelButton.addEventListener('click', onCancelButtonClick);

export { showBigPicture, hideBigPicture };
