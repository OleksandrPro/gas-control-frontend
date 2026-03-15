import { Button, Text, Stack, Paper, Grid, ActionIcon } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { EquipmentFormFields } from './InputForms';


export const EquipmentColumn = ({ title, span, children }: { title: string, span: number, children: React.ReactNode }) => (
    <Grid.Col span={span}>
        <Paper bg="gray.0" p="md" radius="md" withBorder h="100%">
            <Text fw={700} ta="center" c="dimmed" mb="md">{title}</Text>
            {children}
        </Paper>
    </Grid.Col>
);

export const FactColumnList = ({ factDataList, activeType, dicts, onFactChange, onRemoveFact, onAddFact, canAddMoreFact }: any) => (
    <Stack gap="md">
        {factDataList.map((data: any, index: number) => (
            <div key={index} style={{ position: 'relative', borderBottom: index < factDataList.length - 1 ? '1px dashed #ccc' : 'none', paddingBottom: index < factDataList.length - 1 ? '10px' : '0' }}>
                {index > 0 && (
                    <ActionIcon color="red" variant="subtle" onClick={() => onRemoveFact(index)} style={{ position: 'absolute', top: -5, right: -5, zIndex: 10 }}>
                        <IconTrash size={16} />
                    </ActionIcon>
                )}
                <EquipmentFormFields type={activeType} data={data} dicts={dicts} hideLabels={index > 0} onChange={(f: string, v: any) => onFactChange(index, f, v)} />
            </div>
        ))}
        {canAddMoreFact && (
            <Button variant="light" size="xs" leftSection={<IconPlus size={14} />} onClick={onAddFact}>
                Add fact record
            </Button>
        )}
    </Stack>
);