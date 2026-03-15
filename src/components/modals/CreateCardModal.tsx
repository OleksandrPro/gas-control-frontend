import { useState, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, TextInput, Select, Button, SimpleGrid, NumberInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useDictionaries } from '../../hooks/useDictionaries';
import { usePageNavigation } from '../../hooks/usePageNavigation';
import { createCard } from '../../api/Cards';
import { mapToSelectData } from '../../utils/utils';
import { buildCardPayload, type CreateCardFormState } from '../../utils/payloads/CardPayload';

interface CreateCardModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CreateCardModal = ({ opened, onClose }: CreateCardModalProps) => {
  const queryClient = useQueryClient();
  const { districts, properties, pressures, objectNames, cuts } = useDictionaries();
  const { openCardDetails } = usePageNavigation()

  const [formData, setFormData] = useState<CreateCardFormState>({});

  const dictsData = useMemo(() => ({
      districtsData: mapToSelectData(districts),
      propertiesData: mapToSelectData(properties),
      pressuresData: mapToSelectData(pressures),
      objectNamesData: mapToSelectData(objectNames),
      cutsData: mapToSelectData(cuts)
  }), [districts, properties, pressures, objectNames, cuts]);

  const handleChange = (field: keyof CreateCardFormState, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const createMutation = useMutation({
      mutationFn: (payload: any) => createCard(payload),
      onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ['cards'] });
          setFormData({});
          onClose();
          if (data && data.id) {
              openCardDetails(data.id);
          } else {
              console.warn("Server-side error! New card is created but response doesn't contain id.");
          }
      },
      onError: (error) => {
          console.error("Error while creating a card:", error);
          alert("Error. Couldn't create a card.");
      }
  });

  const handleSubmit = () => {
      if (!formData.inventory_number || !formData.address || !formData.build_date_dn) {
          alert("Fill the neccessary fields (Inventory number, Address, Build date)");
          return;
      }

      const payload = buildCardPayload(formData, dictsData);

      createMutation.mutate(payload);
  };

  return (
    <Modal 
      opened={opened} 
      onClose={() => {
          setFormData({});
          onClose();
      }} 
      title="Create Card" 
      size="xl"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <TextInput 
          label="INVENTORY NUMBER" 
          placeholder="Enter number" 
          value={formData.inventory_number || ''}
          onChange={(e) => handleChange('inventory_number', e.currentTarget.value)}
          required
          />
        <TextInput 
          label="INV. NUMBER (ESKD)" 
          placeholder="Enter ESKD number" 
          value={formData.inventory_number_eskd || ''}
          onChange={(e) => handleChange('inventory_number_eskd', e.currentTarget.value)}
          />
        <TextInput 
          label="ADDRESS" 
          placeholder="Enter address" 
          style={{ gridColumn: '1 / -1' }}
          value={formData.address || ''}
          onChange={(e) => handleChange('address', e.currentTarget.value)}
          required
        />
        <TextInput 
          label="Balance name" 
          placeholder="Enter balance name" 
          style={{ gridColumn: '1 / -1' }}
          value={formData.described_name || ''}
          onChange={(e) => handleChange('described_name', e.currentTarget.value)}
        />
        <TextInput 
          label="Gas pipeline section" 
          placeholder="Enter gas pipeline section" 
          style={{ gridColumn: '1 / -1' }}
          value={formData.gas_pipeline_section || ''}
          onChange={(e) => handleChange('gas_pipeline_section', e.currentTarget.value)}
        />
        <Select 
          label="DISTRICT" 
          placeholder="Select" 
          data={dictsData.districtsData} 
          value={formData.district_id || (dictsData.districtsData[0]?.value || null)}
          onChange={(val) => handleChange('district_id', val)}
          searchable
        />
        <Select 
          label="Pressures" 
          placeholder="Select" 
          data={dictsData.pressuresData} 
          value={formData.pressure_type_id || (dictsData.pressuresData[0]?.value || null)}
          onChange={(val) => handleChange('pressure_type_id', val)}
          searchable
        />
        <Select 
          label="Gas pipeline type" 
          placeholder="Select" 
          data={dictsData.objectNamesData} 
          value={formData.object_name_id || (dictsData.objectNamesData[0]?.value || null)}
          onChange={(val) => handleChange('object_name_id', val)}
          searchable
        />
        <Select 
          label="OWNERSHIP" 
          placeholder="Select" 
          data={dictsData.propertiesData} 
          value={formData.property_type_id || (dictsData.propertiesData[0]?.value || null)} 
          onChange={(val) => handleChange('property_type_id', val)}
          searchable
        />
        <NumberInput 
          label="Total length (Balance)"
          placeholder="e.g. 1.7412"
          allowDecimal={true}
          allowedDecimalSeparators={[',', '.']}
          step={0.1}
          value={formData.total_length_balance || ''}
          onChange={(val) => handleChange('total_length_balance', val)}
        />
        <NumberInput 
          label="Total length (Fact)"
          placeholder="e.g. 1.7412"
          allowDecimal={true}
          allowedDecimalSeparators={[',', '.']}
          step={0.1}
          value={formData.total_length_fact || ''}
          onChange={(val) => handleChange('total_length_fact', val)}
        />
        <TextInput 
          label="FOLDER" 
          placeholder="Enter folder"
          value={formData.folder || ''}
          onChange={(e) => handleChange('folder', e.currentTarget.value)}
        />
        <Select 
          label="CUT TYPE" 
          placeholder="Select" 
          data={dictsData.cutsData} 
          value={formData.cut_type_id || (dictsData.cutsData[0]?.value || null)}
          onChange={(val) => handleChange('cut_type_id', val)}
          searchable
        />
        <DateInput 
          label="BUILD DATE" 
          placeholder="DD.MM.YYYY" 
          valueFormat="DD.MM.YYYY"
          rightSection={<IconCalendar size={18} color="gray" />}
          value={formData.build_date_dn || null}
          onChange={(val) => handleChange('build_date_dn', val)}
          required
        />
      </SimpleGrid>

      <Button 
        fullWidth 
        mt="xl"
        size="md"
        color="blue"
        onClick={handleSubmit}
        loading={createMutation.isPending} 
      >
        Create card
      </Button>
    </Modal>
  );
};