import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import pg from 'pg';
import xss from 'xss';
import {isString, isInt} from '../utils/utils.js';
import {conditionalUpdate} from'./db.js';


dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({ connectionString });

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export async function query(q, values = []) {
  const client = await pool.connect();
  let result;

  try {
    result = await client.query(q, values);
  } catch (err) {
    console.error('Villa í query', err);
    throw err;
  } finally {
    client.release();
  }
  return result;
}

export async function comparePasswords(password, hash) {
  const result = await bcrypt.compare(password, hash);
  return result;
}


export async function findUserByUsername(username) {
  const q = 'SELECT * FROM users WHERE username = $1';

  try {
    const result = await query(q, [username]);

    if (result.rowCount === 1) {
      return result.rows[0];
    }
  } catch (e) {
    console.error('Gat ekki fundið notanda eftir notendnafni');
  }
  return null;
}

export async function findUserById(id) {
  const q = 'SELECT * FROM users WHERE id = $1';

  try {
    const result = await query(q, [id]);

    if (result.rowCount === 1) {
      return result.rows[0];
    }
  } catch (e) {
    console.error('Gat ekki fundið notanda eftir id');
  }

  return null;
}

export async function findAllUsers() {
  const q = 'SELECT * FROM users';

  try {
    const result = await query(q);
    if (result.rowCount > 0) {
      return result.rows;
    }
  } catch (e) {
    console.error('Gat ekki fundið notanda eftir id');
  }

  return null;
}
export async function createUser(name, username, password, admin=false) {
  // Geymum hashað password!
  const hashedPassword = await bcrypt.hash(password, 11);

  const q = `
    INSERT INTO
      users (name,username, password, admin)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  try {
    const result = await query(q, [name, username, hashedPassword, admin]);
    return result.rows[0];
  } catch (e) {
    console.error('Gat ekki búið til notanda');
  }

  return null;
}


export async function updateUser(id, password, email) {
  if (!isInt(id)) {
    return null;
  }

  const fields = [
    isString(password) ? 'password' : null,
    isString(email) ? 'email' : null,
  ];

  let hashedPassword = null;

  if (password) {
    hashedPassword = await bcrypt.hash(password, parseInt(bcryptRounds, 10));
  }

  const values = [
    hashedPassword,
    isString(email) ? xss(email) : null,
  ];

  fields.push('updated');
  values.push(new Date());

  const result = await conditionalUpdate('users', id, fields, values);

  if (!result) {
    return null;
  }

  const updatedUser = result.rows[0];
  delete updatedUser.password;

  return updatedUser;
}
