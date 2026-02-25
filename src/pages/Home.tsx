import { useState } from "react";
import { Button, Group, Title, Text, Pagination } from "@mantine/core";
import { CreateCardModal } from "../components/CreateCardModal";
import { CalculatorModal } from "../components/CalculatorModal";
import { CardList } from "../components/CardList";
import { FilterBar } from "../components/FilterBar";

import { useDictionaries } from "../hooks/useDictionaries";
import { MOCK_CARDS } from "../MockData";


export const HomePage = () => {
    const [opened, setOpened] = useState(false);
    const [calcOpened, setCalcOpened] = useState(false);

    const { districts, properties, pressures, objectNames, cuts } = useDictionaries();

    return (
        <div style={{ padding: '20px' }}>
            <Group justify="space-between">
                <div>
                    <Title order={2}>Card Registry</Title>
                    <Text>Database of gas pipeline sections</Text>
                </div>
                <Button onClick={() => setCalcOpened(true)}>
                    Calculator
                </Button>
                <Button onClick={() => setOpened(true)}>
                    Create card
                </Button>
            </Group>

            <FilterBar districts={districts} properties={properties} pressures={pressures} cuts={cuts} />

            <CardList cards={MOCK_CARDS}/>
            
            <Group justify="space-between">
                <Text>TOTAL: 145 records</Text>
                <Pagination total={3} />
            </Group>

            <CreateCardModal 
                opened={opened} 
                onClose={() => setOpened(false)}
            />

            <CalculatorModal opened={calcOpened} onClose={() => setCalcOpened(false)} />
        </div>
    );
};