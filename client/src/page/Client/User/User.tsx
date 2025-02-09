import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Container } from '../../../components/Style/Container';
import { FaEdit } from "react-icons/fa";
import { CiHeart, CiUser } from "react-icons/ci";
import { IoMdExit } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { IMG_BACKEND_USER } from '../../../constants';
import { Paths } from '../../../router/component/RouterValues';
import { TpayloadUser } from '../../../service/user/user.type';
import { setLogin, setToken } from '../../../redux/user/user.slice';
import toast from 'react-hot-toast';

function User() {
  const navigate = useNavigate();
  const location = useLocation();
  const user: TpayloadUser  | null = useAppSelector((state) => state.user.user);
  
  // Điều hướng mặc định về trang Tài khoản
  useEffect(() => {
    const defaultPath = Paths.Profile; // Đường dẫn mặc định
    const allowedPaths = [
      Paths.Profile,
      '/don-hang-cua-ban',
      '/tin-nhan',
      '/yeu-thich',
      '/thoat',
    ]; // Các đường dẫn hợp lệ

    if (!allowedPaths.includes(location.pathname)) {
      navigate(defaultPath); // Điều hướng đến Tài khoản nếu đường dẫn không hợp lệ
    }
  }, [location.pathname, navigate]);

  // Kiểm tra trang hiện tại có active hay không
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Hàm xử lý điều hướng
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  const dispatch=useAppDispatch()
  const logout=()=>{
    dispatch(setToken(null))
    toast.success('Đăng xuất thành công!');
    navigate(`${Paths.Login}`)
    dispatch(setLogin(false))

  }
  return (
    <Container className="pt-[1rem]">
      <div className="flex flex-col lg:flex-row justify-between flex-wrap">
        {/* Sidebar */}
        <div className="w-full lg:w-[25%] p-[2rem] bg-white h-[100%] rounded-xl shadow-md">
          <div className="flex gap-[1rem]">
            {/* Ảnh hoặc ký tự đầu của người dùng */}
            <div className="w-[7rem] h-[7rem] rounded-[50%] overflow-hidden">
              <div
                className={`flex text-[2.5rem] h-[7rem] w-full items-center justify-center rounded-full ${
                  user?.user_image
                    ? "bg-cover bg-center bg-no-repeat"
                    : "bg-[#F62682] text-[16px] text-white"
                }`}
                style={{
                  backgroundImage: user?.user_image
                    ? `url(${IMG_BACKEND_USER}/${user.user_image})`
                    : "none",
                }}
              >
                {(!user?.user_image && user?.user_name) ? user?.user_name[0].toUpperCase() : null}
              </div>
            </div>
            {/* Tên và nút chỉnh sửa */}
            <div className="mt-[.5rem]">
              <h3 className="text-[1.8rem] md:text-[2rem]">{user?.user_name}</h3>
              <div className="flex text-[1.6rem] md:text-[1.8rem] py-[.6rem] text-customColor">
                <FaEdit />
                <p>Chỉnh sửa</p>
              </div>
            </div>
          </div>

          {/* Menu điều hướng */}
          <ul className="mt-[3rem] rounded-[10px] ">
            <div
              onClick={() => handleNavigation(Paths.Profile)}
              className={`flex gap-[.5rem] text-[1.6rem] md:text-[1.9rem] px-[1rem] py-[.9rem] cursor-pointer border rounded-lg ${
                isActive(Paths.Profile)
                  ? 'border-customColor bg-customColor text-white'
                  : 'border-customColor'
              }`}
            >
              <CiUser className="font-medium" />
              <div>Tài khoản</div>
            </div>
            <div
              onClick={() => handleNavigation('/don-hang-cua-ban')}
              className={`flex gap-[.5rem] text-[1.6rem] md:text-[1.9rem] px-[1rem] py-[.9rem] cursor-pointer border rounded-lg ${
                isActive('/don-hang-cua-ban')
                  ? 'border-customColor bg-customColor text-white'
                  : 'border-customColor'
              }`}
            >
              <FaEdit />
              <div>Đơn mua</div>
            </div>
            <div
              onClick={() => handleNavigation('/tin-nhan')}
              className={`flex gap-[.5rem] text-[1.6rem] md:text-[1.9rem] px-[1rem] py-[.9rem] cursor-pointer border rounded-lg ${
                isActive('/tin-nhan')
                  ? 'border-customColor bg-customColor text-white'
                  : 'border-customColor'
              }`}
            >
              <FiMessageSquare />
              <div>Tin nhắn</div>
            </div>
            <div
              onClick={() => handleNavigation('/san-pham-yeu-thich')}
              className={`flex gap-[.5rem] text-[1.6rem] md:text-[1.9rem] px-[1rem] py-[.9rem] cursor-pointer border rounded-lg ${
                isActive('/yeu-thich')
                  ? 'border-customColor bg-customColor text-white'
                  : 'border-customColor'
              }`}
            >
              <CiHeart />
              <div>Yêu thích</div>
            </div>
            <div
              onClick={() =>logout()}
              className="rounded-t rounded-[10px] flex gap-[.5rem] text-[1.9rem] px-[1rem] py-[.9rem] cursor-pointer border border-customColor"
            >
              <IoMdExit />
              <div>Đăng xuất</div>
            </div>
          </ul>
        </div>

        {/* Nội dung chính */}
        <div className="w-full lg:w-[73%] p-[1rem] md:p-[2rem] bg-white rounded-xl shadow-md">
          <Outlet />
        </div>
      </div>
    </Container>
  );
}

export default User;
