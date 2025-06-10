// src/modals/AddProductModal.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  max-width: 360px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h2`
  margin-bottom: 12px;
  font-size: 18px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 14px;
  font-size: 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &:first-child {
    background: #e0e0e0;
  }

  &:last-child {
    background: #007bff;
    color: #fff;
  }
`;

interface Props {
  onClose: () => void;
  onSubmit: (name: string, category: string) => void;
}

export default function AddProductModal({ onClose, onSubmit }: Props) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    if (name && category) {
      onSubmit(name, category);
      onClose();
    }
  };

  return (
    <Overlay>
      <ModalBox>
        <Title>{t('modal.addProduct')}</Title>
        <Input
          placeholder={t('modal.productName')}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder={t('modal.productCategory')}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <ButtonRow>
          <Button onClick={onClose}>{t('modal.cancel')}</Button>
          <Button onClick={handleSubmit}>{t('modal.confirm')}</Button>
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
}
