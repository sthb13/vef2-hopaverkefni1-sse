/* eslint-disable no-underscore-dangle */
import { describe, expect, test } from '@jest/globals';
import { fetchAndParse } from './utils.js';


describe('/menu', () => {
  test('GET /menu', async () => {
    const { status } = await fetchAndParse('/menu');

    expect(status).toBe(200);
  });

});
