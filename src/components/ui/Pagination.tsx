import { Pagination, Group, Select, Text } from '@mantine/core';

interface TablePaginationProps {
    page: number;
    onPageChange: (page: number) => void;
    pageSize: string;
    onPageSizeChange: (size: string) => void;
    totalRecords: number;
    totalPages: number;
    pageSizeOptions: { value: string; label: string }[];
}

export const TablePagination = ({
    page, 
    onPageChange, 
    pageSize, 
    onPageSizeChange, 
    totalRecords, 
    totalPages,
    pageSizeOptions
}: TablePaginationProps) => {
    return (
        <Group justify="space-between" my="md">
            <Text size="sm" fw={500} c="dimmed">TOTAL: {totalRecords} records</Text>
            
            <Group>
                <Text size="sm" c="dimmed">Records per page:</Text>
                <Select
                    data={pageSizeOptions}
                    value={pageSize}
                    onChange={(val) => val && onPageSizeChange(val)} 
                    allowDeselect={false}
                    style={{ width: 85 }}
                />
                
                <Pagination 
                    value={page} 
                    onChange={onPageChange} 
                    total={totalPages} 
                    color="blue"
                    withEdges
                />
            </Group>
        </Group>
    );
};