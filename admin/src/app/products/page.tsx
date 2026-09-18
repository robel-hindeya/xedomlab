'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Products as ProductsView } from '../../pages/Products';
import { Product } from '../../types';
import { api } from '../../services/api';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    const data = await api.getProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <Header
        title="Products & Systems Catalog"
        subtitle="Manage distributed primitives, CRDT stores, and edge runtimes"
        onRefresh={loadProducts}
      />
      <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
        <ProductsView products={products} onRefresh={loadProducts} />
      </main>
    </>
  );
}
