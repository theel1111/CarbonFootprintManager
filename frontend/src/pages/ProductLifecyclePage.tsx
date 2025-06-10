import React from "react";
import styled from "styled-components";
import Header, { HEADER_HEIGHT } from "../components/Header";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled.div`
  background-color: #f9f9f9;
  min-height: 100vh;
  padding-top: ${HEADER_HEIGHT}px;
  max-width: 480px;
  margin: 0 auto;
`;

const SectionCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 16px;
  margin: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StepButton = styled.button`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  white-space: pre-line;
  transition: background 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;

export default function ProductLifecyclePage() {
  const navigate = useNavigate();

  const handleStepClick = (label: string) => {
    console.log("點了：", label);
    // navigate(`/edit/${label}`);
  };

  return (
    <PageWrapper>
      <Header />

      <SectionCard>
        <SectionTitle>原料取得</SectionTitle>
        <ButtonRow>
          <StepButton onClick={() => handleStepClick("種子/種苗")}>種子/種苗</StepButton>
          <StepButton>➡️</StepButton>
          <StepButton onClick={() => handleStepClick("整地")}>整地</StepButton>
          <StepButton>➡️</StepButton>
          <StepButton onClick={() => handleStepClick("定植")}>定植</StepButton>
          <StepButton>➡️</StepButton>
          <StepButton onClick={() => handleStepClick("栽培管理")}>栽培管理</StepButton>
          <StepButton>➡️</StepButton>
          <StepButton onClick={() => handleStepClick("採收")}>採收</StepButton>
        </ButtonRow>
      </SectionCard>

      <SectionCard>
        <SectionTitle>製造</SectionTitle>
        <ButtonRow>
          <StepButton onClick={() => handleStepClick("冷藏暫存")}>冷藏暫存</StepButton>
          <StepButton>➡️</StepButton>
          <StepButton onClick={() => handleStepClick("一次加工")}>一次加工</StepButton>
          <StepButton>➡️</StepButton>
          <StepButton onClick={() => handleStepClick("半成品暫存")}>半成品暫存</StepButton>
          <StepButton>➡️</StepButton>
          <StepButton onClick={() => handleStepClick("二次加工")}>二次加工</StepButton>
          <StepButton>➡️</StepButton>
          <StepButton onClick={() => handleStepClick("包裝")}>包裝</StepButton>
          <StepButton>➡️</StepButton>
          <StepButton onClick={() => handleStepClick("出貨")}>出貨</StepButton>
        </ButtonRow>
      </SectionCard>

      <SectionCard>
        <SectionTitle>配送 / 銷售</SectionTitle>
        <ButtonRow>
          <StepButton onClick={() => handleStepClick("銷售點")}>銷售點</StepButton>
        </ButtonRow>
      </SectionCard>

      <SectionCard>
        <SectionTitle>消費者使用</SectionTitle>
        <ButtonRow>
          <StepButton onClick={() => handleStepClick("消費者使用")}>消費者使用</StepButton>
          <StepButton>➡️</StepButton>
          <StepButton onClick={() => handleStepClick("能源資源")}>能源資源</StepButton>
        </ButtonRow>
      </SectionCard>

      <SectionCard>
        <SectionTitle>廢棄物處理</SectionTitle>
        <ButtonRow>
          <StepButton onClick={() => handleStepClick("回收")}>回收</StepButton>
          <StepButton>➡️</StepButton>
          <StepButton onClick={() => handleStepClick("焚化")}>焚化</StepButton>
          <StepButton>➡️</StepButton>
          <StepButton onClick={() => handleStepClick("掩埋")}>掩埋</StepButton>
        </ButtonRow>
      </SectionCard>

      <SectionCard>
        <SectionTitle>儲存</SectionTitle>
        <ButtonRow>
          <StepButton onClick={() => handleStepClick("儲存")}>儲存</StepButton>
        </ButtonRow>
      </SectionCard>
    </PageWrapper>
  );
}
