import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { requireAdmin } from '../auth/passport.js';
import { total, totalOrders } from '../db.js';
import { getURLForCloudinary } from '../utils/cloudinary.js';
import { catchErrors } from '../utils/errorsHandler.js';
import { pagingInfo, setPagenumber } from '../utils/utils.js';
import { validationCheck } from '../validation/helpers.js';
import {
  menuTitleDoesNotExistValidator, sanitizationMiddlewareMenu, validationMenu,
  xssSanitizationMenu, xssSanitizationOrderStatus, sanitizationMiddlewareOrderStatus,
  validationOrderStatus, xssSanitizationOrder, sanitizationMiddlewareOrder, validationOrder,
  sanitizationMiddlewareCategory, xssSanitizationCategory, validationCategory,
  xssSanitizationCategoryId, sanitizationMiddlewareCategoryId, validationCategoryId,
  xssSanitizationCart, sanitizationMiddlewareCart, validationCart, xssSanitizationCartItems,
  sanitizationMiddlewareCartItems, validationCartItems, xssSanitizationEditCart,
  sanitizationMiddlewareEditCart, validationEditCart
} from '../validation/validators.js';
import {
  addCart, addProductToCartById, deleteBasketItems, deleteCartById,
  deleteLine, findCartById, findLineInCart, updateLineAmount
} from './cart.js';
import { createCategory, deleteCategory, findCategories, updateCategory } from './category.js';
import {
  createProduct, deleteProduct, findMenuByID, findMenuByTitle,
  findProducts, findProductsByCategory, getProductById, searchProducts, updateProduct
} from './menu.js';
import {
  createOrder, getAllOrders, getOrderByID, setOrderItems,
  setOrderStatus, getOrderStatus, updateOrderStatus
} from './orders.js';



export const router = express.Router();

const PAGE_SIZE = 10;

/* function returnResource(req, res) {
  return res.json(req.resource);
} */

