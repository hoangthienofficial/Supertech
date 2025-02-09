import { ReactNode } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaUserFriends, FaUsers } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { MdAreaChart, MdOutlineStackedLineChart, MdShowChart } from "react-icons/md";
import { PiCodesandboxLogoDuotone } from "react-icons/pi";
import { TbChartBubbleFilled } from "react-icons/tb";

export interface BoxPageHome{
    id_box_page_home: number;
    title_box_page_home:string;
    total_box_page_home:number;
    icon_box_page_home:ReactNode;
    symbol:string | ReactNode;

}


export const DataPageHome:BoxPageHome[] = [
    {
        id_box_page_home: 1,
        title_box_page_home: "Khách Hàng Mới",
        total_box_page_home:350,
        icon_box_page_home:<IoStatsChart />,
        symbol:<MdShowChart />


    },
    {
        id_box_page_home: 2,
        title_box_page_home: "Tổng Doanh Thu",
        total_box_page_home:3000000,
        icon_box_page_home:<MdAreaChart />,
        symbol:"VNĐ"
    },
    {
        id_box_page_home: 3,
        title_box_page_home: "Đơn Hàng",
        total_box_page_home:3500,
        icon_box_page_home:<MdOutlineStackedLineChart /> ,
        symbol:<MdShowChart />


    },
    {
        id_box_page_home: 4,
        title_box_page_home: "Tổng Khách Hàng",
        total_box_page_home:1280,
        icon_box_page_home:<FaUsers />,
        symbol:<FaUserFriends />
    },
    {
        id_box_page_home: 5,
        title_box_page_home: "Khách Hàng Online",
        total_box_page_home:12,
        icon_box_page_home:<TbChartBubbleFilled />,
        symbol:""
    },{
        id_box_page_home: 6,
        title_box_page_home: "Tổng Sản Phẩm",
        total_box_page_home:120,
        icon_box_page_home:<AiOutlineProduct />,
        symbol:<PiCodesandboxLogoDuotone />


    }
]

export const Box: React.FC<BoxPageHome> = ({
    id_box_page_home = 0, // Giá trị mặc định
    title_box_page_home = "Tiêu đề mặc định",
    total_box_page_home = 0,  // Nếu không truyền, mặc định là 0
    icon_box_page_home = null,
    symbol = "",
}) => {
    return (
        <div className='bg-[white] flex items-start gap-[12px] px-[16px] py-[20px] rounded-xl'>
            <div className='w-[48px] h-[48px] min-w-[48px] flex justify-center items-center rounded-full linear-gradient box-shadow text-white'>
                <span className='text-[32px]'>{icon_box_page_home}</span>
            </div>
            <div className='text-[14px] font-medium flex flex-col gap-[8px]'>
                <p className='text-[#7c7c7c62]'>{title_box_page_home}</p>
                <div className='text-[24px] flex items-center gap-4 font-semibold leading-[1.4] text-[#FFD700]'>
                    {/* Kiểm tra và hiển thị tiền hoặc thông báo "Chưa có dữ liệu" */}
                    {total_box_page_home > 0 
                        ? Number(total_box_page_home).toLocaleString("vi")
                        : "Chưa có dữ liệu"} 
                    {symbol === '' 
                        ? <div className='w-[12px] h-[12px] bg-[#26ff26] rounded-full'></div> 
                        : symbol}
                </div>
            </div>
        </div>
    );
};
  
