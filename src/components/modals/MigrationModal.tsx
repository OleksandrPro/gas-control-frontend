import { useState, useEffect } from 'react';
import { Modal, Button, Text, Checkbox, Radio, Stack, Group } from '@mantine/core';

interface MigrationModalProps {
    opened: boolean;
    onClose: () => void;
    onConfirm: (source: "balance" | "fact" | null) => void;
}

export const MigrationModal = ({ opened, onClose, onConfirm }: MigrationModalProps) => {
    const [useAutoMigration, setUseAutoMigration] = useState(true);
    const [source, setSource] = useState<"balance" | "fact">("balance");

    useEffect(() => {
        if (opened) {
            setUseAutoMigration(true);
            setSource("balance");
        }
    }, [opened]);

    const handleConfirm = () => {
        onConfirm(useAutoMigration ? source : null);
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Change cut type" centered>
            <Stack>
                <Text size="sm">
                    You are changing the card type to "Full cut". 
                    Equipment columns must be brought into compliance with the new type.
                </Text>
                
                <Checkbox
                    label="Use auto-migration for equipment"
                    checked={useAutoMigration}
                    onChange={(event) => setUseAutoMigration(event.currentTarget.checked)}
                />

                {useAutoMigration && (
                    <Radio.Group
                        name="migrationSource"
                        label="Where to copy data into the 'Cut' column from?"
                        value={source}
                        onChange={(value) => setSource(value as "balance" | "fact")}
                    >
                        <Stack mt="xs" gap="sm">
                            <Radio value="balance" label="From 'Balance' column" />
                            <Radio value="fact" label="From 'Fact' column" />
                        </Stack>
                    </Radio.Group>
                )}

                {!useAutoMigration && (
                    <Text size="sm" c="dimmed">
                        You will have to manually distribute the equipment to the correct columns after saving.
                    </Text>
                )}

                <Group justify="flex-end" mt="md">
                    <Button variant="default" onClick={onClose}>Cancel</Button>
                    <Button color="blue" onClick={handleConfirm}>Proceed</Button>
                </Group>
            </Stack>
        </Modal>
    );
};