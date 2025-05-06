import { Request, Response, NextFunction } from 'express';
import { CartPageViewModel, ProductInCartViewModel } from '../models/view-models/cart-page-view-model';
import { ProductDoc, ProductModel } from '../models/product';
import { OrderModel } from '../models/order';
import { Cart } from '../models/cart';
import { Types } from 'mongoose';

// GET /products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await ProductModel.find();
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  } catch (error) {
    console.log('error while fetching products', error);
    res.redirect('/');
  }

};

// GET /products/:productId
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const prodId = req.params.productId;
  try {
    const product = await ProductModel.findById(prodId);
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
    const products = await ProductModel.find();  // ✅ added await (you forgot it before)
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
export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) {
    console.log('>> user not found');
    return res.redirect('/');
  }

  try {
    let cart = await Cart.findOne({ user: user._id });

    if (!cart) {
      cart = await Cart.create({
        user: user._id,
        products: [],
      });
    } else {
      await cart.populate('products.product');
    }

    const products: ProductInCartViewModel[] = cart.products.map(item => {
      if (typeof item.product === 'object' && item.product !== null && '_id' in item.product) {
        const product = item.product as unknown as ProductDoc;
        return {
          id: product._id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          userId: product.user,
          quantity: item.quantity,
          description: product.description,
        };
      }

      // fallback if not populated
      return {
        id: item.product as unknown as Types.ObjectId,
        title: '',
        price: Types.Decimal128.fromString('0'), // ✅ fix here
        imageUrl: '',
        description: '',
        userId: cart.user,
        quantity: item.quantity
      };
    });

    console.log('>> products in cart:', products);

    // Render or send response
    return res.render('shop/cart', {
      products: products,
      pageTitle: 'Your Cart',
      path: '/cart'
    } satisfies CartPageViewModel);
  } catch (error) {
    console.log('>> error occurred while fetching cart items', error);
    return res.redirect('/');
  }
};

// POST /cart
export const postCart = async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.body.productId;
  if (!productId) {
    console.log('>> product not found');
    return res.redirect('/');
  }

  const user = req.user;
  if (!user) {
    console.log('>> user not found');
    return res.redirect('/');
  }

  try {
    let cart = await Cart.findOne({ user: user._id }).populate('products.product');

    if (!cart) {
      cart = await Cart.create({
        user: user._id,
        products: [{
          product: productId,
          quantity: 1
        }]
      });
    } else {
      const product = cart.products.find((p) => p.product.equals(productId));
      if (product) {
        product.quantity += 1;
      } else {
        cart.products.push({
          product: productId,
          quantity: 1,
        })
      }
      await cart.save();
    }

    return res.redirect('/cart');
  } catch (error) {
    console.log('>> error occurred while adding product to cart', error);
    return res.redirect('/');
  }
};

// POST /cart-delete-item
export const postCartDeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.body.productId;
  if (!productId) {
    console.log('>> product not found');
    return res.redirect('/');
  }

  const user = req.user;
  if (!user) {
    console.log('>> user not found');
    return res.redirect('/');
  }

  try {
    const cart = await Cart.findOne({
      user: user.id,
    }).populate('products.product');

    if (!cart) {
      console.log('... error finding cart');
      return res.redirect('/');
    }

    cart.products = cart.products.filter((p) => !p.product.equals(productId));
    await cart.save()
    console.log(`>> removed product ${productId} from cart`);
    return res.redirect('/cart');
  } catch (error) {
    console.log('>> error while deleting cart product')
    return res.redirect('/');
  }
};

// GET /orders
export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      console.log('>> user not found');
      return res.redirect('/');
    }

    const orders = await OrderModel.find({
      user: user._id
    })

    orders.forEach((order) => {
      console.log('Order ID:', order._id.toString());
      console.log('Total:', parseFloat(order.total.toString()));

      order.products.forEach((p, i) => {
        console.log(`Product #${i + 1}:`);
        console.log('  ID:', p.productId.toString());
        console.log('  Title:', p.title);
        console.log('  Price:', parseFloat(p.price.toString()));
        console.log('  Quantity:', p.quantity);
      });
    });

    const viewOrders = orders.map(order => ({
      id: order._id.toString(),
      total: parseFloat(order.total.toString()),
      products: order.products.map(p => ({
        productId: p.productId.toString(),
        title: p.title,
        price: parseFloat(p.price.toString()), // ✅ convert here
        quantity: p.quantity,
      })),
    }));

    res.render('shop/orders', {
      orders: viewOrders,
      path: '/orders',
      pageTitle: 'Your Orders'
    });
  } catch (error) {
    console.log('>> error occurred while fetching user orders', error);
    return res.redirect('/');
  }
};

// GET /checkout
export const getCheckout = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) {
    console.log('>> user not found');
    return res.redirect('/');
  }

  try {
    const cart = await Cart.findOne({ user: user._id }).populate({
      path: 'products.product',
      model: 'Product'
    });
    if (!cart) {
      res.status(400).send({ message: 'There is no cart associated with this user' });
      return;
    }
    console.log(cart.products[0].product);

    const total = cart.products.reduce((t, p) => {
      const prod = p.product as unknown as ProductDoc;
      return t += (parseFloat(prod.price.toString()) * p.quantity);
    }, 0)

    const orderProducts = cart.products.map((p, i) => {
      const rawProduct = p.product;

      const prod = rawProduct as unknown as ProductDoc;

      if (!prod || typeof prod !== 'object' || !('title' in prod)) {
        throw new Error(`Product at index ${i} is not properly populated`);
      }

      return {
        productId: (prod as ProductDoc)._id,
        title: (prod as ProductDoc).title,
        price: (prod as ProductDoc).price,
        quantity: p.quantity
      };
    });

    const order = await OrderModel.create({
      user: user._id,
      products: orderProducts,
      total
    })

    cart.products = [];
    cart.save();

    res.redirect('/orders')
  } catch (error) {
    console.log('>> error occurred while creating an order', error);
    return res.redirect('/');
  }
  console.log('>> checkout', user._id)
};
