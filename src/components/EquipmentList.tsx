import { useState } from 'react';
import { Table, Group, Title, Button, Text } from '@mantine/core';
import { EquipmentRecordModal } from './EquipmentRecordModal';

export const EquipmentList = () => {
    const [modalOpened, setModalOpened] = useState(false);

    return (
        <div>
            <Group justify="space-between">
                <Title order={3}>Equipment</Title>
                <Button variant="subtle" onClick={() => setModalOpened(true)}>+ Add record</Button>
            </Group>

            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>NAME</Table.Th>
                        <Table.Th>BALANCE</Table.Th>
                        <Table.Th>FACT</Table.Th>
                        <Table.Th>IN CUT</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td>
                            <Text fw={700}>Inlet pipe (gas pipeline-inlet)</Text>
                            <Text size="sm">PIPE</Text>
                        </Table.Td>
                        <Table.Td>
                            <Group>
                                <Text>L: 50.5</Text>
                                <Text>Ø: 159</Text>
                            </Group>
                            <Group>
                                <Text>Steel</Text>
                                <Text>Underground</Text>
                            </Group>
                        </Table.Td>
                        <Table.Td>
                            <Group>
                                <Text>L: 47.0</Text>
                                <Text>Ø: 159</Text>
                            </Group>
                            <Group>
                                <Text>Steel</Text>
                                <Text>Underground</Text>
                            </Group>
                        </Table.Td>
                        <Table.Td>
                            {/* Empty value in this case of 'cut' */}
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Td>
                            <Text fw={700}>Valve №1 at exit</Text>
                            <Text size="sm">VALVE</Text>
                        </Table.Td>
                        <Table.Td>
                            <Group>
                                <Text>Qty: 1</Text>
                                <Text>Ø: 100</Text>
                            </Group>
                        </Table.Td>
                        <Table.Td>
                            <Group>
                                <Text>Qty: 1</Text>
                                <Text>Ø: 100</Text>
                            </Group>
                        </Table.Td>
                        <Table.Td></Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>

            <EquipmentRecordModal opened={modalOpened} onClose={() => setModalOpened(false)} />
        </div>
    );
};