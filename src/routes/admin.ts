import express, { Request, Response, NextFunction } from 'express';
import { celebrate } from 'celebrate';
import {
  getAddProduct,
  getProducts,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
  syncProductUser
} from '../controllers/admin';
import { productValidationSchema } from '../validators/product-validator';

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/products => GET
router.get('/products', getProducts);

// /admin/add-product => POST
router.post(
  '/add-product',
  (req: Request, res: Response, next: NextFunction) => {
    console.log('🛬 Incoming POST body:', req.body);
    next();
  },
  celebrate({ body: productValidationSchema }), // Validates request body
  postAddProduct
);

// /admin/edit-product/:productId => GET
router.get('/edit-product/:productId', getEditProduct);

// /admin/edit-product => POST
router.post('/edit-product',
  (req: Request, res: Response, next: NextFunction) => {
    console.log('🛬 edit-product -- POST body:', req.body);
    next();
  },
  postEditProduct
);

// /admin/delete-product => POST
router.post('/delete-product', postDeleteProduct);

router.get('/sync-product-user', syncProductUser);

export default router;
