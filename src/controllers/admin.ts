import { Request, Response, NextFunction } from 'express';
import { Product, User } from '../models';

// GET /admin/add-product
export const getAddProduct = (req: Request, res: Response, next: NextFunction) => {
  console.log('>> route-loaded:', 'GET /admin/add-product');
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

// POST /admin/add-product
export const postAddProduct = async (req: Request, res: Response, next: NextFunction) => {
  console.log('>> postAddProduct')
  const { title, imageUrl, price, description } = req.body;
  // const user = req.user;
  // if (!user) {
  //   console.log('missing user');
  //   return res.redirect('/');
  // }

  try {
    const p = await Product.create({
      title, imageUrl, price, description,
    })
    console.log('>> product created', p)
    res.redirect('/');
  } catch (error) {
    console.log('error adding product', error)
  }
};

// GET /admin/edit-product
export const getEditProduct = async (req: Request, res: Response, next: NextFunction) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId;

  try {
    const product = await Product.findById(prodId);
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  } catch (err) {
    console.error(err);
  }
};

// POST /admin/edit-product
export const postEditProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId, title, price, imageUrl, description } = req.body;

  try {
    await Product.findByIdAndUpdate(
      productId,
      { title, price, description, imageUrl },
      { new: true, runValidators: true }
    );
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
  }
};

// GET /admin/products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const products = await Product.find();
  try {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  } catch (err) {
    console.error(err);
  }
};

// POST /admin/delete-product
export const postDeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.body;

  console.log('>> POST /admin/delete-product', productId);

  try {
    const deleted = await Product.findByIdAndDelete(productId);

    if (!deleted) {
      console.error('❌ Error deleting product:');
      return res.redirect('/');
    }
    return res.redirect('/admin/products'); // ✅ redirect after successful deletion
  } catch (err) {
    console.error('❌ Error deleting product:', err);
    return res.redirect('/');
  }
};

export const syncProductUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({
      email: 'davidvargash@gmail.com'
    });

    if (!user) {
      res.status(500).send({
        error: 'Internal Server Error',
        message: 'No user found'
      });
      return;
    }

    const result = await Product.updateMany(
      { user: { $exists: false } },
      { $set: { user: user._id } }
    );

    res.status(200).send({
      message: `Synced ${result.modifiedCount} products`,
    });
  } catch (error) {
    console.log('>> error syncing user on products', error);
    res.status(500).send({
      error: 'Internal Server Error',
      message: 'Could not sync products and users'
    });
  }
}