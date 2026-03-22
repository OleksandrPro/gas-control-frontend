import { type CSSProperties } from 'react';

export const HeaderContainerStyle: CSSProperties = {
    height: '64px',
    backgroundColor: 'var(--mantine-color-white)',
    borderBottom: '1px solid var(--mantine-color-gray-2)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.01)',
};

export const LogoBoxStyle: CSSProperties = {
    width: '34px',
    height: '34px',
    backgroundColor: 'var(--mantine-color-blue-6)',
    color: 'var(--mantine-color-white)',
    borderRadius: 'var(--mantine-radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: '18px',
};

export const LogoTextStyle: CSSProperties = {
    color: 'var(--mantine-color-blue-7)',
    fontWeight: 700,
    fontSize: '20px',
    letterSpacing: '0.5px',
};