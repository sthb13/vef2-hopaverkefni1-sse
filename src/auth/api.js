import express from 'express';
import jwt from 'jsonwebtoken';
import {
  comparePasswords, createUser, findUserById, findUserByUsername, updateAdmin, updateUser
} from '../api/users.js';
import { catchErrors } from '../utils/errorsHandler.js';
import { validationCheck } from '../validation/helpers.js';
// import { logger } from '../utils/logger.js';
import {
  atLeastOneBodyValueValidator,
  sanitizationMiddlewareUsername,
  usernameAndPaswordValidValidator,
  usernameDoesNotExistValidator,
  validationUsernameAndPass, xssSanitizationUsername
} from '../validation/validators.js';
import { jwtOptions, requireAdmin, requireAuthentication, tokenOptions } from './passport.js';


/**
 * Skilgreinir API fyrir nýskráningu, innskráningu notanda, ásamt því að skila
 * upplýsingum um notanda og uppfæra þær.
 */

export const router = express.Router();

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
    delete user.password;
    return res.json({
      user,
      token,
      expiresIn: tokenOptions.expiresIn,
    });
  }

  return res.status(401).json({ error: 'Invalid password' });
}

async function registerRoute(req, res) {
  const { username, password = '' } = req.body;

  const result = await createUser(username, password);

  delete result.password;

  return res.status(201).json(result);
}

async function specificUserRoute(req,res){
  const { id } = req.params;

  const user = await findUserById(id);

  if(!user) {
    return res.status(404).json({ error: 'User not found'});
  }

  delete user.password;
  return res.status(200).json(user);
}

async function currentUserRoute(req, res) {
  const { user: { id } = {} } = req;

  const user = await findUserById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  delete user.password;

  return res.status(200).json(user);
}

async function updateCurrentUserRoute(req, res) {
  const { id } = req.user;
  const user = await findUserById(id);

  if (!user) {
    return res.status(500).json(null);
  }

  const { username = null ,password = null } = req.body;

  let resultUsername=null;
  let resultPass=null;

  if(username!==null && user.username !== username){
    const findUser = await findUserByUsername(username);
    if (findUser) {
      return res.status(401).json({ error: 'username already exists' });
    }

    // TODO : Þarf að skoða með validationUsername
    if(username.lenght < 4){
      return res.status(401).json({ error: 'Notendarnafn verður að vera a.m.k 4 stafir' });
    }
    resultUsername= await updateUser(id, username, null);
  }
  if (password!==null){
    const comparePass= await comparePasswords(password, user.password);
    if(!comparePass){
      resultPass= await updateUser(id, null, password);
    }
  }

  if (!resultUsername && !resultPass) {
    return res.status(400).json({ error: 'Nothing to update' });
  }

  const updatedUser = await findUserById(id);
  delete updatedUser.password;

  return res.status(200).json(updatedUser);
}

async function specificUserRoutePatch(req,res){
  const { user: { id: authUser } = {} } = req;
  const { id} = req.params;
  const { admin } = req.body;

  if (Number(authUser)=== Number(id)){
    return res.status(400).json({ error: 'can not changes your side' });
  }

  const user = await findUserById(id);
  if(!user) {
    return res.status(404).json({ error: 'User not found'});
  }

  const result = await updateAdmin(id, admin);

  if(!result){
    return res.status(404).json({ error: 'admin can only be true or false'});
  }

  delete result.password;

  return res.status(200).json(result);
}

router.post(
  '/users/login',
  validationUsernameAndPass,
  xssSanitizationUsername,
  sanitizationMiddlewareUsername,
  usernameAndPaswordValidValidator,
  validationCheck,
  catchErrors(loginRoute),
);

 router.post(
  '/users/register',
  validationUsernameAndPass,
  xssSanitizationUsername,
  sanitizationMiddlewareUsername,
  usernameDoesNotExistValidator,
  validationCheck,
  catchErrors(registerRoute),
);


router.get(
  '/users/me',
  requireAuthentication,
  catchErrors(currentUserRoute),
);

router.get(
  '/users/:id',
  requireAdmin,
  catchErrors(specificUserRoute),
);


router.patch(
  '/users/me',
  requireAuthentication,
  atLeastOneBodyValueValidator(['username', 'password']),
  validationCheck,
  catchErrors(updateCurrentUserRoute)
);

router.patch(
  '/users/:id',
  requireAuthentication,
  requireAdmin,
  catchErrors(specificUserRoutePatch)
);
