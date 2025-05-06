import express from 'express';
import { 
  getIndex, 
  getProducts, 
  getProduct, 
  getCart, 
  postCart, 
  postCartDeleteProduct, 
  getOrders, 
  getCheckout 
} from '../controllers/shop';

const router = express.Router();

// GET /
router.get('/', getIndex);

// GET /products
router.get('/products', getProducts);

// GET /products/:productId
router.get('/products/:productId', getProduct);

// GET /cart
router.get('/cart', getCart);

// POST /cart
router.post('/cart', postCart);

// POST /cart-delete-item
router.post('/cart-delete-item', postCartDeleteProduct);

// GET /orders
router.get('/orders', getOrders);

// GET /checkout
router.post('/checkout', getCheckout);

export default router;
