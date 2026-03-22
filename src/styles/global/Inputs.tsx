import { TextInput, Select, NumberInput, MultiSelect } from '@mantine/core';
import { DateInput } from '@mantine/dates'; 

const defaultInputConfig = {
    defaultProps: { 
        radius: 'md' as const 
    },
    styles: {
        input: {
            backgroundColor: 'var(--mantine-color-gray-0)', 
            border: '1px solid var(--mantine-color-gray-3)',
            transition: 'all 0.2s ease',
            '&:focus': {
                backgroundColor: 'var(--mantine-color-white)',
                borderColor: 'var(--mantine-color-blue-6)',
            }
        },
        label: {
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            color: 'var(--mantine-color-gray-7)',
            letterSpacing: '0.5px',
            marginBottom: '6px',
        }
    }
};

export const TextInputStyle = TextInput.extend(defaultInputConfig);
export const SelectStyle = Select.extend(defaultInputConfig);
export const NumberInputStyle = NumberInput.extend(defaultInputConfig);
export const MultiSelectStyle = MultiSelect.extend(defaultInputConfig);
export const DateInputStyle = DateInput.extend(defaultInputConfig);