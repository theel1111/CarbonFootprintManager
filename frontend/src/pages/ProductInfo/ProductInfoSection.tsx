import React, { useState } from "react";
import {
    Container,
    Section,
    Label,
    Input,
    SubmitButton,
    ItemBox,
    ItemHeader,
    ItemContent
} from "../StageDataEdit/styles";

const unitOptions = ["kg", "g", "件", "箱"];

const ProductInfoSection: React.FC = () => {
    const [productName, setProductName] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [unit, setUnit] = useState(unitOptions[0]);
    const [singleWeight, setSingleWeight] = useState("");
    const [totalWeight, setTotalWeight] = useState("");

    const handleSave = () => {
        const data = {
            productName,
            totalAmount,
            unit,
            singleWeight,
            totalWeight
        };
        console.log("標的產品資訊：", data);
        alert("資料已輸出到 console");
    };

    return (
        <Container>
            <Section>
                <ItemBox>
                    <ItemHeader>
                        <span>標的產品資訊</span>
                    </ItemHeader>
                    <ItemContent expanded>
                        <Label>產品名稱</Label>
                        <Input
                            type="text"
                            value={productName}
                            onChange={e => setProductName(e.target.value)}
                            placeholder="請輸入產品名稱"
                        />

                        <Label>總產量</Label>
                        <Input
                            type="number"
                            min="0"
                            value={totalAmount}
                            onChange={e => setTotalAmount(e.target.value)}
                            placeholder="請輸入總產量"
                        />

                        <Label>計量單位</Label>
                        <select
                            value={unit}
                            onChange={e => setUnit(e.target.value)}
                            style={{ width: "100%", padding: "8px", borderRadius: 4, border: "1px solid #ccc", marginBottom: 12 }}
                        >
                            {unitOptions.map(u => (
                                <option key={u} value={u}>{u}</option>
                            ))}
                        </select>

                        <Label>單件裸裝重量 (kg)</Label>
                        <Input
                            type="number"
                            min="0"
                            value={singleWeight}
                            onChange={e => setSingleWeight(e.target.value)}
                            placeholder="請輸入單件裸裝重量"
                        />

                        <Label>產品總重量 (kg)</Label>
                        <Input
                            type="number"
                            min="0"
                            value={totalWeight}
                            onChange={e => setTotalWeight(e.target.value)}
                            placeholder="請輸入產品總重量"
                        />
                    </ItemContent>
                </ItemBox>
                <SubmitButton onClick={handleSave}>儲存</SubmitButton>
            </Section>
        </Container>
    );
};

export default ProductInfoSection;