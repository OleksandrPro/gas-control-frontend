import { type CSSProperties } from 'react';

export const DictionaryCardStyle = {
    root: {
        backgroundColor: 'var(--mantine-color-white)',
        minHeight: '100%',
    }
};

export const ListHeaderStyle: CSSProperties = {
    padding: 'var(--mantine-spacing-md)',
    borderBottom: '1px solid var(--mantine-color-gray-2)',
    backgroundColor: 'var(--mantine-color-gray-0)', 
};

export const ListHeaderTextStyle: CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    color: 'var(--mantine-color-gray-6)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
};

export const EditorHeaderStyle: CSSProperties = {
    padding: 'var(--mantine-spacing-md)',
    borderBottom: '1px solid var(--mantine-color-gray-2)',
};