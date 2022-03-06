import { createSchema, dropSchema, end, insertTest } from './db.js';

// Setja upp töflur og gögn fyrir vidburdir DB
async function create() {
  await dropSchema();
  await createSchema();
  await insertTest()
  await end();
  console.info('Schema created');
}

create().catch((err) => {
  console.error('Error creating running setup', err);
});
