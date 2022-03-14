import express from 'express';

import { requireAuthentication, requireAdmin } from '../auth/passport.js';
import { catchErrors } from '../utils/errorsHandler.js';
import { setPagenumber, pagingInfo } from '../utils/utils.js';
import { total } from '../db.js';
import { findProducts, createProduct, getProductById, updateProduct, deleteProduct } from './menu.js';
import { findCategories, createCategory, updateCategory, deleteCategory } from './category.js';
import { findCartById, addProductToCartById, deleteCartById } from './cart.js';

export const router = express.Router();

const PAGE_SIZE = 10;

function returnResource(req, res) {
  return res.json(req.resource);
}

async function menuRoute(req, res){
  let { page = 1 } = req.query;
  page = setPagenumber(page);
  const offset = (page - 1) * PAGE_SIZE;
  const menu = await findProducts(PAGE_SIZE, offset);
  const totalProducts = parseInt(await total());
  const paging = await pagingInfo(
    {
      page, offset, count: totalProducts, listLength: menu.length, PAGE_SIZE, menu
    },
  );
  if(!menu) return res.status(404).json({error: 'No menus found'});
  return res.status(200).json(paging);
}

async function getProductRoute(req, res){
  const { id } = req.params;
  const result = await getProductById(id);
  if(!result) return res.status(404).json({error: 'No product found'});
  return res.status(200).json(result);
}

async function addProductRoute(req, res){
  const { title, price, description, img, categoryID } = req.body;
  const result = await createProduct(title, price, description, img, categoryID);
  return res.status(201).json(result);
}

async function patchProductRoute(req, res){
  const { id } = req.params;
  const { title, price, description, img, categoryID } = req.body;
  const result = await updateProduct(id, title, price, description, img, categoryID)
  return res.status(201).json(result);
}

async function deleteProductRoute(req, res){
  const { id } = req.params;
  const result = await deleteProduct(id);
  return res.status(200).json(result);
}

async function getOrdersRoute(req, res){

}

async function postOrdersRoute(req, res){
  
}

async function categoriesRoute(req, res){
  const categories = await findCategories();

  if(!categories) return res.status(404).json({error: 'No categories found'});

  return res.status(200).json(categories);
}

async function addCategoryRoute(req, res){
  const { title = '' } = req.body;

  const result = await createCategory(title);

  return res.status(201).json(result);
}


async function updateCategoryRoute(req,res){
  const { title = '' } = req.body;
  const { id } = req.params;

  const result = await updateCategory(id,title);

  return res.status(201).json(result);
}

async function deleteCategoryRoute(req,res){
  const { id } = req.params;

  const result = await deleteCategory(id);

  return res.status(201).json(result);
}

async function cartRoute(req,res) {
  const { cartid } = req.params;

  const lines = await findCartById(cartid);
  const sum =  lines.reduce((p,c) => p + c.price * c.amount, 0);
  const result = {id: cartid, lines, total:sum};
  return res.status(201).json(result);
}

async function addToCartRoute(req,res) {
  const { cartid } = req.params;
  const { productId, amount = '' } = req.body;

  const result = await addProductToCartById(cartid, productId, amount);

  return res.status(201).json(result);
}

async function deleteCartRoute(req,res){
  const { id } = req.params;

  const result = await deleteCartById(id);

  return res.status(201).json(result);

}

router.get('/menu', catchErrors(menuRoute));
router.post('/menu', requireAdmin, catchErrors(addProductRoute));

router.get('/menu/:id', catchErrors(getProductRoute));
router.patch('/menu/:id', requireAdmin, catchErrors(patchProductRoute));
router.delete('/menu/:id', requireAdmin, catchErrors(deleteProductRoute));

router.get('/orders', requireAdmin, catchErrors(getOrdersRoute));
router.post('/orders', catchErrors(postOrdersRoute));
router.get('/categories', catchErrors(categoriesRoute));
//TODO validation
router.post('/categories', requireAdmin, catchErrors(addCategoryRoute));
router.patch('/categories/:id', requireAdmin, catchErrors(updateCategoryRoute));
router.delete('/categories/:id', requireAdmin, catchErrors(deleteCategoryRoute));
router.get('/cart/:cartid', catchErrors(cartRoute));
//TODO validation
router.post('/cart/:cartid', catchErrors(addToCartRoute));
//TODO virkar ekki, references to basketitems
router.delete('/cart/:cartid', catchErrors(deleteCartRoute));
