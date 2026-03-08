import { Text, Select, type SelectProps } from "@mantine/core";
import { type DictionaryItem } from "../types";

interface EditableSelectProps extends Omit<SelectProps, 'data' | 'value' | 'onChange'> {
    isEditing: boolean;
    value: number | null;
    data: DictionaryItem[];
    onChange: (value: number | null) => void; 
}

export const EditableSelect = ({ isEditing, value, onChange, data, ...selectProps }: EditableSelectProps) => {
    if (isEditing) {
        const selectData = data.map(item => ({
            value: item.id.toString(),
            label: item.value
        }));

        return (
            <Select 
                data={selectData} 
                value={value ? value.toString() : null} 
                onChange={(val) => onChange(val ? Number(val) : null)} 
                {...selectProps} 
            />
        );
    }
    const selectedItem = data.find(item => item.id === value);
    return <Text>{selectedItem ? selectedItem.value : '-'}</Text>; 
};