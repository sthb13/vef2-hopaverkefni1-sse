import express from 'express';
import jwt from 'jsonwebtoken';

import { jwtOptions, tokenOptions } from './passport.js';
import {
  comparePasswords, createUser, findUserById,
  findUserByUsername,updateUser
} from '../db/users.js';

import { catchErrors } from '../utils/errorsHandler.js';
import { logger } from '../utils/logger.js';

/**
 * Skilgreinir API fyrir nýskráningu, innskráningu notanda, ásamt því að skila
 * upplýsingum um notanda og uppfæra þær.
 */

export const router = express.Router();

async function registerRoute(req, res) {
  const { username, email, password = '' } = req.body;

  const result = await createUser(username, email, password);

  delete result.password;

  return res.status(201).json(result);
}

async function loginRoute(req, res) {
  const { username, password = '' } = req.body;

  const user = await findUserByUsername(username);
  if (!user) {
    return res.status(401).json({ error: 'No such user' });
  }

  const passwordIsCorrect = await comparePasswords(password, user.password);

  if (passwordIsCorrect) {
    const payload = { id: user.id };
    const token = jwt.sign(payload, jwtOptions.secretOrKey, tokenOptions);
    return res.json({
      token,
      expiresIn: tokenOptions.expiresIn,
    });
  }

  return res.status(401).json({ error: 'Invalid password' });
}

async function currentUserRoute(req, res) {
  const { user: { id } = {} } = req;

  const user = await findUserById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  delete user.password;

  return res.json(user);
}

async function updateCurrentUserRoute(req, res) {
  const { id } = req.user;

  const user = await findUserById(id);

  if (!user) {
    // shouldn't happen
    logger.error('Unable to update user by id', id);
    return res.status(500).json(null);
  }

  const { password, email } = req.body;

  const result = await updateUser(id, password, email);

  if (!result) {
    return res.status(400).json({ error: 'Nothing to update' });
  }

  return res.status(200).json(result);
}



router.post(
  '/users/login',
  catchErrors(loginRoute),
);

 router.post(
  '/users/register',
  catchErrors(registerRoute),
);

router.get(
  '/users/me',
  catchErrors(currentUserRoute),
);

router.patch(
  '/users/me',
  updateCurrentUserRoute
);
