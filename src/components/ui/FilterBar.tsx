import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { TextInput, MultiSelect, Button, Group, Stack, SimpleGrid, Paper, Text, Tooltip, Card, Collapse} from '@mantine/core';
import { NumberFilter } from './NumberFilter';
import { useDictionaries } from '../../hooks/useDictionaries';
import { mapToSelectData } from '../../utils/utils';
import { type NumberFilterPayload } from './NumberFilter';
import { buildFilterPayload, type FilterState, type CardFilterPayload } from '../../utils/payloads/FilterPayload';
import { getPipesLengthStats } from '../../api/Analytics';
import { CalculatorModal } from '../modals/CalculatorModal';
import { IconSearch } from '@tabler/icons-react';
import { SearchInputStyle, InnerCardStyle, SectionHeaderTextStyle } from '../../styles/FilterBar';

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

    const [isCalcModalOpened, setIsCalcModalOpened] = useState(false);

    const [diameterFilter, setDiameterFilter] = useState<NumberFilterPayload | null>(null);

    const { districts, properties, pressures, materials, groundLevels, objectNames, cuts } = useDictionaries();

    const toggleFilterBar = () => {
        const newState = !isFilterBarOpen
        setIsFilterBarOpen(newState)
    }

    const currentFilterState: FilterState = {
        searchQuery, districtsFilter, ownershipFilter, objectsFilter, 
        pressuresFilter, folderFilter, cutsFilter, materialsFilter, 
        groundLevelsFilter, columnTypesFilter, diameterFilter
    };

    const districtsData = mapToSelectData(districts);
    const propertiesData = mapToSelectData(properties);
    const pressuresData = mapToSelectData(pressures);
    const objectNamesData = mapToSelectData(objectNames);
    const cutsData = mapToSelectData(cuts);
    const materialsData = mapToSelectData(materials);
    const groundLevelsData = mapToSelectData(groundLevels);

    const calculateMutation = useMutation({
        mutationFn: (payload: CardFilterPayload) => getPipesLengthStats(payload),
        onError: () => {
            alert("Error calculating total length");
        }
    });

    const handleSearchClick = () => {
        const payload = buildFilterPayload(currentFilterState);
        onSearch(payload);
    };

    const handleCalculateClick = () => {
        setIsCalcModalOpened(true);
        const payload = buildFilterPayload(currentFilterState);
        calculateMutation.mutate(payload);
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
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()} 
                            leftSection={<IconSearch size={18} />}
                            styles={SearchInputStyle} 
                            size="md"
                        />
                    </Tooltip>
                    <Button onClick={toggleFilterBar}>
                        {isFilterBarOpen ? 'Hide filters': 'Open filters'}
                    </Button>
                    <Button onClick={handleSearchClick}>Search</Button>
                    <Button variant="light" color="green" onClick={handleCalculateClick}>
                        Calculate Length
                    </Button>
                </Group>
                <Collapse in ={isFilterBarOpen}>
                    <Stack>
                         <Card styles={InnerCardStyle}>
                            <Card.Section inheritPadding>
                                <Text styles={SectionHeaderTextStyle}>Card parameters</Text>
                            </Card.Section>
                            <SimpleGrid cols={3}>
                                <MultiSelect label="DISTRICT" placeholder="All districts" data={districtsData} searchable value={districtsFilter} onChange={setDistrictsFilter} clearable />
                                <MultiSelect label="OWNERSHIP" placeholder="Any" data={propertiesData} searchable value={ownershipFilter} onChange={setOwnershipFilter} clearable />
                                <MultiSelect label="Object Names" placeholder="Any" data={objectNamesData} searchable value={objectsFilter} onChange={setObjectsFilter} clearable />
                                <MultiSelect label="PRESSURES" placeholder="Any" data={pressuresData} searchable value={pressuresFilter} onChange={setPressuresFilter} clearable />
                                <TextInput label="FOLDER" placeholder="Enter folder" value={folderFilter} onChange={(e) => setFolderFilter(e.currentTarget.value)} />
                                <MultiSelect label="CUT TYPE" placeholder="Any" data={cutsData} searchable value={cutsFilter} onChange={setCutsFilter} clearable />
                            </SimpleGrid>
                        </Card>
                        <Card styles={InnerCardStyle}>
                            <Card.Section inheritPadding>
                                <Text styles={SectionHeaderTextStyle}>Equipment parameters</Text>
                            </Card.Section>
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
                        </Card>
                    </Stack>
                </Collapse>
            </Stack>

            <CalculatorModal 
                opened={isCalcModalOpened} 
                onClose={() => setIsCalcModalOpened(false)} 
                isLoading={calculateMutation.isPending}
                isSuccess={calculateMutation.isSuccess}
                totalLength={calculateMutation.data?.total_length}
            />
        </Paper>
    );
};