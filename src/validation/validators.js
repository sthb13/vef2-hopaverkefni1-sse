import { body } from 'express-validator';
import xss from 'xss';
import { findMenuByTitle } from '../api/menu.js';
import { comparePasswords, findUserByUsername } from '../api/users.js';
import { LoginError } from '../utils/errorsHandler.js';
import { logger } from '../utils/logger.js';

export const validationUsernameAndPass = [
  body('username')
    .exists()
    .withMessage('username is required')
    .isLength({ min: 4})
    .withMessage('Notendarnafn verður að vera a.m.k 4 stafir')
    .isLength({ max: 32})
    .withMessage('Notendarnafn má ekki vera lengri en 32 stafir'),
  body('password')
    .exists()
    .withMessage('password is required')
    .isLength({ min: 3})
    .withMessage('Lykilorð verður að vera a.m.k 3 stafir')
    .isLength({ max: 32})
    .withMessage('Lykilorð má ekki vera lengra en 32 stafir')
];

export const validationMenu = [
  body('title')
  .exists()
  .withMessage('title is required')
  .isString({ min: 0 })
  .withMessage('title must be a string'),
  body('price')
    .exists()
    .withMessage('price is required')
    .isInt({ min: 1 })
    .withMessage('price must be an integer larger than 0'),
  body('description')
    .exists()
    .withMessage('description is required')
    .isString({ min: 0 })
    .withMessage('description must be a string'),
  body('img')
    .exists()
    .withMessage('img is required')
    .isString({ min: 0 })
    .withMessage('img must be a string'),
  body('categoryID')
    .exists()
    .withMessage('categoryID is required')
    .isIn([1, 2, 3, 4, 5])
    .withMessage('rating must be an integer, one of  1, 2, 3, 4, 5')
];

export const validationOrderStatus = [
  body('status')
  .exists()
  .withMessage('Status is required')
  .isString()
  .withMessage('Status must be a string')
  .isIn(['NEW', 'PREPARE', 'COOKING','READY','FINISHED'])
  .withMessage('Status must be a legal status')
];

export const validationOrder = [
  body('name')
  .exists()
  .withMessage('Order must have a name')
  .isString()
  .withMessage('Name of order must be a string')
  body('cart')
  .exists()
  .withMessage('Order must have a cartID associated')
  .isLength(32)
  .withMessage('cartID is not of UUID length')
  .matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
  .withMessage('cartID must be a valid UUID')
];

export const xssSanitizationUsername = [
  body('username').customSanitizer((v) => xss(v))
];

export const sanitizationMiddlewareUsername = [
  body('username').trim().escape(),
];
export const xssSanitizationMenu = [
  body('title').customSanitizer((v) => xss(v)),
  body('description').customSanitizer((v) => xss(v))
];
export const sanitizationMiddlewareMenu = [
  body('title').trim().escape(),
  body('description').trim().escape(),
];

export const xssSanitizationOrderStatus = [
  body('status').customSanitizer((v) => xss(v))
];

export const sanitizationMiddlewareOrderStatus = [
  body('status').trim().escape(),
];

export const xssSanitizationOrder = [
  body('name').customSanitizer((v) => xss(v)),
  body('cart').customSanitizer((v) => xss(v)),
];

export const sanitizationMiddlewareOrder = [
  body('name').trim().escape(),
  body('cart').trim().escape(),
];

export const usernameDoesNotExistValidator = body('username')
  .custom(async (username) => {
    const user = await findUserByUsername(username);
    if (user) {
      return Promise.reject(new Error('username already exists'));
    }
    return Promise.resolve();
 });

 export const menuTitleDoesNotExistValidator = body('title')
  .custom(async (title) => {
    const menu = await findMenuByTitle(title);
    if (menu) {
      return Promise.reject(new Error('Önnur vara hefur nú þegar þetta nafn'));
    }
    return Promise.resolve();
 });

 export const usernameAndPaswordValidValidator = body('username')
  .custom(async (username, { req: { body: reqBody } = {} }) => {
    // Can't bail after username and password validators, so some duplication
    // of validation here
    // TODO use schema validation instead?
    const { password } = reqBody;

    if (!username || !password) {
      return Promise.reject(new Error('skip'));
    }

    let valid = false;
    try {
      const user = await findUserByUsername(username);
      valid = await comparePasswords(password, user.password);
    } catch (e) {
      // Here we would track login attempts for monitoring purposes
      logger.info(`invalid login attempt for ${username}`);
    }

    if (!valid) {
      return Promise.reject(new LoginError('username or password incorrect'));
    }
    return Promise.resolve();
  });

  export function atLeastOneBodyValueValidator(fields) {
    return body()
      .custom(async (value, { req }) => {
        const { body: reqBody } = req;

        let valid = false;

        for (let i = 0; i < fields.length; i += 1) {
          const field = fields[i];

          if (field in reqBody && reqBody[field] != null) {
            valid = true;
            break;
          }
        }

        if (!valid) {
          return Promise.reject(new Error(`require at least one value of: ${fields.join(', ')}`));
        }
        return Promise.resolve();
      });
  }
