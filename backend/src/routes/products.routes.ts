import { Router } from 'express';
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controller.js';
import { requireAdminAuth } from '../middleware/auth.middleware.js';

export const productsRouter = Router();

productsRouter.get('/', listProducts);
productsRouter.get('/:id', getProductById);
productsRouter.post('/', requireAdminAuth, createProduct);
productsRouter.put('/:id', requireAdminAuth, updateProduct);
productsRouter.delete('/:id', requireAdminAuth, deleteProduct);
