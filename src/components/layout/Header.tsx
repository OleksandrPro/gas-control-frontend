import { Group, Box, Text, Button } from '@mantine/core';
import { IconHome, IconBook } from '@tabler/icons-react';
import { usePageNavigation } from '../../hooks/usePageNavigation';

import { HeaderContainerStyle, LogoBoxStyle, LogoTextStyle } from '../../styles/Header';

export function Header() {
  const { goToHome, goToDictionaries } = usePageNavigation()

  return (
    <Box style={HeaderContainerStyle}>
      <Group justify="space-between" h="100%" px="xl" maw={1600} mx="auto">
        <Group>
          <Box style={LogoBoxStyle}>G</Box>
          <Text style={LogoTextStyle}>
            GAMS
          </Text>
        </Group>
        <Group justify="flex-end">
          <Button 
            variant="subtle" 
            color="gray" 
            size="md"
            leftSection={<IconHome size={18} />} 
            onClick={goToHome}
          >
            Home
          </Button>
          <Button 
            variant="subtle" 
            color="gray" 
            size="md"
            leftSection={<IconBook size={18} />} 
            onClick={goToDictionaries}
          >
            Dictionaries
          </Button>
        </Group>
      </Group>
    </Box>
  );
}