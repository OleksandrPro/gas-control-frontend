import { useState, useEffect } from 'react';
import { 
    Modal, NumberInput, Select, Button, SimpleGrid, 
    Text, Stack, TextInput, Paper, Badge, Group
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

import { type EquipmentType, type ColumnType } from '../types';
import { useDictionaries } from '../hooks/useDictionaries';

interface EditEquipmentModalProps {
    opened: boolean;
    onClose: () => void;
    type: EquipmentType;
    column: ColumnType;
    initialData: any;
    onSave: (newData: any) => void;
}

export const EditEquipmentModal = ({ opened, onClose, type, column, initialData, onSave }: EditEquipmentModalProps) => {
    const [formData, setFormData] = useState<any>({});

    const { materials, groundLevels } = useDictionaries();

    useEffect(() => {
        if (initialData) {
            setFormData({ ...initialData });
        }
    }, [initialData, opened]);

    const typeLabels: Record<EquipmentType, string> = {
        pipe: 'Pipe',
        valve: 'Valve',
        other: 'Other (GC etc.)'
    };

    const columnLabels: Record<ColumnType, string> = {
        balance: 'BALANCE',
        fact: 'FACT',
        inCut: 'IN CUT'
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    const renderFormFields = () => {
        if (type === 'pipe') {
            return (
                <SimpleGrid cols={2}>
                    <NumberInput 
                        label="Diameter" 
                        value={formData.diameter || ''} 
                        onChange={(val) => setFormData({ ...formData, diameter: Number(val) })}
                    />
                    <NumberInput 
                        label="Length" 
                        value={formData.length || ''} 
                        onChange={(val) => setFormData({ ...formData, length: Number(val) })}
                    />
                    <Select 
                        label="Material" 
                        data={materials} 
                        value={formData.material || ''}
                        onChange={(val) => setFormData({ ...formData, material: val })}
                    />
                    <Select 
                        label="Placement" 
                        data={groundLevels} 
                        value={formData.placement || ''}
                        onChange={(val) => setFormData({ ...formData, placement: val })}
                    />
                </SimpleGrid>
            );
        }

        if (type === 'valve') {
            return (
                <Stack>
                    <SimpleGrid cols={2}>
                        <NumberInput 
                            label="Diameter" 
                            value={formData.diameter || ''} 
                            onChange={(val) => setFormData({ ...formData, diameter: Number(val) })}
                        />
                        <NumberInput 
                            label="Quantity (pcs)" 
                            value={formData.quantity || ''} 
                            onChange={(val) => setFormData({ ...formData, quantity: Number(val) })}
                        />
                    </SimpleGrid>
                    <TextInput 
                        label="Model / Number" 
                        value={formData.model || 'Z-100'} 
                        onChange={(val) => setFormData({ ...formData, model: val.currentTarget.value })}
                    />
                </Stack>
            );
        }

        return (
            <NumberInput 
                label="Quantity (pcs)" 
                value={formData.quantity || ''} 
                onChange={(val) => setFormData({ ...formData, quantity: Number(val) })}
            />
        );
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Edit record" size="md">
            <Stack>
                <Paper bg="blue.0" p="md" radius="md" style={{ border: '1px solid var(--mantine-color-blue-2)' }}>
                    <Stack>
                        <Group gap="xs">
                            <IconInfoCircle size={20} color="var(--mantine-color-blue-filled)" />
                            <Text fw={600} c="blue.9">Parameters for: {typeLabels[type]}</Text>
                        </Group>
                        
                        {renderFormFields()}
                        
                        <div>
                            <Text size="sm" fw={500} mt="md" mb="xs" c="dimmed" tt="uppercase">
                                COLUMN (NOT CHANGED)
                            </Text>
                            <Badge color="blue" variant="light" size="lg" radius="sm">
                                {columnLabels[column]}
                            </Badge>
                        </div>
                    </Stack>
                </Paper>

                <Button fullWidth mt="md" size="md" onClick={handleSave}>
                    Save changes
                </Button>
            </Stack>
        </Modal>
    );
};