import { useState } from 'react';
import { Grid, Stack, Title, Text, NavLink, Group } from '@mantine/core';

import { DictionaryEditor, type DictionaryConfig } from '../components/dictionaries/DictionaryEditor';
import { DICTIONARY_ENDPOINTS } from '../api/Dictionaries';

const DICTIONARY_REGISTRY: DictionaryConfig[] = [
    { id: 'districts', label: 'Districts', endpoint: DICTIONARY_ENDPOINTS.Districts },
    { id: 'materials', label: 'Materials', endpoint: DICTIONARY_ENDPOINTS.Materials },
    { id: 'cuts', label: 'Cut types', endpoint: DICTIONARY_ENDPOINTS.Cuts },
    { id: 'ownership', label: 'Ownership', endpoint: DICTIONARY_ENDPOINTS.Ownerships },
    { id: 'pressures', label: 'Pressures', endpoint: DICTIONARY_ENDPOINTS.Pressures },
    { id: 'ground', label: 'Ground Levels', endpoint: DICTIONARY_ENDPOINTS.GroundLevels },
    { id: 'objects', label: 'Object Names', endpoint: DICTIONARY_ENDPOINTS.ObjectNames },
];

export const DictionariesPage = () => {
    const [activeDictionary, setActiveDictionary] = useState(DICTIONARY_REGISTRY[0]);

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
                    
                    <DictionaryEditor dictionary={activeDictionary}/>
                </Grid.Col>
            </Grid>
        </Stack>
    );
};