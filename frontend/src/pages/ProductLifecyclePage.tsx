import React, { useState } from "react";
import styled from "styled-components";
import Header, { HEADER_HEIGHT } from "../components/Header";
import { useNavigate } from "react-router-dom";

/* ===== 基本樣式設定 ===== */
const PageWrapper = styled.div`
  background-color: #f9f9f9;
  min-height: 100vh;
  padding-top: ${HEADER_HEIGHT}px;
  max-width: 480px;
  margin: 0 auto;
`;

// 單一階段（整個區塊）
const StageBlock = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  background: #fff;
  border-radius: 12px;
  margin: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden; /* 保留圓角效果 */
`;

// 階段名稱（模仿左側灰條）
const StageLabel = styled.div`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  background: #eee;
  color: #333;
  font-weight: bold;
  padding: 12px 8px;
  text-align: center;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 每個階段內部流程橫排
const StepRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  gap: 8px;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const StepButton = styled.button`
  writing-mode: vertical-rl;
  text-orientation: upright;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0;
  width: 32px;
  height: 88px;
  padding-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;

const StepWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

/* ===== 附加欄位樣式 ===== */
const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 12px;
  cursor: pointer;
  margin: 0 12px 8px auto;
`;

const ExtraInfo = styled.div`
  padding: 8px 12px 12px;
  border-top: 1px dashed #ccc;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Pill = styled.div`
  background: #e6f0ff;
  color: #333;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
`;

/* ================= 主元件 ================= */
export default function ProductLifecyclePage() {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const handleStepClick = (label: string) => {
    console.log("點了：", label);
    // navigate(`/edit/${label}`);
  };

  /* 階段定義：名稱、主流程步驟、附加欄位 */
  const stages: {
    name: string;
    steps: string[];
    extras?: string[];
  }[] = [
    {
      name: "原料取得",
      steps: [
        "種子/種苗",
        "農藥",
        "肥料",
        "其他生產資材",
        "整地",
        "定植",
        "栽培管理",
        "採收",
      ],
      extras: ["包裝資材", "廢棄物", "能源資源", "運輸"],
    },
    {
      name: "製造",
      steps: ["冷藏暫存", "一次加工", "半成品暫存", "二次加工", "包裝", "出貨"],
      extras: ["運輸", "廢棄物", "能源資源"],
    },
    {
      name: "配送銷售",
      steps: ["銷售點"],
      extras: ["運輸"],
    },
    {
      name: "使用",
      steps: ["消費者使用"],
      extras: ["能源資源"],
    },
    {
      name: "廢棄處理",
      steps: ["回收", "焚化", "掩埋"],
      extras: ["能源資源"],
    },
  ];

  /* 共用 Stage 渲染 */
  const renderStage = (stage: (typeof stages)[number]) => (
    <StageBlock key={stage.name}>
      <StageLabel>{stage.name}</StageLabel>

      {/* ========= 主流程 ========= */}
      <div>
        <StepWrapper>
          <StepRow>
            {stage.steps.map((step, idx) => (
              <React.Fragment key={step}>
                <StepButton onClick={() => handleStepClick(step)}>
                  {step}
                </StepButton>
                {idx < stage.steps.length - 1 && <span>→</span>}
              </React.Fragment>
            ))}
          </StepRow>
        </StepWrapper>

        {/* ========= 附加欄位 ========= */}
        {stage.extras && stage.extras.length > 0 && (
          <>
            <ToggleButton
              onClick={() =>
                setOpenSections((prev) => ({
                  ...prev,
                  [stage.name]: !prev[stage.name],
                }))
              }
            >
              {openSections[stage.name] ? "▲ 收合附加項目" : "▼ 附加項目"}
            </ToggleButton>

            {openSections[stage.name] && (
              <ExtraInfo>
                {stage.extras.map((item) => (
                  <Pill key={item} onClick={() => handleStepClick(item)}>
                    {item}
                  </Pill>
                ))}
              </ExtraInfo>
            )}
          </>
        )}
      </div>
    </StageBlock>
  );

  return (
    <PageWrapper>
      <Header />
      {stages.map(renderStage)}
    </PageWrapper>
  );
}
