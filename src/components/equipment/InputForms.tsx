import { Grid, NumberInput, Select, TextInput } from "@mantine/core";
import { EquipmentTypesEnum } from '../../types';


export const PipeFields = ({ data, onChange, dicts, hideLabels }: any) => (
    <Grid>
        <Grid.Col span={6}>
            <NumberInput label={!hideLabels ? "Diameter" : undefined} value={data.diameter || ''} onChange={(v) => onChange('diameter', v)} allowDecimal allowedDecimalSeparators={[',', '.']} />
        </Grid.Col>
        <Grid.Col span={6}>
            <NumberInput label={!hideLabels ? "Length" : undefined} value={data.length || ''} onChange={(v) => onChange('length', v)} allowDecimal allowedDecimalSeparators={[',', '.']} step={0.1} />
        </Grid.Col>
        <Grid.Col span={6}>
            <Select label={!hideLabels ? "Material" : undefined} data={dicts.materialsData} value={data.material_id ? String(data.material_id) : null} onChange={(v) => onChange('material_id', v ? Number(v) : null)} searchable />
        </Grid.Col>
        <Grid.Col span={6}>
            <Select label={!hideLabels ? "Placement" : undefined} data={dicts.groundLevelsData} value={data.groung_level_id ? String(data.groung_level_id) : null} onChange={(v) => onChange('groung_level_id', v ? Number(v) : null)} searchable />
        </Grid.Col>
    </Grid>
);
export const ValveFields = ({ data, onChange, hideLabels }: any) => (
    <Grid>
        <Grid.Col span={6}>
            <NumberInput label={!hideLabels ? "Diameter" : undefined} value={data.diameter || ''} onChange={(v) => onChange('diameter', v)} allowDecimal allowedDecimalSeparators={[',', '.']} />
        </Grid.Col>
        <Grid.Col span={6}>
            <NumberInput label={!hideLabels ? "Quantity (pcs)" : undefined} value={data.quantity || ''} onChange={(v) => onChange('quantity', v)} min={1} />
        </Grid.Col>
        <Grid.Col span={12}>
            <TextInput label={!hideLabels ? "Model / Number" : undefined} value={data.model_number || ''} onChange={(e) => onChange('model_number', e.currentTarget.value)} />
        </Grid.Col>
    </Grid>
);
export const OtherFields = ({ data, onChange, hideLabels }: any) => (
    <NumberInput label={!hideLabels ? "Quantity (pcs)" : undefined} value={data.quantity || ''} onChange={(v) => onChange('quantity', v)} min={1} />
);

export const EquipmentFormFields = (props: any) => {
    switch (props.type) {
        case EquipmentTypesEnum.Pipe: return <PipeFields {...props} />;
        case EquipmentTypesEnum.Valve: return <ValveFields {...props} />;
        case EquipmentTypesEnum.Other:
        default: return <OtherFields {...props} />;
    }
};