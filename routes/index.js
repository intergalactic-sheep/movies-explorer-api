const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { ERROR_MESSAGE } = require('../utils/constants');
const { createUser, login } = require('../controllers/users');
const { signinValidation, signupValidation } = require('../middlewares/customValidation');
const auth = require('../middlewares/auth');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(ERROR_MESSAGE.PAGE_NOT_FOUND));
});

module.exports = router;
