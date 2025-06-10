import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import TabSelector from '../components/TabSelector';
import { useTranslation } from 'react-i18next';
import ProductList from "../pages/ProductListPage";

const PageWrapper = styled.div`
  background-color: #f9f9f9;
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
  position: relative;
`;

const StickyHeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #fff;
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
      <StickyHeaderWrapper>
        <Header />
        <TabSelector activeTab={activeTab} onChange={setActiveTab} />
      </StickyHeaderWrapper>
      <Section>
        {activeTab === 'products' ? (
          <ProductList />
        ) : (
          <div style={{ padding: '16px' }}>
            🌿 {t('碳足跡紀錄表')}（{t('尚未建立')}）
          </div>
        )}
      </Section>
    </PageWrapper>
  );
}
