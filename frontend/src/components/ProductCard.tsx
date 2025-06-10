//frontend\src\components\ProductCard.tsx
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 12px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #222;
`;

const Category = styled.div`
  font-size: 14px;
  color: #888;
  margin-top: 4px;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #555;

  &:hover {
    opacity: 0.7;
  }
`;

interface ProductCardProps {
  name: string;
  recordCount: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onMore: () => void;
  onClick?: () => void;
}

export default function ProductCard({
  name,
  recordCount,
  isFavorite,
  onToggleFavorite,
  onMore,
  onClick,
}: ProductCardProps) {
  const { t } = useTranslation();

  return (
    <Card onClick={onClick}>
      <TopRow>
        <div>
          <Name>{name}</Name>
        </div>
        <Actions>
          <IconButton onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}>
            {isFavorite ? '❤️' : '🤍'}
          </IconButton>
          <IconButton onClick={(e) => { e.stopPropagation(); onMore(); }}>
            ⋯
          </IconButton>
        </Actions>
      </TopRow>
      <div style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
        {t('碳足跡紀錄表')}: {recordCount}
      </div>
    </Card>
  );
}
