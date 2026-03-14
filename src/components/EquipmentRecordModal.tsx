import { useState, useEffect } from 'react';
import { Modal, NumberInput, Select, Button, Text, Stack, TextInput, Group, Paper, Grid, ActionIcon } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useDictionaries } from '../hooks/useDictionaries';
import { mapToSelectData } from '../utils';
import { type EquipmentType, type CutType, CutTypesEnum } from '../types';

interface EquipmentRecordModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (payload: any) => void;
  cardCutType?: CutType;
}

const EquipmentFormFields = ({ type, data, onChange, dicts, hideLabels = false }: any) => {
    const { materialsData, groundLevelsData } = dicts;

    if (type === 'pipe') {
        return (
            <Grid>
                <Grid.Col span={6}>
                    <NumberInput 
                        label={!hideLabels ? "Diameter" : undefined}
                        value={data.diameter || ''} 
                        onChange={(v) => onChange('diameter', v)} 
                        allowDecimal allowedDecimalSeparators={[',', '.']} 
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <NumberInput 
                        label={!hideLabels ? "Length" : undefined}
                        value={data.length || ''} 
                        onChange={(v) => onChange('length', v)} 
                        allowDecimal allowedDecimalSeparators={[',', '.']} step={0.1} 
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Select 
                        label={!hideLabels ? "Material" : undefined}
                        data={materialsData} 
                        value={data.material_id ? String(data.material_id) : null} 
                        onChange={(v) => onChange('material_id', v ? Number(v) : null)} searchable 
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Select 
                        label={!hideLabels ? "Placement" : undefined}
                        data={groundLevelsData} 
                        value={data.groung_level_id ? String(data.groung_level_id) : null} 
                        onChange={(v) => onChange('groung_level_id', v ? Number(v) : null)} searchable 
                    />
                </Grid.Col>
            </Grid>
        );
    }

    if (type === 'valve') {
        return (
            <Grid>
                <Grid.Col span={6}>
                    <NumberInput 
                        label={!hideLabels ? "Diameter" : undefined}
                        value={data.diameter || ''} 
                        onChange={(v) => onChange('diameter', v)} 
                        allowDecimal allowedDecimalSeparators={[',', '.']} 
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <NumberInput 
                        label={!hideLabels ? "Quantity (pcs)" : undefined}
                        value={data.quantity || ''} 
                        onChange={(v) => onChange('quantity', v)} 
                        min={1} 
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <TextInput 
                        label={!hideLabels ? "Model / Number" : undefined}
                        value={data.model_number || ''} 
                        onChange={(e) => onChange('model_number', e.currentTarget.value)} 
                    />
                </Grid.Col>
            </Grid>
        );
    }

    return (
        <NumberInput 
            label={!hideLabels ? "Quantity (pcs)" : undefined}
            value={data.quantity || ''} 
            onChange={(v) => onChange('quantity', v)} 
            min={1} 
        />
    );
};

