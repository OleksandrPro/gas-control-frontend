import { Modal } from '@mantine/core';

export const ModalStyle = Modal.extend({
    defaultProps: {
        radius: 'md',
        padding: 'xl',
        overlayProps: {
            backgroundOpacity: 0.55,
            blur: 3,
        },
    },
    styles: {
        title: {
            fontWeight: 700,
            fontSize: 'var(--mantine-font-size-lg)',
            color: 'var(--mantine-color-gray-9)',
        },
        header: {
            backgroundColor: 'var(--mantine-color-gray-0)', 
            borderBottom: '1px solid var(--mantine-color-gray-2)',
            padding: 'var(--mantine-spacing-md) var(--mantine-spacing-xl)',
        },
        content: {
            boxShadow: 'var(--mantine-shadow-xl)',  
        },
        body: {
            paddingTop: 'var(--mantine-spacing-lg)',
            backgroundColor: 'var(--mantine-color-white)',
        }
    }
});