import React, { useState, useEffect, useRef } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { getCatelogry } from '../../../../../../service/catelogry/catelogry.service';
import LoadingCatelogry from '../../Loading/LoadingCatelogry';

function TaskCatelogry() {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(null); // Dùng để theo dõi submenu đang mở
  const dropdownRef = useRef(null); // Sử dụng ref để tham chiếu đến dropdown
  const [cateloriesDad, setCatelories] = useState([]);


  useEffect(() => {
    const getCategoriesDad = async () => {
      const resp = await getCatelogry();
      setCatelories(resp.data.content);
    };
    getCategoriesDad();
  }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = (index) => {
    // Chỉ mở submenu khi nó chưa được mở, nếu đã mở thì đóng nó đi
    setSubMenuOpen(subMenuOpen === index ? null : index); 
  };

  const handleClickOutside = (event) => {
    // Nếu click ngoài dropdown thì đóng dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside); // Cleanup khi component unmount
    };
  }, [isOpen]);


  return (
    <div className='relative' ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="h-[43px] cursor-pointer md:hidden lg:flex bg-[var(--custom-color)] rounded-t-[.5rem] text-white w-[225px] justify-center items-center"
      >
        <div className=" px-[1.5rem] text-[1.5rem] xl:font-semibold">
          Danh mục sản phẩm
        </div>
      </div>

      {isOpen && (
        <div
          className={`absolute z-50 md:hidden lg:block left-0 w-full bg-white shadow-lg rounded-b-[.5rem] transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='w-[100%]'>
            <ul>
              {/* Category "Điện thoại" */}
              <li className='w-[100%] border border-b-[var(--custom-color)] py-[1.2rem] px-[1.5rem]'>
                <button
                  className="text-[1.8rem] flex justify-between items-center w-[100%] relative"
                  onClick={() => toggleSubMenu(0)} // Mở submenu Điện thoại
                >
                  Điện thoại
                  <MdKeyboardArrowRight className="text-[var(--custom-color)]" />
                </button>
                <ul
                  className={`absolute lg:left-[22.5rem] top-[0rem] bg-[white] shadow-lg rounded-b-[.5rem] transition-all duration-300 ease-in-out ${
                    subMenuOpen === 0 ? ' opacity-100' : 'opacity-0'
                  } ${isOpen ? 'lg:block' : 'lg:hidden'}`}
                >
                  {cateloriesDad
                    .filter((item) => item.category_dad === 1)
                    .map((item) => (
                      <li key={item.id} className='w-[100%] border border-b-[var(--custom-color)] py-[1.2rem] px-[3.5rem]'>
                        <NavLink
                          to={`/list-san-pham?category_dad=${item.category_dad}&category=${item.category_id}`}
                          className="text-[1.6rem] text-gray-800 hover:text-[var(--custom-color)] transition-all duration-300"
                        >
                          {item.category_name}
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </li>
              {/* Category "Laptop" */}
              <li className='w-[100%] relative border border-b-[var(--custom-color)] py-[1.2rem] px-[1.5rem]'>
                <button
                  className="text-[1.8rem] flex justify-between items-center w-[100%] relative"
                  onClick={() => toggleSubMenu(1)} // Mở submenu Laptop
                >
                  Laptop
                  <MdKeyboardArrowRight className="text-[var(--custom-color)]" />
                </button>
                {/* Submenu Laptop */}
                <ul
                  className={`absolute lg:left-[22.5rem] top-[0rem] bg-[white] shadow-lg rounded-b-[.5rem] transition-all duration-300 ease-in-out ${
                    subMenuOpen === 1 ? ' opacity-100' : 'opacity-0'
                  } ${isOpen ? 'lg:block' : 'lg:hidden'}`}
                >
                  {cateloriesDad
                    .filter((item) => item.category_dad === 2)
                    .map((item) => (
                      <li key={item.id} className='w-[100%] border border-b-[var(--custom-color)] py-[1.2rem] px-[3.5rem]'>
                        <NavLink
                          to={`/list-san-pham?category_dad=${item.category_dad}&category=${item.category_id}`}
                          className="text-[1.6rem] text-gray-800 hover:text-[var(--custom-color)] transition-all duration-300"
                        >
                          {item.category_name}
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </li>
              {/* Other Menu Item */}
              <li className='w-[100%] border border-b-[var(--custom-color)] py-[1.2rem] px-[1.5rem]'>
                <NavLink to="" className="text-[1.8rem]">Sản phẩm yêu thích</NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCatelogry;