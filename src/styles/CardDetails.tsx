import { type CSSProperties } from 'react';

export const DetailCardStyle = {
    root: {
        backgroundColor: 'var(--mantine-color-white)',
        boxShadow: 'var(--mantine-shadow-sm)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
    },
    section: {
        backgroundColor: 'var(--mantine-color-gray-0)',
        paddingTop: 'var(--mantine-spacing-sm)',
        paddingBottom: 'var(--mantine-spacing-sm)',
        borderBottom: '1px solid var(--mantine-color-gray-2)'
    }
};

export const CardSectionHeaderStyle: CSSProperties = {
    fontSize: '12px',
    fontWeight: 700,
    color: 'var(--mantine-color-gray-6)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
};

export const FieldLabelStyle: CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: 'var(--mantine-color-gray-5)',
    letterSpacing: '0.5px',
    marginBottom: '6px', // Чуть увеличили отступ от лейбла до текста/инпута
    display: 'block'
};

export const MainTitleStyle: CSSProperties = {
    color: 'var(--mantine-color-gray-9)',
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: '4px'
};

// Добавим стиль для враппера поля, чтобы они не слипались по вертикали
export const FieldWrapperStyle: CSSProperties = {
    marginBottom: 'var(--mantine-spacing-sm)'
};