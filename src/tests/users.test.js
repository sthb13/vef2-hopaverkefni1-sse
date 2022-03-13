/* eslint-disable no-underscore-dangle */
import { describe, expect, test } from '@jest/globals';
import { fetchAndParse, loginAsHardcodedAdminAndReturnToken, postAndParse } from './utils.js';


describe('/users', () => {
  test('POST /users/login missing data', async () => {
    const data = null;
    const { status } = await postAndParse('/users/login', data);

    expect(status).toBe(400);
  });


  test('POST /users/register success', async () => {
    const data = { username:'user1234', password:'123456' };
    const { result, status } = await postAndParse('/users/register', data);

    expect(status).toBe(201);
    expect(result.username).toBe(data.username);
    expect(result.password).toBeUndefined();
  });


  test('GET /users/1 requires auth', async () => {
    const token = await loginAsHardcodedAdminAndReturnToken();
    expect(token).toBeTruthy();

    const { result, status } = await fetchAndParse('/users/1', token);

    expect(status).toBe(200);
    expect(result.id).toBe(1);
    expect(result.username).toBeDefined();
  });

});
