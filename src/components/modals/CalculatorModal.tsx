import { Modal, Select, NumberInput, Button, SimpleGrid, Text } from '@mantine/core';
import { useDictionaries } from '../hooks/useDictionaries';

interface CalculatorModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CalculatorModal = ({
  opened, 
  onClose
}: CalculatorModalProps) => {

  const { districts, properties, pressures, materials, groundLevels, cuts } = useDictionaries();

  return (
    <Modal opened={opened} onClose={onClose} title="Pipe Calculator" size="md">
      <Text>Calculation of total length by filters</Text>
      <SimpleGrid cols={2}>
        <Select 
            label="MATERIAL" 
            placeholder="All materials" 
            data={materials} 
        />
        <Select 
            label="GROUND LEVELS" 
            placeholder="All materials" 
            data={groundLevels} 
        />
        <NumberInput 
            label="DIAMETER (MM)" 
            placeholder="e.g. 159" 
        />
        <Select 
            label="CUTS" 
            placeholder="All cuts" 
            data={cuts} 
        />
        <Select 
            label="COLUMN TYPE" 
            placeholder="By fact" 
            data={['By fact', 'Balance']} 
        />
        
      </SimpleGrid>

      <Button fullWidth onClick={onClose}>
        Calculate length
      </Button>
    </Modal>
  );
};