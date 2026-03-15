import { useState, useMemo } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Table, Group, Title, Button, Text, Stack, UnstyledButton, Center, Loader } from '@mantine/core';
import { type EquipmentType, type ColumnType, type CutType, CutTypesEnum, ColumnTypesEnum, EquipmentTypesEnum, BackendEquipmentTypesEnum , type DictionaryItem} from '../types';
import { CreateEquipmentModal } from './modals/CreateEquipmentModal';
import { EditEquipmentModal } from './modals/EditEquipmentModal';
import { EditableClickText } from './EditableClickText';
import { EditableText } from './EditableText';
import { addEquipmentToCard, getCardEquipment, deleteEquipmentItem } from '../api/Equipment';
import { useDictionaries } from '../hooks/useDictionaries';
import { IconTrash } from '@tabler/icons-react';
import type { PipeData, ValveData, GenericData, EquipmentRow, MappedDataEntry } from '../types';

const transformEquipmentData = (rawEquipment: any[], materials: DictionaryItem[], groundLevels: DictionaryItem[]): EquipmentRow[] => {
    const getDictValue = (dict: DictionaryItem[], id: number | null) => {
        if (!id) return '-';
        return dict.find(d => d.id === id)?.value || '-';
    };

    return rawEquipment.map((item: any) => {
        const row: EquipmentRow = {
            id: item.id,
            name: item.description,
            type: item.item_type as EquipmentType,
            balance: [], fact: [], cut: []
        };

        item.data_entries.forEach((entry: any) => {
            let mappedData: MappedDataEntry;

            if (entry.type === BackendEquipmentTypesEnum.PipeData) {
                mappedData = {
                    id: entry.id, length: entry.length, diameter: entry.diameter,
                    material: getDictValue(materials, entry.material_id),
                    placement: getDictValue(groundLevels, entry.groung_level_id),
                    material_id: entry.material_id, groung_level_id: entry.groung_level_id
                } as PipeData;
            } else if (entry.type === BackendEquipmentTypesEnum.ValveData) {
                mappedData = {
                    id: entry.id, quantity: entry.quantity, diameter: entry.diameter,
                    model: entry.model_number || '-'
                } as ValveData;
            } else {
                mappedData = { id: entry.id, quantity: entry.quantity || 1 } as GenericData;
            }

            if (entry.column_type === ColumnTypesEnum.Balance) row.balance.push(mappedData);
            if (entry.column_type === ColumnTypesEnum.Fact) row.fact.push(mappedData);
            if (entry.column_type === ColumnTypesEnum.Cut) row.cut.push(mappedData);
        });

        return row;
    });
};

const PipeItem = ({ data }: { data: PipeData }) => (
    <Stack gap={5}>
        <Group justify="space-between">
            <Text size="sm">L: {data.length}</Text>
            <Text size="sm" fw={500}>{data.diameter}</Text>
        </Group>
        <Group justify="space-between">
            <Text size="xs" c="dimmed">{data.material}</Text>
            <Text size="xs" c="dimmed" tt="uppercase">{data.placement}</Text>
        </Group>
    </Stack>
);

const ValveItem = ({ data }: { data: ValveData }) => (
    <Stack gap={5}>
        <Group justify="space-between">
            <Text size="sm" c="dimmed">Qty:</Text>
            <Text size="sm">{data.quantity}</Text>
        </Group>
        <Group justify="space-between">
            <Text size="sm" c="dimmed">Ø:</Text>
            <Text size="sm">{data.diameter}</Text>
        </Group>
    </Stack>
);

