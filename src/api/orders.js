import { query } from '../db.js';

export async function getAllOrders(limit, offset){
	const q = `SELECT o.id , o.name ,os.status , o.created, os.laststchange
            FROM orders o , orderStatus os
            WHERE o.id = os.orderid
            ORDER BY created DESC
	          LIMIT $1 OFFSET $2`
	try{
    const result = await query(q, [limit, offset]);
    if(result.rowCount > 0) return result.rows;
  } catch (e) {
    console.error('Engar pantanir fundust');
  }
  return null;
}

export async function getOrderByID(id){

	try{
    const result = await query(
    `SELECT *
    FROM orders o, orderitems i, products p
    WHERE o.id = $1 AND i.ordersid= $1 AND p.id=i.productid`,
    [id]);

    if(result.rowCount > 0) {
      return result.rows;
    }

  } catch (e) {
    console.error('Engar pöntun fanst');
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
  return null;
}

export async function setOrderStatus(id){
	const q = `INSERT INTO orderStatus(orderID)
              VALUES($1)
			        RETURNING *`;
	try {
		const result = await query(q, [id]);
		return result.rows[0];
	} catch (e) {
		console.error('Gat ekki búið til pöntun');
	}
  return null;
}

export async function setOrderItems(productID, ordersID,amount ){
	const q = `INSERT INTO orderItems(productID, ordersID ,amount )
              VALUES($1, $2, $3)
			        RETURNING *`;
	try {
		const result = await query(q, [productID, ordersID,amount]);
		return result.rows[0];
	} catch (e) {
		console.error('Gat ekki búið til pöntun');
	}
  return null;
}

export async function deleteOrderItemsBYProductID(id){
  const q = 'DELETE FROM orderitems WHERE productid = $1'
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
