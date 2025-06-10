import React, { useEffect, useState } from "react";
import { Container, SubmitButton, Label } from "../styles";
import MaterialList from "../../../components/MaterialList";
import {
    powerComsumptionOptions,
    fuelsOptions,
    exhaustsOptions,
    placesOptions
} from "../../../mockData";
import { useMaterialList } from "../../../hooks/useMaterialList";

const ManufacturingSection: React.FC = () => {
    // 各類資料都用 useMaterialList 管理
    const power = useMaterialList(powerComsumptionOptions);
    const fuel = useMaterialList(fuelsOptions);
    const exhaust = useMaterialList(exhaustsOptions);

    const [placeOptions, setPlaceOptions] = useState<string[]>(placesOptions);

    useEffect(() => {
        // 可在這裡 fetch 資料
    }, []);

    return (
        <Container>
            <MaterialList
                title="電力使用"
                items={power.items}
                options={powerComsumptionOptions}
                onAdd={power.addItem}
                onDelete={power.deleteItem}
                onToggle={power.toggleExpand}
                onUpdate={power.updateValue}
                onUnitChange={(id, unit) =>
                    power.updateValue(id, power.items.find(item => item.id === id)?.value || "", undefined, unit)
                }
            />
            <MaterialList
                title="其他燃料使用"
                items={fuel.items}
                options={fuelsOptions}
                onAdd={fuel.addItem}
                onDelete={fuel.deleteItem}
                onToggle={fuel.toggleExpand}
                onUpdate={fuel.updateValue}
                onUnitChange={(id, unit) =>
                    fuel.updateValue(id, fuel.items.find(item => item.id === id)?.value || "", undefined, unit)
                }
            />
            <MaterialList
                title="廢棄物"
                items={exhaust.items}
                options={exhaustsOptions}
                onAdd={exhaust.addItem}
                onDelete={exhaust.deleteItem}
                onToggle={exhaust.toggleExpand}
                onUpdate={exhaust.updateValue}
                onUnitChange={(id, unit) =>
                    exhaust.updateValue(id, exhaust.items.find(item => item.id === id)?.value || "", undefined, unit)
                }
                extraField={({ id, place }) => (
                    <div>
                        <Label>地點</Label>
                        <select
                            value={place}
                            onChange={e =>
                                exhaust.updateValue(
                                    id,
                                    exhaust.items.find(item => item.id === id)?.value || "",
                                    undefined,
                                    undefined,
                                    e.target.value
                                )
                            }
                        >
                            <option value="">請選擇地點</option>
                            {placeOptions.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                )}
            />
            <SubmitButton onClick={power.saveAll}>儲存</SubmitButton>
        </Container>
    );
};

export default ManufacturingSection;
