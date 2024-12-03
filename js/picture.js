const createPicture = (picture) => {
  const {url, likes, comments, description} = picture;

  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  return pictureElement;
};

const renderPictures = (pictures, container) => {
  const similarListFragment = document.createDocumentFragment();

  pictures.forEach((picture) => similarListFragment.appendChild(createPicture(picture)));

  container.appendChild(similarListFragment);
};

export { renderPictures };
