import { useState } from 'react';
import { Burger, Group, Flex, Text, Button } from '@mantine/core';
import { usePageNavigation } from '../hooks/usePageNavigation';

export function Header() {
  const [isOpened, setIsOpened] = useState(false);

  const { goToHome, goToDictionaries } = usePageNavigation()

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
          <Button onClick={goToHome}>Home</Button>
          <Button onClick={goToDictionaries}>Dictionaries</Button>
        </Group>
      </Flex>
    </header>
  );
}