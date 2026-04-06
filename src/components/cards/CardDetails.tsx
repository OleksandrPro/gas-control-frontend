import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, SimpleGrid, Group, Stack, Grid, Text, Title, Loader, Box, Card } from "@mantine/core";
import { type CardBackend, type CardUpdateData, CutTypesEnum } from "../../types";
import { EditableText } from '../ui/editable/EditableText';
import { EditableSelect } from '../ui/editable/EditableSelect';
import { EditableDate } from '../ui/editable/EditableDate';
import { EquipmentList } from '../equipment/EquipmentList';
import { useDictionaries } from '../../hooks/useDictionaries';
import { usePageNavigation } from '../../hooks/usePageNavigation';
import { updateCard, deleteCard } from '../../api/Cards';
import { determineCutMode } from '../../utils/utils';
import { MigrationModal } from '../modals/MigrationModal';
import { IconArrowLeft, IconEdit, IconTrash, IconCheck, IconX } from '@tabler/icons-react';
import { DetailCardStyle, CardSectionHeaderStyle, FieldLabelStyle, MainTitleStyle, FieldWrapperStyle } from '../../styles/CardDetails';

interface CardDetailsProps {
    cardData: CardBackend
}

const Field = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <Box style={FieldWrapperStyle}>
        <Text style={FieldLabelStyle}>{label}</Text>
        {children}
    </Box>
);

