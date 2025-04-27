import express from 'express';
import path from 'path';
import { 
  getAddProduct, 
  getProducts, 
  postAddProduct, 
  getEditProduct, 
  postEditProduct, 
  postDeleteProduct 
} from '../controllers/admin';

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/products => GET
router.get('/products', getProducts);

// /admin/add-product => POST
router.post('/add-product', postAddProduct);

// /admin/edit-product/:productId => GET
router.get('/edit-product/:productId', getEditProduct);

// /admin/edit-product => POST
router.post('/edit-product', postEditProduct);

// /admin/delete-product => POST
router.post('/delete-product', postDeleteProduct);

export default router;
