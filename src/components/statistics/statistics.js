import { Statistic, message } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto";

export default function Stats({ month, monthText }) {
    let [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    
    
    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://roxiler-pvpf.onrender.com/combined-data?month=${month}`);
            setLoading(false);
            setData(res.data);
            message.success('Data loaded successfully');
        } catch (error) {
            console.log(error);
            message.error('Error loading data');
        }
    }

    useEffect(() => {
        getData();
        return () => {
            setData(null);
        }
    }, [month])

    return (
      <>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Stats for {monthText}
        </h2>

        <div className="flex flex-wrap justify-center gap-12 mb-12 px-4">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
            <Totals stats={data?.statsData} loading={loading} />
            {data && <BarChart data={data?.barChartData} />}
          </div>

          {data && <PieChart data={data?.pieChartData} />}
        </div>
      </>
    );
}

function Totals({ stats, loading }) {
  return (
    <div className="flex justify-between max-w-4xl mx-auto p-4 bg-gradient-to-r from-gray-50 to-gray-100 text-white rounded-lg shadow-lg mb-6">
      <div className="flex-1 flex flex-col items-center p-6 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <Statistic
          valueStyle={{ fontSize: "1.5rem", color: "#1f2937" }}
          title="Total Sale"
          value={stats?.totalSale}
          loading={loading}
          prefix="₹"
        />
      </div>

      <div className="flex-1 flex flex-col items-center p-6 bg-gradient-to-r from-green-100 to-green-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <Statistic
          valueStyle={{ fontSize: "1.5rem", color: "#1f2937" }}
          title="Total Sold Items"
          value={stats?.soldCount}
          loading={loading}
        />
      </div>

      <div className="flex-1 flex flex-col items-center p-6 bg-gradient-to-r from-pink-100 to-pink-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <Statistic
          valueStyle={{ fontSize: "1.5rem", color: "#1f2937" }}
          title="Total Unsold Items"
          value={stats?.unsoldCount}
          loading={loading}
        />
      </div>
    </div>
  );
}



function BarChart({ data }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "No of products per price range",
        color: "#333",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Price Range",
          color: "#555",
          font: {
            size: 14,
          },
        },
        ticks: {
          color: "#555",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Product Count",
          color: "#555",
          font: {
            size: 14,
          },
        },
        ticks: {
          stepSize: 4,
          color: "#555",
        },
      },
    },
    aspectRatio: 1.6,
  };

  let labels = Object.keys(data);
  let values = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: "No of products per price range",
        data: values,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            // Return transparent color if no chart area
            return "rgba(0, 105, 100, 0.7)";
          }
          // Create a gradient color
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(0, 105, 100, 0.7)");
          gradient.addColorStop(1, "rgba(0, 105, 100, 0.3)");
          return gradient;
        },
        borderColor: "#006944",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0, 105, 100, 0.5)",
        hoverBorderColor: "#004d40",
      },
    ],
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-full mx-auto">
      <Bar
        data={chartData}
        options={options}
        style={{ margin: "24px 0px", maxWidth: "900px", maxHeight: "500px" }}
      />
    </div>
  );
}

function PieChart({ data }) {
    let labels = Object.keys(data);
    let values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: '# of Products',
                data: values,
            }
        ]
    }
    return (
        <Doughnut
            data={chartData}
            style={{ margin: '24px 0px', maxHeight: '400px', maxWidth: '400px' }}
        />
    )
}