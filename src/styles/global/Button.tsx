import { Button } from '@mantine/core';

export const ButtonStyle = Button.extend({
    defaultProps: {
        fw: 600,
    },
    styles: {
        root: {
            transition: 'all 0.2s ease',
        }
    }
});