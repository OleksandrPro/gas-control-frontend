import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CardDisplay } from '../types';

export interface CardListProps{
    cards: CardDisplay[]
}

export const CardList = ({cards}:CardListProps) => {

    const navigate = useNavigate()

    const openCardDetails = (id: number) => {
        navigate(`/card-details/${id}`)
    }

    const columns = useMemo<MRT_ColumnDef<CardDisplay>[]>(

    () => [
      {
        accessorKey: 'inventory_number',
        header: 'Inventory Number',
      },
      {
        accessorKey: 'inventory_number_eskd',
        header: 'Inventory Number (ESKD)',
      },
      {
        accessorKey: 'pressure',
        header: 'Pressure',
      },
      {
        accessorKey: 'balanceName',
        header: 'Balance name',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'district',
        header: 'District',
      },
      {
        accessorKey: 'property',
        header: 'Property',
      },
      {
        accessorKey: 'objectName',
        header: 'Object name',
      },
      {
        accessorKey: 'buildDate',
        header: 'Build Date',
      },
      {
        accessorKey: 'totalLength',
        header: 'Total length, km',
      },
      {
        accessorKey: 'cut',
        header: 'Cut',
      },
      {
        accessorKey: 'folder',
        header: 'Folder',
      },
    ],

    [],

  );

    const table = useMantineReactTable({
        columns,
        data: cards,

        enableColumnFilters: false,
        enableFullScreenToggle: false,
        enableColumnActions: false,
        enableSorting: false,
        enableGlobalFilter: false,
        enableDensityToggle: false,
        enablePagination: false,

        mantineTableProps: {    
            striped: 'odd',
            withColumnBorders: false,
            withRowBorders: false,
            withTableBorder: false,
        },

        mantineTableBodyRowProps: ({ row }) => ({
            onClick: (event) => {
                openCardDetails(Number(row.original.id))
            }
        })
    });

    return <MantineReactTable table={table} />;
}