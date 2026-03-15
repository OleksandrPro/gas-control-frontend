import { TextInput, Loader } from "@mantine/core";
import { useState } from "react";

interface EditableClickTextProps {
    initialValue: string;
}

export const EditableClickText = ({ initialValue }: EditableClickTextProps) => {
    const [value, setValue] = useState(initialValue)
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const startEditing = (currentValue: string) => {
        setEditValue(currentValue);
        setIsEditing(true)
    };

    const cancelEditing = () => {
        setEditValue('');
        setIsEditing(false)
    };

    const handleSaveEdit = () => {
        const trimmedValue = editValue.trim();
        
        if (!trimmedValue || trimmedValue === value) {
            cancelEditing();
            return;
        }

        setIsUpdating(true);
        
        setTimeout(() => {
            setIsEditing(false)
            setValue(trimmedValue);
            setIsUpdating(false);
        }, 400);
    };

    const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSaveEdit();
        if (e.key === 'Escape') cancelEditing();
    };

    return (
        <div
            onClick={() => {
                if (!isUpdating) {
                    startEditing(value);
                }
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f3f5'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
            {isEditing ? (
                <TextInput
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.currentTarget.value)}
                    onKeyDown={handleEditKeyDown}
                    onBlur={handleSaveEdit}
                    disabled={isUpdating}
                    variant="unstyled"
                    rightSection={isUpdating ? <Loader size="xs" color="blue" /> : null}
                />
            ) : (
                value
            )}
        </div>
    )
}