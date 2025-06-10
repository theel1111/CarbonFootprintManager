// src/pages/ProductListPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../modals/AddProductModal';
import ProductDetailModal from '../modals/ProductDetailModal';
import { HEADER_HEIGHT } from '../components/Header';

const PageWrapper = styled.div`
  background-color: #f9f9f9;
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
  padding-top: ${HEADER_HEIGHT}px;
`;

const CardContainer = styled.div`
  padding: 16px;
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  z-index: 999;

  &:hover {
    background-color: #0056b3;
  }
`;

interface Product {
  id: string;
  name: string;
  category: string;
  recordCount: number;
  isFavorite: boolean;
  favoriteTimestamp?: number;
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: '紅茶', category: '飲品', recordCount: 3, isFavorite: false },
    { id: '2', name: '綠茶', category: '用品', recordCount: 5, isFavorite: true, favoriteTimestamp: Date.now() - 10000 },
    { id: '3', name: '鐵觀音', category: '食品', recordCount: 1, isFavorite: false }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddProduct = (name: string, category: string) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      category,
      recordCount: 0,
      isFavorite: false,
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleToggleFavorite = (id: string) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id
          ? {
              ...p,
              isFavorite: !p.isFavorite,
              favoriteTimestamp: !p.isFavorite ? Date.now() : undefined
            }
          : p
      )
    );
  };

  const sorted = [...products].sort((a, b) => {
    if (a.isFavorite && b.isFavorite) {
      return (a.favoriteTimestamp ?? 0) - (b.favoriteTimestamp ?? 0);
    }
    if (a.isFavorite) return -1;
    if (b.isFavorite) return 1;
    return 0;
  });

  return (
    <PageWrapper>
      <CardContainer>
        {sorted.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            recordCount={product.recordCount}
            isFavorite={product.isFavorite}
            onToggleFavorite={() => handleToggleFavorite(product.id)}
            onMore={() => setSelectedProduct(product)}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </CardContainer>

      <AddButton onClick={() => setShowModal(true)}>＋</AddButton>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddProduct}
        />
      )}

      {selectedProduct && (
        <ProductDetailModal
          productName={selectedProduct.name}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </PageWrapper>
  );
}
