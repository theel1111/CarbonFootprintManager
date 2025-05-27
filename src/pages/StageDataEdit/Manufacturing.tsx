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
    SubmitButton,
} from "./styles";

type MaterialItem = {
    id: number;
    expanded: boolean;
    value: string;
    quantity: number;
    unit: string;
    place?: string;  // 可選的地點屬性
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
    extraField?: (params: { id: number; place: string }) => React.ReactNode;  // 可選的額外欄位
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
                            {extraField({ id: item.id, place: item.place || "" })}
                        </div>
                    )}
                </ItemContent>
            </ItemBox>
        ))}
    </Section>
);
const ManufacturingSection: React.FC = () => {
    const [items, setItems] = useState<
        { id: number; expanded: boolean; value: string; quantity: number; unit: string }[]
    >([]);

    const [fuel, setFuel] = useState<
        { id: number; expanded: boolean; value: string; quantity: number; unit: string }[]
    >([]);

    const [exhaust, setExhaust] = useState<
        { id: number; expanded: boolean; value: string; quantity: number; unit: string; place:string }[]
    >([]);

    const [options, setOptions] = useState<{ name: string; unit: string }[]>([
        { name: "全廠區總用電量", unit: "kwh" },
        { name: "標的物總用電量", unit: "kwh" },
    ]);

    const [fuelOptions, setFuelOptions] = useState<{ name: string; unit: string }[]>([
        { name: "重油", unit: "l" },
        { name: "天然氣", unit: "m³" },
    ]);

    const [exhaustOptions, setExhaustOptions] = useState<{ name: string; unit: string }[]>([
        { name: "CO2", unit: "kg" },
        { name: "H2O", unit: "l" },
        { name: "SOx", unit: "kg" },
    ]);

    const [placeOptions, setplaceOptions] = useState<string[]>([
        "貓空", "坪林"
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

    const addFuel = () => {
        const newId = fuel.length > 0 ? fuel[fuel.length - 1].id + 1 : 1;
        const newItem = {
            id: newId,
            expanded: false,
            value: "",
            quantity: 0,
            unit: ""
        };
        setFuel([...fuel, newItem]);
    };

    const addExhaust = () => {
        const newId = exhaust.length > 0 ? exhaust[exhaust.length - 1].id + 1 : 1;
        const newItem = {
            id: newId,
            expanded: false,
            value: "",
            quantity: 0,
            unit: "",
            place: ""
        };
        setExhaust([...exhaust, newItem]);
    };

    const toggleExpand = (id: number) => {
        setItems(items.map((item) =>
            item.id === id ? { ...item, expanded: !item.expanded } : item
        ));
    };

    const toggleFuelExpand = (id: number) => {
        setFuel(fuel.map((item) =>
            item.id === id ? { ...item, expanded: !item.expanded } : item
        ));
    };

    const toggleExhaustExpand = (id: number) => {
        setExhaust(exhaust.map((item) =>
            item.id === id ? { ...item, expanded: !item.expanded } : item
        ));
    }

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

    const updateFuelValue = (id: number, value: string, quantity?: number, unit?: string) => {
        const matched = fuelOptions.find(opt => opt.name === value);
        setFuel(fuel.map((item) =>
            item.id === id 
                ? { ...item,
                    value,
                    quantity: quantity !== undefined ? quantity : item.quantity,
                    unit: unit !== undefined ? unit : (matched ? matched.unit : item.unit),
                } 
                : item
        ));
    };

    const updateExhaustValue = (id: number, value: string, quantity?: number, unit?: string, place?: string) => {
        const matched = exhaustOptions.find(opt => opt.name === value);
        setExhaust(exhaust.map((item) =>
            item.id === id 
                ? { ...item,
                    value,
                    quantity: quantity !== undefined ? quantity : item.quantity,
                    unit: unit !== undefined ? unit : (matched ? matched.unit : item.unit),
                    place: place !== undefined ? place : item.place,
                } 
                : item
        ));
    };

    const deleteItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const deleteFuel = (id: number) => {
        setFuel(fuel.filter((item) => item.id !== id));
    };

    const deleteExhaust = (id: number) => {
        setExhaust(exhaust.filter((item) => item.id !== id));
    };

    const saveAll = () => {
        console.log("目前儲存的資料：", items);
        alert("資料已輸出到 console");
    };

    return (
        <Container>
            <MaterialList
                title="電力使用"
                items={items}
                options={options}
                onAdd={addItem}
                onDelete={deleteItem}
                onToggle={toggleExpand}
                onUpdate={updateValue}
                onUnitChange={(id, unit) => updateValue(id, items.find(item => item.id === id)?.value || "", undefined, unit)}
            />
            <MaterialList
                title="其他燃料使用"
                items={fuel}
                options={fuelOptions}
                onAdd={addFuel}
                onDelete={deleteFuel}
                onToggle={toggleFuelExpand}
                onUpdate={updateFuelValue}
                onUnitChange={(id, unit) => updateFuelValue(id, fuel.find(item => item.id === id)?.value || "", undefined, unit)}
            />
            <MaterialList
                title="廢棄物"
                items={exhaust}
                options={exhaustOptions}
                onAdd={addExhaust}
                onDelete={deleteExhaust}
                onToggle={toggleExhaustExpand}
                onUpdate={updateExhaustValue}
                onUnitChange={(id, unit) => updateExhaustValue(id, fuel.find(item => item.id === id)?.value || "", undefined, unit)}
                extraField={({ id, place }) => (
                    <div>
                        <Label>地點</Label>
                        <select
                            value={place}
                            onChange={e => updateExhaustValue(id, exhaust.find(item => item.id === id)?.value || "", undefined, undefined, e.target.value)}
                        >
                            <option value="">請選擇地點</option>
                            {placeOptions.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                )}
            />
            <SubmitButton onClick={saveAll}>儲存</SubmitButton>
        </Container>
    );
};

export default ManufacturingSection;
