import React, { useState } from 'react';
import ReactTable from 'react-table';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DummyData } from "../constant/sampleData";

const TableComponent = () => {
  const [colleges, setColleges] = useState(DummyData.slice(0, 10));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    // Fetch more data and append it to colleges state
    // For now, let's just add the next 10 rows of dummy data
    const nextData = DummyData.slice(colleges.length, colleges.length + 10);
    if (nextData.length === 0) {
      setHasMore(false);
      return;
    }
    setColleges([...colleges, ...nextData]);
  };

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Rating', accessor: 'rating' },
    { Header: 'Fees', accessor: 'fees' },
    { Header: 'User Review Rating', accessor: 'userReviewRating' },
    { Header: 'Featured', accessor: 'featured', Cell: ({ value }) => (value ? 'Featured' : '') },
  ];

  return (
    <InfiniteScroll
      dataLength={colleges.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      scrollThreshold={0.9}
      endMessage={<p>No more colleges to load</p>}
    >
      <ReactTable
        data={colleges}
        columns={columns}
        sortable
        defaultSorted={[{ id: 'name', desc: false }]}
        pageSize={10}
      />
    </InfiniteScroll>
  );
};

export default TableComponent;
