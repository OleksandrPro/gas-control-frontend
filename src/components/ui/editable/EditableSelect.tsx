import { Text, Select, type SelectProps } from "@mantine/core";
import { type DictionaryItem } from "../../../types";
import { mapToSelectData } from "../../../utils/utils";

interface EditableSelectProps extends Omit<SelectProps, 'data' | 'value' | 'onChange'> {
    isEditing: boolean;
    value: number | null;
    data: DictionaryItem[];
    onChange: (value: number | null) => void; 
}

export const EditableSelect = ({ isEditing, value, onChange, data, ...selectProps }: EditableSelectProps) => {
    if (isEditing) {
        const selectData = mapToSelectData(data);

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