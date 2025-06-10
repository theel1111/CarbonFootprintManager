// src/modals/AddProductModal.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

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
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  width: 90%;
  max-width: 300px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #222;
  margin-bottom: 20px;
  text-align: center;
`;

const Label = styled.label`
  font-size: 14px;
  color: #444;
  margin-bottom: 6px;
  display: block;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const Button = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 10px;
  font-size: 15px;
  border-radius: 8px;
  border: none;
  margin: 0 4px;
  cursor: pointer;
  background: ${({ primary }) => (primary ? '#007bff' : '#e0e0e0')};
  color: ${({ primary }) => (primary ? '#fff' : '#333')};

  &:hover {
    opacity: 0.9;
  }
`;

interface Props {
  onClose: () => void;
  onSubmit: (name: string, category: string) => void;
}

export default function AddProductModal({ onClose, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    if (!name || !category) {
      alert('請填寫完整的產品名稱與分類');
      return;
    }
    onSubmit(name, category);
    onClose();
  };

  return (
    <Overlay>
      <ModalBox>
        <Title>新增產品種類</Title>
        <div>
          <Input
            placeholder="請輸入產品種類"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <ButtonRow>
          <Button onClick={onClose}>取消</Button>
          <Button primary onClick={handleSubmit}>確認</Button>
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
}
