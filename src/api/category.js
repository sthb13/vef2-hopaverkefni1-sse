import {conditionalUpdate, query} from'../db.js';

export async function findCategories(){
  const q = `SELECT * FROM category`;

  try{
    const result = await query(q);
    if(result.rowCount > 0) return result.rows;
  } catch (e) {
    console.error('Engar vörur fundust');
  }
  return null;
}

export async function createCategory(title){
  const q = `INSERT INTO
               category (title)
             VALUES ($1)`;
  try {
    const result = await query (q, [title]);
    return result.rows[0];
  } catch (e) {
    console.error('Gat ekki búið til flokk', e);
  }
  return null;
}

export async function updateCategory(id, title){
  const q = `UPDATE category
               SET title = $2
             WHERE id = $1`;
  try {
    const result = await query (q, [id, title]);
    return result.rows[0];
  } catch (e) {
    console.error('Gat ekki búið til flokk', e);
  }
  return null;
}

//TODO virkar ekki útaf tengingu við products
export async function deleteCategory(id){
  const q = `DELETE FROM category WHERE id = $1`;
  try{
    const result = await query (q, [id]);
    return result.rows[0];
  } catch (e) {
    console.error('Gat ekki eytt flokk', e);
  }
  return null;
}
