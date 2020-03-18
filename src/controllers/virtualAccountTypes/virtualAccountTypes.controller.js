
// eslint-disable-next-line
import { virtualAccountTypes } from '../../models';

import {
	successResponse, errorResponse, order, pagination,
} from '../../helpers';

export const list = async (req, res) => {
	try {
		const virtualAccountTypeData = await virtualAccountTypes.findAndCountAll({
			order: [order(req, { field: 'name', order: 'ASC' })],
			...pagination(req),
		});
		return successResponse(req, res, virtualAccountTypeData);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const insert = async (req, res) => {
	try {
		const {
			name, status,
		} = req.body;

		const payload = {
			name,
			status,
		};

		const virtualAccountType = await virtualAccountTypes.create(payload);
		return successResponse(req, res, virtualAccountType);
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const getOneById = async (req, res) => {
	try {
		const { id } = req.params;
		const virtualAccountType = await virtualAccountTypes.findOne({
			where: { id },
		});
		return successResponse(req, res, { virtualAccountType });
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const update = async (req, res) => {
	try {
		const { name, status, id } = { ...req.body, ...req.params, ...req.query };
		const virtualAccountType = await virtualAccountTypes.findOne({
			where: { id },
		});

		if (!virtualAccountType) {
			return errorResponse(req, res, 'Virtual account type does not exists');
		}
		const payload = {
			name, status,
		};
		await virtualAccountTypes.update(payload, { where: { id } });
		return successResponse(req, res, {});
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};

export const remove = async (req, res) => {
	try {
		const { id } = req.params;
		const virtualAccountType = await virtualAccountTypes.findOne({
			where: { id },
		});

		if (!virtualAccountType) {
			return errorResponse(req, res, 'Virtual account type does not exists');
		}
		await virtualAccountTypes.destroy({ where: { id } });
		return successResponse(req, res, {});
	} catch (error) {
		return errorResponse(req, res, error.message);
	}
};
