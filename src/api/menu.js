import { query } from '../db.js';
import { deleteBasketItemsByProductID } from './cart.js';
import { deleteOrderItemsBYProductID } from './orders.js';

export async function findProducts(limit, offset){
  const q = `SELECT * FROM products ORDER BY created DESC
             LIMIT $1 OFFSET $2`;

  try{
    const result = await query(q, [limit, offset]);
    if(result.rowCount > 0) return result.rows;
  } catch (e) {
    console.error('Engar vörur fundust');
  }
  return null;
}


export async function findMenuByTitle(title){
  const q = `SELECT *
            FROM products
            WHERE title = $1`;

  try{
    const result = await query(q, [title]);
    if (result.rowCount === 1) {
      return result.rows[0];
    }
  } catch (e) {
    console.error('Gat ekki vöru notanda eftir notendnafni');
  }
  return null;
}

export async function findMenuByID(id){
  const q = `SELECT *
            FROM products
            WHERE id = $1`;

  try{
    const result = await query(q, [id]);
    if (result.rowCount === 1) {
      return result.rows[0];
    }
  } catch (e) {
    console.error('Gat ekki vöru notanda eftir notendnafni');
  }
  return null;
}

export async function findProductsByCategory(limit, offset, category){
  const q = `SELECT * FROM products
            WHERE categoryid= $3
            ORDER BY created DESC
            LIMIT $1 OFFSET $2`;
  try{
    const result = await query(q, [limit, offset, category]);
    if(result.rowCount > 0) return result.rows;
  } catch (e) {
    console.error('Engar vörur fundust');
  }
  return null;
}

export async function searchProducts(limit, offset, search){
  const s = (`%${search}%`);
  const q = `SELECT * FROM products
            WHERE LOWER(title) LIKE $3
            OR LOWER(description) LIKE $3
            ORDER BY created DESC
            LIMIT $1 OFFSET $2`;
  try{
    const result = await query(q, [limit, offset, s]);
    if(result.rowCount > 0) return result.rows;
  } catch (e) {
    console.error('Engar vörur fundust',e);
  }
  return null;
}

export async function createProduct(title, price, description, img, categoryId){
  const q = `INSERT INTO
               products (title, price, description, img, categoryID)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, title, price, description, img, categoryID`;
  try {
    const result = await query(q, [title, price, description, img, categoryId]);
    return result.rows[0];
  } catch (e) {
    console.error('Gat ekki búið til vöru');
  }
  return null;
}

export async function getProductById(id){
  const q = `
            SELECT *
            FROM products
            WHERE id = $1`;
  try {
    const result = await query(q,[id]);
    return result.rows[0];
  } catch (e) {
    console.error('Gat ekki sótt vöru')
  }
  return null;
}

export async function updateProduct(id, title, price, description, img, categoryID) {
  const q = `
    UPDATE products
    SET title = $2, price = $3, description = $4, img = $5, categoryID = $6
    WHERE id = $1
    RETURNING id, title, price, description, img, categoryID`;
    try{
      const result = await query(q,[id, title, price, description, img, categoryID]);
      return result.rows[0];
    } catch (e) {
      console.error('Gat ekki uppfært vöru')
    }
    return null;
}

export async function deleteProduct(id) {
  const deleteBasketItems = deleteBasketItemsByProductID(id);
  if (!deleteBasketItems){
    console.error('Gat ekki eitt vörum úr körfu');
  }
  const  deleteOrderItems = deleteOrderItemsBYProductID(id)
  if(!deleteOrderItems){
    console.error('Gat ekki eitt vörum pöntunum');
  }
  const q = 'DELETE FROM products WHERE id = $1';
  try {
    const result = await query(q, [id])
    if(result.rowCount>0){
      return true;
     }
  } catch (e) {
    console.error('Gat ekki eytt vöru')
  }
    return null;
}
