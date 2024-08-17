import React, { useState } from "react";
import { Layout, Menu, Select } from "antd";
import Transactions from "./components/transactions/transactions";
import Stats from "./components/statistics/statistics";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Footer from "./components/footer/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Header, Content } = Layout;

const navItems = [
  {
    key: 1,
    label: (
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-gray-800 px-4 py-2 rounded-md transition duration-300 ${
            isActive ? "bg-indigo-100 shadow-md" : "hover:bg-indigo-50"
          }`
        }
      >
        Transactions
      </NavLink>
    ),
  },
  {
    key: 2,
    label: (
      <NavLink
        to="/stats"
        className={({ isActive }) =>
          `text-gray-800 px-4 py-2 rounded-md transition duration-300 ${
            isActive ? "bg-indigo-100 shadow-md" : "hover:bg-indigo-50"
          }`
        }
      >
        Statistics
      </NavLink>
    ),
  },
];

const options = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const App = () => {
  const [month, setMonth] = useState(3);

  const handleMonthChange = (value) => {
    setMonth(parseInt(value));
    // Show a toast notification when the month changes
    toast.info(`Selected month: ${options[parseInt(value)]}`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <BrowserRouter>
      <Layout className="min-h-screen bg-gray-100">
        <Header className="bg-gradient-to-r from-indigo-300 to-blue-300 flex items-center px-6 shadow-lg">
          <h1 className="text-gray-800 text-3xl font-bold tracking-wide">
            Dashboard
          </h1>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={navItems}
            className="flex-1 mx-6"
            style={{ lineHeight: "64px", backgroundColor: "transparent" }}
          />
          <Select
            size="large"
            defaultValue={options[month]}
            onChange={handleMonthChange}
            className="w-48 text-gray-800 bg-white border-2 border-blue-300 rounded-md"
            dropdownClassName="bg-white text-gray-800 border border-blue-300"
            options={options.map((text, i) => ({
              value: i,
              label: text,
            }))}
          />
        </Header>
        <Content className="p-12 bg-white rounded-lg shadow-2xl mt-6 mx-4 md:mx-12 lg:mx-24">
          <Routes>
            <Route
              path="/"
              element={
                <Transactions month={month} monthText={options[month]} />
              }
            />
            <Route
              path="/stats"
              element={<Stats month={month} monthText={options[month]} />}
            />
          </Routes>
        </Content>
        <Footer />
        <ToastContainer />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
