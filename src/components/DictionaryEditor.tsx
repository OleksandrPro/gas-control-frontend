import { useState, useEffect } from 'react';
import { Table, TextInput, ActionIcon, Loader, Center } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { MOCK_DICTIONARIES } from '../MockData';

interface DictionaryConfig {
    id: string;
    label: string;
    endpoint: string;
    mockKey: string;
}

interface DictionaryEditorProps {
    dictionary: DictionaryConfig;
}

export const DictionaryEditor = ({ dictionary }: DictionaryEditorProps) => {
    const [dictItems, setDictItems] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [newValue, setNewValue] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setNewValue('');
        setEditingIndex(null);

        const timer = setTimeout(() => {
            setDictItems(MOCK_DICTIONARIES[dictionary.mockKey] || []);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [dictionary]);

    const handleAddItem = () => {
        const trimmedValue = newValue.trim();
        if (!trimmedValue) return;

        setIsSaving(true);
        setTimeout(() => {
            setDictItems([...dictItems, trimmedValue]);
            setNewValue('');
            setIsSaving(false);
        }, 400);
    };

    const cancelAdding = () => {
        setNewValue('');
        setIsSaving(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleAddItem();
        if (e.key === 'Escape') cancelAdding();
    };

    const startEditing = (index: number, currentValue: string) => {
        setEditingIndex(index);
        setEditValue(currentValue);
    };

    const cancelEditing = () => {
        setEditingIndex(null);
        setEditValue('');
    };

    const handleSaveEdit = () => {
        if (editingIndex === null) return;
        
        const trimmedValue = editValue.trim();
        if (!trimmedValue || trimmedValue === dictItems[editingIndex]) {
            cancelEditing();
            return;
        }

        setIsUpdating(true);
        setTimeout(() => {
            const updatedItems = [...dictItems];
            updatedItems[editingIndex] = trimmedValue;
            
            setDictItems(updatedItems);
            setEditingIndex(null);
            setIsUpdating(false);
        }, 400);
    };

    const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSaveEdit();
        if (e.key === 'Escape') cancelEditing();
    };

    if (isLoading) {
        return (
            <Center h={200}>
                <Loader color="blue" />
            </Center>
        );
    }

    return (
        <Table striped highlightOnHover>
            <Table.Tbody>
                {dictItems.map((value, index) => (
                    <Table.Tr key={index}>
                        <Table.Td 
                            onClick={() => {
                                if (editingIndex !== index && !isUpdating) {
                                    startEditing(index, value);
                                }
                            }}
                            style={{ cursor: editingIndex === index ? 'default' : 'pointer' }}
                        >
                            {editingIndex === index ? (
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
                        </Table.Td>
                    </Table.Tr>
                ))}

                <Table.Tr>
                    <Table.Td>
                        <TextInput
                            placeholder="Type to add new record... (Press Enter)"
                            value={newValue}
                            onChange={(e) => setNewValue(e.currentTarget.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isSaving}
                            variant="unstyled"
                            rightSection={
                                isSaving ? (
                                    <Loader size="xs" color="blue" />
                                ) : (
                                    <ActionIcon 
                                        color="blue" 
                                        variant="subtle" 
                                        onClick={handleAddItem}
                                        disabled={!newValue.trim()}
                                    >
                                        <IconPlus size={18} />
                                    </ActionIcon>
                                )
                            }
                        />
                    </Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
};