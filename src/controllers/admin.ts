import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';

// GET /admin/add-product
export const getAddProduct = (req: Request, res: Response, next: NextFunction) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

// POST /admin/add-product
export const postAddProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { title, imageUrl, price, description } = req.body;

  try {
    await Product.create({
      title,
      imageUrl,
      description,
      price
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
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
    const product = await Product.findByPk(prodId);
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
    await Product.update(
      { title, price, imageUrl, description },
      { where: { id: productId } }
    );
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
  }
};

// GET /admin/products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.findAll();
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

  try {
    await Product.destroy({ where: { id: productId } });
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
  }
};
