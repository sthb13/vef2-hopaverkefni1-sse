import { query } from '../db.js';

export async function findCartById(id){
  const q = `SELECT p.title, p.price, b.productid, b.basketid, b.amount
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

export async function deleteBasketItems(id){
  try{
    const result = await query (
    `DELETE FROM basketitems
    WHERE basketitems.basketid = $1;`,
     [id]);
     if(result.rowCount>0){
      return true;
     }
  } catch (e) {
    console.error('Gat ekki eytt körfu', e);
  }
  return null;

}

export async function deleteCartById(id){
  const q = 'DELETE FROM baskets WHERE id = $1'
  try{
    const result = await query (q, [id]);
    if(result.rowCount>0){
      return true;
    }
  } catch (e) {
    console.error('Gat ekki eytt körfu', e);
  }
  return null;

}


export async function addCart(id){
  const q = `INSERT INTO baskets (id)
            VALUES ($1) RETURNING id`;
  try{
    const result = await query (q, [id]);
    return result.rows[0];
  }catch (e) {
    console.error('Gat ekki bætt körfu', e);
  }
  return null;
}

export async function findLineInCart(cartid,id){
  // const q = `SELECT basketid AS id, amount, description
  //             FROM basketitems, products
  //             WHERE basketid = $1 LIMIT 1 OFFSET $2`;
  const q = `SELECT basketid AS id, amount, description 
            FROM basketitems b JOIN products p ON (b.productid=p.id) 
            WHERE b.basketid = $1 AND b.id = $2;`            

  try{
      const result = await query(q, [cartid,id]);
      if(result.rowCount > 0) return result.rows;
    } catch (e) {
      console.error('Línan fannst ekki', e);
    }
    return null;
}

export async function updateLineAmount(cartid,id,amount){
  const q = `UPDATE basketitems 
             SET amount = $3 
             WHERE basketid = $1 AND id = $2`;
  try {  
    const result = await query (q, [cartid, id, amount]);
    return result.rows[0];
  } catch (e) {
    console.error('Gat ekki uppfært línu', e);
  }
  return null;
}

export async function deleteLine(cartid,id){
  const q = `DELETE FROM basketitems
              WHERE basketid = $1 AND id = $2`;
  try {
    const result = await query(q, [cartid, id])
    // console.log(result);
    return result
  } catch (e) {
    console.error('Gat ekki eytt línu')
  }
    return null;
}