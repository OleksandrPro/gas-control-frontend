import { useState, useMemo } from "react";
import { useQuery } from '@tanstack/react-query';
import { Button, Group, Title, Text, Pagination, Center, Loader } from "@mantine/core";
import { CreateCardModal } from "../components/modals/CreateCardModal";
import { CardList } from "../components/CardList";
import { FilterBar, type CardFilterPayload } from "../components/FilterBar";

import { getCards } from "../api/Cards";
import { useDictionaries } from "../hooks/useDictionaries";
import { mapCardToDisplay } from "../Mapper";


export const HomePage = () => {
    const [activePage, setActivePage] = useState(1);
    const [filters, setFilters] = useState<CardFilterPayload>({});
    const [opened, setOpened] = useState(false);

    const handleSearch = (newFilters: CardFilterPayload) => {
        setFilters(newFilters);
        setActivePage(1); 
    };

    const { data: serverResponse, isLoading: isCardsLoading } = useQuery({
        queryKey: ['cards', activePage, filters], 
        queryFn: () => getCards({
            ...filters,
            page: activePage,
            size: 50
        }) 
    });

    const { 
        districts, pressures, properties, objectNames, cuts, isLoading: isDictsLoading 
    } = useDictionaries();

    const displayCards = useMemo(() => {
        if (!serverResponse?.items) return [];

        return serverResponse.items.map((backendCard: any) => 
            mapCardToDisplay(backendCard, {
                districts,
                pressures,
                properties,
                objectNames,
                cuts
            })
        );
    }, [serverResponse, districts, pressures, properties, objectNames, cuts]);

    const isLoading = isCardsLoading || isDictsLoading;

    return (
        <div style={{ padding: '20px' }}>
            <Group justify="space-between">
                <div>
                    <Title order={2}>Card Registry</Title>
                    <Text>Database of gas pipeline sections</Text>
                </div>
                <Button onClick={() => setOpened(true)}>
                    Create card
                </Button>
            </Group>

            <FilterBar onSearch={handleSearch} />

            {isLoading ? (
                <Center h={300}>
                    <Loader color="blue" />
                </Center>
            ) : (
                <CardList cards={displayCards} />
            )}
            
            <Group justify="space-between">
                <Text fw={500}>TOTAL: {serverResponse?.total || 0} records</Text>
                <Pagination 
                    total={serverResponse?.total_pages || 1} 
                    value={activePage} 
                    onChange={setActivePage} 
                />
            </Group>

            <CreateCardModal 
                opened={opened} 
                onClose={() => setOpened(false)}
            />
        </div>
    );
};