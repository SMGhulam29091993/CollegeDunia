import React, { useState } from 'react';
import { useTable } from "react-table";
import { DummyData as data } from "./constant/sampleData";
import { FaRupeeSign } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';

const App = () => {
  const parseCourseFees = (feesString) => {
    const courseFeesValue = parseInt(feesString.match(/\d+/g).join(''));
    return courseFeesValue;
  };

  const [rowsToShow, setRowsToShow] = useState(10); // Initial number of rows to show
  const [loading, setLoading] = useState(false); // Loading state for the delay

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

  const loadMoreRows = () => {
    setLoading(true); // Set loading to true to display loading message
    setTimeout(() => {
      setRowsToShow(prevRowsToShow => prevRowsToShow + 10); // Increase rows to show by 10 after a delay
      setLoading(false); // Set loading to false after the delay
    }, 1000); // 1000 milliseconds (1 second) delay
  };

  return (
    <>
      <div className='container'>
        <InfiniteScroll
          dataLength={rowsToShow}
          next={loadMoreRows}
          hasMore={rowsToShow < data.length}
          loader={<h4 >Loading...</h4>}
          endMessage={<p>No more rows to show</p>}
          scrollThreshold={0.9} // Load more rows when the user reaches 90% of the scrollable area
        >
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
              {rows.slice(0, rowsToShow).map(row => { // Slice rows to display only the rows to show
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
        </InfiniteScroll>
       
      </div>
    </>
  );
};

export default App;
