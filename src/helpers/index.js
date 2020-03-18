export const successResponse = (req, res, data, code = 200) => res.send({
	code,
	data,
	success: true,
});

export const errorResponse = (
	req,
	res,
	errorMessage = 'Something went wrong',
	code = 500,
	error = {},
) => res.status(500).json({
	code,
	errorMessage,
	error,
	data: null,
	success: false,
});

export const plaidErrorHandle = (plaid, err) => {
	if (err != null) {
		if (err instanceof plaid.PlaidError) {
			// This is a Plaid error
			console.log(`${err.error_code}: ${err.error_message}`);
		} else {
			// This is a connection error, an Error object
			console.log(err.toString());
		}
	}
};

export const validateEmail = (email) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export const validateFields = (object, fields) => {
	const errors = [];
	fields.forEach((f) => {
		if (!(object && object[f])) {
			errors.push(f);
		}
	});
	return errors.length ? `${errors.join(', ')} are required fields.` : '';
};

export const uniqueId = (length = 13) => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i += 1) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

export const pagination = (req) => {
	if (req.query.size && req.query.pageNumber) {
		const offset = parseInt(req.query.size, 10) * (parseInt(req.query.pageNumber, 10) - 1);
		const limit = parseInt(req.query.size, 10);
		return {
			offset,
			limit,
		};
	}
	return {};
};

// eslint-disable-next-line max-len
export const order = (req, ...sort) => [req.query.field || sort[0].field, req.query.sort || sort[0].order];
