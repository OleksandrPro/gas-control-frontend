import { Modal, Text, Stack, Loader, Title, Group, Paper } from '@mantine/core';
import { IconCalculator } from '@tabler/icons-react';

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
  const formatLength = (val?: number) => {
      if (val === undefined || val === null) return '0';
      return parseFloat(val.toFixed(10)).toString();
  };

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title={
        <Group gap="sm">
            <IconCalculator size={20} color="var(--mantine-color-blue-6)" />
            <Text fw={700}>Pipe Calculator</Text>
        </Group>
      }  
      size="md" 
      centered
    >
      <Stack align="center" py="md">
      {isLoading ? (
        <Stack align="center" gap="sm" py="xl">
          <Loader color="blue" size="lg" />
          <Text c="dimmed" size="sm">Calculating total length...</Text>
        </Stack>
      ) : isSuccess ? (
        <Paper withBorder radius="md" p="xl" w="100%" bg="gray.0" style={{ textAlign: 'center' }}>
          <Text 
              c="dimmed" 
              tt="uppercase" 
              fw={700} 
              size="11px" 
              style={{ letterSpacing: '0.5px' }} 
              mb="xs"
          >
              Total length based on active filters
          </Text>
          
          <Group justify="center" align="baseline" gap="xs">
              <Title 
                  order={1} 
                  c="blue.7" 
                  style={{ fontSize: '2.5rem', wordBreak: 'break-all' }}
              >
                  {formatLength(totalLength)}
              </Title>
              <Text c="dimmed" fw={600} size="xl" pb={6}>km</Text>
          </Group>
        </Paper>
      ) : (
        <Text c="red" py="xl">Failed to load data.</Text>
      )}
      </Stack>
    </Modal>
  );
};