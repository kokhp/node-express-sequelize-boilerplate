import express from 'express';
import validate from 'express-validation';

import * as virtualAccountTypesController from '../controllers/virtualAccountTypes/virtualAccountTypes.controller';
import * as virtualAccountTypesValidator from '../controllers/virtualAccountTypes/virtualAccountTypes.validator';

const router = express.Router();


/**
 * For listing all virtualAccountTypes
 */
router.get('/', virtualAccountTypesController.list);

/**
 * For Inserting virtualAccountType
 */
router.post(
	'/',
	validate(virtualAccountTypesValidator.insert),
	virtualAccountTypesController.insert,
);

/**
 * For updating virtualAccountType
 */
router.put(
	'/:id',
	validate(virtualAccountTypesValidator.update),
	virtualAccountTypesController.update,
);

/**
 * To get one virtualAccountType by id
 */
router.get(
	'/:id',
	validate(virtualAccountTypesValidator.update),
	virtualAccountTypesController.getOneById,
);

/**
 * To remove one virtualAccountType by id
 */
router.delete(
	'/:id',
	validate(virtualAccountTypesValidator.update),
	virtualAccountTypesController.remove,
);

module.exports = router;
