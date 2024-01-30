const userRouter = require('express').Router();
const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');
const { userInfoValidation } = require('../middlewares/customValidation');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', userInfoValidation, updateUserInfo);

module.exports = userRouter;
