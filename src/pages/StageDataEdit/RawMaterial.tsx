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
} from "./styles";

type MaterialItem = {
    id: number;
    expanded: boolean;
    value: string;
    quantity: number;
    unit: string;
};

interface MaterialListProps {
    title: string;
    items: MaterialItem[];
    options: { name: string; unit: string }[];
    onAdd: () => void;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onUpdate: (id: number, value: string, quantity?: number, unit?: string) => void;
    onUnitChange: (id: number, unit: string) => void;
}

const unitOptions = ["kg", "l", "g", "ml"];

const MaterialList: React.FC<MaterialListProps> = ({
    title, items, options, onAdd, onDelete, onToggle, onUpdate, onUnitChange
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
                </ItemContent>
            </ItemBox>
        ))}
    </Section>
);
const RawMaterialSection: React.FC = () => {
    const [items, setItems] = useState<
        { id: number; expanded: boolean; value: string; quantity: number; unit: string }[]
    >([]);

    const [resources, setResources] = useState<
        { id: number; expanded: boolean; value: string; quantity: number; unit: string }[]
    >([]);

    const [options, setOptions] = useState<{ name: string; unit: string }[]>([
        { name: "台糖糖寶1號肥料", unit: "kg" },
        { name: "小綠葉茶蟬加保利", unit: "ml" },
    ]);

    const [powerOptions, setPowerOptions] = useState<{ name: string; unit: string }[]>([
        { name: "95無鉛汽油", unit: "l" },
    ]);

    useEffect(() => {
        // 換成實際API呼叫
    }, []);

    const addItem = () => {
        const newId = items.length > 0 ? items[items.length - 1].id + 1 : 1;
        const newItem = {
            id: newId,
            expanded: false,
            value: "",
            quantity: 0,
            unit: ""
        };
        setItems([...items, newItem]);
    };

    const addResource = () => {
        const newId = resources.length > 0 ? resources[resources.length - 1].id + 1 : 1;
        const newItem = {
            id: newId,
            expanded: false,
            value: "",
            quantity: 0,
            unit: ""
        };
        setResources([...resources, newItem]);
    };

    const toggleExpand = (id: number) => {
        setItems(items.map((item) =>
            item.id === id ? { ...item, expanded: !item.expanded } : item
        ));
    };

    const toggleResourceExpand = (id: number) => {
        setResources(resources.map((item) =>
            item.id === id ? { ...item, expanded: !item.expanded } : item
        ));
    };

    const updateValue = (id: number, value: string, quantity?: number, unit?: string) => {
        const matched = options.find(opt => opt.name === value);
        setItems(items.map((item) =>
            item.id === id 
                ? { ...item,
                    value,
                    quantity: quantity !== undefined ? quantity : item.quantity,
                    unit: unit !== undefined ? unit : (matched ? matched.unit : item.unit),
                } 
                : item
        ));
    };

    const updateResourceValue = (id: number, value: string, quantity?: number, unit?: string) => {
        const matched = powerOptions.find(opt => opt.name === value);
        setResources(resources.map((item) =>
            item.id === id 
                ? { ...item,
                    value,
                    quantity: quantity !== undefined ? quantity : item.quantity,
                    unit: unit !== undefined ? unit : (matched ? matched.unit : item.unit),
                } 
                : item
        ));
    };

    const deleteItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const deleteResource = (id: number) => {
        setResources(resources.filter((item) => item.id !== id));
    };

    const saveAll = () => {
        console.log("目前儲存的資料：", items);
        alert("資料已輸出到 console");
    };

    return (
        <Container>
            <MaterialList
                title="主要/輔助原料"
                items={items}
                options={options}
                onAdd={addItem}
                onDelete={deleteItem}
                onToggle={toggleExpand}
                onUpdate={updateValue}
                onUnitChange={(id, unit) => updateValue(id, items.find(item => item.id === id)?.value || "", undefined, unit)}
            />
            <MaterialList
                title="資源"
                items={resources}
                options={powerOptions}
                onAdd={addResource}
                onDelete={deleteResource}
                onToggle={toggleResourceExpand}
                onUpdate={updateResourceValue}
                onUnitChange={(id, unit) => updateResourceValue(id, resources.find(item => item.id === id)?.value || "", undefined, unit)}
            />
            <SubmitButton onClick={saveAll}>儲存</SubmitButton>
        </Container>
    );
};

export default RawMaterialSection;
