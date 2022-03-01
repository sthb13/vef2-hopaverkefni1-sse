/* eslint-disable no-underscore-dangle */
import { describe, expect, test } from '@jest/globals';
import crypto from 'crypto';
import {
  createRandomUserAndReturnWithToken, fetchAndParse,
  loginAsHardcodedAdminAndReturnToken, postAndParse
} from './utils.js';


describe('/users', () => {
  test('GET /users requires auth', async () => {
    const { status } = await fetchAndParse('/users');

    expect(status).toBe(401);
  });

  test('GET /users/1 requires auth', async () => {
    const token = await loginAsHardcodedAdminAndReturnToken();
    expect(token).toBeTruthy();

    const { result, status } = await fetchAndParse('/users/1', token);

    expect(status).toBe(200);
    expect(result.id).toBe(1);
    expect(result.username).toBeDefined();
  });

   test('GET /users/me requires register', async () => {
    const { user, token } = await createRandomUserAndReturnWithToken();
    expect(token).toBeTruthy();
    expect(user.admin).toBe(false);

    const { result, status } = await fetchAndParse('/users/me', token);

    expect(status).toBe(200);
    expect(result.id).toBe(user.id);
  });


  test('POST /users/login missing data', async () => {
    const data = null;
    const { status } = await postAndParse('/users/login', data);

    expect(status).toBe(401);
  });

  test('POST /users/register ', async () => {
    const rnd = crypto.randomBytes(5).toString('hex');
    const name = `name${rnd}`;
    const password = 'password';

    const data = {name, username:name, password };
    const { status ,result } = await postAndParse('/users/register', data);

    expect(status).toBe(201);
    expect(result.name).toBe(name);
    expect(result.username).toBe(name);
    expect(result.id).toBeGreaterThan(0);
  });

});
