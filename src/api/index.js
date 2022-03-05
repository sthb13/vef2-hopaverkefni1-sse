import express from 'express';

import { requireAuthentication, requireAdmin } from '../auth/passport.js';
import { catchErrors } from '../utils/errorsHandler.js';

import { findProducts, createProduct } from './menu.js';
import { findCategories, createCategory, updateCategory, deleteCategory} from './category.js';

export const router = express.Router();

function returnResource(req, res) {
  return res.json(req.resource);
}

async function menuRoute(req, res){
  const menu = await findProducts();

  if(!menu) return res.status(404).json({error: 'No menus found'});

  return res.status(200).json(menu);

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

router.get('/menu', catchErrors(menuRoute));
router.get('/categories', catchErrors(categoriesRoute));
router.post('/categories', requireAdmin, catchErrors(addCategoryRoute));
router.patch('/categories/:id', requireAdmin, catchErrors(updateCategoryRoute));
router.delete('/categories/:id', requireAdmin, catchErrors(deleteCategoryRoute));
