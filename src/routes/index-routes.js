import express from 'express';
import { validationResult } from 'express-validator';


export const indexRouter = express.Router();

async function indexRoute(req, res) {}


indexRouter.get('/', catchErrors(indexRoute));

