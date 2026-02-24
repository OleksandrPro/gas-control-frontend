import { Text, Select } from "@mantine/core";

interface EditableSelectProps {
    isEditing: boolean;
    value: string;
    data: string[];
    onChange: (value: string) => void;
}

export const EditableSelect = ({ isEditing, value, onChange, data, ...selectProps }: EditableSelectProps) => {
    if (isEditing) {
        return <Select data={data} value={value} onChange={(val) => onChange(val || '')} {...selectProps} />;
    }
    return <Text>{value}</Text>;
};