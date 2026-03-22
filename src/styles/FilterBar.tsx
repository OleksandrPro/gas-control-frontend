export const SearchInputStyle = {
    root: {
        flexGrow: 1,
    },
    input: {
        backgroundColor: 'var(--mantine-color-gray-0)',
        border: '1px solid var(--mantine-color-gray-3)',
        transition: 'all 0.2s ease',
        '&:focus': {
            backgroundColor: 'var(--mantine-color-white)',
            borderColor: 'var(--mantine-color-blue-6)',
        }
    }
};

export const InnerCardStyle = {
    root: {
        marginTop: 'var(--mantine-spacing-md)',
        boxShadow: 'none'
    },
    section: {
        backgroundColor: 'var(--mantine-color-gray-0)',
        paddingTop: 'var(--mantine-spacing-sm)',
        paddingBottom: 'var(--mantine-spacing-sm)',
        borderBottom: '1px solid var(--mantine-color-gray-2)'
    }
};

export const SectionHeaderTextStyle = {
    root: {
        fontWeight: 600,
        color: 'var(--mantine-color-gray-7)',
        fontSize: 'var(--mantine-font-size-sm)',
        letterSpacing: '0.3px'
    }
};