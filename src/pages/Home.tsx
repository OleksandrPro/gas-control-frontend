import { useState, useMemo } from "react";
import { useQuery } from '@tanstack/react-query';
import { Button, Group, Title, Text, Center, Loader, Stack } from "@mantine/core";
import { PageContainer } from "../components/layout/PageContainer";
import { CreateCardModal } from "../components/modals/CreateCardModal";
import { CardList } from "../components/cards/CardList";
import { FilterBar } from "../components/ui/FilterBar";
import { type CardFilterPayload } from "../utils/payloads/FilterPayload";

import { getCards } from "../api/Cards";
import { useDictionaries } from "../hooks/useDictionaries";
import { mapCardToDisplay } from "../utils/Mapper";
import { PAGE_SIZE_BASE_OPTION, PAGE_SIZE_OPTIONS } from "../constants";
import { TablePagination } from "../components/ui/Pagination";


export const HomePage = () => {
    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPageSize] = useState<string>(String(PAGE_SIZE_BASE_OPTION));
    const [filters, setFilters] = useState<CardFilterPayload>({});
    const [opened, setOpened] = useState(false);

    const handleSearch = (newFilters: CardFilterPayload) => {
        setFilters(newFilters);
        setActivePage(1); 
    };

    const { data: response, isLoading: isCardsLoading } = useQuery({
        queryKey: ['cards', activePage, filters, pageSize], 
        queryFn: () => getCards({
            ...filters,
            page: activePage,
            size: pageSize
        }) 
    });

    const cards = response?.items || [];
    const totalRecords = response?.total || 0;
    const totalPages = response?.total_pages || 1;

    const handlePageSizeChange = (newSize: string) => {
        setPageSize(newSize);
        setActivePage(1);
    };

    const { 
        districts, pressures, properties, objectNames, cuts, isLoading: isDictsLoading 
    } = useDictionaries();

    const displayCards = useMemo(() => {
        if (!cards) return [];

        return cards.map((backendCard: any) => 
            mapCardToDisplay(backendCard, {
                districts,
                pressures,
                properties,
                objectNames,
                cuts
            })
        );
    }, [response, districts, pressures, properties, objectNames, cuts]);

    const isLoading = isCardsLoading || isDictsLoading;

    return (
        <PageContainer>
            <Stack gap="lg">
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
                    <Stack>
                        <TablePagination 
                            page={activePage}
                            onPageChange={setActivePage}
                            pageSize={pageSize}
                            onPageSizeChange={handlePageSizeChange}
                            totalRecords={totalRecords}
                            totalPages={totalPages}
                            pageSizeOptions={PAGE_SIZE_OPTIONS}
                        />
                        <CardList cards={displayCards} />
                        {cards.length > 0 && (
                            <TablePagination 
                                page={activePage}
                                onPageChange={setActivePage}
                                pageSize={pageSize}
                                onPageSizeChange={handlePageSizeChange}
                                totalRecords={totalRecords}
                                totalPages={totalPages}
                                pageSizeOptions={PAGE_SIZE_OPTIONS}
                            />
                        )}
                    </Stack>
                )}

                <CreateCardModal 
                    opened={opened} 
                    onClose={() => setOpened(false)}
                />
            </Stack>
        </PageContainer>
    );
};