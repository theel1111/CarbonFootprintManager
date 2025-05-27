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
    value: string; //配銷物品名稱
    quantity: number; //配銷總數量
    unit: string; //單位
    place: string; //配銷地點
    method: string; //運輸方式
};

interface MaterialListProps {
    title: string;
    items: MaterialItem[];
    options: { name: string; unit: string }[];
    placeOptions:  string [];
    methodOptions: string [];
    onAdd: () => void;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onUpdate: (id: number, value: string, quantity?: number, unit?: string, place?: string, method?: string) => void;
    onUnitChange: (id: number, unit: string) => void;
}

const unitOptions = ["kg", "l", "g", "ml"];

const MaterialList: React.FC<MaterialListProps> = ({
    title, items, options, placeOptions, methodOptions, onAdd, onDelete, onToggle, onUpdate, onUnitChange
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
                    {/*挑選配銷地點*/}
                    <Select 
                        value={item.place}
                        onChange={(e) => onUpdate(item.id, item.value, item.quantity, item.unit, e.target.value, item.method)}
                    >
                        <option value="">請選擇配銷地點</option>
                        {placeOptions.map(place => (
                            <option key={place} value={place}>
                                {place}
                            </option>
                        ))}
                    </Select>
                    {/*挑選運輸方式*/}
                    <Select 
                        value={item.method}
                        onChange={(e) => onUpdate(item.id, item.value, item.quantity, item.unit, item.place, e.target.value)}
                    >
                        <option value="">請選擇運輸方式</option>
                        {methodOptions.map(method => (
                            <option key={method} value={method}>
                                {method}
                            </option>
                        ))}
                    </Select>
                </ItemContent>
            </ItemBox>
        ))}
    </Section>
);
const DistributionSection: React.FC = () => {
    const [items, setItems] = useState<MaterialItem[]>([]);

    const [options, setOptions] = useState<{ name: string; unit: string }[]>([
        { name: "台糖糖寶1號肥料", unit: "kg" },
        { name: "小綠葉茶蟬加保利", unit: "ml" },
    ]);

    const [placeOptions, setPlaceOptions] = useState<string[]>([
        "台北", "新北", "桃園", "台中", "台南", "高雄"
    ]);

    const [methodOptions, setMethodOptions] = useState<string[]>([
        "空運", "海運", "陸運", "管線"
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
            unit: "",
            place: "",
            method: ""
        };
        setItems([...items, newItem]);
    };

    const toggleExpand = (id: number) => {
        setItems(items.map((item) =>
            item.id === id ? { ...item, expanded: !item.expanded } : item
        ));
    };

    const updateValue = (id: number, value: string, quantity?: number, unit?: string, place?: string, method?: string) => {
        const matched = options.find(opt => opt.name === value);
        setItems(items.map((item) =>
            item.id === id 
                ? { ...item,
                    value,
                    quantity: quantity !== undefined ? quantity : item.quantity,
                    unit: unit !== undefined ? unit : (matched ? matched.unit : item.unit),
                    place: place !== undefined ? place : item.place,
                    method: method !== undefined ? method : item.method,
                } 
                : item
        ));
    };

    const deleteItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const saveAll = () => {
        console.log("目前儲存的資料：", items);
        alert("資料已輸出到 console");
    };

    return (
        <Container>
            <MaterialList
                title="配銷階段"
                items={items}
                options={options}
                placeOptions={placeOptions}
                methodOptions={methodOptions}
                onAdd={addItem}
                onDelete={deleteItem}
                onToggle={toggleExpand}
                onUpdate={updateValue}
                onUnitChange={(id, unit) => updateValue(id, items.find(item => item.id === id)?.value || "", undefined, unit)}
            />
            <SubmitButton onClick={saveAll}>儲存</SubmitButton>
        </Container>
    );
};

export default DistributionSection;
