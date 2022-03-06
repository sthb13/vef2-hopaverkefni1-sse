import express from 'express';
import { requireAuthentication } from '../auth/passport.js';

import { catchErrors } from '../utils/errorsHandler.js';
import { getEveryProductByDate,
		 addProduct,
 } from '../db/db.js';

export const router = express.Router();

async function getMenuRoute(req, res) {
	const wholeMenu = await getEveryProductByDate();
	console.log(wholeMenu);
	return res.status(200).json(wholeMenu);
}

async function postMenuRoute(req, res) {
	const { title, price, description, img, categoryID } = req.body;
	const result = await addProduct(title, price, description, img, categoryID);
	return res.status(200).json(result);
}


router.get(
	'/menu',
	catchErrors(getMenuRoute)
);

router.post(
	'/menu',
	//requireAuthentication,
	catchErrors(postMenuRoute)
);