export const CardDetails = ({cardData}: CardDetailsProps) => {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const [initialCardData, setInitialCardData] = useState(cardData)
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(cardData);

    const [migrationModalOpened, setMigrationModalOpened] = useState(false);
    const [pendingChanges, setPendingChanges] = useState<CardUpdateData | null>(null);

    const { pressures, districts, properties, objectNames, cuts } = useDictionaries();
    const { goToHome } = usePageNavigation()

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number, data: CardUpdateData }) => updateCard(id, data),
        onSuccess: (updatedCard) => {
            queryClient.invalidateQueries({ queryKey: ['cards'] });
            queryClient.invalidateQueries({ queryKey: ['card', updatedCard.id.toString()] });
            queryClient.invalidateQueries({ queryKey: ['equipment', updatedCard.id] });
            
            setInitialCardData(updatedCard);
            setIsEditing(false);
        },
        onError: (error) => {
            console.error("Failed to update card:", error);
            // TODO: Add error notification later
        }
    });

    const deleteCardMutation = useMutation({
        mutationFn: (id: number) => deleteCard(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cards'] });
            console.info("Deleted")
            goToHome();
        },
        onError: () => {
            console.error("Couldn't delete the card!")
        }
    });

    const handleDeleteCard = () => {
        if (window.confirm('ATTENTION! Are you sure you want to permanently delete this card and ALL its equipment?')) {
            deleteCardMutation.mutate(cardData.id);
        }
    };

    const handleCancel = () => {
        setFormData(initialCardData);
        setIsEditing(false);
    };

    const getChangedData = (original: CardBackend, current: CardBackend): CardUpdateData => {
        const changes: CardUpdateData = {};
        
        (Object.keys(current) as Array<keyof CardBackend>).forEach((key) => {
            if (original[key] !== current[key]) {
                // @ts-ignore
                changes[key] = current[key];
            }
        });
        
        return changes;
    };

    const handleSave = () => {
        const changedData = getChangedData(initialCardData, formData);

        if (Object.keys(changedData).length === 0) {
            setIsEditing(false);
            return;
        }

        if ('cut_type_id' in changedData) {
            const newCutTypeObj = cuts?.find(c => c.id === Number(changedData.cut_type_id));
            console.info(newCutTypeObj)
            const newCutMode = determineCutMode(newCutTypeObj?.value);
            console.info(newCutMode)
            if (newCutMode === CutTypesEnum.Full) {
                setPendingChanges(changedData);
                setMigrationModalOpened(true);
                return;
            }
        }

        console.log("Sending data to the server:", changedData);
        updateMutation.mutate({ id: cardData.id, data: changedData });
    };

    const handleConfirmMigration = (source: "balance" | "fact" | null) => {
        console.info(pendingChanges)
        if (!pendingChanges) return;
        
        const finalData: CardUpdateData = { ...pendingChanges };
        
        if (source) {
            finalData.cut_column_data_source = source;
        }
        
        console.log("Sending data to the server with migration:", finalData);
        updateMutation.mutate({ id: cardData.id, data: finalData });
        setMigrationModalOpened(false);
        setPendingChanges(null);
    };

    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (!isEditing || migrationModalOpened) return;
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
        };

        window.addEventListener('keydown', handleGlobalKeyDown);

        return () => {
            window.removeEventListener('keydown', handleGlobalKeyDown);
        };

    }, [isEditing, formData, migrationModalOpened])

    const formatDateForBackend = (date: Date | null) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const currentCutTypeObj = cuts?.find(c => c.id === formData.cut_type_id);
    const cutType = determineCutMode(currentCutTypeObj?.value);

    return (
        <Stack>
            <Group justify="space-between">
                <Button variant="subtle" color="gray" leftSection={<IconArrowLeft size={16}/>} onClick={goToHome}>
                    Back to registry
                </Button>
                
                {isEditing ? (
                    <Group>
                        <Button variant="default" leftSection={<IconX size={16}/>} onClick={handleCancel}>Cancel</Button>
                        <Button color="green" leftSection={<IconCheck size={16}/>} onClick={handleSave} disabled={updateMutation.isPending}>
                            {updateMutation.isPending ? <Loader size="xs" color="white" /> : 'Save'}
                        </Button>
                    </Group>
                ) : (
                    <Group>
                        <Button variant="subtle" color="red" leftSection={<IconTrash size={16}/>} onClick={handleDeleteCard} loading={deleteCardMutation.isPending}>
                            Delete card
                        </Button>
                        <Button color="blue" leftSection={<IconEdit size={16}/>} onClick={() => setIsEditing(true)}>Edit</Button>
                    </Group>
                )}
            </Group>

            <Box>
                <Text style={FieldLabelStyle}>INVENTORY Number</Text>
                <EditableText 
                    isEditing={isEditing}
                    value={formData.inventory_number}
                    onChange={(val) => setFormData({...formData, inventory_number: val})}
                    renderText={(val) => <Title order={1} style={MainTitleStyle}>{val}</Title>}
                />
                <Group gap="xs" mt={4}>
                    <Text style={FieldLabelStyle} m={0}>ESKD:</Text>
                    <EditableText 
                        isEditing={isEditing}
                        value={formData.inventory_number_eskd}
                        onChange={(val) => setFormData({...formData, inventory_number_eskd: val})}
                        renderText={(val) => <Text c="dimmed">{val}</Text>}
                    />
                </Group>
            </Box>

            <Grid gutter="xl" align="stretch">
                
                {/* ЛЕВАЯ КОЛОНКА */}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Card withBorder radius="md" p="md" styles={DetailCardStyle}>
                        <Card.Section inheritPadding>
                            <Text style={CardSectionHeaderStyle}>Location & Balance</Text>
                        </Card.Section>
                        
                        {/* ИСПОЛЬЗУЕМ ГИБКУЮ СЕТКУ */}
                        <Grid mt="md" gutter="md">
                            <Grid.Col span={12}>
                                <Field label="Address">
                                    <EditableText isEditing={isEditing} value={formData.address} onChange={(val) => setFormData({...formData, address: val})} />
                                </Field>
                            </Grid.Col>
                            
                            <Grid.Col span={12}>
                                <Field label="Balance name">
                                    <EditableText isEditing={isEditing} value={formData.described_name} onChange={(val) => setFormData({...formData, described_name: val})} />
                                </Field>
                            </Grid.Col>

                            <Grid.Col span={12}>
                                <Field label="Gas Pipeline Section">
                                    <EditableText isEditing={isEditing} value={formData.gas_pipeline_section} onChange={(val) => setFormData({...formData, gas_pipeline_section: val})} />
                                </Field>
                            </Grid.Col>

                            <Grid.Col span={6}>
                                <Field label="District">
                                    <EditableSelect isEditing={isEditing} data={districts} value={formData.district_id} onChange={(val) => setFormData({...formData, district_id: val || 0})} />
                                </Field>
                            </Grid.Col>

                            <Grid.Col span={6}>
                                <Field label="Folder">
                                    <EditableText isEditing={isEditing} value={formData.folder} onChange={(val) => setFormData({...formData, folder: val})} />
                                </Field>
                            </Grid.Col>
                        </Grid>
                    </Card>
                </Grid.Col>

                {/* ПРАВАЯ КОЛОНКА */}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Card withBorder radius="md" p="md" styles={DetailCardStyle}>
                        <Card.Section inheritPadding>
                            <Text style={CardSectionHeaderStyle}>Technical Parameters</Text>
                        </Card.Section>
                        
                        <Grid mt="md" gutter="md">
                            <Grid.Col span={12}>
                                <Field label="Gas Pipeline Type">
                                    <EditableSelect isEditing={isEditing} data={objectNames} value={formData.object_name_id} onChange={(val) => setFormData({...formData, object_name_id: val || 0})} />
                                </Field>
                            </Grid.Col>

                            <Grid.Col span={12}>
                                <Field label="Ownership">
                                    <EditableSelect isEditing={isEditing} data={properties} value={formData.property_type_id} onChange={(val) => setFormData({...formData, property_type_id: val || 0})} />
                                </Field>
                            </Grid.Col>

                            <Grid.Col span={6}>
                                <Field label="Pressure">
                                    <EditableSelect isEditing={isEditing} data={pressures} value={formData.pressure_type_id} onChange={(val) => setFormData({...formData, pressure_type_id: val || 0})} />
                                </Field>
                            </Grid.Col>

                            <Grid.Col span={6}>
                                <Field label="Build Date">
                                    <EditableDate isEditing={isEditing} value={formData.build_date_dn ? new Date(formData.build_date_dn) : null} onChange={(val) => setFormData({...formData, build_date_dn: formatDateForBackend(val)})} />
                                </Field>
                            </Grid.Col>

                            <Grid.Col span={6}>
                                <Field label="Cut Type">
                                    <EditableSelect isEditing={isEditing} data={cuts} value={formData.cut_type_id} onChange={(val) => setFormData({...formData, cut_type_id: val})} />
                                </Field>
                            </Grid.Col>
                        </Grid>
                    </Card>
                </Grid.Col>

            </Grid>

            <EquipmentList 
                cardId={Number(id)}
                cutType={cutType} 
                isEditing={isEditing}
                balanceTotal={formData.total_length_balance?.toString()}
                factTotal={formData.total_length_fact?.toString()}
                onBalanceTotalChange={(val) => setFormData({...formData, total_length_balance: Number(val)})}
                onFactTotalChange={(val) => setFormData({...formData, total_length_fact: Number(val)})}
            />

            <MigrationModal 
                opened={migrationModalOpened}
                onClose={() => setMigrationModalOpened(false)}
                onConfirm={handleConfirmMigration}
            />
        </Stack>
    );
};