import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Paths } from "../../../../../../router/component/RouterValues";
import { useAppSelector } from "../../../../../../redux/hooks";
import { setLogin, setToken } from "../../../../../../redux/user/user.slice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { getCatelogry } from "../../../../../../service/catelogry/catelogry.service";
import { MdKeyboardArrowRight } from "react-icons/md";

interface TaskHeaderMbProps {
  onClose: () => void;
}

function TaskHeaderMb({ onClose }: TaskHeaderMbProps) {
  const [showProducts, setShowProducts] = useState(false); // State to control Products menu
  const [subMenuOpen, setSubMenuOpen] = useState<number | null>(null); // State to track which submenu is open
  const [categories, setCategories] = useState<any[]>([]); // Categories fetched from the API
  const [subMenuDad, setSubMenuDad] = useState<number | null>(null); // State to track the submenu for categories like Điện thoại
  const login = useAppSelector((state) => state.user.login);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getCategoriesDad = async () => {
      const resp = await getCatelogry();
      setCategories(resp.data.content);
    };
    getCategoriesDad();
  }, []);

  const logout = () => {
    dispatch(setToken(null));
    toast.success("Đăng xuất thành công!");
    navigate(`${Paths.Login}`);
    dispatch(setLogin(false));
  };

  const toggleSubMenu = (index: number) => {
    if (subMenuOpen === index) {
      setSubMenuOpen(null); // If the same menu is clicked again, close it
    } else {
      setSubMenuOpen(index); // Open new menu
      setSubMenuDad(null); // Close any submenus (like Điện thoại)
    }
  };

  const toggleSubMenuDad = (index: number) => {
    if (subMenuDad === index) {
      setSubMenuDad(null); // Close "Điện thoại" submenu if it's already open
    } else {
      setSubMenuDad(index); // Open "Điện thoại" submenu
      setSubMenuOpen(null); // Close "Sản phẩm" submenu if "Điện thoại" is clicked
    }
  };

  // Filter categories for "Điện thoại" (Phone) and "Laptop" only
  const filteredCategories = categories.filter(
    (category) =>
      category.category_name === "Điện thoại" || category.category_name === "Laptop"
  );

  return (
    <div className="w-[320px] h-[100vh] bg-white flex flex-col px-[2rem]">
      <div className="text-[2rem] cursor-pointer flex justify-center" onClick={onClose}>
        <IoMdClose />
      </div>
      <div className="text-[3rem] text-center border-b border-gray-500 py-[1rem]">
        <h4 className="mb-[1rem]">SuperTech</h4>
      </div>
      <div className="flex-grow">
        <ul>
          <li className="text-[2rem]">
            <div className="border-b border-gray-500 py-[1rem]">
              <NavLink to="/" className="text-[2rem] text-black">
                Trang chủ
              </NavLink>
            </div>
          

            {/* Products Menu */}
            <div
              className=
             {`  ${subMenuOpen === 0 ? '' :"border-b border-gray-500"}   py-[1rem] cursor-pointer`}
              onClick={() => toggleSubMenu(0)} // Toggle product menu
            >
              <span className="text-[2rem] text-black">Sản phẩm</span>
              {subMenuOpen === 0 && (
                <div className=" ">
                  <li className='w-[100%] py-[1.2rem] border-b border-gray-500  px-[1.5rem] text-[1.7rem]'>
                   <NavLink to='/list-san-pham?category_dad=1'> Điện thoại </NavLink>
                    
                  </li>
                  <li className='w-[100%] py-[1.2rem] border-b border-gray-500  px-[1.5rem] text-[1.7rem]'>
                   <NavLink to='/list-san-pham?category_dad=2'> Laptop </NavLink>
                    
                  </li>
                </div>
              )}
            </div>

            <div className="border-b border-gray-500 py-[1rem]">
              <NavLink to="/bai-viet" className="text-[2rem] text-black">
                Bài viết
              </NavLink>
            </div>
            <div className="border-b border-gray-500 py-[1rem]">
              <NavLink to="/lien-he" className="text-[2rem] text-black">
                Liên hệ
              </NavLink>
            </div>
            <div className="border-b border-gray-500 py-[1rem]">
              <NavLink to="/yeu-thich" className="text-[2rem] text-black">
                Yêu thích
              </NavLink>
            </div>
          </li>
        </ul>

        <div className="mt-6">
          <h4 className="text-[1.9rem] py-3">Bạn cần giúp?</h4>
          <div className="text-[1.6rem] py-2">Công Viên Phần Mềm Quang Trung, Tân Chánh Hiệp, Quận 12, Hồ ChÍ Minh, Việt Nam</div>
          <div className="text-[1.6rem] py-2">Email: <b>info@fashionshop.com</b></div>
          <div className="text-[1.6rem] py-2">Phone: <b>1900 6969</b></div>
        </div>
      </div>

      {/* Login button at the bottom */}
      <div className="border-t border-gray-500 w-full px-[1rem] py-[1rem] mt-auto">
        {login ? (
          <div className="text-[1.5rem]">
            Xin chào {user?.user_name}{" "}
            <span className="mx-3">|</span>
            <button onClick={logout}> Đăng xuất</button>
          </div>
        ) : (
          <NavLink to={Paths.Login} className="flex text-[1.7rem] gap-[1rem]">
            <FaRegUser />
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default TaskHeaderMb;
