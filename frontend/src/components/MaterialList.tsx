// 僅負責渲染一組資料，不包含管理state

import React, { useEffect, useState } from "react";
import {
    Container,
    Section,
    Button,
    DeleteButton,
    ItemBox,
    ItemHeader,
    Label,
    ItemContent,
    Select,
    Input,
    SubmitButton
} from "../pages/StageDataEdit/styles";

type MaterialItem = {
    id: number;
    expanded: boolean;
    value: string;
    quantity: number;
    unit: string;
};

type ExtraFieldParams = { 
    id: number;
    place: string;
    method?: string;
}

interface MaterialListProps {
    title: string;
    items: MaterialItem[];
    options: { name: string; unit: string }[];
    onAdd: () => void;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onUpdate: (id: number, value: string, quantity?: number, unit?: string, place?: string) => void;
    onUnitChange: (id: number, unit: string) => void;
    extraField?: (params: ExtraFieldParams) => React.ReactNode //額外欄位
}

const unitOptions = ["kg", "l", "g", "ml"];

const MaterialList: React.FC<MaterialListProps> = ({
    title, items, options, onAdd, onDelete, onToggle, onUpdate, onUnitChange, extraField
}) => (
    <Section>
        <Button onClick={onAdd}>{title} +</Button>
        { items.map((item) => (
            <ItemBox key={item.id}>
                <ItemHeader onClick={() => onToggle(item.id)}>
                    <span>{title} {item.id}</span>
                    <DeleteButton onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                    }}>
                        刪除
                    </DeleteButton>
                </ItemHeader>
                <ItemContent expanded={item.expanded}>
                    <Select
                        value={item.value}
                        onChange={(e) => onUpdate(item.id, e.target.value)}
                    >
                        <option value="">請選擇項目</option>
                        {options.map(opt => (
                            <option key={opt.name} value={opt.name}>
                                {opt.name}
                            </option>
                        ))}
                    </Select>
                    <Input
                        type="text"
                        value={item.value}
                        onChange={e => onUpdate(item.id, e.target.value, item.quantity)}
                        placeholder="手動輸入名稱"
                    />
                    <Input
                        type="number"
                        min="0"
                        value={item.quantity === 0 ? "" : item.quantity}
                        onChange={e => onUpdate(item.id, item.value, Number(e.target.value))}
                        placeholder="數量"                            />
                    {/*顯示單位*/}
                    <span style={{ marginLeft: 4}}>
                        <Label>單位</Label>
                        {
                            options.find(opt => opt.name === item.value)?.unit
                            ? options.find(opt => opt.name === item.value)?.unit
                            :(
                                <select
                                    value={item.unit}
                                    onChange={(e) => onUnitChange(item.id, e.target.value)}
                                >
                                    {unitOptions.map(unit => (
                                        <option key={unit} value={unit}>
                                            {unit}
                                        </option>
                                    ))}
                                </select>
                            )
                        }
                    </span>
                    {extraField && (
                        <div style={{ marginTop: 8, marginLeft: 4 }}>
                            {extraField({
                                id: item.id,
                                place: (item as any).place || "",
                                method: (item as any).method
                            })}
                        </div>
                    )}
                </ItemContent>
            </ItemBox>
        ))}
    </Section>
);

export default MaterialList;