// Import section
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { DB_ADRESS } = process.env;

const router = require('./routes/index');

const auth = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const { createUser, login } = require('./controllers/users');
const { signinValidation, signupValidation } = require('./middlewares/customValidation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

mongoose.connect(DB_ADRESS);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(requestLogger);

app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);
app.use(auth, router);

// Errors section
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
