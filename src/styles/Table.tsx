import { Table } from '@mantine/core';

export const TableStyle = Table.extend({
    defaultProps: {
        highlightOnHover: true,
        verticalSpacing: 'md',
        horizontalSpacing: 'md',
    },
    styles: {
        th: {
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--mantine-color-gray-5)',
            letterSpacing: '0.5px',
            borderBottom: '2px solid var(--mantine-color-gray-2)',
            paddingBottom: '12px',
        },
        td: {
            fontSize: '14px',
            color: 'var(--mantine-color-gray-8)',
            borderBottom: '1px solid var(--mantine-color-gray-2)',
        },
        tr: {
            transition: 'background-color 0.2s ease',
        }
    }
});