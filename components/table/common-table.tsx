'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FC } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

interface CommonTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  tableCaption?: String | React.ReactElement;
}

const CommonTable: FC<CommonTableProps<any>> = <T, >({ data, columns, tableCaption }: CommonTableProps<T>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className={'bg-white shadow rounded-lg'}>
      <TableCaption>{tableCaption}</TableCaption>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className={'h-24 text-center'}
            >
              {"No found data."}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        {table.getFooterGroups().map(footerGroup => (
          <TableRow key={footerGroup.id}>
            {footerGroup.headers.map(footer => (
              <TableCell key={footer.id}>
                {footer.isPlaceholder ? null : flexRender(
                  footer.column.columnDef.footer,
                  footer.getContext(),
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableFooter>
    </Table>
  )
}

export default CommonTable;