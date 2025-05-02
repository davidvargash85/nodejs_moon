import { Request, Response, NextFunction } from 'express';
// import { Cart, CartItem, Product, User } from '../models';
import { CartPageViewModel, ProductInCartViewModel } from '../models/view-models/cart-page-view-model';
// import { Cart } from '../models/cart';

// GET /products
export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  // const user = req.user;
  // if (!user) {
  //   console.log('>> no user found');
  //   res.redirect('/');
  // }
  // Product.findAll()
  //   .then((products) => {
  //     res.render('shop/product-list', {
  //       prods: products,
  //       pageTitle: 'All Products',
  //       path: '/products'
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

// GET /products/:productId
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  // const prodId = req.params.productId;
  // try {
  //   const product = await Product.findByPk(prodId);
  //   if (!product) {
  //     return res.redirect('/');
  //   }
  //   res.render('shop/product-detail', {
  //     product,
  //     pageTitle: product.title,
  //     path: '/products'
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

// GET /
export const getIndex = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const products = await Product.findAll();  // ✅ added await (you forgot it before)
    res.render('shop/index', {
      prods: [],
      pageTitle: 'Shop',
      path: '/'
    });
  } catch (error) {
    console.log(error);
  }
};

// GET /cart
export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  // const user = req.user;
  // if (!user) {
  //   console.log('>> user not found');
  //   return res.redirect('/');
  // }

  // try {
  //   const [cart] = await Cart.findOrCreate({
  //     where: { userId: user.id }
  //   });

  //   if (!cart) {
  //     console.log('>> could not create or find cart');
  //     return res.redirect('/');
  //   }

  //   // Fetch CartItems, including their associated Products
  //   const cartItems = await CartItem.findAll({
  //     where: { cartId: cart.id },
  //     include: [Product] // 👈 Eager-load associated Product
  //   });

  //   // Now map CartItems to their Products
  //   const products: ProductInCartViewModel[] = cartItems.map(item => {
  //     const productsPlain = item.product.get({ plain: true }) as ProductInCartViewModel;
  //     return {
  //       ...productsPlain,
  //       quantity: item.quantity
  //     }
  //   }); // `product` comes from the include

  //   console.log('>> products in cart:', products);

  //   // Render or send response
  //   return res.render('shop/cart', {
  //     products: products,
  //     pageTitle: 'Your Cart',
  //     path: '/cart'
  //   } satisfies CartPageViewModel);
  // } catch (error) {
  //   console.log('>> error occurred while fetching cart items', error);
  //   return res.redirect('/');
  // }
};

// POST /cart
export const postCart = async (req: Request, res: Response, next: NextFunction) => {
  // const productId = req.body.productId;
  // if (!productId) {
  //   console.log('>> product not found');
  //   return res.redirect('/');
  // }

  // const user = req.user;
  // if (!user) {
  //   console.log('>> user not found');
  //   return res.redirect('/');
  // }

  // try {
  //   const [cart] = await Cart.findOrCreate({
  //     where: { userId: user.id }
  //   });

  //   if (!cart) {
  //     console.log('>> could not create or find cart');
  //     return res.redirect('/');
  //   }

  //   console.log('>> product-id', productId);

  //   const [cartItem, createdCartItem] = await CartItem.findOrCreate({
  //     where: {
  //       cartId: cart.id,
  //       productId: productId
  //     },
  //     defaults: {
  //       quantity: 1,
  //     }
  //   });

  //   if (!cartItem) {
  //     console.log('>> could not create cartItem');
  //     return res.redirect('/');
  //   }

  //   if (!createdCartItem) {
  //     // If it already existed, increment the quantity
  //     await cartItem.increment('quantity', { by: 1 });
  //     console.log('>> Incremented quantity for existing cart item');
  //   } else {
  //     console.log('>> Created new cart item with quantity 1');
  //   }

  //   return res.redirect('/cart');
  // } catch (error) {
  //   console.log('>> error occurred while adding product to cart', error);
  //   return res.redirect('/');  // 👈 Always respond
  // }
};

// POST /cart-delete-item
export const postCartDeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  // const productId = req.body.productId;
  // if (!productId) {
  //   console.log('>> product not found');
  //   return res.redirect('/');
  // }

  // const user = req.user;
  // if (!user) {
  //   console.log('>> user not found');
  //   return res.redirect('/');
  // }

  // try {
  //   const cart = await Cart.findOne({
  //     where: {
  //       userId: user.id,
  //     }
  //   })

  //   if (!cart) {
  //     console.log('... error finding cart');
  //     return res.redirect('/');
  //   }

  //   // await cart.removeProduct(productId); // this uses your declared mixin
  //   await CartItem.destroy({
  //     where: {
  //       productId,
  //       cartId: cart.id
  //     }
  //   })
  //   console.log(`>> removed product ${productId} from cart`);

  //   return res.redirect('/cart');
  // } catch (error) {
  //   console.log('>> error while deleting cart product')
  //   return res.redirect('/');
  // }
};

// GET /orders
export const getOrders = (req: Request, res: Response, next: NextFunction) => {
  // res.render('shop/orders', {
  //   path: '/orders',
  //   pageTitle: 'Your Orders'
  // });
};

// GET /checkout
export const getCheckout = (req: Request, res: Response, next: NextFunction) => {
  // res.render('shop/checkout', {
  //   path: '/checkout',
  //   pageTitle: 'Checkout'
  // });
};
