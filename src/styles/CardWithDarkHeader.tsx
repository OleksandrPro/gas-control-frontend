import { type CSSProperties } from 'react';

export const CardWithDarkHeaderStyle = {
    defaultProps: {
        withBorder: true,
        radius: 'md',
    },
    root: {
        backgroundColor: 'var(--mantine-color-white)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
    },
    section: {
        backgroundColor: 'var(--mantine-color-gray-0)',
        paddingTop: 'var(--mantine-spacing-md)',
        paddingBottom: 'var(--mantine-spacing-md)',
        borderBottom: '1px solid var(--mantine-color-gray-2)'
    }
};

export const CardHeaderTextStyle: CSSProperties = {
    fontSize: '12px',
    fontWeight: 700,
    color: 'var(--mantine-color-gray-7)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
};