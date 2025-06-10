// 組裝數據輸入list
import React, { useEffect, useState } from "react";
import { Container, SubmitButton } from "../styles"
import MaterialList from "../../../components/MaterialList";
import { rawMaterialOptions, resourcesOptions } from "../../../mockData"
import { useMaterialList } from "../../../hooks/useMaterialList";

const RawMaterialSection: React.FC = () => {
    const [options, setOptions] = useState(rawMaterialOptions);
    const [resourceOptions, setResourceOptions] = useState(resourcesOptions);

    const raw = useMaterialList(rawMaterialOptions);
    const resource = useMaterialList(resourcesOptions);

    useEffect(() => {
        // 換成實際API呼叫
    }, []);

    return (
        <Container>
            <MaterialList
                title="主要/輔助原料"
                items={raw.items}
                options={options}
                onAdd={raw.addItem}
                onDelete={raw.deleteItem}
                onToggle={raw.toggleExpand}
                onUpdate={raw.updateValue}
                onUnitChange={(id, unit) => raw.updateValue(id, raw.items.find(item => item.id === id)?.value || "", undefined, unit)}
            />
            <MaterialList
                title="資源"
                items={resource.items}
                options={resourceOptions}
                onAdd={resource.addItem}
                onDelete={resource.deleteItem}
                onToggle={resource.toggleExpand}
                onUpdate={resource.updateValue}
                onUnitChange={(id, unit) => resource.updateValue(id, resource.items.find(item => item.id === id)?.value || "", undefined, unit)}
            />
            <SubmitButton onClick={raw.saveAll}>儲存</SubmitButton>
        </Container>
    );
};

export default RawMaterialSection;
