/* eslint-disable no-underscore-dangle */
import { describe, expect, test } from '@jest/globals';
import {
  deleteAndParse, fetchAndParse, loginAsHardcodedAdminAndReturnToken,
  patchAndParse, postAndParse
} from './utils.js';


describe('/menu', () => {
  test('GET /menu', async () => {
    const { status, result } = await fetchAndParse('/menu');

    expect(status).toBe(200);
    expect(result.totalPages).toBeGreaterThan(1);
    expect(result.items).toBeDefined();
    expect(result.items.length).toBeGreaterThan(1);
  });

  test('POST /menu requires admin', async () => {
    const { status} = await postAndParse('/menu');

    expect(status).toBe(401);
  });

  test('GET /menu/:id ', async () => {
    const { status, result }  = await fetchAndParse('/menu/1');

    expect(status).toBe(200);
    expect(result.id).toBe(1);
    expect(result.title).toBeDefined();
  });

  test('PATCH /menu/:id  requires admin missing data  ', async () => {
    const token = await loginAsHardcodedAdminAndReturnToken();
    expect(token).toBeTruthy();

    const data = {price:100,
    description:`Ananas, hvítlaukur, kantolía, oregano,
     pepperoni, rjómaostur, sveppir, sósa og ostur`,
      img:'img', categoryID:1};

    const { status }  = await patchAndParse('/menu/1', data , token);
    expect(status).toBe(400);

  });

  test('DELETE /menu/:id requires admin ', async () => {
    const { status } = await deleteAndParse('/menu/1');
    expect(status).toBe(401);
  });


});
