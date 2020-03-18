import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// eslint-disable-next-line
import { users, Sequelize } from '../../models';

import { successResponse, errorResponse, uniqueId } from '../../helpers';

export const allUsers = async (req, res) => {
	try {
		const page = req.params.page || 1;
		const limit = 2;
		const Users = await users.findAndCountAll({
			order: [['createdAt', 'DESC'], ['firstName', 'ASC']],
			offset: (page - 1) * limit,
			limit,
		});
		return successResponse(req, res, Users);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const register = async (req, res) => {
	try {
		const {
			email, password, firstName, lastName, mobile, status,
		} = req.body;

		const user = await users.scope('withSecretColumns').findOne({
			where: { [Sequelize.Op.or]: { email, mobile } },
		});
		if (user) {
			throw new Error('User already exists with same email/mobile');
		}
		const reqPass = crypto
			.createHash('md5')
			.update(password)
			.digest('hex');
		const payload = {
			email,
			firstName,
			lastName,
			mobile,
			password: reqPass,
			isVerified: false,
			verifyToken: uniqueId(),
			status,
		};

		const newUser = await users.create(payload);
		return successResponse(req, res, newUser);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const login = async (req, res) => {
	console.log('Inside login');
	try {
		const user = await users.scope('withSecretColumns').findOne({
			where: { email: req.body.email },
		});
		if (!user) {
			throw new Error('Incorrect Email Id/Password');
		}
		const reqPass = crypto
			.createHash('md5')
			.update(req.body.password || '')
			.digest('hex');
		if (reqPass !== user.password) {
			throw new Error('Incorrect Email Id/Password');
		}
		const token = jwt.sign(
			{
				user: {
					userId: user.id,
					email: user.email,
					createdAt: new Date(),
				},
			},
			process.env.SECRET,
		);
		delete user.dataValues.password;
		return successResponse(req, res, { user, token });
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const profile = async (req, res) => {
	try {
		const { userId } = req.user;
		const user = await users.findOne({ where: { id: userId } });
		return successResponse(req, res, { user });
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const changePassword = async (req, res) => {
	try {
		const { userId } = req.user;
		const user = await users.scope('withSecretColumns').findOne({
			where: { id: userId },
		});

		const reqPass = crypto
			.createHash('md5')
			.update(req.body.oldPassword)
			.digest('hex');
		if (reqPass !== user.password) {
			throw new Error('Old password is incorrect');
		}

		const newPass = crypto
			.createHash('md5')
			.update(req.body.newPassword)
			.digest('hex');

		await users.update({ password: newPass }, { where: { id: user.id } });
		return successResponse(req, res, {});
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};
