import { useState } from 'react';
import { TextInput, MultiSelect, Button, Group, Stack, SimpleGrid } from '@mantine/core';

interface FilterBarProps {
    districts: string[];
    properties: string[];
    pressures: string[];
    cuts: string[];
}

export const FilterBar = ({ districts, properties, pressures, cuts }: FilterBarProps) => {
    const [isFilterBarOpen, setIsFilterBarOpen] = useState(false)

    const toggleFilterBar = () => {
        const newState = !isFilterBarOpen
        setIsFilterBarOpen(newState)
    }

    return (
        <Stack>
            <Group>
                <TextInput placeholder="Search by inv. number or address..." />
                <Button onClick={toggleFilterBar}>Hide filters</Button>
                <Button>Search</Button>
            </Group>
            {isFilterBarOpen && <SimpleGrid cols={3}>
                <MultiSelect label="DISTRICT" placeholder="All districts" data={districts} />
                <MultiSelect label="OWNERSHIP" placeholder="Any" data={properties} />
                <MultiSelect label="PRESSURES" placeholder="Any" data={pressures} />
                <MultiSelect label="CUT TYPE" placeholder="Any" data={cuts} />
            </SimpleGrid>}
        </Stack>
    );
};