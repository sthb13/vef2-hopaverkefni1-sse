import { createSchema, dropSchema, end, insertTest } from './db.js';

// Setja upp töflur og gögn fyrir vidburdir DB
async function create() {
  await dropSchema();
  console.info('Schema dropped');
  await createSchema();
  console.info('Schema created');
  await insertTest();
  console.info('Data simulated');
  await end();
}

create().catch((err) => {
  console.error('Error creating running setup', err);
});
