import { useState, useEffect } from 'react';
import { Grid, Stack, Title, Text, NavLink, Table, Group, Center, Loader, TextInput, ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { MOCK_DICTIONARIES } from '../MockData';

const DICTIONARY_REGISTRY = [
    { id: 'districts', label: 'Districts', endpoint: 'districts', mockKey: 'Districts' },
    { id: 'materials', label: 'Materials', endpoint: 'pipe-materials', mockKey: 'Materials' },
    { id: 'cuts', label: 'Cut types', endpoint: 'cut-types', mockKey: 'Cut types' },
    { id: 'ownership', label: 'Ownership', endpoint: 'property-types', mockKey: 'Ownership' },
    { id: 'pressures', label: 'Pressures', endpoint: 'pressure-types', mockKey: 'Pressures' },
    { id: 'ground', label: 'Ground Levels', endpoint: 'ground-levels', mockKey: 'GroundLevels' },
    { id: 'objects', label: 'Object Names', endpoint: 'object-names', mockKey: 'Object Names' },
];

export const DictionariesPage = () => {
    const [activeDictionary, setActiveDictionary] = useState(DICTIONARY_REGISTRY[0]);

    const [dictItems, setDictItems] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [newValue, setNewValue] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const getDictionary = () => {
            setTimeout(() => {
                setDictItems(MOCK_DICTIONARIES[activeDictionary.mockKey] || []);
                setIsLoading(false);
            }, 300);
    }

    const saveNewData = (trimmedValue: string) => {
        setTimeout(() => {
            setDictItems([...dictItems, trimmedValue]);
            setNewValue('');
            setIsSaving(false);
        }, 400);
    }

    const handleAddItem = () => {
        const trimmedValue = newValue.trim();
        if (!trimmedValue) return;

        setIsSaving(true);
        saveNewData(trimmedValue)        
    };

    const cancelAdding = () => {
        setNewValue('');
        setIsSaving(false);
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

    useEffect(() => {
        const fetchDictionary = async () => {
            setIsLoading(true);
            setNewValue('');
            getDictionary();
        };

        fetchDictionary();
    }, [activeDictionary]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleAddItem();
        if (e.key === 'Escape') cancelAdding();
    };

    const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSaveEdit();
        if (e.key === 'Escape') cancelEditing();
    };

    return (
        <Stack>
            <div>
                <Title order={2}>Dictionaries Management</Title>
                <Text>Editing system reference data</Text>
            </div>

            <Grid>
                <Grid.Col span={3}>
                    <Text>LIST OF DICTIONARIES</Text>
                    {DICTIONARY_REGISTRY.map((dict) => (
                        <NavLink
                            key={dict.id}
                            label={dict.label}
                            active={activeDictionary.id === dict.id}
                            onClick={() => setActiveDictionary(dict)}
                        />
                    ))}
                </Grid.Col>

                <Grid.Col span={9}>
                    <Group justify="space-between">
                        <Title order={3}>{activeDictionary.label}</Title>
                    </Group>
                    
                    {isLoading ? (
                        <Center h={200}>
                            <Loader color="blue" />
                        </Center>
                    ) : (
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
                    )}
                </Grid.Col>
            </Grid>
        </Stack>
    );
};