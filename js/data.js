import { getRandomInteger, getRandomArrayElement } from './util.js';

const DESCRIPTIONS = [
  'Лол',
  'Кек',
  'Чебурек',
  'Топ',
  'Супер-пупер',
  'Лучший',
  'Нормас',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const SIMILAR_PICTURE_COUNT = 25;

const AvatarsRange = {
  MIN: 1,
  MAX: 6,
};

const MessagesRange = {
  MIN: 1,
  MAX: 2,
};

const CommentsRange = {
  MIN: 0,
  MAX: 30,
};

const LikesRange = {
  MIN: 15,
  MAX: 200,
};


const createMessage = () => Array.from({length: getRandomInteger(MessagesRange.MIN, MessagesRange.MAX)}, () => getRandomArrayElement(MESSAGES)).join(' ');

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomInteger(AvatarsRange.MIN, AvatarsRange.MAX)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createComments = () => Array.from({length: getRandomInteger(CommentsRange.MIN, CommentsRange.MAX)}, (_value, commentIndex) => createComment(commentIndex + 1));

const createPicture = (index) => ({
  id: index,
  url: `/photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LikesRange.MIN, LikesRange.MAX),
  comments: createComments(),
});

const getPictures = () => Array.from({length: SIMILAR_PICTURE_COUNT}, (_value, pictureIndex) => createPicture(pictureIndex + 1));

export { getPictures };
