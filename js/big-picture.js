import { isEscapeKey, toggleClass } from './util.js';

const body = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const commentCount = bigPictureElement.querySelector('.social__comment-count');
const commentList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');

const COMMENTS_PER_PORTION = 5;
let commentsShown = 0;
let currentComments = [];

const renderComment = (comment) => {
  const {avatar, message, name} = comment;

  const commentElement = document.createElement('li');
  commentElement.innerHTML =
    '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  commentElement.classList.add('social__comment');

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= currentComments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = currentComments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  commentList.innerHTML = '';
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < commentsShown; i++) {
    const commentElement = renderComment(currentComments[i]);
    fragment.appendChild(commentElement);
  }

  commentList.appendChild(fragment);
  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${currentComments.length}</span> комментариев`;

};

const toggleModal = () => {
  toggleClass(bigPictureElement, 'hidden');
  toggleClass(body, 'modal-open');
};

const hideBigPicture = () => {
  toggleModal();
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const onCommentsLoaderClick = () => {
  renderComments();
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
  currentComments = comments.slice();

  toggleModal();
  commentsLoader.classList.add('hidden');

  renderBigPictureDetails(picture);
  renderComments();

  document.addEventListener('keydown', onDocumentKeydown);
};

cancelButton.addEventListener('click', onCancelButtonClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export { showBigPicture };
