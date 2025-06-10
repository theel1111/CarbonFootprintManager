import React, { useEffect, useState } from "react";
import {
    Container,
    SubmitButton,
    Label
} from "./styles";
import MaterialList from "../../components/MaterialList";
import { methodOptions as defaultMethodOptions, areaOptions, rawMaterialOptions } from "../../mockData";
import { useMaterialList } from "../../hooks/useMaterialList";

const DistributionSection: React.FC = () => {
    // 用 hook 管理配銷資料
    const distribution = useMaterialList(rawMaterialOptions);
    
    // 地點與運輸方式選項
    const [placeOptions, setPlaceOptions] = useState<string[]>(areaOptions);
    const [methodOptions, setMethodOptions] = useState<string[]>(defaultMethodOptions);
    const [options, setOptions] = useState(rawMaterialOptions);

    useEffect(() => {
        // 可在這裡 fetch 資料
    }, []);

    // 儲存所有資料
    const saveAll = () => {
        console.log("配銷資料：", distribution.items);
        alert("資料已輸出到 console");
    };

    return (
        <Container>
            <MaterialList
                title="配銷階段"
                items={distribution.items}
                options={options}
                onAdd={distribution.addItem}
                onDelete={distribution.deleteItem}
                onToggle={distribution.toggleExpand}
                onUpdate={distribution.updateValue}
                onUnitChange={(id, unit) =>
                    distribution.updateValue(
                        id,
                        distribution.items.find(item => item.id === id)?.value || "",
                        undefined,
                        unit
                    )
                }
                extraField={({ id, place, method }) => (
                    <div>
                        <div>
                            <Label>地點</Label>
                            <select
                                value={place}
                                onChange={e =>
                                    distribution.updateValue(
                                        id,
                                        distribution.items.find(item => item.id === id)?.value || "",
                                        undefined,
                                        undefined,
                                        e.target.value,
                                        distribution.items.find(item => item.id === id)?.method || ""
                                    )
                                }
                            >
                                <option value="">請選擇地點</option>
                                {placeOptions.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>
                        {method !== undefined && (
                            <div style={{ marginTop: 8}}>
                                <Label>運送方式</Label>
                                <select
                                    value={method}
                                    onChange={e =>
                                        distribution.updateValue(
                                            id,
                                            distribution.items.find(item => item.id === id)?.value || "",
                                            undefined,
                                            undefined,
                                            place,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">請選擇運送方式</option>
                                    {methodOptions.map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                )}
            />
            <SubmitButton onClick={saveAll}>儲存</SubmitButton>
        </Container>
    );
};

export default DistributionSection;
