import Joi from 'joi';

export const getOtherUserProfile = {
	body: {
		userId: Joi.number().required(),
	},
};

export const changePassword = {
	body: {
		oldPassword: Joi.string().required(),
		newPassword: Joi.string().required(),
	},
};

export const register = {
	body: {
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		mobile: Joi.number(),
		email: Joi.string()
			.email()
			.required(),
		password: Joi.string().required(),
	},
};

export const login = {
	body: {
		email: Joi.string()
			.email()
			.required(),
		password: Joi.string().required(),
	},
};
