import { useState, useEffect, useMemo } from 'react';
import { Modal, Button, Text, Stack, TextInput, Group, Grid, Input } from '@mantine/core';
import { useDictionaries } from '../../hooks/useDictionaries';
import { mapToSelectData } from '../../utils/utils';
import { type EquipmentType, type CutType, EquipmentTypesEnum, CutTypesEnum } from '../../types';
import { EquipmentColumn, FactColumnList } from '../equipment/Columns';
import { EquipmentFormFields } from '../equipment/InputForms';
import { buildCreateEquipmentPayload, type EquipmentPayload } from '../../utils/payloads/EquipmentPayload';

interface CreateEquipmentModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (payload: EquipmentPayload) => void;
  cardCutType?: CutType;
}

export const CreateEquipmentModal = ({ opened, onClose, onSubmit, cardCutType = CutTypesEnum.None }: CreateEquipmentModalProps) => {
    const { materials, groundLevels } = useDictionaries();
    const dicts = useMemo(() => ({
        materialsData: mapToSelectData(materials),
        groundLevelsData: mapToSelectData(groundLevels) 
    }), [materials, groundLevels]);
    
    const defaultActiveType = EquipmentTypesEnum.Pipe
    const [activeType, setActiveType] = useState<EquipmentType>(defaultActiveType);    
    const [description, setDescription] = useState('');
    
    const [balanceData, setBalanceData] = useState<any>({});
    const [factDataList, setFactDataList] = useState<any[]>([{}]);
    const [cutData, setCutData] = useState<any>({});

    useEffect(() => {
        if (opened) {
            setDescription('');
            setActiveType(defaultActiveType);
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

        const payload = buildCreateEquipmentPayload(
            description,
            activeType,
            cardCutType,
            balanceData,
            factDataList,
            cutData
        );

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
                <Input.Wrapper label="EQUIPMENT TYPE">
                    <Group gap="xs">
                        <Button 
                            variant={activeType === EquipmentTypesEnum.Pipe ? 'filled' : 'default'}
                            onClick={() => setActiveType(EquipmentTypesEnum.Pipe)}
                        >
                            Pipe
                        </Button>
                        <Button 
                            variant={activeType === EquipmentTypesEnum.Valve ? 'filled' : 'default'}
                            onClick={() => setActiveType(EquipmentTypesEnum.Valve)}
                        >
                            Valve
                        </Button>
                        <Button 
                            variant={activeType === EquipmentTypesEnum.Other ? 'filled' : 'default'}
                            onClick={() => setActiveType(EquipmentTypesEnum.Other)}
                        >
                            Other (GC and etc.)
                        </Button>
                    </Group>
                </Input.Wrapper>

                <Grid mt="sm">
                    {/* No cut (1 column) */}
                    {cardCutType === CutTypesEnum.None && (
                        <EquipmentColumn title="BALANCE + FACT" span={12}>
                            <EquipmentFormFields type={activeType} data={balanceData} dicts={dicts} 
                                onChange={(f: string, v: any) => {
                                    const updatedData = { ...balanceData, [f]: v };
                                    
                                    setBalanceData(updatedData); 
                                    setFactDataList([updatedData]);
                                }}
                            />
                        </EquipmentColumn>
                    )}

                    {/* Full (2 columns) */}
                    {cardCutType === CutTypesEnum.Full && (
                        <>
                            <EquipmentColumn title="BALANCE" span={6}>
                                <EquipmentFormFields type={activeType} data={balanceData} dicts={dicts} onChange={(f: string, v: any) => setBalanceData({...balanceData, [f]: v})} />
                            </EquipmentColumn>
                            <EquipmentColumn title="CUT" span={6}>
                                <EquipmentFormFields type={activeType} data={cutData} dicts={dicts} onChange={(f: string, v: any) => setCutData({...cutData, [f]: v})} />
                            </EquipmentColumn>
                        </>
                    )}

                    {/* Partial (3 columns) */}
                    {cardCutType === CutTypesEnum.Partial && (
                        <>
                            <EquipmentColumn title="BALANCE" span={4}>
                                <EquipmentFormFields type={activeType} data={balanceData} dicts={dicts} onChange={(f: string, v: any) => setBalanceData({...balanceData, [f]: v})} />
                            </EquipmentColumn>
                            <EquipmentColumn title="FACT" span={4}>
                                <FactColumnList factDataList={factDataList} activeType={activeType} dicts={dicts} onFactChange={handleFactChange} onRemoveFact={removeFactItem} onAddFact={() => setFactDataList([...factDataList, {}])} canAddMoreFact={canAddMoreFact} />
                            </EquipmentColumn>
                            <EquipmentColumn title="CUT" span={4}>
                                <EquipmentFormFields type={activeType} data={cutData} dicts={dicts} onChange={(f: string, v: any) => setCutData({...cutData, [f]: v})} />
                            </EquipmentColumn>
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