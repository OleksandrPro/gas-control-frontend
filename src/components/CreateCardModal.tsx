import { Modal, TextInput, Select, Button, SimpleGrid, NumberInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useDictionaries } from '../hooks/useDictionaries';

interface CreateCardModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CreateCardModal = ({ opened, onClose }: CreateCardModalProps) => {
  const { districts, properties, pressures, objectNames, cuts } = useDictionaries();

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
          data={districts} 
          defaultValue={districts[0]}
        />
        <Select 
          label="Pressures" 
          placeholder="Select" 
          data={pressures} 
          defaultValue={pressures[0]}
        />
        <Select 
          label="Object Name" 
          placeholder="Select" 
          data={objectNames} 
          defaultValue={objectNames[0]}
        />
        <Select 
          label="OWNERSHIP" 
          placeholder="Select" 
          data={properties} 
          defaultValue={properties[0]}
        />
        <NumberInput 
          label="Total length"
          placeholder="e.g. 1.7412"
          allowDecimal={true} 
        />
        <TextInput 
          label="FOLDER" 
          placeholder="Enter folder"
        />
        <Select 
          label="CUT TYPE" 
          placeholder="Select" 
          data={cuts} 
          defaultValue={cuts[0]}
        />
        <DateInput 
          label="BUILD DATE" 
          placeholder="mm / dd / yyyy" 
          valueFormat="MM/DD/YYYY"
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