import { useState, useEffect } from 'react';
import { Modal, NumberInput, Select, Button, SimpleGrid, Text, Stack, TextInput, Group, Checkbox, Paper } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useDictionaries } from '../hooks/useDictionaries';
import { mapToSelectData } from '../utils';

interface FormParamsProps {
    formData: any;
    onChange: (key: string, value: any) => void;
}

const PipeParams = ({ formData, onChange }: FormParamsProps) => {
  const { materials, groundLevels } = useDictionaries();

    const materialOptions = mapToSelectData(materials);
    const placementOptions = mapToSelectData(groundLevels);

    return (
        <SimpleGrid cols={2}>
            <NumberInput 
                label="Diameter" 
                placeholder="e.g. 159" 
                value={formData.diameter || ''}
                onChange={(val) => onChange('diameter', val)}
            />
            <NumberInput 
                label="Length" 
                placeholder="e.g. 47.0" 
                value={formData.length || ''}
                allowDecimal={true}
                allowedDecimalSeparators={[',', '.']}
                step={0.1}
                onChange={(val) => onChange('length', val)}
            />
            <Select 
                label="Material" 
                data={materialOptions} 
                value={formData.material_id ? String(formData.material_id) : null}
                onChange={(val) => onChange('material_id', val ? Number(val) : null)}
            />
            <Select 
                label="Placement" 
                data={placementOptions} 
                value={formData.groung_level_id ? String(formData.groung_level_id) : null}
                onChange={(val) => onChange('groung_level_id', val ? Number(val) : null)}
            />
        </SimpleGrid>
    );
};

const ValveParams = ({ formData, onChange }: FormParamsProps) => {
    return (
        <Stack>
            <SimpleGrid cols={2}>
                <NumberInput 
                    label="Diameter" 
                    placeholder="e.g. 100" 
                    value={formData.diameter || ''}
                    onChange={(val) => onChange('diameter', val)}
                />
                <NumberInput 
                    label="Quantity (pcs)" 
                    placeholder="e.g. 1" 
                    value={formData.quantity || ''}
                    onChange={(val) => onChange('quantity', val)}
                />
            </SimpleGrid>
            <TextInput 
                label="Model / Number" 
                placeholder="e.g. Z-100" 
                value={formData.model_number || ''}
                onChange={(e) => onChange('model_number', e.currentTarget.value)}
            />
        </Stack>
    );
};

const OtherParams = ({ formData, onChange }: FormParamsProps) => {
    return (
        <NumberInput 
            label="Quantity (pcs)" 
            placeholder="e.g. 1" 
            value={formData.quantity || ''}
            onChange={(val) => onChange('quantity', val)}
        />
    );
};

interface EquipmentRecordModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (payload: any) => void;
}

type EquipmentType = 'pipe' | 'valve' | 'other';

export const EquipmentRecordModal = ({ opened, onClose, onSubmit }: EquipmentRecordModalProps) => {
    const [activeType, setActiveType] = useState<EquipmentType>('pipe');
    
    const [description, setDescription] = useState('');
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [columns, setColumns] = useState({
        balance: true,
        fact: true,
        cut: false
    });

    useEffect(() => {
        if (opened) {
            setDescription('');
            setFormData({});
            setColumns({ balance: true, fact: true, cut: false });
            setActiveType('pipe');
        }
    }, [opened]);

    const handleParamChange = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        if (!description.trim()) {
            alert("Fill the field NAME (DESCRIPTION)");
            return;
        }

        const selectedColumns = [];
        if (columns.balance) selectedColumns.push("balance");
        if (columns.fact) selectedColumns.push("fact");
        if (columns.cut) selectedColumns.push("cut");

        if (selectedColumns.length === 0) {
            alert("Choose at lest 1 column (Balance, By fact, In cut)");
            return;
        }

        const data_entries = selectedColumns.map(colType => {
            if (activeType === 'pipe') {
                return {
                    column_type: colType,
                    type: "pipe_data",
                    diameter: Number(formData.diameter || 0),
                    length: Number(formData.length || 0),
                    material_id: formData.material_id || null,
                    groung_level_id: formData.groung_level_id || null,
                };
            } else if (activeType === 'valve') {
                return {
                    column_type: colType,
                    type: "valve_data",
                    diameter: Number(formData.diameter || 0),
                    quantity: Number(formData.quantity || 1),
                };
            }
            
            return {
                column_type: colType,
                type: "generic_data",
                quantity: Number(formData.quantity || 1),
            };
        });

        const payload = {
            item_type: activeType,
            description: description.trim(),
            data_entries: data_entries
        };

        onSubmit(payload);
        onClose();
    };

    const renderParams = () => {
        switch (activeType) {
            case 'pipe': return <PipeParams formData={formData} onChange={handleParamChange} />;
            case 'valve': return <ValveParams formData={formData} onChange={handleParamChange} />;
            case 'other': return <OtherParams formData={formData} onChange={handleParamChange} />;
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
                            onClick={() => { setActiveType('pipe'); setFormData({}); }}
                        >
                            Pipe
                        </Button>
                        <Button 
                            variant={activeType === 'valve' ? 'filled' : 'default'} 
                            onClick={() => { setActiveType('valve'); setFormData({}); }}
                        >
                            Valve
                        </Button>
                        <Button 
                            variant={activeType === 'other' ? 'filled' : 'default'} 
                            onClick={() => { setActiveType('other'); setFormData({}); }}
                        >
                            Other (GC and etc.)
                        </Button>
                    </Group>
                </div>

                <TextInput 
                    label="NAME (DESCRIPTION)" 
                    placeholder="e.g. Steel pipe d159" 
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                    required
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
                                <Checkbox 
                                    label="Balance" 
                                    checked={columns.balance} 
                                    onChange={(e) => setColumns({...columns, balance: e.currentTarget.checked})} 
                                />
                                <Checkbox 
                                    label="By fact" 
                                    checked={columns.fact} 
                                    onChange={(e) => setColumns({...columns, fact: e.currentTarget.checked})} 
                                />
                                <Checkbox 
                                    label="In cut" 
                                    checked={columns.cut} 
                                    onChange={(e) => setColumns({...columns, cut: e.currentTarget.checked})} 
                                />
                            </Group>
                        </div>
                    </Stack>
                </Paper>

                <Button fullWidth mt="md" size="md" onClick={handleSubmit}>
                    Add equipment
                </Button>

            </Stack>
        </Modal>
    );
};