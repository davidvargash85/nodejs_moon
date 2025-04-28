import { Request, Response, NextFunction } from 'express';
import { Product } from '../models';
// import { Cart } from '../models/cart';

// GET /products
export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) {
    console.log('>> no user found');
    res.redirect('/');
  }
  Product.findAll()
    .then((products) => { 
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch((err) => console.log(err));
};

// GET /products/:productId
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const prodId = req.params.productId;
  try {
    const product = await Product.findByPk(prodId);
    if (!product) {
      return res.redirect('/');
    }
    res.render('shop/product-detail', {
      product,
      pageTitle: product.title,
      path: '/products'
    });
  } catch (error) {
    console.log(error);
  }
};

// GET /
export const getIndex = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.findAll();  // ✅ added await (you forgot it before)
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  } catch (error) {
    console.log(error);
  }
};

// GET /cart
export const getCart = (req: Request, res: Response, next: NextFunction) => {
  // Cart.getCart((cart) => {
  //   Product.findAll().then((products) => {
  //     const cartProducts = [];
  //     for (const product of products) {
  //       const cartProductData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   });
  // });
};

// POST /cart
export const postCart = (req: Request, res: Response, next: NextFunction) => {
  // const prodId = req.body.productId;
  // Product.findByPk(prodId).then((product) => {
  //   Cart.addProduct(prodId, product.price);
  // });
  // res.redirect('/cart');
};

// POST /cart-delete-item
export const postCartDeleteProduct = (req: Request, res: Response, next: NextFunction) => {
  // const prodId = req.body.productId;
  // Product.findByPk(prodId).then((product) => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/cart');
  // });
};

// GET /orders
export const getOrders = (req: Request, res: Response, next: NextFunction) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

// GET /checkout
export const getCheckout = (req: Request, res: Response, next: NextFunction) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