const EquipmentColumnCell = ({ row, columnType, onEdit }: { row: EquipmentRow, columnType: ColumnType, onEdit: (rowId: number, type: EquipmentType, column: ColumnType, itemIndex: number, data: MappedDataEntry) => void }) => {
    const items = row[columnType as keyof Pick<EquipmentRow, 'balance' | 'fact' | 'cut'>];
    
    if (!items || items.length === 0) return <Text c="dimmed" ta="center">-</Text>;

    return (
        <Stack gap={4}>
            {items.map((item, index) => (
                <UnstyledButton
                    key={index} w="100%" p="xs"
                    onClick={() => onEdit(row.id, row.type, columnType, index, item)}
                    style={{ borderBottom: index !== items.length - 1 ? '1px dashed #ced4da' : 'none', borderRadius: '4px', transition: 'background-color 0.15s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f3f5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    {row.type === EquipmentTypesEnum.Pipe && <PipeItem data={item as PipeData} />}
                    {row.type === EquipmentTypesEnum.Valve && <ValveItem data={item as ValveData} />}
                    {row.type === EquipmentTypesEnum.Other && <Text size="sm">Qty: {(item as GenericData).quantity}</Text>}
                </UnstyledButton>
            ))}
        </Stack>
    );
};

interface EquipmentListProps {
    cardId: number;
    cutType?: CutType;
    isEditing?: boolean;
    balanceTotal?: string | number;
    factTotal?: string | number;
    onBalanceTotalChange?: (val: string) => void;
    onFactTotalChange?: (val: string) => void;
}

export const EquipmentList = ({ 
    cardId,
    cutType = CutTypesEnum.None,
    isEditing = false, 
    balanceTotal = '', 
    factTotal = '', 
    onBalanceTotalChange, 
    onFactTotalChange 
}: EquipmentListProps) => {
    const queryClient = useQueryClient();

    const { materials, groundLevels } = useDictionaries();

    const { data: rawEquipment = [], isLoading } = useQuery({
        queryKey: ['equipment', cardId],
        queryFn: () => getCardEquipment(cardId),
        enabled: !!cardId
    });

    const [modalOpened, setModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);
    const [editingContext, setEditingContext] = useState<{
        rowId: number;
        type: EquipmentType;
        column: ColumnType;
        itemIndex: number;
        data: any;
    } | null>(null);

    const displayEquipment = useMemo(() => {
        return transformEquipmentData(rawEquipment, materials, groundLevels);
    }, [rawEquipment, materials, groundLevels]);

    const addMutation = useMutation({
        mutationFn: (payload: any) => addEquipmentToCard(cardId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['equipment', cardId] });
            setModalOpened(false); 
        },
        onError: (error) => {
            console.error("Failed to add equipment:", error);
            alert("Error while adding new equipment.");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (itemId: number) => deleteEquipmentItem(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['equipment', cardId] });
            console.info("Deleted")
        },
        onError: () => {
            console.error("Couldn't delete the record!")
        }
    });

    const handleDeleteItem = (itemId: number) => {
        if (window.confirm('Are you sure you want to delete this entry with all columns?')) {
            deleteMutation.mutate(itemId);
        }
    };

    const handleAddEquipment = (payload: any) => {
        addMutation.mutate(payload);
    };

    const handleEditClick = (rowId: number, type: EquipmentType, column: ColumnType, itemIndex: number, data: any) => {
        setEditingContext({ rowId, type, column, itemIndex, data });
        setEditModalOpened(true);
    };

    const handleSaveEdit = (newData: any) => {
        console.log("Saving new data for item:", editingContext, "New data:", newData);
        // equipment update logic
    };

    return (
        <div>
            <Group justify="space-between" mb="md">
                <Title order={3}>Equipment</Title>
                <Button variant="subtle" onClick={() => setModalOpened(true)} loading={addMutation.isPending}> + Add record</Button>
            </Group>

            <Table verticalSpacing="md">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ borderBottom: 'none' }}></Table.Th>
                        <Table.Th style={{ borderBottom: 'none', paddingBottom: 0 }}>
                            <Stack gap={0}>
                                <Text size="xs" c="dimmed">TOTAL LENGTH</Text>
                                <EditableText 
                                    isEditing={isEditing}
                                    value={balanceTotal?.toString()}
                                    onChange={(val) => onBalanceTotalChange?.(val)}
                                    renderText={(val)=><Title order={4} c="blue">{val} m</Title>}
                                />
                            </Stack>
                        </Table.Th>
                        <Table.Th style={{ borderBottom: 'none', paddingBottom: 0 }}>
                            <Stack gap={0}>
                                <Text size="xs" c="dimmed">TOTAL LENGTH</Text>
                                <EditableText 
                                    isEditing={isEditing}
                                    value={factTotal?.toString()}
                                    onChange={(val) => onFactTotalChange?.(val)}
                                    renderText={(val)=><Title order={4} c="green">{val} m</Title>}
                                />
                            </Stack>
                        </Table.Th>
                        <Table.Th style={{ borderBottom: 'none' }}></Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>NAME</Table.Th>
                        <Table.Th>BALANCE</Table.Th>
                        <Table.Th>FACT</Table.Th>
                        <Table.Th>IN CUT</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {isLoading ? (
                        <Table.Tr>
                            <Table.Td colSpan={4}>
                                <Center py="xl">
                                    <Loader color="blue" />
                                </Center>
                            </Table.Td>
                        </Table.Tr>
                    ) : displayEquipment.length === 0 ? (
                        <Table.Tr>
                            <Table.Td colSpan={4}>
                                <Text>No equipment found</Text>
                            </Table.Td>
                        </Table.Tr>
                    ) : (
                        displayEquipment.map((row) => (
                            <Table.Tr key={row.id}>
                                <Table.Td>
                                    <EditableClickText initialValue={row.name}/>
                                    <Text>{row.type}</Text>

                                    <Button 
                                        variant="subtle" color="red" size="xs" mt="xs" px={5} h={24}
                                        leftSection={<IconTrash size={14} />}
                                        onClick={() => handleDeleteItem(row.id)}
                                        loading={deleteMutation.isPending}
                                    >
                                        Delete
                                    </Button>
                                </Table.Td>
                                <Table.Td>
                                    <EquipmentColumnCell row={row} columnType={ColumnTypesEnum.Balance} onEdit={handleEditClick} />
                                </Table.Td>
                                <Table.Td>
                                    <EquipmentColumnCell row={row} columnType={ColumnTypesEnum.Fact} onEdit={handleEditClick} />
                                </Table.Td>
                                <Table.Td>
                                    <EquipmentColumnCell row={row} columnType={ColumnTypesEnum.Cut} onEdit={handleEditClick} />
                                </Table.Td>
                            </Table.Tr>
                        ))
                    )}
                </Table.Tbody>
            </Table>

            <CreateEquipmentModal opened={modalOpened} onClose={() => setModalOpened(false)} onSubmit={handleAddEquipment} cardCutType={cutType} />
            {editingContext && (
                <EditEquipmentModal
                    opened={editModalOpened}
                    onClose={() => setEditModalOpened(false)}
                    type={editingContext.type}
                    column={editingContext.column}
                    initialData={editingContext.data}
                    onSave={handleSaveEdit}
                />
            )}
        </div>
    );
};