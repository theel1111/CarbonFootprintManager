// 處理資料的操作邏輯

import { useState } from "react"

type MaterialItem = {
    id: number;
    expanded: boolean;
    value: string;
    quantity: number;
    unit: string;
    place?: string;
    method?: string;
};

export function useMaterialList(options: { name: string; unit: string; place?: string; method?: string }[]) {
    const [items, setItems] = useState<MaterialItem[]>([]);

    const [itemIdCounter, setItemIdCounter] = useState(1);

    const addItem = () => {
        const newItem = {
            id: itemIdCounter,
            expanded: false,
            value: "",
            quantity: 0,
            unit: "",
            place: "",
            method: ""
        };
        setItems([...items, newItem]);
        setItemIdCounter(itemIdCounter + 1);
    };

    const toggleExpand = (id: number) => {
        setItems(items.map((item) =>
            item.id === id ? { ...item, expanded: !item.expanded } : item
        ));
    };

    const updateValue = (id: number, value: string, quantity?: number, unit?: string, place?: string, method?:string) => {
        const matched = options.find(opt => opt.name === value);
        setItems(items.map((item) =>
            item.id === id 
                ? { ...item,
                    value,
                    quantity: quantity !== undefined ? quantity : item.quantity,
                    unit: unit !== undefined ? unit : (matched ? matched.unit : item.unit),
                    place: place !== undefined ? place : (matched ? matched.place : item.place),
                    method: method !== undefined ? method : (matched ? matched.method : item.method),
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

    return {
        items,
        addItem,
        toggleExpand,
        updateValue,
        deleteItem,
        saveAll,
        options,
    };
}