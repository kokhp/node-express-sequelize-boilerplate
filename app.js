import express from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './src/routes';

import errorHandler from './src/middleware/errorHandler';

dotenv.config();
require('./src/config/sequelize');

const app = express();
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);
app.use(errorHandler);

module.exports = app;
