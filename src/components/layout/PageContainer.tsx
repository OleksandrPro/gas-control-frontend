import { Box, type BoxProps } from '@mantine/core';
import { type ReactNode } from 'react';

interface PageContainerProps extends BoxProps {
    children: ReactNode;
}

export const PageContainer = ({ children, ...others }: PageContainerProps) => {
    return (
        <Box px="xl" py="lg" maw={1600} mx="auto" w="100%" {...others}>
            {children}
        </Box>
    );
};