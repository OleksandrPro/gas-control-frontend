import { Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';

interface EditableDateProps {
    isEditing: boolean;
    value: Date | null;
    onChange: (value: Date | null) => void;
}

export const EditableDate = ({ isEditing, value, onChange }: EditableDateProps) => {
    if (isEditing) {
        return (
            <DateInput 
                value={value} 
                onChange={onChange} 
                valueFormat="DD.MM.YYYY"
                placeholder="Choose a date"
                clearable
            />
        );
    }
    
    return (
        <Text>
            {value ? value.toLocaleDateString('ua-UA') : '-'}
        </Text>
    );
};