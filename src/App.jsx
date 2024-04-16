// import React, { useState } from 'react';
// import { useTable, useFilters, useSortBy } from 'react-table';
// import { DummyData as data } from './constant/sampleData';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { BounceLoader } from 'react-spinners';

// const App = () => {
//   const parseCourseFees = feesString => {
//     const courseFeesValue = parseInt(feesString.match(/\d+/g).join(''));
//     return courseFeesValue;
//   };

//   const [rowsToShow, setRowsToShow] = useState(10); // Initial number of rows to show
//   const [loading, setLoading] = useState(false); // Loading state for the delay

//   const columns = React.useMemo(
//     () =>
//       Object.keys(data[0]).map(key => {
//         return {
//           Header: key,
//           accessor: key,
//           sortType: key === 'CDRank' || key === 'CourseFees' || key === 'UserReview.value' ? 'alphanumeric' : 'basic',
//           Cell: ({ cell }) => {
//             const { value, column } = cell;

//             // Check if the cell value is an object
//             if (typeof value === 'object') {
//               // Render key-value pairs of the object
//               return (
//                 <>
//                   {Object.keys(value).map((key, index) => (
//                     <div key={index} className={value.length > 1 ? 'flex flex-col gap-1' : ''}>
//                       {value[key]}
//                     </div>
//                   ))}
//                 </>
//               );
//             } else if (column.id === 'CourseFees') {
//               // Parse and render course fees
//               return <>{parseCourseFees(value)}</>;
//             } else {
//               // Render other cell values as they are
//               return value;
//             }
//           },
//         };
//       }),
//     [data]
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     prepareRow,
//     rows,
//     state: { globalFilter },
//     setGlobalFilter,
//   } = useTable(
//     {
//       columns,
//       data,
//     },
//     useFilters,
//     useSortBy // Add useSortBy hook here
//   );

//   const loadMoreRows = () => {
//     setLoading(true); // Set loading to true to display loading spinner
//     setTimeout(() => {
//       setRowsToShow(prevRowsToShow => prevRowsToShow + 10); // Increase rows to show by 10 after a delay
//       setLoading(false); // Set loading to false after the delay
//     }, 1000); // 1000 milliseconds (1 second) delay
//   };