async function menuRoute(req, res){
  const { category,search }= req.query;
  let { page = 1 } = req.query;
  page = setPagenumber(page);
  const offset = (page - 1) * PAGE_SIZE;

  let menu;
  if(category){
    menu = await findProductsByCategory(PAGE_SIZE, offset,category);
  }else if(search){
    menu = await searchProducts(PAGE_SIZE, offset, search);
  }
  else{
    menu = await findProducts(PAGE_SIZE, offset);
  }

  const totalProducts = parseInt(await total(), 10);
  const paging = await pagingInfo(
    {
      page, offset, count: totalProducts, listLength: menu.length, PAGE_SIZE, items: menu
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
  // const { path: imagePath } = req.file;   Veit ekki alveg hvernig á að setja inn í cURL
  //                                         Þannig img er absolute path frá því hvar myndin er.
  const url = await getURLForCloudinary(img);
  if(!url){
    res.status(400).json({ error: 'Mynd þarf að vera absolute path frá eigin tölvu' });
  }

  const result = await createProduct(title, price, description, url, categoryID);
  if (!result){
    return res.status(401).json();
  }
  return res.status(201).json(result);
}

async function patchProductRoute(req, res){
  const { id } = req.params;
  const { title, price, description, img, categoryID } = req.body;

  const beForChanges= await findMenuByID(id);
  if (beForChanges.title!== title){
    const isTitleAvailable= await findMenuByTitle(title);
    if (isTitleAvailable){
      res.status(400).json({ error: 'Titill er nú þegar til að annari vöru' });
    }
  }
  const url = await getURLForCloudinary(img);
  if(!url){
    res.status(400).json({ error: 'Mynd þarf að vera absolute path frá eigin tölvu' });
  }
  const result = await updateProduct(id, title, price, description, url, categoryID);
  if (!result){
    return res.status(500).json();
  }
  return res.status(201).json(result);
}

async function deleteProductRoute(req, res){
  const { id } = req.params;
  const product =await getProductById(id);
  if(!product){
    return res.status(404).json({ error: 'Þessi var er ekki til' });
  }
  const result = await deleteProduct(id);
  if(!result){
    return res.status(500).json();
  }
  return res.status(200).json();
}

async function getOrdersRoute(req, res){
  let { page = 1 } = req.query;
  page = setPagenumber(page);
  const offset = (page - 1) * PAGE_SIZE;
  const orders = await getAllOrders(PAGE_SIZE, offset);
  const totals = parseInt(await totalOrders(), 10);
  const paging = await pagingInfo(
    {
      page, offset, count: totals, listLength: orders.length, PAGE_SIZE, items: orders
    },

  );
  if(!orders) return res.status(404).json({error: 'No orders found'});
  return res.status(200).json(paging);
}

async function postOrdersRoute(req, res){
  const { name , cart } = req.body;
  const orderID = uuidv4();
  // Búa til pöntun
  const result = await createOrder(orderID, name);
  if(!result){
    return res.status(500).json('Ekki er hægt að búa til pöntun');
  }

  // Setja status á pöntun
  const setStatus = await setOrderStatus(orderID,1);

  if(!setStatus){
    return res.status(500).json('Ekki er hægt að setja stöðu á pöntun');
  }
  // finn núverandi körfu

  const findCart = await findCartById(cart);

  if (!findCart ){
    return res.status(500).json('Þessi karfa er ekki til');
  }

  // færa gögn frá körfu í orderItems
  for (const item in findCart) {
    if(item){
      const setItemsOnOrder =
      // eslint-disable-next-line no-await-in-loop
      await setOrderItems( findCart[item].productid ,orderID,findCart[item].amount);
      if(!setItemsOnOrder){
        console.error('Gat ekki sett körfu á pöntun');
      }
    }
  }
  // Eyða körfu
  const deleteCartItems = await deleteBasketItems(findCart[0].basketid);
  if(!deleteCartItems){
    return res.status(500).json('Tókst ekki að eyða öllum hlutum úr körfu');
  }
  const deleteCart = await deleteCartById(findCart[0].basketid);
  if(!deleteCart){
    return res.status(500).json('Ekki er hægt að eyða körfu');
  }

  return res.status(201).json({result , setStatus});
}

async function getOrdersIdRoute(req,res){
  const { id } = req.params;
  const result = await getOrderByID(id);
  if(!result){
    return res.status(500).json('Fann ekki pöntun');
  }
  const sum = result.reduce((p,c) => p + c.price * c.amount, 0);

  return res.status(200).json({result, sum});
}

async function getOrderStatusRoute(req, res){
  const { id } = req.params;
  const result = await getOrderStatus(id);
  if(!result){
    return res.status(500).json('Fann ekki stöðu pöntunar');
  }
  return res.status(200).json(result);
}

async function postOrderStatusRoute(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const result = await updateOrderStatus(id, status);
  if(!result){
    return res.status(500).json('Fann ekki pöntun til að uppfæra');
  }
  return res.status(200).json(result);
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
  const { cartid } = req.params;

  const deleteItems= await deleteBasketItems(cartid);
  if(!deleteItems){
    const result = await deleteCartById(cartid);
    if(!result){
      return res.status(500).json('Ekki er hægt að eyða körfu');
    }
  }
  else{
    const result = await deleteCartById(cartid);
    if(!result){
      return res.status(500).json('Ekki er hægt að eyða körfu');
    }
  }
  return res.status(201).json();

}

async function addCartRoute(req,res){
  const id  = uuidv4();

  const result = await addCart(id);
  return res.status(200).json(result);
}

async function getLineInCartRoute(req,res){
  const { cartid, id } = req.params;
  const result = await findLineInCart(cartid, id);
  return res.status(200).json(result);
}

async function updateLineRoute(req,res){
  const { cartid,id } = req.params;
  const { amount } = req.body;

  const result = await updateLineAmount(cartid,id,amount);

  return res.status(201).json(result);
}

async function deleteLineRoute(req,res){
  const { cartid, id} = req.params;

  const result = await deleteLine(cartid, id);

  return res.status(200).json(result);
}

// TOODO : validation
router.get(
  '/menu',
  catchErrors(menuRoute));

router.post(
  '/menu',
  requireAdmin,
  xssSanitizationMenu,
  sanitizationMiddlewareMenu,
  menuTitleDoesNotExistValidator,
  validationMenu,
  validationCheck,
  catchErrors(addProductRoute));

router.get(
  '/menu/:id',
  catchErrors(getProductRoute));

router.patch(
  '/menu/:id',
  requireAdmin,
  xssSanitizationMenu,
  sanitizationMiddlewareMenu,
  validationMenu,
  catchErrors(patchProductRoute));

router.delete(
  '/menu/:id',
   requireAdmin,
   catchErrors(deleteProductRoute));

router.get('/orders', requireAdmin, catchErrors(getOrdersRoute));
router.post(
  '/orders',
  xssSanitizationOrder,
  sanitizationMiddlewareOrder,
  validationOrder,
  validationCheck,
  catchErrors(postOrdersRoute));
router.get('/orders/:id',catchErrors(getOrdersIdRoute));
router.get('/orders/:id/status', requireAdmin, catchErrors(getOrderStatusRoute));
router.post(
    '/orders/:id/status',
    requireAdmin,
    xssSanitizationOrderStatus,
    sanitizationMiddlewareOrderStatus,
    validationOrderStatus,
    validationCheck,
    catchErrors(postOrderStatusRoute));


router.get('/categories', catchErrors(categoriesRoute));
router.post(
  '/categories',
  requireAdmin,
  xssSanitizationCategory,
  sanitizationMiddlewareCategory,
  validationCategory,
  validationCheck,
  catchErrors(addCategoryRoute));
router.patch(
  '/categories/:id',
  requireAdmin,
  xssSanitizationCategoryId,
  sanitizationMiddlewareCategoryId,
  validationCategoryId,
  validationCheck,
  catchErrors(updateCategoryRoute));
router.delete('/categories/:id', requireAdmin, catchErrors(deleteCategoryRoute));


router.get('/cart/:cartid', catchErrors(cartRoute));
router.get('/cart/:cartid/line/:id', catchErrors(getLineInCartRoute));
router.post(
  '/cart',
  xssSanitizationCart,
  sanitizationMiddlewareCart,
  validationCart,
  validationCheck,
  catchErrors(addCartRoute));
router.post(
  '/cart/:cartid',
  xssSanitizationCartItems,
  sanitizationMiddlewareCartItems,
  validationCartItems,
  validationCheck,
  catchErrors(addToCartRoute));
router.patch(
  '/cart/:cartid/line/:id',
  xssSanitizationEditCart,
  sanitizationMiddlewareEditCart,
  validationEditCart,
  validationCheck,
  catchErrors(updateLineRoute));
router.delete('/cart/:cartid', catchErrors(deleteCartRoute));
router.delete('/cart/:cartid/line/:id', catchErrors(deleteLineRoute));
