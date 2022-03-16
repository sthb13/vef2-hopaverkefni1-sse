import { query } from'../db.js';

export async function findCartById(id){
  const q = `SELECT p.title, p.price, b.productid, b.amount
             FROM products p, basketitems b
             WHERE p.id = b.productid AND b.basketid = $1`;
  try{
    const result = await query(q, [id]);
    if(result.rowCount > 0) return result.rows;
  } catch (e) {
    console.error('Enginn karfa fannst', e);
  }
  return null;
}

export async function addProductToCartById(id, productId, amount){
  const q = `INSERT INTO basketitems
              (basketid, productid, amount)
             VALUES
              ($1,$2,$3)`;
  try{
    const result = await query (q, [id, productId, amount]);
    return result.rows[0];
  }catch (e) {
    console.error('Gat ekki bætt í körfu', e);
  }
  return null;
}

// TODO virkar ekki, references to basketitems
export async function deleteCartById(id){
  const q = 'DELETE FROM baskets WHERE id = $1'
  try{
    const result = await query (q, [id]);
    return result.rows[0];
  } catch (e) {
    console.error('Gat ekki eytt körfu', e);
  }
  return null;

}

export async function addCart(id){
  const q = `INSERT INTO baskets (id) VALUES ($1) RETURNING id`;
  try{
    const result = await query (q, [id]);
    return result.rows[0];
  }catch (e) {
    console.error('Gat ekki bætt körfu', e);
  }
  return null;
}

export async function findLineInCart(cartid,id){
  const q = `SELECT basketid AS id, amount, description 
              FROM basketitems, products 
              WHERE basketid = $1 LIMIT 1 OFFSET $2`;

  try{
      const result = await query(q, [cartid,id]);
      if(result.rowCount > 0) return result.rows;
    } catch (e) {
      console.error('Línan fannst ekki', e);
    }
    return null;
}