//   return (
//     <>
//       <div className="container flex flex-col items-center justify-center p-5 w-full">
//         <input
//           type="text" // Ensure the input type is text
//           value={globalFilter}
//           onChange={e => setGlobalFilter(e.target.value)}
//           placeholder="Search by college name..."
//           className='w-80 border-2 border-black p-1 rounded-lg'
//         />
//         <InfiniteScroll
//           dataLength={rowsToShow}
//           next={loadMoreRows}
//           hasMore={rowsToShow < data.length}
//           loader={
//             <div className="flex justify-center mt-4">
//               <BounceLoader color="#007bff" loading={loading} />
//             </div>
//           } // Show spinner while loading
//           endMessage={<p>No more rows to show</p>}
//           scrollThreshold={0.9} // Load more rows when the user reaches 90% of the scrollable area
//         >
//           <table className="max-w-6xl mx-auto my-4 border-2 border-black" {...getTableProps()}>
//             <thead className="border-2 border-black bg-green-300 text-white">
//               {headerGroups.map(hg => (
//                 <tr key={hg.id} {...hg.getHeaderGroupProps()}>
//                   {hg.headers.map(header => (
//                     <th key={header.id} className="border-2 border-black px-4 py-2" {...header.getHeaderProps(header.getSortByToggleProps())}>
//                       {header.render('Header')}
//                       <span>
//                         {header.isSorted ? (header.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
//                       </span>
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {rows.slice(0, rowsToShow).map(row => {
//                 // Slice rows to display only the rows to show
//                 prepareRow(row);
//                 return (
//                   <tr key={row.id} {...row.getRowProps()}>
//                     {row.cells.map(cell => {
//                       const { getCellProps, render, column } = cell;
//                       return (
//                         <td
//                           {...getCellProps()}
//                           key={column.id}
//                           className="px-4 py-2 border-2 border-slate-600"
//                         >
//                           {render('Cell')}
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </InfiniteScroll>
//       </div>
//     </>
//   );
// };

// export default App;



import React, { useState } from 'react';
import { useTable, useFilters, useSortBy } from 'react-table';
import { DummyData as data } from './constant/sampleData';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BounceLoader } from 'react-spinners';
import { FiSearch } from 'react-icons/fi';

const App = () => {
  const parseCourseFees = feesString => {
    const courseFeesValue = parseInt(feesString.match(/\d+/g).join(''));
    return courseFeesValue;
  };

  const [rowsToShow, setRowsToShow] = useState(10); // Initial number of rows to show
  const [loading, setLoading] = useState(false); // Loading state for the delay
  const [searchByCollege, setSearchByCollege] = useState(false); // State variable to track if searching by college

  const columns = React.useMemo(
    () => [
      {
        Header: 'CDRank',
        accessor: 'CDRank',
        sortType: 'alphanumeric',
      },
      {
        Header: () => (
          <div className='flex items-center justify-between'>
            <span>Colleges</span>
            <FiSearch
              onClick={(e) => {
                e.stopPropagation()
                setSearchByCollege(!searchByCollege)}} // Toggle searchByCollege state on click
              style={{ marginLeft: '5px', cursor: 'pointer' }}
            />
          </div>
        ),
        accessor: 'Colleges',
        Filter: ({ column }) =>
          searchByCollege ? ( // Conditionally render the filter input based on searchByCollege state
            <input
              onClick={e => e.stopPropagation()} // Prevent sorting when clicking on the filter input
              className='text-black border rounded-lg font-thin p-1'
              value={column.filterValue || ''}
              onChange={e => column.setFilter(e.target.value)}
              placeholder={`Search Colleges`}
            />
          ) : null,
      },
      {
        Header: 'CourseFees',
        accessor: 'CourseFees',
        sortType: 'alphanumeric',
        Cell: ({ cell }) => parseCourseFees(cell.value),
      },
      {
        Header: 'Placements',
        accessor: 'Placements',
        Cell: ({ cell }) => {
          const { avgValue, avgLabel, package: packageValue, label } = cell.value;
          return (
            <>
              <div>{`${avgLabel}: ${avgValue}`}</div>
              <div>{`${label}: ${packageValue}`}</div>
            </>
          );
        },
      },
      {
        Header: 'UserReview',
        accessor: 'UserReview',
        Cell: ({ cell }) => {
          const { value, label } = cell.value;
          return <>{`${label}: ${value}`}</>;
        },
      },
      {
        Header: 'Ranking',
        accessor: 'Ranking',
      },
    ],
    [searchByCollege] // Add searchByCollege to dependencies
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    state: { globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy // Add useSortBy hook here
  );

  const loadMoreRows = () => {
    setLoading(true); // Set loading to true to display loading spinner
    setTimeout(() => {
      setRowsToShow(prevRowsToShow => prevRowsToShow + 10); // Increase rows to show by 10 after a delay
      setLoading(false); // Set loading to false after the delay
    }, 1000); // 1000 milliseconds (1 second) delay
  };

  return (
    <>
      <div className="container flex flex-col items-center justify-center p-5 w-full">
        <InfiniteScroll
          dataLength={rowsToShow}
          next={loadMoreRows}
          hasMore={rowsToShow < data.length}
          loader={
            <div className="flex justify-center mt-4">
              <BounceLoader color="#007bff" loading={loading} />
            </div>
          }
          endMessage={<p>No more rows to show</p>}
        >
          <table className="max-w-6xl mx-auto my-4 border-2 border-black" {...getTableProps()}>
            <thead className="border-2 border-black bg-green-300 text-white">
              {headerGroups.map(hg => (
                <tr key={hg.id} {...hg.getHeaderGroupProps()}>
                  {hg.headers.map(header => (
                    <th
                      key={header.id}
                      className="border-2 border-black px-4 py-2"
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                    >
                      {header.render('Header')}
                      <span>{header.isSorted ? (header.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                      {/* Add Filter UI for Colleges column */}
                      {header.id === 'Colleges' && searchByCollege && (
                        <div>{header.canFilter ? header.render('Filter') : null}</div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.slice(0, rowsToShow).map(row => {
                // Slice rows to display only the rows to show
                prepareRow(row);
                return (
                  <tr key={row.id} {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      const { getCellProps, render, column } = cell;
                      return (
                        <td
                          {...getCellProps()}
                          key={column.id}
                          className="px-4 py-2 border-2 border-slate-600"
                        >
                          {render('Cell')}
                        </td>
                      );
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
