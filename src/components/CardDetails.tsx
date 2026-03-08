import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, SimpleGrid, Group, Stack, Grid, Text, Title, Loader } from "@mantine/core";
import { type CardBackend, type CardUpdateData } from "../types";
import { EditableText } from './EditableText';
import { EditableSelect } from './EditableSelect';
import { EditableDate } from './EditableDate';
import { EquipmentList } from './EquipmentList';
import { useDictionaries } from '../hooks/useDictionaries';
import { usePageNavigation } from '../hooks/usePageNavigation';
import { updateCard } from '../api/Cards';

interface CardDetailsProps {
    cardData: CardBackend
}

export const CardDetails = ({cardData}: CardDetailsProps) => {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const [initialCardData, setInitialCardData] = useState(cardData)
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(cardData);

    const { pressures, districts, properties, cuts } = useDictionaries();
    const { goToHome } = usePageNavigation()

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number, data: CardUpdateData }) => updateCard(id, data),
        onSuccess: (updatedCard) => {
            queryClient.invalidateQueries({ queryKey: ['cards'] });
            queryClient.invalidateQueries({ queryKey: ['card', updatedCard.id.toString()] });
            
            setInitialCardData(updatedCard);
            setIsEditing(false);
        },
        onError: (error) => {
            console.error("Failed to update card:", error);
            // TODO: Add error notification later
        }
    });

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

        console.log("Sending data to the server:", changedData);
        updateMutation.mutate({ id: cardData.id, data: changedData });
    };

    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (!isEditing) return;
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
        };

        window.addEventListener('keydown', handleGlobalKeyDown);

        return () => {
            window.removeEventListener('keydown', handleGlobalKeyDown);
        };

    }, [isEditing, formData])

    const formatDateForBackend = (date: Date | null) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <Stack>
            <Group justify="space-between">
                <Button variant="default" onClick={goToHome}>{'< Back to registry'}</Button>
                
                {isEditing ? (
                    <Group>
                        <Button variant="default" onClick={handleCancel}>Cancel</Button>
                        <Button color="green" onClick={handleSave} disabled={updateMutation.isPending}>
                            {updateMutation.isPending ? <Loader size="xs" color="white" /> : 'Save'}
                        </Button>
                    </Group>
                ) : (
                    <Button variant="default" onClick={() => setIsEditing(true)}>Edit</Button>
                )}
            </Group>


            <Grid>
                <Grid.Col span={8}>
                    <Text>INVENTORY CARD</Text>
                    <EditableText 
                        isEditing={isEditing}
                        value={formData.inventory_number}
                        onChange={(val) => setFormData({...formData, inventory_number: val})}
                        renderText={(val) => <Title order={2}>{val}</Title>}
                    />
                    
                    <EditableText 
                        isEditing={isEditing}
                        value={formData.inventory_number_eskd}
                        onChange={(val) => setFormData({...formData, inventory_number_eskd: val})}
                        renderText={(val) => <Text c="dimmed">{val}</Text>}
                    />
                </Grid.Col>
                
            </Grid>

            <SimpleGrid cols={4}>
                <div>
                    <Text>ADDRESS</Text>
                    <EditableText 
                        isEditing={isEditing}
                        value={formData.address}
                        onChange={(val) => setFormData({...formData, address: val})}
                    />
                </div>
                <div>
                    <Text>PRESSURE</Text>
                    <EditableSelect 
                        isEditing={isEditing}
                        data={pressures}
                        value={formData.pressure_type_id}
                        onChange={(val) => setFormData({...formData, pressure_type_id: val || 0})}
                    />
                </div>
                <div>
                    <Text>DISTRICT</Text>
                    <EditableSelect 
                        isEditing={isEditing}
                        data={districts}
                        value={formData.district_id}
                        onChange={(val) => setFormData({...formData, district_id: val || 0})}
                    />
                </div>
                <div>
                    <Text>OWNERSHIP</Text>
                    <EditableSelect 
                        isEditing={isEditing}
                        data={properties}
                        value={formData.property_type_id}
                        onChange={(val) => setFormData({...formData, property_type_id: val || 0})}
                    />
                </div>
                <div>
                    <Text>FOLDER</Text>
                    <EditableText 
                        isEditing={isEditing}
                        value={formData.folder}
                        onChange={(val) => setFormData({...formData, folder: val})}
                    />
                </div>
                <div>
                    <Text>BUILD DATE</Text>
                    <EditableDate 
                        isEditing={isEditing}
                        value={formData.build_date_dn ? new Date(formData.build_date_dn) : null}
                        onChange={(val) => setFormData({...formData, build_date_dn: formatDateForBackend(val)})}
                    />
                </div>
                <div>
                    <Text>CUT TYPE</Text>
                    <EditableSelect 
                        isEditing={isEditing}
                        data={cuts}
                        value={formData.cut_type_id}
                        onChange={(val) => setFormData({...formData, cut_type_id: val})}
                    />
                </div>
            </SimpleGrid>

            <EquipmentList 
                cardId={Number(id)}
                isEditing={isEditing}
                balanceTotal={formData.total_length_balance?.toString()}
                factTotal={formData.total_length_fact?.toString()}
                onBalanceTotalChange={(val) => setFormData({...formData, total_length_balance: Number(val)})}
                onFactTotalChange={(val) => setFormData({...formData, total_length_fact: Number(val)})}
            />
        </Stack>
    );
};