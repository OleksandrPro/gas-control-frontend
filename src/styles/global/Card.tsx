import { Card } from '@mantine/core';

export const CardStyle = Card.extend({
    defaultProps: {
        shadow: 'sm',
        withBorder: true,
        radius: 'md',
    },
    styles: {
        root: {
            backgroundColor: 'var(--mantine-color-white)',
            borderColor: 'var(--mantine-color-gray-3)',
        },
        
        section: {
            borderBottom: '1px solid var(--mantine-color-gray-2)'
        }
    }
});