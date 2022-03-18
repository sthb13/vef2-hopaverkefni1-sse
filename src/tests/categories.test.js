/* eslint-disable no-underscore-dangle */
import { describe, expect, test } from '@jest/globals';
import { fetchAndParse, loginAsHardcodedAdminAndReturnToken } from './utils.js';

describe('/categories', () => {
  test('GET /categories', async () => {

    const { status ,result} = await fetchAndParse('/categories');

    expect(status).toBe(200);
    expect(result.length).toBeDefined();
  });

});

describe('/orders', () => {
  test('GET /orders/:id', async () => {
    const token = await loginAsHardcodedAdminAndReturnToken();
    expect(token).toBeTruthy();

    const { status ,result} =
     await fetchAndParse('/orders/53f65136-db08-498e-9b4f-b9e048483232',token );

    expect(status).toBe(200);
    expect(result.result).toBeDefined();
    expect(result.sum).toBeDefined();
  });

});
