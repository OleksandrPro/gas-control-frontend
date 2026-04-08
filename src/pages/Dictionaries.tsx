import { useState } from 'react';
import { Grid, Stack, Title, Text, NavLink, Card, Box } from '@mantine/core';

import { PageContainer } from '../components/layout/PageContainer';
import { DictionaryEditor, type DictionaryConfig } from '../components/dictionaries/DictionaryEditor';
import { DICTIONARY_ENDPOINTS } from '../api/Dictionaries';

import { 
    ListHeaderTextStyle
} from '../styles/Dictionary';
import { CardWithDarkHeaderStyle } from '../styles/CardWithDarkHeader';

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
        <PageContainer>
            <Stack>
                <div>
                    <Title order={2}>Dictionaries Management</Title>
                    <Text>Editing system reference data</Text>
                </div>

                <Grid>
                    <Grid.Col span={3}>
                        <Card styles={CardWithDarkHeaderStyle}>
                            <Card.Section inheritPadding>                            
                                <Text style={ListHeaderTextStyle}>List of dictionaries</Text>
                            </Card.Section>
                            <Stack gap={4} mt="md">
                                {DICTIONARY_REGISTRY.map((dict) => (
                                    <NavLink
                                        key={dict.id}
                                        label={dict.label}
                                        active={activeDictionary.id === dict.id}
                                        onClick={() => setActiveDictionary(dict)}
                                    />
                                ))}
                            </Stack>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={9}>
                        <Card styles={CardWithDarkHeaderStyle}>
                            <Card.Section inheritPadding> 
                                <Title order={4} c="blue.7">{activeDictionary.label}</Title>
                            </Card.Section> 
                        
                            <Box p="md">
                                <DictionaryEditor dictionary={activeDictionary}/>
                            </Box>
                        </Card>
                    </Grid.Col>
                </Grid>
            </Stack>
        </PageContainer>
    );
};