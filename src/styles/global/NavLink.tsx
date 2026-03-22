import { NavLink } from '@mantine/core';

export const NavLinkStyle = NavLink.extend({
    defaultProps: {
        variant: 'light',
    },
    styles: {
        root: {
            borderRadius: 'var(--mantine-radius-md)',
            marginBottom: '4px',
            fontWeight: 500,
            transition: 'background-color 0.2s ease',
        },
        label: {
            fontSize: '14px',
        }
    }
});