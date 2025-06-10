// src/pages/HomePage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import TabSelector from '../components/TabSelector';
import { useTranslation } from 'react-i18next';
import ProductList from "./ProductListPage";
import { HEADER_HEIGHT } from '../components/Header';


const PageWrapper = styled.div`
  background-color: #f9f9f9;
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
  padding-top: ${HEADER_HEIGHT + 15}px;
`;

const Section = styled.section`
  padding: 0;
  font-size: 16px;
  color: #555;
`;

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'products' | 'records'>('products');
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <Header showBackButton={false} />
      <TabSelector activeTab={activeTab} onChange={setActiveTab} />
      <Section>
        {activeTab === 'products' ? (
          <ProductList />
        ) : (
          <div style={{ padding: '16px' }}>
            🌿 {t('content.records')}（{t('content.comingSoon')}）
          </div>
        )}
      </Section>
    </PageWrapper>
  );
}