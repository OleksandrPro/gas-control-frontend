import { useState } from "react";
import { Button, Group, Title, Text, Pagination } from "@mantine/core";
import { CreateCardModal } from "../components/CreateCardModal";
import { CardList } from "../components/CardList";
import { FilterBar } from "../components/FilterBar";

import { MOCK_CARDS } from "../MockData";


export const HomePage = () => {
    const [opened, setOpened] = useState(false);

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

            <FilterBar/>

            <CardList cards={MOCK_CARDS}/>
            
            <Group justify="space-between">
                <Text>TOTAL: 145 records</Text>
                <Pagination total={3} />
            </Group>

            <CreateCardModal 
                opened={opened} 
                onClose={() => setOpened(false)}
            />
        </div>
    );
};