import { useState, useEffect, useMemo } from 'react';
import { Modal, Button, Stack, TextInput, Badge, Group, Grid, Input, Box } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

import type { EquipmentRow } from '../../types';
import { useDictionaries } from '../../hooks/useDictionaries';
import { mapToSelectData } from '../../utils/utils';
import { EquipmentColumn, FactColumnList } from '../equipment/Columns';
import { EquipmentFormFields } from '../equipment/InputForms';
import { type CutType } from '../../types';
import { buildUpdateEquipmentPayload, type EquipmentUpdatePayload } from '../../utils/payloads/EquipmentPayload';

interface EditEquipmentModalProps {
  opened: boolean;
  onClose: () => void;
  equipment: EquipmentRow | null;
  cardCutType: CutType;
  onSave: (payload: EquipmentUpdatePayload) => void;
  onDelete: (id: number) => void;
}

export const EditEquipmentModal = ({ opened, onClose, equipment, cardCutType, onSave, onDelete }: EditEquipmentModalProps) => {
    const { materials, groundLevels } = useDictionaries();
    const dicts = useMemo(() => ({
        materialsData: mapToSelectData(materials),
        groundLevelsData: mapToSelectData(groundLevels) 
    }), [materials, groundLevels]);
    
    const [description, setDescription] = useState('');
    const [balanceData, setBalanceData] = useState<any>({});
    const [factDataList, setFactDataList] = useState<any[]>([{}]);
    const [cutData, setCutData] = useState<any>({});

    useEffect(() => {
        if (opened && equipment) {
            setDescription(equipment.name);
            setBalanceData(equipment.balance[0] || {});
            setFactDataList(equipment.fact.length > 0 ? equipment.fact : [{}]);
            setCutData(equipment.cut[0] || {});
        }
    }, [opened, equipment]);

    if (!equipment) return null;

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
        console.info('---')
        console.info(balanceData)
        console.info(factDataList)
        console.info(cutData)
        console.info('---')
        const fullPayload = buildUpdateEquipmentPayload(
            description,
            equipment.type,
            cardCutType,
            balanceData,
            factDataList,
            cutData
        );

        const updatePayload: EquipmentUpdatePayload = {
            description: fullPayload.description,
            data_entries: fullPayload.data_entries
        };
        console.info(updatePayload)

        onSave(updatePayload);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this equipment completely?')) {
            onDelete(equipment.id);
            onClose();
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Edit equipment" size="xl">
            <Stack>
                <Group align="flex-end">
                    <TextInput 
                        label="NAME (DESCRIPTION)" 
                        value={description}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                        required
                        style={{ flexGrow: 1 }}
                    />
                    <Input.Wrapper label="TYPE">
                        <Box mt={2}>
                            <Badge size="lg" radius="sm" variant="light">
                                {equipment.type.toUpperCase()}
                            </Badge>
                        </Box>
                    </Input.Wrapper>
                </Group>

                <Grid mt="sm">
                    <EquipmentColumn title="BALANCE" span={4}>
                        <EquipmentFormFields type={equipment.type} data={balanceData} dicts={dicts} onChange={(f: string, v: any) => setBalanceData({...balanceData, [f]: v})} />
                    </EquipmentColumn>
                    
                    <EquipmentColumn title="FACT" span={4}>
                        <FactColumnList factDataList={factDataList} activeType={equipment.type} dicts={dicts} onFactChange={handleFactChange} onRemoveFact={removeFactItem} onAddFact={() => setFactDataList([...factDataList, {}])} canAddMoreFact={canAddMoreFact} />
                    </EquipmentColumn>
                    
                    <EquipmentColumn title="CUT" span={4}>
                        <EquipmentFormFields type={equipment.type} data={cutData} dicts={dicts} onChange={(f: string, v: any) => setCutData({...cutData, [f]: v})} />
                    </EquipmentColumn>
                </Grid>

                <Group justify="space-between" mt="md">
                    <Button color="red" variant="subtle" leftSection={<IconTrash size={16} />} onClick={handleDelete}>
                        Delete record
                    </Button>
                    <Group>
                        <Button variant="default" onClick={onClose}>Cancel</Button>
                        <Button color="blue" onClick={handleSubmit}>Save changes</Button>
                    </Group>
                </Group>
            </Stack>
        </Modal>
    );
};