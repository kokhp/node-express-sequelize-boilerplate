import { errorResponse } from '../helpers';

const errorHandler = (err, req, res) => {
	if (err && err.message === 'validation error') {
		let messages = err.errors.map(e => e.field);
		if (messages.length && messages.length > 1) {
			messages = `${messages.join(', ')} are required fields`;
		} else {
			messages = `${messages.join(', ')} is required field`;
		}
		return errorResponse(req, res, messages, 400, err);
	}
	return false;
};

export default errorHandler;
