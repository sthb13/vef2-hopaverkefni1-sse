import dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import pg from 'pg';

const SCHEMA_FILE = './sql/schema.sql';
const DROP_SCHEMA_FILE = './sql/drop.sql';
const INSERT_TEST = './sql/post.sql';

dotenv.config();

const {
  DATABASE_URL: connectionString,
  NODE_ENV: nodeEnv = 'development'
  } =process.env;

if (!connectionString) {
  console.error('vantar DATABASE_URL í .env');
  process.exit(-1);
}

// Notum SSL tengingu við gagnagrunn ef við erum *ekki* í development
// mode, á heroku, ekki á local vél
const ssl = nodeEnv === 'production' ? { rejectUnauthorized: false } : false;

const pool = new pg.Pool({ connectionString, ssl });

pool.on('error', (err) => {
  console.error('Villa í tengingu við gagnagrunn, forrit hættir', err);
  process.exit(-1);
});

export async function query(q, values = []) {
  let client;
  try {
    client = await pool.connect();
  } catch (e) {
    console.error('unable to get client from pool', e);
    return null;
  }

  try {
    const result = await client.query(q, values);
    return result;
  } catch (e) {
    if (nodeEnv !== 'test') {
      console.error('unable to query', e);
    }
    return null;
  } finally {
    client.release();
  }
}

export async function createSchema(schemaFile = SCHEMA_FILE) {
  const data = await readFile(schemaFile);

  return query(data.toString('utf-8'));
}

export async function dropSchema(dropFile = DROP_SCHEMA_FILE) {
  const data = await readFile(dropFile);

  return query(data.toString('utf-8'));
}

export async function insertTest(insertFile = INSERT_TEST) {
  const data = await readFile(insertFile);

  return query(data.toString('utf-8'));
}

export async function end() {
  await pool.end();
}

export async function conditionalUpdate(table, id, fields, values) {
  const filteredFields = fields.filter((i) => typeof i === 'string');
  const filteredValues = values
    .filter((i) => typeof i === 'string'
      || typeof i === 'number'
      || i instanceof Date);

  if (filteredFields.length === 0) {
    return false;
  }

  if (filteredFields.length !== filteredValues.length) {
    throw new Error('fields and values must be of equal length');
  }

  // id is field = 1
  const updates = filteredFields.map((field, i) => `${field} = $${i + 2}`);

  const q = `
    UPDATE ${table}
      SET ${updates.join(', ')}
    WHERE
      id = $1
    RETURNING *
    `;

  const queryValues = [id].concat(filteredValues);

  console.info('Conditional update', q, queryValues);

  const result = await query(q, queryValues);

  return result;
}


export async function getEveryProductByDate() {
  const q = `
    SELECT *
    FROM products
    ORDER BY created ASC
    `;
  const result = await query(q);
  if (result && result.rowCount !== 0) {
    return result.rows;
  }
  return null;
}

export async function addProduct(title, price, description, img, categoryID) {
  const values = [title, price, description, img, categoryID];
  const q = `
    INSERT INTO
      products (title, price, description, img, categoryID)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING
      title, price, description, img, categoryID
    `;
  const result = await query(q, values);
  if (result){
    return result.rows;
  }
  return null;
}
export async function total() {
try {
    const result = await query(
      'SELECT COUNT(*) AS count FROM products');
    return (result.rows && result.rows[0] && result.rows[0].count) || 0;
  } catch (e) {
    console.error('Error counting products', e);
  }

  return 0;
}

export async function totalOrders() {
try {
    const result = await query(
      'SELECT COUNT(*) AS count FROM orders');
    return (result.rows && result.rows[0] && result.rows[0].count) || 0;
  } catch (e) {
    console.error('Error counting products', e);
  }

  return 0;
}
