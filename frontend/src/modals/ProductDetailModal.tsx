import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
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
  max-height: 85vh;
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
  padding: 10px;
  margin-bottom: 12px;
  position: relative;
  cursor: pointer;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  font-size: 12px;
  color: #888;
`;

const Value = styled.div`
  font-size: 16px;
  font-weight: 500;
  padding: 2px 0;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 10px;
`;

const Button = styled.button<{ danger?: boolean }>`
  padding: 6px 10px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  background: ${({ danger }) => (danger ? "#ff4d4f" : "#007bff")};
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const IconButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
`;

const EditPanel = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
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

const AddButton = styled(Button)`
  width: 100%;
  margin-top: 12px;
  background: #28a745;
`;

interface Record {
  id: number;
  name: string;
  updatedAt: string;
  pinned: boolean;
}

interface Props {
  productName: string;
  onClose: () => void;
}

export default function ProductDetailModal({ productName, onClose }: Props) {
  const [records, setRecords] = useState<Record[]>([
    { id: 1, name: "2025-春茶", updatedAt: "2025-01-01", pinned: true },
    { id: 2, name: "2024-春茶", updatedAt: "2024-02-15", pinned: false },
  ]);
  const [editId, setEditId] = useState<number | null>(null);
  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    if (editId === null) navigate(`/lifecycle/${id}`);
  };

  const togglePin = (id: number) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, pinned: !r.pinned } : r
      )
    );
  };

  const deleteRecord = (id: number) => {
    if (confirm("確定要刪除這筆紀錄嗎？")) {
      setRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const startEdit = (record: Record) => {
    setEditId(record.id);
    setNewName(record.name);
    setNewDate(record.updatedAt);
  };

  const saveEdit = () => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === editId ? { ...r, name: newName, updatedAt: newDate } : r
      )
    );
    setEditId(null);
  };

  const addNew = () => {
    const name = prompt("請輸入產品名稱");
    const date = prompt("請輸入紀錄時間 (YYYY-MM-DD)");
    if (name && date) {
      const newId = records.length ? Math.max(...records.map((r) => r.id)) + 1 : 1;
      setRecords((prev) => [...prev, { id: newId, name, updatedAt: date, pinned: false }]);
    }
  };

  const sortedRecords = [...records].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.id - a.id;
  });

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>產品詳情 - {productName}</Title>
        {sortedRecords.map((record) => (
          <RecordCard key={record.id} onClick={() => handleNavigate(record.id)}>
            <IconButton onClick={(e) => { e.stopPropagation(); togglePin(record.id); }}>
              {record.pinned ? "⭐" : "⚪"}
            </IconButton>

            {editId === record.id ? (
              <EditPanel>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="產品名稱" />
                <Input value={newDate} onChange={(e) => setNewDate(e.target.value)} placeholder="紀錄時間" />
                <ButtonRow>
                  <Button onClick={saveEdit}>儲存</Button>
                  <Button danger onClick={() => setEditId(null)}>取消</Button>
                </ButtonRow>
              </EditPanel>
            ) : (
              <>
                <InfoColumn>
                  <Label>ID</Label>
                  <Value>#{record.id}</Value>
                  <Label>名稱</Label>
                  <Value>{record.name}</Value>
                  <Label>紀錄時間</Label>
                  <Value>{record.updatedAt}</Value>
                </InfoColumn>
                <ButtonRow>
                  <Button onClick={(e) => { e.stopPropagation(); startEdit(record); }}>修改</Button>
                  <Button danger onClick={(e) => { e.stopPropagation(); deleteRecord(record.id); }}>刪除</Button>
                </ButtonRow>
              </>
            )}
          </RecordCard>
        ))}

        <AddButton onClick={addNew}>＋ 新增紀錄</AddButton>
      </ModalContainer>
    </Overlay>
  );
}
