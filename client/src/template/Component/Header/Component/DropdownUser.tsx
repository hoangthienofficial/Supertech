import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Dropdown } from 'antd';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { getUserThunk, setLogin, setToken } from '../../../../redux/user/user.slice';
import { IMG_BACKEND, IMG_BACKEND_USER } from '../../../../constants';
import toast from 'react-hot-toast';
import { RouterLogin } from '../../../../router/router.config';
import { useAvatar } from '../../../../hooks/UseAvatar.hook';
import { PathAdmin, Paths } from '../../../../router/component/RouterValues';

function DropdownUser() {
  const dispatch = useAppDispatch();
  const user: any = useAppSelector((state) => state.user.user);
  const login: any = useAppSelector((state) => state.user.login);
  const { avatarStyle, avatarText } = useAvatar({
    userImage: user?.user_image ? `${IMG_BACKEND_USER}/${user.user_image}` : null,
    userName: user?.user_name,
  });
  const navigate=useNavigate()
  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  // Check if the token exists in local storage
  const token = useAppSelector((state)=>state.user.token)
  const logout=()=>{
    dispatch(setToken(null))
    toast.success('Đăng xuất thành công!');
    navigate(`${Paths.Login}`)
    dispatch(setLogin(false))

  }
  const items = [
    {
      key: "1",
      label: login ? (
        <NavLink to={`${Paths.Profile}`}>Trang cá nhân</NavLink>
      ) : (
        <NavLink to={`${Paths.Login}`}>Đăng nhập</NavLink>
      ),
    },
    {
      key: "2",
      label: login ? (
        <button onClick={()=>{logout()}}>Đăng xuất</button>
      ) : (
        <NavLink to={`${Paths.Register}`}>Đăng Kí</NavLink>
      ),
    },
    user?.role === "ADMIN"
      ? { key: "3", label: <NavLink to={`${PathAdmin.PathsAdmin}/${PathAdmin.Dashboard}`}>Quản trị</NavLink> }
      : null,
  ].filter(Boolean); // Remove null entries from items array

  return (
    <div className='dropUserCustom'>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
        arrow
        trigger={["click"]}
      >
        <Button
          className="flex xl:h-[40px] md:h-[3rem] items-center xl:gap-3 md:gap-2 md:rounded-[1.5rem] xl:rounded-[3rem] DropDown"
        >
          <FaBars />
          <div className="xl:text-[25px] md:text-[2rem]">
         
          {login ? (
  <div
    className="flex h-12 w-12 items-center justify-center rounded-full"
    style={avatarStyle}
  >
    <div className="text-[1.7rem] leading-none text-center">
      {avatarText}
    </div>
  </div>
) : (
  <FaUserCircle />
)}
    </div>

        </Button>
      </Dropdown>
    </div>
  );
}

export default DropdownUser;
