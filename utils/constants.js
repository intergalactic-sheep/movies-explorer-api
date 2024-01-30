const ERROR_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
};

const ERROR_MESSAGE = {
  ACCESS_ERROR: 'Вы не можете удалить чужой фильм.',
  MOVIE_NOT_FOUND: 'Фильм не был найден',
  WRONG_DATA_MOVIE_DELETE: 'Для удаления фильма были переданы некорректные данные',
  WRONG_DATA_MOVIE_CREATE: 'Для создания фильма были переданы некорректные данные',
  EMAIL_ALREADY_EXISTS: 'Пользователь с указанным email уже существует',
  WRONG_DATA_USER_CREATE: 'Для создания пользователя были переданы некорректные данные',
  WRONG_DATA_USER_UPDATE: 'Для обновления информации о пользователе были переданы некорректные данные',
  USER_NOT_FOUND: 'Пользователь не был найден',
  AUTHORIZATION_ERROR: 'Необходима авторизация',
  SERVER_INTERNAL_ERROR: 'На сервере произошла ошибка',
  WRONG_AUTH_DATA: 'Неверный логин или пароль',
  WRONG_EMAIL: 'Неверный email',
  WRONG_URL: 'Некорректный вид ссылки',
  PAGE_NOT_FOUND: 'Ресурс не был найден',
  TOO_MANY_REQUESTS: 'Слишком много запросов, пожалуйста, повторите попытку позже',
};

module.exports = { ERROR_CODE, ERROR_MESSAGE };
