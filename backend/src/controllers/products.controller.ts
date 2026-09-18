import { Request, Response } from 'express';
import { store } from '../services/store.js';
import { sendSuccess, sendError } from '../utils/response.js';

export const listProducts = (_req: Request, res: Response) => {
  const products = store.getProducts();
  return sendSuccess(res, products, 'Products retrieved successfully');
};

export const getProductById = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const product = store.getProductById(id);
  if (!product) {
    return sendError(res, `Product ${id} not found`, 404);
  }
  return sendSuccess(res, product, 'Product found');
};

export const createProduct = (req: Request, res: Response) => {
  const { title, tagline, description, category, version, status, githubUrl, installCommand, tags } = req.body;
  if (!title || !description || !githubUrl) {
    return sendError(res, 'Title, description, and githubUrl are required', 400);
  }

  const product = store.createProduct({
    title,
    tagline: tagline || '',
    description,
    category: category || 'General',
    version: version || 'v0.1.0',
    status: status || 'active',
    stars: 0,
    githubUrl,
    installCommand,
    tags: Array.isArray(tags) ? tags : [],
  });

  return sendSuccess(res, product, 'Product created successfully', 201);
};

export const updateProduct = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const updated = store.updateProduct(id, req.body);
  if (!updated) {
    return sendError(res, `Product ${id} not found`, 404);
  }
  return sendSuccess(res, updated, 'Product updated successfully');
};

export const deleteProduct = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const deleted = store.deleteProduct(id);
  if (!deleted) {
    return sendError(res, `Product ${id} not found`, 404);
  }
  return sendSuccess(res, { id }, 'Product deleted successfully');
};
