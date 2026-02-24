import { useState } from 'react';
import { Grid, Stack, Title, Text, Button, NavLink, Table, Group } from '@mantine/core';

interface DictionariesPageProps {
    dictionaries: Record<string, string[]>
}

export const DictionariesPage = ({dictionaries}: DictionariesPageProps) => {
    const dictionaryKeys = Object.keys(dictionaries);

    const [activeDictionary, setActiveDictionary] = useState(dictionaryKeys[0])

    const activeValues = dictionaries[activeDictionary] || [];

    return (
        <Stack>
            <div>
                <Title order={2}>Dictionaries Management</Title>
                <Text>Editing system reference data</Text>
            </div>

            <Grid>
                <Grid.Col span={3}>
                    <Text>LIST OF DICTIONARIES</Text>
                    {dictionaryKeys.map((key) => (
                        <NavLink
                            key={key} 
                            label={key} 
                            description={dictionaries[key].length.toString()} 
                            onClick={()=>setActiveDictionary(key)} />
                    ))}
                </Grid.Col>

                <Grid.Col span={9}>
                    <Group justify="space-between">
                        <Title order={3}>{activeDictionary}</Title>
                        <Button>+ Add</Button>
                    </Group>
                    
                    <Table>
                        <Table.Tbody>
                            {activeValues.map((value) => (
                                <Table.Tr key={value}>
                                    <Table.Td>{value}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Grid.Col>
            </Grid>
        </Stack>
    );
};