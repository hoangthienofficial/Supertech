import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getTopFiveProduct } from '../../../../../service/data/data.service';

function BarChart() {
  const [data, setData] = useState(null); // State to store the chart data
  const [period, setPeriod] = useState('day'); // State to store selected period

  // Fetch data from the API
  const fetchApi = async (selectedPeriod) => {
    try {
      const resp = await getTopFiveProduct({ period: selectedPeriod }); // Call API to fetch data
      const productData = resp.data.content; // Data received from the API

      // Map the data to be displayed on the chart
      const labels = productData.map(item => 
        item.product.product_name.length > 20 
          ? item.product.product_name.substring(0, 20) + '...' 
          : item.product.product_name
      ); // Truncate product name if it exceeds 20 characters

      const totalQuantity = productData.map(item => parseInt(item.total_quantity) || 0); // Total quantity sold, default to 0 if undefined or null

      setData({
        labels,
        datasets: [
          {
            label: 'Số lượng bán',
            data: totalQuantity, // Total quantity data
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when component mounts or when period changes
  useEffect(() => {
    fetchApi(period); // Re-fetch data when the period changes
  }, [period]);

  // If data is not available, show loading message
  if (!data) {
    return <div>Loading...</div>;
  }

  const BarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
    tooltips: {
      callbacks: {
        // Display the full product name when hovering over the bar
        label: function (tooltipItem) {
          const productNameFull = data.content[tooltipItem.index]?.product?.product_name || 'Unknown Product';
          return `${productNameFull}: ${tooltipItem.raw}`;
        },
      },
    },
  };

  return (
    <div className="flex-1 box-border h-[300px]">
      {/* Dropdown to select period */}
      <div className="mb-4">
        <label htmlFor="period" className="mr-2">Chọn thời gian: </label>
        <select 
          id="period" 
          value={period} 
          onChange={(e) => setPeriod(e.target.value)} 
          className="p-2 border rounded"
        >
          <option value="day">Ngày</option>
          <option value="week">Tuần</option>
          <option value="month">Tháng</option>
        </select>
      </div>

      {/* Bar chart */}
      <Bar data={data} options={BarOptions} />
    </div>
  );
}

export default BarChart;
