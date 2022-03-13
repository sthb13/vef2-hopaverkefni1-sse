/* eslint-disable no-underscore-dangle */
import { describe, expect, test } from '@jest/globals';
import { fetchAndParse } from './utils.js';


describe('/categories', () => {
  test('GET /categories', async () => {

    const { status ,result} = await fetchAndParse('/categories');

    expect(status).toBe(200);
    expect(result.length).toBeDefined();
  });

});
