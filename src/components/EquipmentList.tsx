import { useState } from 'react';
import { Table, Group, Title, Button, Text, Stack, UnstyledButton } from '@mantine/core';
import { type EquipmentType, type ColumnType } from '../types';
import { EquipmentRecordModal } from './EquipmentRecordModal';
import { EditEquipmentModal } from './EditEquipmentModal';
import { EditableClickText } from './EditableClickText';


interface PipeData {
    length: number;
    diameter: number;
    material: string;
    placement: string;
}

interface ValveData {
    quantity: number;
    diameter: number;
}

interface EquipmentRow {
    id: number;
    name: string;
    type: EquipmentType;
    balance: any[];
    fact: any[];
    inCut: any[];
}

const MOCK_EQUIPMENT: EquipmentRow[] = [
    {
        id: 1,
        name: 'Inlet pipe (gas pipeline-inlet)',
        type: 'pipe',
        balance: [{ length: 50.5, diameter: 159, material: 'Steel', placement: 'Underground' }],
        fact: [
            { length: 47.0, diameter: 159, material: 'Steel', placement: 'Underground' },
            { length: 2.0, diameter: 159, material: 'Steel', placement: 'Underground' },
            { length: 0.7, diameter: 159, material: 'Steel', placement: 'Underground' }
        ],
        inCut: []
    },
    {
        id: 2,
        name: 'Distribution pipe',
        type: 'pipe',
        balance: [{ length: 120.0, diameter: 100, material: 'Polyethylene', placement: 'Underground' }],
        fact: [{ length: 115.0, diameter: 100, material: 'Polyethylene', placement: 'Underground' }],
        inCut: [{ length: 5.0, diameter: 100, material: 'Polyethylene', placement: 'Above ground' }]
    },
    {
        id: 3,
        name: 'Valve №1 at exit',
        type: 'valve',
        balance: [{ quantity: 1, diameter: 100 }],
        fact: [{ quantity: 1, diameter: 100 }],
        inCut: []
    }
];

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

// Versatile cell: iterate through the array entries and render the desired component
const EquipmentCell = ({ type, items }: { type: EquipmentType, items: any[] }) => {
    if (!items || items.length === 0) {
        return <Text c="dimmed" ta="center">-</Text>;
    }

    return (
        <Stack gap="sm">
            {items.map((item, index) => (
                <div 
                    key={index} 
                    style={{ 
                        borderBottom: index !== items.length - 1 ? '1px dashed #ced4da' : 'none', 
                        paddingBottom: index !== items.length - 1 ? '8px' : '0' 
                    }}
                >
                    {type === 'pipe' && <PipeItem data={item} />}
                    {type === 'valve' && <ValveItem data={item} />}
                    {type === 'other' && <Text size="sm">Qty: {item.quantity}</Text>}
                </div>
            ))}
        </Stack>
    );
};

export const EquipmentList = () => {
    const [modalOpened, setModalOpened] = useState(false);

    const [editModalOpened, setEditModalOpened] = useState(false);
    const [editingContext, setEditingContext] = useState<{
        rowId: number;
        type: EquipmentType;
        column: ColumnType;
        itemIndex: number;
        data: any;
    } | null>(null);

    const handleEditClick = (rowId: number, type: EquipmentType, column: ColumnType, itemIndex: number, data: any) => {
        setEditingContext({ rowId, type, column, itemIndex, data });
        setEditModalOpened(true);
    };

    const handleSaveEdit = (newData: any) => {
        console.log("Saving new data for item:", editingContext, "New data:", newData);
        // В будущем здесь будет логика обновления MOCK_EQUIPMENT стейта 
        // или отправки запроса на сервер
    };

    const renderCell = (row: EquipmentRow, column: ColumnType) => {
        const items = row[column];
        if (!items || items.length === 0) return <Text c="dimmed" ta="center">-</Text>;

        return (
            <Stack gap={4}>
                {items.map((item, index) => (
                    <UnstyledButton
                        key={index}
                        w="100%"
                        p="xs"
                        onClick={() => handleEditClick(row.id, row.type, column, index, item)}
                        style={{ 
                            borderBottom: index !== items.length - 1 ? '1px dashed #ced4da' : 'none', 
                            borderRadius: '4px',
                            transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f3f5'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        {row.type === 'pipe' && <PipeItem data={item} />}
                        {row.type === 'valve' && <ValveItem data={item} />}
                        {row.type === 'other' && <Text size="sm">Qty: {item.quantity}</Text>}
                    </UnstyledButton>
                ))}
            </Stack>
        );
    };

    return (
        <div>
            <Group justify="space-between" mb="md">
                <Title order={3}>Equipment</Title>
                <Button variant="subtle" onClick={() => setModalOpened(true)}>+ Add record</Button>
            </Group>

            <Table verticalSpacing="md">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>NAME</Table.Th>
                        <Table.Th>BALANCE</Table.Th>
                        <Table.Th>FACT</Table.Th>
                        <Table.Th>IN CUT</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {MOCK_EQUIPMENT.map((row) => (
                        <Table.Tr key={row.id}>
                            <Table.Td>
                                <EditableClickText initialValue={row.name}/>
                                <Text size="xs" c="dimmed" tt="uppercase">{row.type}</Text>
                            </Table.Td>
                            <Table.Td>{renderCell(row, 'balance')}</Table.Td>
                            <Table.Td>{renderCell(row, 'fact')}</Table.Td>
                            <Table.Td>{renderCell(row, 'inCut')}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            <EquipmentRecordModal opened={modalOpened} onClose={() => setModalOpened(false)} />
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