// import React, { useEffect, useState } from 'react';
// import { DatePicker, Select } from 'antd';
// import dayjs from 'dayjs';
// import { getOrderRevenue } from '../../../../service/data/data.service';

// const { RangePicker } = DatePicker;
// const { Option } = Select;

// function GetOrderTotalByDate() {
//   const [data, setData] = useState([]);
//   const [timeUnit, setTimeUnit] = useState('days');

//   const today = dayjs();
//   const fixedEndDate = dayjs('2024-12-31');

//   const fetchApi = async (startDate, endDate, period) => {
//     try {
//       const response = await getOrderRevenue({ startDate, endDate, period });
//       const results = response.data.data;

//       let tableData = [];

//       if (period === 'days') {
//         tableData = results.map((item) => ({
//           label: item.date,
//           revenue: Number(item.totalRevenue),
//         }));
//       } else if (period === 'week') {
//         tableData = results.map((week) => ({
//           label: `Tuần ${week.week}`,
//           revenue: week.days.reduce((sum, day) => sum + Number(day.revenue), 0),
//         }));
//       } else if (period === 'month') {
//         tableData = results.map((item) => ({
//           label: `Tháng ${item.month}`,
//           revenue: item.weeks.reduce((sum, week) => sum + Number(week.totalRevenue), 0),
//         }));
//       }

//       setData(tableData);
//     } catch (error) {
//       console.error('Error fetching revenue data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchApi(today.format('YYYY-MM-DD'), fixedEndDate.format('YYYY-MM-DD'), timeUnit);
//   }, [timeUnit]);

//   const handleDateChange = (dates) => {
//     if (!dates) return;
//     const [start, end] = dates;
//     fetchApi(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'), timeUnit);
//   };

//   const handleTimeUnitChange = (value) => {
//     setTimeUnit(value);
//   };

//   return (
//     <div className="w-full flex flex-col gap-6">
//       <div className="flex gap-4">
//         <Select defaultValue="days" style={{ width: 200 }} onChange={handleTimeUnitChange}>
//           <Option value="days">Ngày</Option>
//           <Option value="week">Tuần</Option>
//           <Option value="month">Tháng</Option>
//         </Select>
//         <RangePicker
//           format="YYYY-MM-DD"
//           onChange={handleDateChange}
//           picker={timeUnit}
//           defaultValue={[today, fixedEndDate]}
//         />
//       </div>
//       {data.length === 0 ? (
//         <div className="text-center text-gray-500 text-lg">Không có dữ liệu</div>
//       ) : (
//         <table className="table-auto border-collapse border border-gray-300 w-full">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 px-4 py-2 bg-gray-100">Thời Gian</th>
//               <th className="border border-gray-300 px-4 py-2 bg-gray-100">Doanh Thu (VNĐ)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, index) => (
//               <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
//                 <td className="border border-gray-300 px-4 py-2">{row.label}</td>
//                 <td className="border border-gray-300 px-4 py-2">{row.revenue.toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default GetOrderTotalByDate;
