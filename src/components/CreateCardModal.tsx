import { Modal, TextInput, Select, Button, SimpleGrid, NumberInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useDictionaries } from '../hooks/useDictionaries';
import type { DictionaryItem } from '../types';

interface CreateCardModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CreateCardModal = ({ opened, onClose }: CreateCardModalProps) => {
  const { districts, properties, pressures, objectNames, cuts } = useDictionaries();

  const mapToSelectData = (items: DictionaryItem[]) => {
      return items.map(item => ({
          value: item.id.toString(),
          label: item.value
      }));
  };

  const districtsData = mapToSelectData(districts);
  const propertiesData = mapToSelectData(properties);
  const pressuresData = mapToSelectData(pressures);
  const objectNamesData = mapToSelectData(objectNames);
  const cutsData = mapToSelectData(cuts);

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title="Create Card" 
      size="lg"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <TextInput 
          label="INVENTORY NUMBER" 
          placeholder="Enter number" 
        />
        <TextInput 
          label="INV. NUMBER (ESKD)" 
          placeholder="Enter ESKD number" 
        />
        <TextInput 
          label="ADDRESS" 
          placeholder="Enter address" 
          style={{ gridColumn: '1 / -1' }} 
        />
        <TextInput 
          label="Balance name" 
          placeholder="Enter balance name" 
          style={{ gridColumn: '1 / -1' }} 
        />
        <Select 
          label="DISTRICT" 
          placeholder="Select" 
          data={districtsData} 
          defaultValue={districtsData.length > 0 ? districtsData[0].value : null}
        />
        <Select 
          label="Pressures" 
          placeholder="Select" 
          data={pressuresData} 
          defaultValue={pressuresData.length > 0 ? pressuresData[0].value : null}
        />
        <Select 
          label="Object Name" 
          placeholder="Select" 
          data={objectNamesData} 
          defaultValue={objectNamesData.length > 0 ? objectNamesData[0].value : null}
        />
        <Select 
          label="OWNERSHIP" 
          placeholder="Select" 
          data={propertiesData} 
          defaultValue={propertiesData.length > 0 ? propertiesData[0].value : null}
        />
        <NumberInput 
          label="Total length"
          placeholder="e.g. 1.7412"
          allowDecimal={true}
          allowedDecimalSeparators={[',', '.']}
          step={0.1}
        />
        <TextInput 
          label="FOLDER" 
          placeholder="Enter folder"
        />
        <Select 
          label="CUT TYPE" 
          placeholder="Select" 
          data={cutsData} 
          defaultValue={cutsData.length > 0 ? cutsData[0].value : null}
        />
        <DateInput 
          label="BUILD DATE" 
          placeholder="DD.MM.YYYY" 
          valueFormat="DD.MM.YYYY"
          rightSection={<IconCalendar size={18} color="gray" />}
        />
      </SimpleGrid>

      <Button 
        fullWidth 
        mt="xl"
        size="md"
        color="blue"
        onClick={onClose}
      >
        Create card
      </Button>
    </Modal>
  );
};