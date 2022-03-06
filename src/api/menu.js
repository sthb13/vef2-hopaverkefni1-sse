import {conditionalUpdate, query} from'../db.js';

export async function findProducts(){
  const q = `SELECT * FROM products ORDER BY created DESC`;

  try{
    const result = await query(q);
    if(result.rowCount > 0) return result.rows;
  } catch (e) {
    console.error('Engar vörur fundust');
  }
  return null;
}

export async function createProduct(title, price, description, img, categoryId){
  const q = `INSERT INTO
               products (title, price, description, img, categoryID)
             VALUES ($1, $2, $3, $4, $5`;
  try {
    const result = await query (q, [title, price, description, img, categoryId]);
    return result.rows[0];
  } catch (e) {
    console.error('Gat ekki búið til vöru');
  }
  return null;
}
