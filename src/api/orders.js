import { query } from '../db.js';

export async function getAllOrders(limit, offset){
	const q = `SELECT * FROM orders ORDER BY created DESC
	LIMIT $1 OFFSET $2`
	try{
    const result = await query(q, [limit, offset]);
    if(result.rowCount > 0) return result.rows;
  } catch (e) {
    console.error('Engar pantanir fundust');
  }
  return null;
}

export async function createOrder(id, name){
	const q = `INSERT INTO orders(id, name) VALUES($1, $2)
			   RETURNING id, created, name`;
	try {
		const result = await query(q, [id, name]);
		return result.rows[0];
	} catch (e) {
		console.error('Gat ekki búið til pöntun');
	}
}