// Import section
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { DB_ADRESS, NODE_ENV } = process.env;

const router = require('./routes/index');

const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');
const { mongoAdress } = require('./utils/config');
const resolveCORS = require('./middlewares/resolveCORS');

const { PORT = 3000 } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DB_ADRESS : mongoAdress);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(resolveCORS);
app.use(limiter);
app.use(requestLogger);

app.use(router);

// Errors section
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
