import { useState, useEffect, useRef } from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { Table, TextInput, ActionIcon, Loader, Center } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import type { DictionaryItem } from '../../types';
import { 
    getDictionaryItems, 
    addDictionaryItem, 
    updateDictionaryItem,
    deleteDictionaryItem 
} from '../../api/Dictionaries';

export interface DictionaryConfig {
    id: string;
    label: string;
    endpoint: string;
}

interface DictionaryEditorProps {
    dictionary: DictionaryConfig;
}

export const DictionaryEditor = ({ dictionary }: DictionaryEditorProps) => {
    const queryClient = useQueryClient();

    const cancelEditRef = useRef(false);

    const { data: dictItems = [], isLoading: isQueryLoading } = useQuery({
        queryKey: ['dictionary', dictionary.id], 
        queryFn: () => getDictionaryItems(dictionary.endpoint)
    });

    const addMutation = useMutation({
        mutationFn: (newValue: string) => addDictionaryItem(dictionary.endpoint, newValue),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dictionary', dictionary.id] });
            setNewValue('');
        },
    });

    const updateMutation = useMutation({
        mutationFn: (item: DictionaryItem) => updateDictionaryItem(dictionary.endpoint, item),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dictionary', dictionary.id] });
            setEditingId(null);
            setEditValue('');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteDictionaryItem(dictionary.endpoint, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dictionary', dictionary.id] });
        }
    });

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            deleteMutation.mutate(id);
        }
    };

    const [newValue, setNewValue] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');

    useEffect(() => {
        setNewValue('');
        setEditingId(null);
    }, [dictionary]);


    const handleAddSubmit = () => {
        const trimmed = newValue.trim();
        if (trimmed) addMutation.mutate(trimmed);
    };

    const handleEditSubmit = () => {
        if (cancelEditRef.current) {
            cancelEditRef.current = false;
            return;
        }

        if (editingId === null) return;
        const trimmed = editValue.trim();
        
        const currentItem = dictItems.find((i: DictionaryItem) => i.id === editingId);
        if (!trimmed || (currentItem && currentItem.value === trimmed)) {
            setEditingId(null);
            return;
        }

        updateMutation.mutate({ id: editingId, value: trimmed });
    };

    const startEditing = (item: DictionaryItem) => {
        setEditingId(item.id);
        setEditValue(item.value);
    };

    if (isQueryLoading) {
        return (
            <Center h={200}>
                <Loader color="blue" />
            </Center>
        );
    }

    return (
        <Table highlightOnHover verticalSpacing="sm">
            <Table.Tbody>
                {dictItems.map((item: DictionaryItem) => (
                    <Table.Tr key={item.id}>
                        <Table.Td 
                            onClick={() => {
                                if (editingId !== item.id && !updateMutation.isPending) {
                                    startEditing(item);
                                }
                            }}
                            style={{ cursor: editingId === item.id ? 'default' : 'pointer' }}
                        >
                            {editingId === item.id ? (
                                <TextInput
                                    autoFocus
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.currentTarget.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') e.currentTarget.blur();
                                        if (e.key === 'Escape') {
                                            setEditingId(null)
                                            cancelEditRef.current = true;
                                        };
                                    }}
                                    onBlur={handleEditSubmit}
                                    disabled={updateMutation.isPending}
                                    variant="unstyled"
                                    rightSection={updateMutation.isPending ? <Loader size="xs" color="blue" /> : null}
                                />
                            ) : (
                                item.value
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
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAddSubmit();
                                if (e.key === 'Escape') {
                                    setNewValue('');
                                    e.currentTarget.blur();
                                };
                            }}
                            disabled={addMutation.isPending}
                            rightSection={
                                addMutation.isPending ? (
                                    <Loader size="xs" color="blue" />
                                ) : (
                                    <ActionIcon 
                                        color="blue" 
                                        variant="subtle" 
                                        onClick={handleAddSubmit}
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