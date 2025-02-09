import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { DatePicker, Select } from 'antd';
import { TbPlayerTrackNextFilled } from 'react-icons/tb';
import { getOrderRevenue } from '../../../../../service/data/data.service';

const { RangePicker } = DatePicker;
const { Option } = Select;

function LineChart() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [changePercent, setChangePercent] = useState(0);
  const [timeUnit, setTimeUnit] = useState('days');
  const [data, setData] = useState({ labels: [], sales: [] });

  const fetchApi = async (startDate, endDate, period) => {
    try {
      const response = await getOrderRevenue({ startDate, endDate, period });
      const results = response.data.data;
  
      let labels = [];
      let sales = [];
  
      if (period === 'days') {
        // Handle daily data
        labels = results.map((item) => item.date);
        sales = results.map((item) => Number(item.totalRevenue));
      }  else if (period === 'week') {
        // Handle weekly data
        labels = results.map((week) => `Tuần ${week.week}`);
        sales = results.map((week) => {
          // Sum the revenue for all days within a week
          return week.days.reduce((sum, day) => sum + Number(day.revenue), 0);
        });
      } else if (period === 'month') {
        // Handle monthly data
        // We assume there's only one entry for months, based on your example response
        const monthsData = results.map((item) => ({
          label: `Tháng ${item.month}`,
          totalRevenue: item.weeks.reduce((sum, week) => sum + Number(week.totalRevenue), 0), // Sum of weekly revenues
        }));
  
        labels = monthsData.map((item) => item.label);
        sales = monthsData.map((item) => item.totalRevenue);
      }
  
      const newTotalRevenue = sales.reduce((sum, revenue) => sum + revenue, 0);
      const newChangePercent = totalRevenue
        ? ((newTotalRevenue - totalRevenue) / totalRevenue) * 100
        : 0;
  
      setData({ labels, sales });
      setTotalRevenue(newTotalRevenue);
      setChangePercent(newChangePercent.toFixed(1));
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  useEffect(() => {
    const today = new Date(); // Get today's date
    const formattedToday = today.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    const endDate = '2024-12-31'; // Set your fixed end date here
  
    // Default API call for the current date to the fixed end date
  fetchApi(formattedToday, endDate, timeUnit);
  }, [timeUnit]);
  

  const handleDateChange = (dates) => {
    if (!dates) return;
    const [start, end] = dates;
    fetchApi(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'), timeUnit);
  };

  const handleTimeUnitChange = (value) => {
    setTimeUnit(value);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true, grid: { display: false } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="w-full box-border h-full gap-7 flex flex-col xl:flex-row">
      <div className="w-full xl:w-[250px] box-border h-[300px] flex flex-col leading-[40px]">
        <div className="text-[15px] text-[#7c7c7c62]">Tổng Doanh Thu</div>
        <div className="text-[25px] text-[#FFD700]">
          {totalRevenue.toLocaleString()} VNĐ
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="flex gap-5 font-light text-[#24b124] w-[100px] shadow-[#6df3a093] shadow-md h-[100px] bg-[#92f59225] rounded-full items-center justify-center text-[15px]">
            <span className="rotate-[-90deg]">
              <TbPlayerTrackNextFilled />
            </span>
            <span>{changePercent}%</span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 mt-4">
          <Select defaultValue="days" style={{ width: 200 }} onChange={handleTimeUnitChange}>
            <Option value="days">Ngày</Option>
            <Option value="week">Tuần</Option>
            <Option value="month">Tháng</Option>
          </Select>
          <RangePicker
            format="YYYY-MM-DD"
            onChange={handleDateChange}
            picker={timeUnit}
          />
        </div>
      </div>
      <div className="flex-1 box-border h-[300px] w-[300px]">
        <Line
          data={{
            labels: data.labels,
            datasets: [
              {
                label: 'Doanh Thu',
                data: data.sales,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                tension: 0.4,
              },
            ],
          }}
          options={options}
        />
      </div>
    </div>
  );
}

export default LineChart;
