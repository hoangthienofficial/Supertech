import React, { useEffect } from 'react';
import { FaRegBell } from 'react-icons/fa';
import { FaCloudMoon } from 'react-icons/fa6';
import { HiMenuAlt1 } from 'react-icons/hi';
import { IoIosSearch, IoMdSettings } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../../../redux/admin/component/ToggleSliceBar';
import { RiAddLargeLine } from 'react-icons/ri';
import { Popover, Badge, List } from 'antd';
import { LuUser2 } from 'react-icons/lu';
import { IoSettingsOutline } from 'react-icons/io5';
import type { RootState } from '../../../redux/store';
import { useAppSelector } from '../../../redux/hooks';
import { setNofiReducer } from '../../../redux/admin/component/Nofi';
import { IMG_BACKEND_USER } from '../../../constants';

function AdminHeader() {
  const dispatch = useDispatch();
  const nofiList = useAppSelector((state) => state.nofi.isNofi);
  const socket = useAppSelector((state) => state.socket.socket);
  const user=useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (socket) {
      socket.on('low_stock_warning', (post: any) => {
        const updatedNofiList = [post, ...nofiList];
        dispatch(setNofiReducer(updatedNofiList));
      });
    }

    return () => {
      if (socket) {
        socket.off('low_stock_warning');
      }
    };
  }, [socket, nofiList, dispatch]);

  const isOpen = useSelector((state: RootState) => state.toggleSidebar.isOpen);

  // Xử lý khi nhấp vào thông báo
  const handleNotificationClick = (index: number) => {
    const updatedNofiList = nofiList.filter((_, i) => i !== index);
    dispatch(setNofiReducer(updatedNofiList));
  };

  const notificationContent = (
    <div className="max-h-[250px] w-[300px] overflow-auto">
      <List
        itemLayout="horizontal"
        dataSource={nofiList}
        renderItem={(item, index) => (
          <List.Item
            className="cursor-pointer hover:bg-gray-100 transition"
            onClick={() => handleNotificationClick(index)} // Xóa thông báo khi nhấp
          >
            <List.Item.Meta
              title={<span className="font-medium text-[14px]">{item.title || 'Thông báo'}</span>}
              description={<span className="text-[12px] text-gray-500">{item.description || 'Nội dung thông báo'}</span>}
            />
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <div className="text-[#000000] text-[20px] grid grid-cols-2 auto-rows-[75px]">
      <div className="px-[30px] text-[25px] flex items-center opacity-[25%]">
        <div onClick={() => dispatch(toggle())}>
          {isOpen ? 
          <HiMenuAlt1 /> 
          : 
          <RiAddLargeLine className="rotate-45 text-red-600 font-bold" />}
        </div>
      </div>
      <div className="flex gap-[40px] justify-end px-[38px] items-center">
        <IoIosSearch className="opacity-[25%]" />
        <FaCloudMoon className="opacity-[25%]" />
        <div className="relative flex items-center">
          <Popover
            content={notificationContent}
            title={<span className="font-semibold text-[14px]">Thông Báo</span>}
            trigger="click"
          >
            <Badge count={nofiList.length} offset={[-5, 5]}>
              <FaRegBell className="text-[20px] cursor-pointer text-[#555]" />
            </Badge>
          </Popover>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-[55px] h-[55px] relative flex justify-center items-center">
            <span className="w-[8px] h-[8px] absolute bg-green-400 rounded-full mt-12 ml-14"></span>
            <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
               {user?.user_image ? (
                                 <img
                                   className="rounded-full object-cover"
                                   src={`${IMG_BACKEND_USER}/${user?.user_image}`}
                                   alt={user?.user_name} // Đảm bảo rằng alt chỉ là một chuỗi (tên người dùng)
                                   style={{ width: 40, height: 40 }}
                                 />
                               ) : (
                                 <div
                                   className="rounded-full flex items-center justify-center"
                                   style={{
                                     width: 50,
                                     height: 50,
                                     backgroundColor: 'black',
                                     color: 'white',
                                     fontSize: '18px',
                                   }}
                                 >
                                   {user?.user_name ? user?.user_name.charAt(0).toUpperCase() : '?'} {/* Hiển thị chữ cái đầu tiên từ tên người dùng */}
                                 </div>
                               )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 text-[10px] font-semibold">
            <span className="text-[1rem] text-[#e6cb33]">Admin</span>
            <span className="font-medium text-[1.2rem] text-[#ae00ffdf]">{user?.user_name}</span>
          </div>
        </div>
        <Popover placement="bottomRight" content={<div>Cài đặt tài khoản</div>}>
          <IoMdSettings className="opacity-[25%]" />
        </Popover>
      </div>
    </div>
  );
}

export default AdminHeader;
