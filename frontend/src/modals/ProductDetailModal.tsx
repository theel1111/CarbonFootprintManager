// CarbonFootprintManager\frontend\src\modals\ProductDetailModal.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 300px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
`;

const RecordCard = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 12px;
  display: flex;
  align-items: flex-start;
  gap: 5px;
  cursor: pointer;
`;

const InfoColumn = styled.div`
  flex: 1;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  cursor: pointer;
  margin-top: 2px;
`;

const Label = styled.div`
  font-size: 14px;
  color: #888;
`;

const Value = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #555;
`;

const mockRecords = [
  { id: 1, name: "紅茶", updatedAt: "2024-01-01", pinned: true },
  { id: 2, name: "紅茶", updatedAt: "2024-02-15", pinned: false },
  { id: 3, name: "紅茶", updatedAt: "2024-03-05", pinned: false },
];

interface ProductDetailModalProps {
  productName: string;
  onClose: () => void;
}

export default function ProductDetailModal({
  productName,
  onClose,
}: ProductDetailModalProps) {
  const { t } = useTranslation();
  const [records, setRecords] = useState(mockRecords);
  const navigate = useNavigate();

  const togglePin = (id: number) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, pinned: !record.pinned } : record
      )
    );
  };

  const sortedRecords = [...records].sort((a, b) => {
    if (a.pinned && b.pinned) return a.id - b.id;
    if (a.pinned) return -1;
    if (b.pinned) return 1;
    return a.id - b.id;
  });

  const handleNavigate = (id: number) => {
    navigate(`/lifecycle/${id}`);
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>
          {t("productDetail.title")} - {productName}
        </Title>
        {sortedRecords.map((record) => (
          <RecordCard key={record.id} onClick={() => handleNavigate(record.id)}>
            <StarButton
              onClick={(e) => {
                e.stopPropagation();
                togglePin(record.id);
              }}
            >
              {record.pinned ? "⭐" : "⚪"}
            </StarButton>
            <InfoColumn>
              <Label>{t("record.id")}</Label>
              <Value>#{record.id}</Value>
              <Label>{t("record.name")}</Label>
              <Value>{record.name}</Value>
              <Label>{t("record.updatedAt")}</Label>
              <Value>{record.updatedAt}</Value>
            </InfoColumn>
          </RecordCard>
        ))}
      </ModalContainer>
    </Overlay>
  );
}
