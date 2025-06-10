import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const HEADER_HEIGHT = 36;           // 統一高度，等等頁面要用來補位

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;

  height: ${HEADER_HEIGHT}px;
  z-index: 1000;

  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const LeftActions = styled.div`
  display: flex;
  gap: 12px;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #333;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

export default function Header() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  return (
    <HeaderContainer>
      <LeftActions>
        <IconButton onClick={() => navigate(-1)}>←</IconButton>
        <IconButton onClick={() => navigate('/')}>{t('header.home')}</IconButton>
      </LeftActions>

      <RightActions>
        <IconButton onClick={toggleLanguage}>🌐</IconButton>
        <Avatar src="/assets/user-avatar.png" alt="User Avatar" />
      </RightActions>
    </HeaderContainer>
  );
}

export { HEADER_HEIGHT };
