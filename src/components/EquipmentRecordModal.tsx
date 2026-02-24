import { useState } from 'react';
import { Modal, NumberInput, Select, Button, SimpleGrid, Text, Stack, TextInput, Group, Checkbox, Paper } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useDictionaries } from '../hooks/useDictionaries';

const PipeParams = () => {
  const { materials, groundLevels } = useDictionaries();

    return (
        <SimpleGrid cols={2}>
            <NumberInput label="Diameter" placeholder="e.g. 159" />
            <NumberInput label="Length" placeholder="e.g. 47.0" />
            <Select 
                label="Material" 
                data={materials} 
                defaultValue={materials[0]}
            />
            <Select 
                label="Placement" 
                data={groundLevels} 
                defaultValue={groundLevels[0]}
            />
        </SimpleGrid>
    );
};

const ValveParams = () => {
    return (
        <Stack>
            <SimpleGrid cols={2}>
                <NumberInput label="Diameter" placeholder="e.g. 100" />
                <NumberInput label="Quantity (pcs)" placeholder="e.g. 1" />
            </SimpleGrid>
            <TextInput label="Model / Number" placeholder="e.g. Z-100" />
        </Stack>
    );
};

const OtherParams = () => {
    return (
        <NumberInput label="Quantity (pcs)" placeholder="e.g. 1" />
    );
};

interface EquipmentRecordModalProps {
  opened: boolean;
  onClose: () => void;
}

type EquipmentType = 'pipe' | 'valve' | 'other';

export const EquipmentRecordModal = ({ opened, onClose }: EquipmentRecordModalProps) => {
    const [activeType, setActiveType] = useState<EquipmentType>('pipe');

    const renderParams = () => {
        switch (activeType) {
            case 'pipe': return <PipeParams />;
            case 'valve': return <ValveParams />;
            case 'other': return <OtherParams />;
            default: return null;
        }
    };

    const typeLabels: Record<EquipmentType, string> = {
        pipe: 'Pipe',
        valve: 'Valve',
        other: 'Other (GC etc.)'
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Add equipment" size="lg">
            <Stack>
                <div>
                    <Text size="sm" fw={500} mb={5}>EQUIPMENT TYPE</Text>
                    <Group gap="xs">
                        <Button 
                            variant={activeType === 'pipe' ? 'filled' : 'default'} 
                            onClick={() => setActiveType('pipe')}
                        >
                            Pipe
                        </Button>
                        <Button 
                            variant={activeType === 'valve' ? 'filled' : 'default'} 
                            onClick={() => setActiveType('valve')}
                        >
                            Valve
                        </Button>
                        <Button 
                            variant={activeType === 'other' ? 'filled' : 'default'} 
                            onClick={() => setActiveType('other')}
                        >
                            Other (GC and etc.)
                        </Button>
                    </Group>
                </div>

                <TextInput 
                    label="NAME (DESCRIPTION)" 
                    placeholder="e.g. Steel pipe d159" 
                />

                <Paper bg="gray.0" p="md" radius="md" withBorder>
                    <Stack>
                        <Group gap="xs">
                            <IconInfoCircle size={20} color="var(--mantine-color-blue-filled)" />
                            <Text fw={600}>Parameters for: {typeLabels[activeType]}</Text>
                        </Group>
                        
                        {renderParams()}

                        <div>
                            <Text size="sm" fw={500} mt="sm" c="dimmed">ADD TO COLUMN</Text>
                            <Group mt={5}>
                                <Checkbox label="Balance" defaultChecked />
                                <Checkbox label="By fact" defaultChecked />
                                <Checkbox label="In cut" />
                            </Group>
                        </div>
                    </Stack>
                </Paper>

                <Button fullWidth mt="md" size="md" onClick={onClose}>
                    Add equipment
                </Button>

            </Stack>
        </Modal>
    );
};