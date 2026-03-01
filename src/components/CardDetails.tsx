import { useState, useEffect } from 'react';
import { Button, SimpleGrid, Group, Stack, Grid, Text, Title, TextInput, Select } from "@mantine/core";
import { type Card } from "../types";
import { EditableText } from './EditableText';
import { EditableSelect } from './EditableSelect';
import { EditableDate } from './EditableDate';
import { EquipmentList } from './EquipmentList';
import { useDictionaries } from '../hooks/useDictionaries';
import { usePageNavigation } from '../hooks/usePageNavigation';

interface CardDetailsProps {
    cardData: Card
}

export const CardDetails = ({cardData}: CardDetailsProps) => {
    const [initialCardData, setInitialCardData] = useState(cardData)
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(cardData);

    const { districts, properties, cuts } = useDictionaries();
    const { goToHome } = usePageNavigation()

    const handleCancel = () => {
        setFormData(initialCardData);
        setIsEditing(false);
    };

    const handleSave = () => {
        console.log("Saving changes:", formData);
        setInitialCardData(formData);   
        setIsEditing(false);
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

    

    return (
        <Stack>
            <Group justify="space-between">
                <Button variant="default" onClick={goToHome}>{'< Back to registry'}</Button>
                
                {isEditing ? (
                    <Group>
                        <Button variant="default" onClick={handleCancel}>Cancel</Button>
                        <Button color="green" onClick={handleSave}>Save</Button>
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
                
                <Grid.Col span={4}>
                    <Group>
                        <Stack>
                            <Text>BALANCE (TOTAL)</Text>
                            <Title order={3}>100.0 m</Title>
                        </Stack>
                        <Stack>
                            <Text>FACT (TOTAL)</Text>
                            <Title order={3}>95.0 m</Title>
                        </Stack>
                    </Group>
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
                    <Text>DISTRICT</Text>
                    <EditableSelect 
                        isEditing={isEditing}
                        data={districts}
                        value={formData.district}
                        onChange={(val) => setFormData({...formData, district: val})}
                    />
                </div>
                <div>
                    <Text>OWNERSHIP</Text>
                    <EditableSelect 
                        isEditing={isEditing}
                        data={properties}
                        value={formData.property}
                        onChange={(val) => setFormData({...formData, property: val})}
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
                        value={formData.build_date_dn}
                        onChange={(val) => setFormData({...formData, build_date_dn: val || new Date()})}
                    />
                </div>
                <div>
                    <Text>CUT TYPE</Text>
                    <EditableSelect 
                        isEditing={isEditing}
                        data={cuts}
                        value={formData.cut}
                        onChange={(val) => setFormData({...formData, cut: val})}
                    />
                </div>
            </SimpleGrid>

            <EquipmentList />
        </Stack>
    );
};