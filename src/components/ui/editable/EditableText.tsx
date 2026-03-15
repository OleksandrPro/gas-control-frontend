import { Text, TextInput } from "@mantine/core";


interface EditableTextProps {
    isEditing: boolean;
    value: string;
    onChange: (value: string) => void;
    renderText?: (value: string) => React.ReactNode; // Custom text component render (Title etc.)
    [key: string]: any; // any additional props
}

export const EditableText = ({ isEditing, value, onChange, renderText, ...inputProps }: EditableTextProps) => {
    if (isEditing) {
        return <TextInput value={value} onChange={(e) => onChange(e.currentTarget.value)} {...inputProps} />;
    }
    return renderText ? renderText(value) : <Text>{value}</Text>;
};