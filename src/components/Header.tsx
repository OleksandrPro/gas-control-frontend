import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Burger, Group, Flex, Text, Button } from '@mantine/core';
import { CalculatorModal } from './CalculatorModal';

export function Header() {
  const [isOpened, setIsOpened] = useState(false);
  const [calcOpened, setCalcOpened] = useState(false);

  const navigate = useNavigate()
  
  const goHome = () => {
    navigate("/")
  }

  const goDictionaries = () => {
    navigate("/dictionaries")
  }

  return (
    <header>
      <Flex justify={'space-between'}>
        <Group>
          <Burger opened={isOpened} onClick={() => setIsOpened(!isOpened)} hiddenFrom="sm" size="sm" />
          <Text size="xl" fw={700} c="blue">
            GAS PLOT
          </Text>
        </Group>
        <Group justify="flex-end">
          <Button onClick={goHome}>Home</Button>
          <Button onClick={goDictionaries}>Dictionaries</Button>
          <Button onClick={() => setCalcOpened(true)}>
            Calculator
          </Button>
        </Group>
      </Flex>

      <CalculatorModal opened={calcOpened} onClose={() => setCalcOpened(false)} />
    </header>
  );
}