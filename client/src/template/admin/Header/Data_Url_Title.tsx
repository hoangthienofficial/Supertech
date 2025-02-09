import { ReactNode } from "react";
import { BiBookAlt } from "react-icons/bi";
import { BsBoxes } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { FaChevronRight, FaRegEye, FaRegUserCircle } from "react-icons/fa";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { IoCellularOutline, IoHome, IoSettingsOutline } from "react-icons/io5";
import { LiaUsersCogSolid } from "react-icons/lia";
import { MdBarChart, MdOutlineCategory } from "react-icons/md";
import { PiMessengerLogo, PiUsersThreeThin } from "react-icons/pi";
import { PathAdmin } from "../../../router/component/RouterValues";

export interface Child {
  id_child: number;
  title_child: string;
  url_child: string;
  icon_child: ReactNode;
}

export interface Box {
  box_id: number;
  box_title: string;
  icon: ReactNode;
  iconChevronRight?: ReactNode;
  url: string;
  child?: Child[];
}

export interface SidebarItem {
  id: number;
  title: string;
  box: Box[

  ];
}

export const DataSideBar: SidebarItem[] = [
  {
    id: 1,
    title: 'Quản trị',
    box: [
      {
        box_id: 1,
        box_title: 'Bảng Điều Khiển',
        icon: <IoHome />,
        iconChevronRight: null,
        url: `${PathAdmin.PathsAdmin}/${PathAdmin.Dashboard}`,
        child: [],
      }
    ]
  },
  {
    id: 2,
    title: 'Tổng Quan Danh Mục',
    box: [
      {
        box_id: 1,
        box_title: 'Quản Lí Danh Mục',
        icon: <MdOutlineCategory />,
        iconChevronRight: <FaChevronRight />,
        url: `${PathAdmin.PathsAdmin}/${PathAdmin.Categories}`,
        child: [
          {
            id_child: 1,
            title_child: 'Danh Mục Sản Phẩm',
            url_child:`${PathAdmin.PathsAdmin}/${PathAdmin.Categories}`,
            icon_child: <FaRegEye />,

          },
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Tổng Quan Sản Phẩm',
    box: [
      {
        box_id: 1,
        box_title: 'Quản Lí Sản Phẩm',
        icon: <MdBarChart />,
        iconChevronRight: <FaChevronRight />,
        url: `${PathAdmin.PathsAdmin}/${PathAdmin.Products}`,
        child: [
          {
            id_child: 1,
            title_child: 'Xem Sản Phẩm',
            url_child: `${PathAdmin.PathsAdmin}/${PathAdmin.Products}`,
            icon_child: <FaRegEye />,
          }
     
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Tổng Quan Đơn Hàng',
    box: [
      {
        box_id: 1,
        box_title: 'Quản Lí Đơn Hàng',
        icon: <BsBoxes />,
        iconChevronRight: null,
        url: `${PathAdmin.PathsAdmin}/${PathAdmin.Orders}`,
        child: [],
      }
    ]
  },
  {
    id: 5,
    title: 'Tổng Quan Người Dùng',
    box: [
      {
        box_id: 1,
        box_title: 'Quản Lí Tài Khoản',
        icon: <FaRegUserCircle />,
        iconChevronRight: <FaChevronRight />,
        url: `${PathAdmin.PathsAdmin}/${PathAdmin.Customers}`,
        child: [
          {
            id_child: 1,
            title_child: 'Khách Hàng',
            url_child: `${PathAdmin.PathsAdmin}/${PathAdmin.Customers}`,
            icon_child: <PiUsersThreeThin />
            ,
          },
          {
            id_child: 2,
            title_child: 'Nhân Viên',
            url_child: `${PathAdmin.PathsAdmin}/${PathAdmin.Staff}`,
            icon_child: <LiaUsersCogSolid />,
          }
        ],
      }
    ]
  },
  {
    id: 6,
    title: 'Dịch Vụ',
    box: [
      {
        box_id: 1,
        box_title: 'Tin Nhắn hỗ Trợ',
        icon: <PiMessengerLogo />,
        iconChevronRight: null,
        url: '${PathAdmin.PathsAdmin}/quản-lí-tin-nhắn',
        child: [],
      },
      {
        box_id: 2,
        box_title: 'Bài Viết',
        icon: <BiBookAlt />,
        iconChevronRight: null,
        url: `${PathAdmin.PathsAdmin}/${PathAdmin.Blogs}`,
        child: [],
      },
      {
        box_id: 3,
        box_title: 'Biểu đồ',
        icon: <IoCellularOutline />,
        iconChevronRight: null,
        url: `${PathAdmin.PathsAdmin}/${PathAdmin.Chart}`,
        child: [],
      },
    ]
  }, {
    id: 7,
    title: 'Tác Vụ',
    box: [
      {
        box_id: 1,
        box_title: 'Cài Đặt Website',
        icon: <IoSettingsOutline />,
        iconChevronRight: null,
        url: `${PathAdmin.PathsAdmin}/${PathAdmin.Settings}`,
        child: [],
      },
      {
        box_id: 2,
        box_title: 'Quay về trang chủ',
        icon: <CiLogout />,
        iconChevronRight: null,
        url: `/`,
        child: [],
      },
    ]
  }
];
