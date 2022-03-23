/* eslint-disable react/jsx-key */

import type { Column } from 'react-table';
import { useTable } from 'react-table';

type Props<T extends object> = {
  columns: ReadonlyArray<Column<T>>;
  data: T[];
  className?: string;
};

function Table<T extends object>({ columns, data, className }: Props<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div
      className={`${className} mx-auto w-fit overflow-x-auto rounded-sm border border-stone-300 shadow`}
    >
      <table
        className="table-auto border-collapse text-sm"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr
              className="border-b bg-stone-50"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map(column => (
                <th
                  className="border-r px-4 py-2 font-medium last:border-none"
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr
                className="whitespace-nowrap border-b bg-white text-right last:border-none"
                {...row.getRowProps()}
              >
                {row.cells.map(cell => {
                  return (
                    <td
                      className="border-r px-4 py-2 last:border-none"
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
