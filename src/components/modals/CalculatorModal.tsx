import { Modal, Text, Stack, Loader, Title } from '@mantine/core';

interface CalculatorModalProps {
  opened: boolean;
  onClose: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  totalLength?: number;
}

export const CalculatorModal = ({
  opened, 
  onClose, 
  isLoading, 
  isSuccess, 
  totalLength 
}: CalculatorModalProps) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Pipe Calculator" size="md" centered>
      <Stack align="center" py="xl">
        <Text c="dimmed">Total length based on active filters:</Text>
        {isLoading ? (
          <Loader color="green" size="lg" mt="md" />
        ) : isSuccess ? (
          <Title order={1} c="green" style={{ fontSize: '3rem' }}>
            {totalLength?.toFixed(10)} km
          </Title>
        ) : (
          <Text c="red">Failed to load data.</Text>
        )}
      </Stack>
    </Modal>
  );
};