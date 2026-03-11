import { useState } from 'react';
import { TextInput, MultiSelect, Button, Group, Stack, SimpleGrid, Paper, Text, Tooltip } from '@mantine/core';
import { NumberFilter } from './NumberFilter';
import { useDictionaries } from '../hooks/useDictionaries';
import { mapToSelectData } from '../utils';
import { type NumberFilterPayload } from './NumberFilter';

export interface CardFilterPayload {
    inventory_number_like?: string;
    district_id?: number[];
    property_type_id?: number[];
    object_name_id?: number[];
    pressure_type_id?: number[];
    folder?: string[];
    cut_type_id?: number[];
    pipe_material_id?: number[];
    groung_level_id?: number[];
    column_type?: string[];
    pipe_diameter_equal?: number;
    pipe_diameter_min?: number;
    pipe_diameter_max?: number;
}

interface FilterBarProps {
    onSearch: (filters: CardFilterPayload) => void;
}

export const FilterBar = ({ onSearch }: FilterBarProps) => {
    const [isFilterBarOpen, setIsFilterBarOpen] = useState(false)

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [districtsFilter, setDistrictsFilter] = useState<string[]>([]);
    const [ownershipFilter, setOwnershipFilter] = useState<string[]>([]);
    const [objectsFilter, setObjectsFilter] = useState<string[]>([]);
    const [pressuresFilter, setPressuresFilter] = useState<string[]>([]);
    const [folderFilter, setFolderFilter] = useState('');
    const [cutsFilter, setCutsFilter] = useState<string[]>([]);
    
    const [materialsFilter, setMaterialsFilter] = useState<string[]>([]);
    const [groundLevelsFilter, setGroundLevelsFilter] = useState<string[]>([]);
    const [columnTypesFilter, setColumnTypesFilter] = useState<string[]>([]);

    const [diameterFilter, setDiameterFilter] = useState<NumberFilterPayload | null>(null);

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

    const handleSearchClick = () => {
        const payload: CardFilterPayload = {};

        if (searchQuery.trim()) payload.inventory_number_like = searchQuery.trim();

        if (districtsFilter.length > 0) payload.district_id = districtsFilter.map(Number);
        if (ownershipFilter.length > 0) payload.property_type_id = ownershipFilter.map(Number);
        if (objectsFilter.length > 0) payload.object_name_id = objectsFilter.map(Number);
        if (pressuresFilter.length > 0) payload.pressure_type_id = pressuresFilter.map(Number);
        if (cutsFilter.length > 0) payload.cut_type_id = cutsFilter.map(Number);
        
        if (folderFilter.trim()) payload.folder = [folderFilter.trim()];

        if (materialsFilter.length > 0) payload.pipe_material_id = materialsFilter.map(Number);
        if (groundLevelsFilter.length > 0) payload.groung_level_id = groundLevelsFilter.map(Number);
        if (columnTypesFilter.length > 0) payload.column_type = columnTypesFilter;

        if (diameterFilter?.equal !== undefined) payload.pipe_diameter_equal = diameterFilter.equal;
        if (diameterFilter?.min !== undefined) payload.pipe_diameter_min = diameterFilter.min;
        if (diameterFilter?.max !== undefined) payload.pipe_diameter_max = diameterFilter.max;

        onSearch(payload);
    };

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
                        <TextInput 
                            placeholder="Search by inv. number..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.currentTarget.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()} />
                    </Tooltip>
                    <Button onClick={toggleFilterBar}>
                        {isFilterBarOpen ? 'Hide filters': 'Open filters'}
                    </Button>
                    <Button onClick={handleSearchClick}>Search</Button>
                </Group>
                {isFilterBarOpen &&
                <Stack>
                    <Text>Card filters</Text>
                    <Paper bg="gray.0" p="md" radius="md" withBorder>
                        <SimpleGrid cols={3}>
                            <MultiSelect label="DISTRICT" placeholder="All districts" data={districtsData} searchable value={districtsFilter} onChange={setDistrictsFilter} clearable />
                            <MultiSelect label="OWNERSHIP" placeholder="Any" data={propertiesData} searchable value={ownershipFilter} onChange={setOwnershipFilter} clearable />
                            <MultiSelect label="Object Names" placeholder="Any" data={objectNamesData} searchable value={objectsFilter} onChange={setObjectsFilter} clearable />
                            <MultiSelect label="PRESSURES" placeholder="Any" data={pressuresData} searchable value={pressuresFilter} onChange={setPressuresFilter} clearable />
                            <TextInput label="FOLDER" placeholder="Enter folder" value={folderFilter} onChange={(e) => setFolderFilter(e.currentTarget.value)} />
                            <MultiSelect label="CUT TYPE" placeholder="Any" data={cutsData} searchable value={cutsFilter} onChange={setCutsFilter} clearable />
                        </SimpleGrid>
                    </Paper>
                    <Text>Pipe filters</Text>
                    <Paper bg="gray.0" p="md" radius="md" withBorder>
                        <SimpleGrid cols={2}>
                            <MultiSelect 
                                label="MATERIAL" 
                                placeholder="All materials" 
                                data={materialsData} 
                                searchable
                                value={materialsFilter}
                                onChange={setMaterialsFilter}
                                clearable
                            />
                            <MultiSelect 
                                label="GROUND LEVELS" 
                                placeholder="All ground levels" 
                                data={groundLevelsData} 
                                searchable
                                value={groundLevelsFilter}
                                onChange={setGroundLevelsFilter}
                                clearable
                            />
                            <NumberFilter onChange={(data) => setDiameterFilter(data)}/>
                            <MultiSelect 
                                label="COLUMN TYPE" 
                                placeholder="Any" 
                                data={[
                                    { value: 'fact', label: 'By fact' }, 
                                    { value: 'balance', label: 'Balance' },
                                    { value: 'cut', label: 'In cut' }
                                ]} 
                                value={columnTypesFilter}
                                onChange={setColumnTypesFilter}
                                clearable
                            />
                        </SimpleGrid>
                    </Paper>
                </Stack>
                
                }
            </Stack>
        </Paper>
        
    );
};