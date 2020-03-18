import Joi from 'joi';

export const insert = {
	body: {
		name: Joi.string().required(),
	},
};

export const update = {
	params: {
		id: Joi.string().required(),
	},
};
