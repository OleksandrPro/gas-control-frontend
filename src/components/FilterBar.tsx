import { useState } from 'react';
import { TextInput, MultiSelect, Button, Group, Stack, SimpleGrid, Paper, Text, Tooltip } from '@mantine/core';
import { NumberFilter } from './NumberFilter';
import { useDictionaries } from '../hooks/useDictionaries';
import { mapToSelectData } from '../utils';

export const FilterBar = () => {
    const [isFilterBarOpen, setIsFilterBarOpen] = useState(false)

    const { districts, properties, pressures, materials, groundLevels, objectNames, cuts } = useDictionaries();

    const toggleFilterBar = () => {
        const newState = !isFilterBarOpen
        setIsFilterBarOpen(newState)
    }

    const districtsData = mapToSelectData(districts);
    const propertiesData = mapToSelectData(properties);
    const pressuresData = mapToSelectData(pressures);
    const objectNamesData = mapToSelectData(objectNames);
    const cutsData = mapToSelectData(cuts);
    const materialsData = mapToSelectData(materials);
    const groundLevelsData = mapToSelectData(groundLevels);

    return (
        <Paper bg="gray.1" p="md" radius="md" withBorder>
            <Stack>
                <Group>
                    <Tooltip 
                        label="You can filter by ..."
                        position="bottom-start"
                        openDelay={500}
                        closeDelay={200}
                        withArrow>
                        <TextInput placeholder="Search by inv. number or address..." />
                    </Tooltip>
                    <Button onClick={toggleFilterBar}>
                        {isFilterBarOpen ? 'Hide filters': 'Open filters'}
                    </Button>
                    <Button>Search</Button>
                </Group>
                {isFilterBarOpen &&
                <Stack>
                    <Text>Card filters</Text>
                    <Paper bg="gray.0" p="md" radius="md" withBorder>
                        <SimpleGrid cols={3}>
                            <MultiSelect label="DISTRICT" placeholder="All districts" data={districtsData} searchable />
                            <MultiSelect label="OWNERSHIP" placeholder="Any" data={propertiesData} searchable />
                            <MultiSelect label="Object Names" placeholder="Any" data={objectNamesData} searchable />
                            <MultiSelect label="PRESSURES" placeholder="Any" data={pressuresData} searchable />
                            <TextInput label="FOLDER" placeholder="Enter folder"/>
                            <MultiSelect label="CUT TYPE" placeholder="Any" data={cutsData} searchable />
                        </SimpleGrid>
                    </Paper>
                    <Text>Pipe filters</Text>
                    <Paper bg="gray.0" p="md" radius="md" withBorder>
                        <SimpleGrid cols={2}>
                            <MultiSelect 
                                label="MATERIAL" 
                                placeholder="All materials" 
                                data={materialsData} 
                            />
                            <MultiSelect 
                                label="GROUND LEVELS" 
                                placeholder="All ground levels" 
                                data={groundLevelsData} 
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