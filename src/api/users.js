import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import xss from 'xss';
import { conditionalUpdate, query } from '../db.js';
import { isInt, isString } from '../utils/utils.js';

dotenv.config();

/**
 * Hjálparföll fyrir notendur, uppfletting, búa til, uppfæra.
 */

const {
  BCRYPT_ROUNDS: bcryptRounds = 1,
} = process.env;

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
export async function createUser(username, password, admin = false) {
  // Geymum hashað password!
  const hashedPassword = await bcrypt.hash(password, 11);

  const q = `
    INSERT INTO
      users (username, password, admin)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  try {
    const result = await query(q, [ username, hashedPassword, admin]);
    return result.rows[0];
  } catch (e) {
    console.error('Gat ekki búið til notanda');
  }

  return null;
}

export async function updateUser(id, username, password) {
  if (!isInt(id)) {
    return null;
  }

  const fields = [
    isString(username) ? 'username' : null,
    isString(password) ? 'password' : null,
  ];

  let hashedPassword = null;

  if (password) {
    hashedPassword = await bcrypt.hash(password, parseInt(bcryptRounds, 10));
  }

  const values = [
    isString(username) ? xss(username) : null,
    hashedPassword,
  ];

  const result = await conditionalUpdate('users', id, fields, values);

  if (!result) {
    return null;
  }

  const updatedUser = result.rows[0];
  // delete updatedUser.password;

  return updatedUser;
}


export async function updateAdmin(user, isAdmin) {
  const q = `
    UPDATE users
    SET admin=$2
    WHERE id = $1
    RETURNING *
    `;
    try {
      const result = await query(q, [user, isAdmin]);
      if (result.rowCount === 1) {
        return result.rows[0];
      }
    } catch (e) {
      console.error('Gat ekki búið til notanda');
    }

    return null;
}




