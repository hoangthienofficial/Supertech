import React, { useState, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Input, Badge } from "antd";
import { useSpring, animated } from "react-spring";
import TaskHeaderMb from "../Menu/Modal/TasKHeaderMb";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../../redux/hooks";
import { Paths } from "../../../../../router/component/RouterValues";

function HeaderMobile(props) {
  const [isInputVisible, setInputVisible] = useState(false);
  const [isvisibleHeaderMB, setisvisibleHeaderMB] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const listCart = useAppSelector((state) => state.cart.listCart);

  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement | null>(null); // Reference for sidebar
  const backdropRef = useRef<HTMLDivElement | null>(null); // Reference for backdrop

  const handleIconClick = () => {
    setInputVisible(prev => !prev); // Toggle input visibility
  };

  const onSearch = (value: string) => {
    if (value !== "") {
      navigate(`/tim-kiem?tukhoa=${value}`); // Redirect to search results page
    }
  };

  // Animation for sliding in the sidebar
  const slideInAnimation = useSpring({
    transform: isvisibleHeaderMB ? 'translateX(0%)' : 'translateX(-100%)',
    opacity: isvisibleHeaderMB ? 1 : 0,
  });

  const handleClickOutside = (e: React.MouseEvent) => {
    // Close sidebar when clicking outside of the sidebar or the backdrop
    if (backdropRef.current && !backdropRef.current.contains(e.target as Node) && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
      setisvisibleHeaderMB(false); // Close sidebar if click is outside
    }
  };

  return (
    <div>
      <div className="md:hidden sm:shadow-xl flex justify-center items-center">
        <div className="w-[95%] m-auto">
          <div className="flex items-center justify-between bg-white py-[1rem]">
            {/* Hamburger Menu */}
            <div
              className="text-[2rem] cursor-pointer"
              onClick={() => setisvisibleHeaderMB(!isvisibleHeaderMB)}
            >
              <FaBars />
            </div>

            {/* Logo */}
            <h3 className="text-[2.5rem] cursor-pointer"
            onClick={()=>{navigate("/")}}
            >SuperTech</h3>

            {/* Search and Cart */}
            <div className="text-[2.5rem] flex items-center gap-2 relative">
              {/* Search Icon */}
              <IoIosSearch
                className="cursor-pointer"
                onClick={handleIconClick} // Toggle input visibility on click
              />
              {/* Show input when isInputVisible is true */}
              {isInputVisible && (
                <div className="absolute top-full right-0 bg-white shadow-lg p-2 rounded-md">
                  <form className="w-[300px] h-[38px]">
                    <Input.Search
                      placeholder="Tìm kiếm sản phẩm"
                      onSearch={onSearch}
                      enterButton
                      className="inputSearch"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                    />
                  </form>
                </div>
              )}

              {/* Shopping Cart */}
              
              <Badge
                                        count={listCart?.length || 0}

              showZero>
                <MdOutlineShoppingBag
                  className="text-[2.5rem] cursor-pointer text-[#7500CF]"
                  onClick={() => {
                    navigate(`${Paths.Cart}`)
                  }}
                />
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      {isvisibleHeaderMB && (
        <div className={`fixed top-0 w-[100%] z-30`} onClick={handleClickOutside}>
          <div
            ref={backdropRef}
            className="w-full h-full bg-[rgba(0,0,0,0.5)]"
          >
            <animated.div style={slideInAnimation} ref={sidebarRef}>
              <TaskHeaderMb onClose={() => setisvisibleHeaderMB(false)} />
            </animated.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderMobile;
