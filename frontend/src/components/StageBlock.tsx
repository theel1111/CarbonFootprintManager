// src/components/StageBlock.tsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Block = styled.button`
  border: 1px solid #333;
  padding: 8px;
  border-radius: 6px;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
`;

interface Props {
  label: string;
  path: string; // 之後要跳轉的頁面路徑
}

export default function StageBlock({ label, path }: Props) {
  const navigate = useNavigate();

  return <Block onClick={() => navigate(path)}>{label}</Block>;
}