export const EquipmentRecordModal = ({ opened, onClose, onSubmit, cardCutType = CutTypesEnum.None }: EquipmentRecordModalProps) => {
    const { materials, groundLevels } = useDictionaries();
    const dicts = {
        materialsData: mapToSelectData(materials),
        groundLevelsData: mapToSelectData(groundLevels) 
    };
    
    const [activeType, setActiveType] = useState<EquipmentType>('pipe');    
    const [description, setDescription] = useState('');
    
    const [balanceData, setBalanceData] = useState<any>({});
    const [factDataList, setFactDataList] = useState<any[]>([{}]);
    const [cutData, setCutData] = useState<any>({});

    useEffect(() => {
        if (opened) {
            setDescription('');
            setActiveType('pipe');
            setBalanceData({});
            setFactDataList([{}]);
            setCutData({});
        }
    }, [opened]);

    const handleFactChange = (index: number, field: string, value: any) => {
        const newList = [...factDataList];
        newList[index] = { ...newList[index], [field]: value };
        setFactDataList(newList);
    };

    const removeFactItem = (index: number) => {
        setFactDataList(factDataList.filter((_, i) => i !== index));
    };

    const lastFact = factDataList[factDataList.length - 1];
    const canAddMoreFact = lastFact && Object.values(lastFact).some(v => v !== '' && v !== null && v !== undefined);

    const handleSubmit = () => {
        if (!description.trim()) {
            alert("Enter the description.");
            return;
        }

        const data_entries: any[] = [];

        const formatEntry = (colType: string, data: any) => {
            const base = {
                column_type: colType,
                type: activeType === 'pipe' ? 'pipe_data' : activeType === 'valve' ? 'valve_data' : 'generic_data'
            };
            
            if (activeType === 'pipe') {
                return { ...base, ...data, diameter: Number(data.diameter || 0), length: Number(data.length || 0) };
            } else if (activeType === 'valve') {
                return { ...base, ...data, diameter: Number(data.diameter || 0), quantity: Number(data.quantity || 1) };
            }
            return { ...base, ...data, quantity: Number(data.quantity || 1) };
        };

        if (cardCutType === CutTypesEnum.None) {
            if (Object.keys(factDataList[0]).length > 0) {
                data_entries.push(formatEntry('balance', factDataList[0]));
                factDataList.forEach(item => {
                    if (Object.keys(item).length > 0) data_entries.push(formatEntry('fact', item));
                });
            }
        } else if (cardCutType === CutTypesEnum.Full) {
            data_entries.push(formatEntry('balance', balanceData));
            data_entries.push(formatEntry('cut', cutData));
        } else if (cardCutType === CutTypesEnum.Partial) {
            data_entries.push(formatEntry('balance', balanceData));
            factDataList.forEach(item => {
                if (Object.keys(item).length > 0) data_entries.push(formatEntry('fact', item));
            });
            data_entries.push(formatEntry('cut', cutData));
        }

        const payload = {
            item_type: activeType,
            description: description.trim(),
            data_entries: data_entries
        };

        onSubmit(payload);
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Add equipment" size="lg">
            <Stack>
                <TextInput 
                    label="NAME (DESCRIPTION)" 
                    placeholder="e.g. Steel pipe d159" 
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                    required
                />
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

                <Grid mt="sm">
                    {/* No cut (1 column) */}
                    {cardCutType === CutTypesEnum.None && (
                        <Grid.Col span={12}>
                            <Paper bg="gray.0" p="md" radius="md" withBorder>
                                <Text fw={700} ta="center" c="dimmed" mb="md">BALANCE + FACT</Text>
                                <Stack gap="md">
                                    {factDataList.map((data, index) => (
                                        <div key={index} style={{ position: 'relative', borderBottom: index < factDataList.length - 1 ? '1px dashed #ccc' : 'none', paddingBottom: index < factDataList.length - 1 ? '15px' : '0' }}>
                                            {index > 0 && (
                                                <ActionIcon color="red" variant="subtle" onClick={() => removeFactItem(index)} style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
                                                    <IconTrash size={16} />
                                                </ActionIcon>
                                            )}
                                            <EquipmentFormFields type={activeType} data={data} dicts={dicts} onChange={(f: string, v: any) => handleFactChange(index, f, v)} />
                                        </div>
                                    ))}
                                </Stack>
                            </Paper>
                        </Grid.Col>
                    )}

                    {/* Full (2 columns) */}
                    {cardCutType === CutTypesEnum.Full && (
                        <>
                            <Grid.Col span={6}>
                                <Paper bg="gray.0" p="md" radius="md" withBorder h="100%">
                                    <Text fw={700} ta="center" c="dimmed" mb="md">BALANCE</Text>
                                    <EquipmentFormFields type={activeType} data={balanceData} dicts={dicts} onChange={(f: string, v: any) => setBalanceData({...balanceData, [f]: v})} />
                                </Paper>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Paper bg="gray.0" p="md" radius="md" withBorder h="100%">
                                    <Text fw={700} ta="center" c="dimmed" mb="md">CUT</Text>
                                    <EquipmentFormFields type={activeType} data={cutData} dicts={dicts} onChange={(f: string, v: any) => setCutData({...cutData, [f]: v})} />
                                </Paper>
                            </Grid.Col>
                        </>
                    )}

                    {/* Partial (3 columns) */}
                    {cardCutType === CutTypesEnum.Partial && (
                        <>
                            <Grid.Col span={4}>
                                <Paper bg="gray.0" p="md" radius="md" withBorder h="100%">
                                    <Text fw={700} ta="center" c="dimmed" mb="md">BALANCE</Text>
                                    <EquipmentFormFields type={activeType} data={balanceData} dicts={dicts} onChange={(f: string, v: any) => setBalanceData({...balanceData, [f]: v})} />
                                </Paper>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Paper bg="gray.0" p="md" radius="md" withBorder h="100%">
                                    <Text fw={700} ta="center" c="dimmed" mb="md">FACT</Text>
                                    <Stack gap="md">
                                        {factDataList.map((data, index) => (
                                            <div key={index} style={{ position: 'relative', borderBottom: index < factDataList.length - 1 ? '1px dashed #ccc' : 'none', paddingBottom: index < factDataList.length - 1 ? '10px' : '0' }}>
                                                {index > 0 && (
                                                    <ActionIcon color="red" variant="subtle" onClick={() => removeFactItem(index)} style={{ position: 'absolute', top: -5, right: -5, zIndex: 10 }}>
                                                        <IconTrash size={14} />
                                                    </ActionIcon>
                                                )}
                                                <EquipmentFormFields type={activeType} data={data} dicts={dicts} hideLabels={index > 0} onChange={(f: string, v: any) => handleFactChange(index, f, v)} />
                                            </div>
                                        ))}
                                        {canAddMoreFact && (
                                            <Button variant="light" size="xs" leftSection={<IconPlus size={14} />} onClick={() => setFactDataList([...factDataList, {}])}>
                                                Add fact record
                                            </Button>
                                        )}
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Paper bg="gray.0" p="md" radius="md" withBorder h="100%">
                                    <Text fw={700} ta="center" c="dimmed" mb="md">CUT</Text>
                                    <EquipmentFormFields type={activeType} data={cutData} dicts={dicts} onChange={(f: string, v: any) => setCutData({...cutData, [f]: v})} />
                                </Paper>
                            </Grid.Col>
                        </>
                    )}
                </Grid>

                <Button fullWidth mt="md" size="md" onClick={handleSubmit}>
                    Add equipment
                </Button>

            </Stack>
        </Modal>
    );
};