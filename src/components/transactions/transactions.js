import React, { useEffect, useState } from "react";
import moment from "moment";
import { Table, Input, message, Image } from "antd";
import axios from "axios";


const { Search } = Input;

const columns = [
  {
    title: "#",
    dataIndex: "id",
    width: "50px",
    align: "center",
    className: "text-sm font-medium bg-gray-50",
  },
  {
    title: "Title",
    dataIndex: "title",
    width: "220px",
    className: "text-sm font-medium bg-gray-50",
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (price) => `$${parseFloat(price).toFixed(2)}`,
    width: "90px",
    align: "right",
    className: "text-sm font-medium bg-gray-50",
  },
  {
    title: "Description",
    dataIndex: "description",
    className: "text-sm",
  },
  {
    title: "Category",
    dataIndex: "category",
    width: "130px",
    className: "text-sm font-medium bg-gray-50",
  },
  {
    title: "Sold",
    dataIndex: "sold",
    render: (sold) => (
      <span
        className={sold ? "text-green-600 font-bold" : "text-red-600 font-bold"}
      >
        {sold ? "Yes" : "No"}
      </span>
    ),
    width: "70px",
    align: "center",
  },
  {
    title: "Date",
    dataIndex: "dateOfSale",
    render: (date) => moment(date).format("DD MMM YYYY"),
    width: "110px",
    align: "center",
    className: "text-sm font-medium bg-gray-50",
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (url) => (
      <Image
        src={url}
        alt="Product Image"
        className="transition-transform duration-300 hover:scale-110 max-h-16"
      />
    ),
    width: "100px",
    align: "center",
  },
];

function Transactions({ month, monthText }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://roxiler-pvpf.onrender.com/transactions`,
        {
          params: {
            month,
            page: tableParams.pagination.current,
            limit: tableParams.pagination.pageSize,
            search: tableParams.search,
          },
        }
      );

      setData(data.transactions);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data.totalCount,
        },
      });
      message.success("Data loaded successfully");
    } catch (error) {
      console.log(error);
      message.error("Error loading data");
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      ...tableParams,
      pagination,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const handleSearch = (value) => {
    setTableParams({
      ...tableParams,
      search: value,
    });
  };

  useEffect(() => {
    getData();
  }, [JSON.stringify(tableParams), month]);

  return (
    <>
      <div className="flex justify-end py-3">
        <Search
          placeholder="Search"
          allowClear
          onSearch={handleSearch}
          className="w-72 rounded-md border border-gray-300 transition-colors duration-300 hover:border-blue-500"
        />
      </div>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        size="small"
        bordered
        className="border rounded-lg shadow-lg mt-12"
        title={() => (
          <strong className="text-lg text-blue-600">
            Transactions for {monthText}
          </strong>
        )}
        scroll={{ y: 540 }}
      />
    </>
  );
}

export default Transactions;
