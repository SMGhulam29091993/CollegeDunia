import React from 'react';
import { useTable } from "react-table";
import { DummyData as data } from "./constant/sampleData";
import { FaRupeeSign } from 'react-icons/fa';

const App = () => {
  const parseCourseFees = (feesString) => {
    const courseFeesValue = parseInt(feesString.match(/\d+/g).join(''));
    return courseFeesValue;
  };

  const columns = React.useMemo(
    () => Object.keys(data[0]).map(key => {
      return {
        Header: key,
        accessor: key,
        Cell: ({ cell }) => {
          const { value, column } = cell;

          // Check if the cell value is an object
          if (typeof value === 'object') {
            // Render key-value pairs of the object
            return (
              <>
                {Object.keys(value).map((key, index) => (
                  <div key={index} className={value.length > 1 ? 'flex flex-col gap-1' : ""}>
                    <strong>{value[key]}</strong>
                  </div>
                ))}
              </>
            );
          } else if (column.id === 'CourseFees') {
            // Parse and render course fees
            return <>{parseCourseFees(value)}</>;
          } else {
            // Render other cell values as they are
            return value;
          }
        }
      };
    }),
    [data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <>
      <div className='container'>
        <table {...getTableProps()} className='max-w-6xl mx-auto my-4 border-2 border-black'>
          <thead className="border-2 border-black bg-green-300 text-white">
            {headerGroups.map(hg => (
              <tr  {...hg.getHeaderGroupProps()}>
                {hg.headers.map(header => (
                  <th className="border-2 border-black px-4 py-2" {...header.getHeaderProps()}>{header.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map(cell => {
                    const { getCellProps, render, column } = cell;
                    return <td {...getCellProps()} key={column.id} className="px-4 py-2 border-2 border-slate-600">{render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
