import { useState } from 'react';
import { TextInput, MultiSelect, Button, Group, Stack, SimpleGrid, Paper, Text } from '@mantine/core';
import { NumberFilter } from './NumberFilter';
import { useDictionaries } from '../hooks/useDictionaries';

export const FilterBar = () => {
    const [isFilterBarOpen, setIsFilterBarOpen] = useState(false)

    const { districts, properties, pressures, materials, groundLevels, objectNames, cuts } = useDictionaries();

    const toggleFilterBar = () => {
        const newState = !isFilterBarOpen
        setIsFilterBarOpen(newState)
    }

    return (
        <Paper bg="gray.1" p="md" radius="md" withBorder>
            <Stack>
                <Group>
                    <TextInput placeholder="Search by inv. number or address..." />
                    <Button onClick={toggleFilterBar}>Hide filters</Button>
                    <Button>Search</Button>
                </Group>
                {isFilterBarOpen &&
                <Stack>
                    <Text>Card filters</Text>
                    <Paper bg="gray.0" p="md" radius="md" withBorder>
                        <SimpleGrid cols={3}>
                            <MultiSelect label="DISTRICT" placeholder="All districts" data={districts} />
                            <MultiSelect label="OWNERSHIP" placeholder="Any" data={properties} />
                            <MultiSelect label="Object Names" placeholder="Any" data={objectNames} />
                            <MultiSelect label="PRESSURES" placeholder="Any" data={pressures} />
                            <MultiSelect label="CUT TYPE" placeholder="Any" data={cuts} />
                        </SimpleGrid>
                    </Paper>
                    <Text>Pipe filters</Text>
                    <Paper bg="gray.0" p="md" radius="md" withBorder>
                        <SimpleGrid cols={2}>
                            <MultiSelect 
                                label="MATERIAL" 
                                placeholder="All materials" 
                                data={materials} 
                            />
                            <MultiSelect 
                                label="GROUND LEVELS" 
                                placeholder="All ground levels" 
                                data={groundLevels} 
                            />
                            <NumberFilter onChange={(data) => console.info(data)}/>
                            <MultiSelect 
                                label="COLUMN TYPE" 
                                placeholder="By fact" 
                                data={['By fact', 'Balance']} 
                            />
                        </SimpleGrid>
                    </Paper>
                </Stack>
                
                }
            </Stack>
        </Paper>
        
    );
};