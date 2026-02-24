import { Modal, NumberInput, Select, Button, SimpleGrid, Text, Stack } from '@mantine/core';

interface EquipmentRecordModalProps {
  opened: boolean;
  onClose: () => void;
}

export const EquipmentRecordModal = ({ opened, onClose }: EquipmentRecordModalProps) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Edit record" size="lg">
      <Stack>
        <Text>Parameters for: Pipe</Text>
        
        <SimpleGrid cols={2}>
            <NumberInput label="Diameter" defaultValue={159} />
            <NumberInput label="Length" defaultValue={47.0} />
            
            <Select 
                label="Material" 
                data={['Steel', 'Polyethylene']} 
                defaultValue="Steel" 
            />
            <Select 
                label="Placement" 
                data={['Underground', 'Above ground']} 
                defaultValue="Underground" 
            />
        </SimpleGrid>

        <div>
            <Text>COLUMN (NOT CHANGED)</Text>
            <Button variant="light" size="xs">FACT</Button>
        </div>

        <Button fullWidth onClick={onClose}>
            Save changes
        </Button>
      </Stack>
    </Modal>
  );
};