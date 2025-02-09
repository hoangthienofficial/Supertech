import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TaskProduct from "./Modal/TaskProduct";
import { Paths } from "../../../../../router/component/RouterValues";

function Menu() {
  const [isProductHovered, setIsProductHovered] = useState(false);
  const [isProductClicked, setIsProductClicked] = useState(false); // State for click

  const handleMouseEnter = () => {
    setIsProductHovered(true); // Set to true on hover
  };

  const handleMouseLeave = () => {
    setIsProductHovered(false); // Set to false when hover leaves
  };

  const handleClick = () => {
    setIsProductClicked(!isProductClicked); // Toggle on click
  };

  return (
    <div>
      <ul className="flex items-center">
        <li className="relative md:mr-6">
          <NavLink
            to={Paths.Home}
            className="text-[1.8rem] md:mr-[2rem] lg:mr-[2rem] xl:mr-[6rem] text-black font-bold hover:text-purple-600 relative"
          >
            Trang chủ
          </NavLink>
        </li>
     
        <li
          className="relative md:mr-6"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick} // Toggle click state
        >
          <div className="text-[1.8rem] md:mr-[2rem] lg:mr-[2rem] xl:mr-[6rem] text-black font-bold hover:text-purple-600 relative">
            Sản phẩm
          </div>
          {/* Display TaskProduct when hovered or clicked */}
          {(isProductHovered || isProductClicked) && (
            <div className="absolute left-0 top-full z-20">
              <TaskProduct />
            </div>
          )}
        </li>
        <li className="relative md:mr-6">
          <NavLink
            to={Paths.Blogs}
            className="text-[1.8rem] md:mr-[2rem] lg:mr-[2rem] xl:mr-[6rem] text-black font-bold hover:text-purple-600 relative"
          >
           Bài viết
          </NavLink>
        </li>
        <li className="relative md:mr-6">
          <NavLink
            to={Paths.Contact}
            className="text-[1.8rem] md:mr-[2rem] lg:mr-[2rem] xl:mr-[6rem] text-black font-bold hover:text-purple-600 relative"
          >
           Liên hệ
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
