import { useState, useEffect } from 'react';
import { Grid, Stack, Title, Text, Button, NavLink, Table, Group, Center, Loader } from '@mantine/core';
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

    const getDictionary = () => {
            setTimeout(() => {
                setDictItems(MOCK_DICTIONARIES[activeDictionary.mockKey] || []);
                setIsLoading(false);
            }, 300);
    }

    useEffect(() => {
        const fetchDictionary = async () => {
            setIsLoading(true);
            getDictionary();
        };

        fetchDictionary();
    }, [activeDictionary]);

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
                        <Button>+ Add</Button>
                    </Group>
                    
                    {isLoading ? (
                        <Center h={200}>
                            <Loader color="blue" />
                        </Center>
                    ) : (
                        <Table striped highlightOnHover>
                            <Table.Tbody>
                                {dictItems.map((value) => (
                                    <Table.Tr key={value}>
                                        <Table.Td>{value}</Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    )}
                </Grid.Col>
            </Grid>
        </Stack>
    );
};