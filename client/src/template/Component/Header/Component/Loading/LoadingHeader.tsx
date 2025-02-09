import { Menu, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import TaskCatelogry from '../Menu/Modal/TaskCatelogry';
import LoadingCatelogry from './LoadingCatelogry';
import LoadingMenu from './LoadingMenu';
import LoadingHeaderMB from './LoadingHeaderMB';

function LoadingHeader() {
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
  return (
    <div className="bg-white">
      <div className="flex flex-col relative">
        <div className="w-[100%] h-[35px] color-custom text-white flex justify-center items-center">
         
<div className="w-[80%] m-auto flex md:justify-between sm:justify-center items-center">
<Skeleton 
    active 
    title={{ width: '50%' }} // Điều chỉnh chiều rộng của title
    paragraph={false} // Không hiển thị đoạn văn bản
    
  >
    <h3 className="text-[1.5rem] font-medium sm:text-center">
      Chào mừng đến với cửa hàng SuperTech
    </h3>
  </Skeleton>
  <div className="gap-[1.2rem] sm:hidden md:flex">
    <div className="flex justify-center items-center gap-[.5rem] text-[1.4rem]">
      <Skeleton.Input active size="small" style={{ width: 100 }} />
    </div>
    <div className="flex justify-center items-center gap-1 text-[1.4rem]">
      <Skeleton.Input active size="small" style={{ width: 120 }} />
    </div>
    <div className="flex justify-center items-center gap-1 text-[1.4rem]">
      <Skeleton.Input active size="small" style={{ width: 80 }} />
    </div>
    <div className="flex justify-center items-center gap-1 text-[1.4rem]">
      <Skeleton.Input active size="small" style={{ width: 100 }} />
    </div>
  </div>
</div>
        </div>
  

        <div className="xl:w-[80%] xmd:w-[90%] sm:w-[95%] m-auto sm:hidden md:block">
  <div className="flex justify-between items-center w-[100%] md:h-[5rem] lg:h-[75px]">
    {/* Logo */}
    <div className="md:text-[2.5rem] xl:text-[3.2rem] font-semibold">
      <Skeleton
        active
        title={{ width: '250px' }} // Chiều rộng của Skeleton cho logo
        paragraph={false}
      >
        SuperTech
      </Skeleton>
    </div>

    {/* Search bar */}
    <div className="flex justify-between items-center">
  <div className="2xl:w-[70%]     lg:w-[60%] md:w-[50%]">
    <Skeleton.Input
      active
      size="large"
      style={{ width: '100%', height: '38px' }}
    />
  </div>
</div>


    {/* Right-hand icons */}
    <div className="flex gap-[1rem]">
      {/* Wishlist */}
      <div>
        <Skeleton.Avatar active size="large" shape="circle" />
      </div>
      {/* Cart */}
      <div>
        <Skeleton.Avatar active size="large" shape="circle" />
      </div>
      {/* Language */}
      <div>
        <Skeleton.Avatar active size="large" shape="circle" />
      </div>
      <div>
        <Skeleton.Avatar active size="large" shape="circle" />
      </div>
    </div>
  </div>
</div>
{scrollY ? (
          <div className="w-[100%] py-2  border border-t-purple-200 ">
            <div
              className="
      
      md:flex items-center lg:justify-start xl:justify-between md:justify-center w-[80%] m-auto sm:hidden
      "
            >
               <LoadingCatelogry/>

              <div className="flex justify-center items-center lg:ml-[10rem] xl:ml-0 md:py-5 xl:py-0">
                <LoadingMenu/>
              </div>
              <div className=" md:hidden xl:flex text-[1.6rem] text-[#FF0000] font-semibold">
              <Skeleton active title={{ width: 200 }} paragraph={false}>
          <span className="text-[1.6rem] text-[#FF0000] font-semibold">
            Miễn phí vận chuyển trên 25 triệu
          </span>
        </Skeleton>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
          {/* Overlay */}

          {/* Menu di động với hiệu ứng trượt */}
          <div
            
          >
            <div className="w-[100%] py-2  border border-t-purple-200">
              <div
                className="
    
    md:flex items-center lg:justify-start xl:justify-between md:justify-center w-[80%] m-auto sm:hidden"
              >
                <LoadingCatelogry/>

                <div className="flex justify-center items-center lg:ml-[5rem] xl:ml-0 md:py-5 xl:py-0">
                  <LoadingMenu/>
                </div>
                <div className="flex gap-[1rem] items-center">
              
                </div>
              </div>
              <div className="md:hidden">
           

              </div>
            </div>
          </div>
        </div>
        )}
          {/* <HeaderMobile props='fixed'/> */}
  <LoadingHeaderMB/>
      </div>
    </div>
  );
}

export default LoadingHeader