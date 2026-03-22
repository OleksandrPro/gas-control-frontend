import { Paper } from '@mantine/core';

export const PaperStyle = Paper.extend({
    defaultProps: {
        shadow: 'sm',
        withBorder: true,
    },
    styles: {
        root: {
            borderColor: 'var(--mantine-color-gray-3)',
        }
    }
});