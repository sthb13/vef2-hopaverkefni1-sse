/* eslint-disable no-underscore-dangle */
import { describe, expect, test } from '@jest/globals';
import {
  postAndParse
} from './utils.js';


describe('/users', () => {
  test('POST /users/login missing data', async () => {
    const data = null;
    const { status } = await postAndParse('/users/login', data);

    expect(status).toBe(401);
  });

});
