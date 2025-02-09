import Search from "antd/es/input/Search";
import  { useEffect, useState } from "react";
import "./Header.css";
import { Badge } from "antd";
import {  FaRegHeart } from "react-icons/fa";
import { MdLanguage, MdOutlineShoppingBag } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import Menu from "./Component/Menu/Menu";
import { CiLocationOn } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import TaskCatelogry from "./Component/Menu/Modal/TaskCatelogry";
import { useSpring, animated } from "react-spring";
import DropdownUser from "./Component/DropdownUser";
import { useAppSelector } from "../../../redux/hooks";
import "./modalUserCustom.css";
import HeaderMobile from "./Component/Mobile/HeaderMB";
import LoadingHeader from "./Component/Loading/LoadingHeader";
import TaskCart from "./Component/Menu/Modal/TaskCart";
import { timeLoading } from "../../../constants";
function Header() {
  const navigate = useNavigate();

  const onSearch = (value: string) => {
    if (value != "") {
      navigate(`/tim-kiem?tukhoa=${value}`);
    }
  };
 
  // cuộn xuống
  const [scrollY, setScrollY] = useState(true);

  // Theo dõi cuộn xuống
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrollY(false); // Thanh điều hướng cuộn ra ngoài
      } else {
        setScrollY(true); // Thanh điều hướng cuộn lại vị trí ban đầu
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const listProductFavourites = useAppSelector(
    (state) => state.listProductFavorites.listFavourite
  );
  const [isInputVisible, setInputVisible] = useState(false);

  const handleIconClick = () => {
    setInputVisible(!isInputVisible);
  };
  // useEffect(() => {
  //   dispatch(getFavouriteProductThunk());
  // }, [dispatch]);
  // hieu ung
  const [isvisibleHeaderMB, setisvisibleHeaderMB] = useState(false);
  const [isvisibleCart, setisvisibleCart] = useState(false);
  const slideDownAnimation = useSpring({
    transform: scrollY ? "translateY(-100%)" : "translateY(0%)",
    opacity: scrollY ? 0 : 1,
    config: { tension: 200, friction: 20, duration: 500 },
  });

  const slideInAnimation = useSpring({
    transform: isvisibleHeaderMB ? "translateX(0%)" : "translateX(-100%)",
    opacity: isvisibleHeaderMB ? 1 : 0,
  });

  const slideInAnimationCart = useSpring({
    transform: isvisibleCart ? "translateX(0%)" : "translateX(100%)",
    opacity: isvisibleCart ? 1 : 0,
  });
  //


  const listCart = useAppSelector((state) => state.cart.listCart);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), timeLoading)
  }, []);

  if (isLoading) {
    return <LoadingHeader/> 
  }
  const closeCart = () => {
    setisvisibleCart(false);
  };
 
  return (
    <div className="bg-white">
      <div className="flex flex-col relative">
        <div className="w-[100%] h-[35px] color-custom text-white flex justify-center items-center">
          <div className="w-[80%] m-auto flex md:justify-between sm:justify-center items-center">
            <h3 className="text-[1.5rem] font-medium sm:text-center">
              Chào mừng đến với cửa hàng SuperTech
            </h3>
            <div className="gap-[1.2rem] sm:hidden md:flex">
              <div className="flex justify-center items-center gap-[.5rem] text-[1.4rem]">
                <CiLocationOn className="text-[1.4rem]" />
                <span>Địa điểm</span>
              </div>
              <div className="flex justify-center items-center gap-1 text-[1.4rem]">
                <CiLocationOn className="text-[1.4rem]" />
                <span>Tra cứu hóa đơn</span>
              </div>
              <div className="flex justify-center items-center gap-1 text-[1.4rem]">
                <CiLocationOn className="text-[1.4rem]" />
                <span>Cửa hàng</span>
              </div>
              <div className="flex justify-center items-center gap-1 text-[1.4rem]">
                <FaRegUser className="text-[1.4rem]" />
                <span>Tài khoản</span>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:w-[80%] xmd:w-[90%] sm:w-[95%] m-auto sm:hidden md:block">
          <div className="flex justify-between items-center w-[100%] md:h-[5rem] lg:h-[75px]">
            <div className="md:text-[2.5rem] xl:text-[3.2rem] font-semibold"
                        onClick={()=>{navigate("/")}}

            >
              SuperTech
            </div>
            <div className="2xl:w-[70%] lg:w-[60%] md:w-[50%]">
              <form className="w-[100%] h-[38px]">
                <Search
                  placeholder="Tìm kiếm sản phẩm"
                  onSearch={onSearch}
                  enterButton
                  className="inputSearch"
                />
              </form>
            </div>
            <div className="flex gap-[1rem]">
              <div></div>
              <div>
                <NavLink to={"/san-pham-yeu-thich"}>
                  <Badge count={listProductFavourites?.length || 0} showZero>
                    <FaRegHeart className="xl:text-[2.4rem]  md:text-[2rem] text-[var(--custom-color)]" />
                  </Badge>
                </NavLink>
              </div>
              <div className="cursor-pointer">
                <Badge
                  count={listCart?.length || 0}
                  showZero
                  onClick={() => setisvisibleCart(!isvisibleCart)}
                >
                  <MdOutlineShoppingBag className="xl:text-[2.6rem]  md:text-[2rem] text-[var(--custom-color)]" />
                </Badge>
                {isvisibleCart && (
                  <div className="fixed inset-0 z-30">
                    <div
                      className="w-full h-full bg-[rgba(0,0,0,0.5)]"
                      onClick={() => setisvisibleCart(false)}
                    >
                      {" "}
                      <animated.div style={slideInAnimationCart}>
                        <TaskCart onClose={() => setisvisibleCart(false)} />
                      </animated.div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <MdLanguage className="xl:text-[2.5rem]  md:text-[2rem] text-[var(--custom-color)]" />
              </div>
            </div>
            <DropdownUser />
          </div>
        </div>
        {scrollY ? (
          <div className="w-[100%] py-2  border border-t-purple-200 ">
            <div
              className="
      
      md:flex items-center lg:justify-start xl:justify-between md:justify-center w-[80%] m-auto sm:hidden
      "
            >
              <TaskCatelogry />

              <div className="flex justify-center items-center lg:ml-[10rem] xl:ml-0 md:py-5 xl:py-0">
                <Menu />
              </div>
              <div className=" md:hidden xl:flex text-[1.6rem] text-[#FF0000] font-semibold">
                Miễn phí vận chuyển trên 25 triệu
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            {/* Overlay */}

            {/* Menu di động với hiệu ứng trượt */}
            <animated.div
              style={{
                ...slideDownAnimation,
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 20,
                backgroundColor: "#fff", // Thêm màu nền cho thanh điều hướng
              }}
            >
              <div className="w-[100%] py-2  border border-t-purple-200">
                <div
                  className="
      
      md:flex items-center lg:justify-start xl:justify-between md:justify-center w-[80%] m-auto sm:hidden"
                >
                  <TaskCatelogry />

                  <div className="flex justify-center items-center lg:ml-[5rem] xl:ml-0 md:py-5 xl:py-0">
                    <Menu />
                  </div>
                  <div className="flex gap-[1rem] items-center">
                    <div className="flex gap-[1rem]">
                      <div>
                      </div>
                      <NavLink to={"/san-pham-yeu-thich"}>
                        <Badge
                          count={listProductFavourites?.length || 0}
                          showZero
                        >
                          <FaRegHeart className="xl:text-[2.4rem]  md:text-[2rem] text-[var(--custom-color)]" />
                        </Badge>
                      </NavLink>
                      <div className="cursor-pointer">
                        <Badge
                          count={listCart?.length || 0}
                          showZero
                          onClick={() => setisvisibleCart(!isvisibleCart)}
                        >
                          <MdOutlineShoppingBag className="xl:text-[2.6rem]  md:text-[2rem] text-[var(--custom-color)]" />
                        </Badge>
                        {isvisibleCart && (
                          <div className="fixed inset-0 z-30">
                            <div
                              className="w-full h-full bg-[rgba(0,0,0,0.5)]"
                              onClick={() => setisvisibleCart(true)}
                            >
                              {" "}
                              <animated.div style={slideInAnimationCart}>
                                <TaskCart
                                  onClose={() => setisvisibleCart(false)}
                                />
                              </animated.div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <MdLanguage className="xl:text-[2.5rem]  md:text-[2rem] text-[var(--custom-color)]" />
                      </div>
                    </div>
                    <DropdownUser />
                  </div>
                </div>
                <div className="md:hidden">
                <HeaderMobile props='absolute'/>

                </div>
              </div>
            </animated.div>
          </div>
        )}
        {/* fixed bg-white z-[1000] */}

        {/* mobile */}
        
          <HeaderMobile props='fixed'/>
       
        
  
      </div>
    </div>
  );
}

export default Header;