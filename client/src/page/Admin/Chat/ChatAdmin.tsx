import React, { useState } from 'react';
import './Chat.css';
import { GoArrowLeft, GoSearch } from 'react-icons/go';
import { HiOutlineEllipsisVertical } from 'react-icons/hi2';
import { LuCheckCheck } from 'react-icons/lu';
import { BsEmojiSmile, BsSendFill } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';
import { Popover } from 'antd';
import { FiUploadCloud } from 'react-icons/fi';
import { IoAddCircle } from 'react-icons/io5';
import { CiFilter } from 'react-icons/ci';

function ChatAdmin() {
  const [inputValue, setInputValue] = useState('');

  function handleEmojiClick(emoji) {
    setInputValue((prev) => prev + emoji.emoji);
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <div className='grid bg-[#f2edf3] box-border lg:grid-cols-[30%_1fr] sm:grid-cols-1 h-auto p-[24px]'>
      <div className='flex flex-col p-[24px] gap-[20px] box-shadow rounded-lg linear-gradient h-full text-white'>
        <div className='flex flex-col gap-6'>
          <div className='flex font-bold text-3xl justify-between items-center'>
            <span>Tin nhắn</span>
            <div className='flex gap-4'>
              <IoAddCircle className='text-white text-3xl' />
              <HiOutlineEllipsisVertical className='text-white text-3xl' />
            </div>
          </div>
          <div className='bg-gray-200 rounded-md overflow-hidden flex text-xl justify-between'>
            <input
              type="text"
              placeholder='Tìm kiếm người dùng'
              className='bg-transparent text-xl p-4 flex-1 outline-none text-white' />
            <div className='w-16 h-16 flex justify-center items-center rounded-md'>
              <GoSearch className='text-white text-3xl' />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='text-3xl font-semibold'>Đang hoạt động</div>
          <div className='w-full overflow-x-auto hide-scrollbar'>
            <div className='flex gap-8 items-center'>
              {Array(10).fill(null).map((_, index) => (
                <div key={index} className='flex flex-col items-center'>
                  <div className='relative flex items-center'>
                    <div className='w-28 h-28 rounded-full overflow-hidden border-2 border-green-500 shadow-md'>
                      <img
                        className='object-cover w-full h-full'
                        src="https://upload.wikimedia.org/wikipedia/commons/2/20/%C4%90%C3%80M_V%C4%A8NH_H%C6%AFNG_2023.jpg"
                        alt="Vĩnh Hưng"
                      />
                    </div>
                    <div className='w-6 h-6 absolute rounded-full bg-green-500 right-0 bottom-0' />
                  </div>
                  <div className='mt-1 text-center font-medium text-lg'>Vĩnh Hưng</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          <div className='flex justify-between text-2xl font-medium'>
            <div>Tất cả tin nhắn</div>
            <Popover placement="bottomRight" trigger="click" content={
              <div className='flex w-48 gap-2 flex-col'>
                <button className='flex-1 rounded-md p-3 text-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium'>Tất cả</button>
                <button className='flex-1 rounded-md p-3 text-xl bg-transparent text-[#af1bff] font-medium'>Nhóm</button>
                <button className='flex-1 rounded-md p-3 text-xl bg-transparent text-[#af1bff] font-medium'>Nhân viên</button>
                <button className='flex-1 rounded-md p-3 text-xl bg-transparent text-[#af1bff] font-medium'>Khách hàng</button>
              </div>
            }>
              <CiFilter className='text-white text-3xl' />
            </Popover>
          </div>

          <div className='flex w-full h-[550px] overflow-y-auto hide-scrollbar'>
            <div className='flex-1 gap-3'>
              {/* Messages */}
              {Array(10).fill(null).map((_, index) => (
                <div key={index} className='flex items-center justify-between p-4 rounded-lg'>
                  <div className='flex gap-4 items-center'>
                    <div className='relative flex items-center'>
                      <div className='w-20 h-20 rounded-full overflow-hidden border-2 border-green-500 shadow-md'>
                        <img
                          className='object-cover w-full h-full'
                          src="https://upload.wikimedia.org/wikipedia/commons/2/20/%C4%90%C3%80M_V%C4%A8NH_H%C6%AFNG_2023.jpg"
                          alt="Đàm Vĩnh Hưng"
                        />
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <div className='font-semibold text-xl'>Đàm Vĩnh Hưng</div>
                      <div className='font-medium text-lg'>Xin chào bạn, cho mình hỏi</div>
                    </div>
                  </div>
                  <div className='flex flex-col items-end'>
                    <div className='text-lg'>03:15 AM</div>
                    <div className='flex items-center justify-center w-10 h-10 rounded-full font-medium text-white bg-red-600 text-xl'>
                      55
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg p-[24px] gap-[44px] flex flex-col h-full'>
        <div className='box-border w-full h-auto grid grid-cols-[5%_90%_1fr]'>
          <div className='flex items-center justify-start text-xl'>
            <GoArrowLeft size={24} />
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex items-center relative justify-center'>
              <div className='w-16 h-16 rounded-full overflow-hidden'>
                <img className='object-cover' src="https://upload.wikimedia.org/wikipedia/commons/2/20/%C4%90%C3%80M_V%C4%A8NH_H%C6%AFNG_2023.jpg" alt="Đàm Vĩnh Hưng" />
              </div>
              <div className='w-4 h-4 ml-12 mt-12 absolute rounded-full bg-green-500' />
            </div>
            <div className='flex flex-col gap-2 text-xl'>
              <span className='font-medium'>Đàm Vĩnh Hưng</span>
              <span className='font-light'>Online</span>
            </div>
          </div>
          <div className='flex justify-center items-center text-xl gap-6'>
            <GoSearch size={24} />
            <HiOutlineEllipsisVertical size={24} />
          </div>
        </div>

        <div className='w-full h-[630px] overflow-y-auto hide-scrollbar text-lg'>
          {Array(10).fill(null).map((_, index) => (
            <div className={`flex items-end gap-3 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`} key={index}>
              {
                index % 2 === 0 ? (
                  <>
                    <div className={`flex items-center relative justify-center`}>
                      <div className='w-16 h-16 rounded-full overflow-hidden'>
                        <img className='object-cover' src="https://upload.wikimedia.org/wikipedia/commons/2/20/%C4%90%C3%80M_V%C4%A8NH_H%C6%AFNG_2023.jpg" alt="" />
                      </div>
                      <div className='w-4 h-4 ml-12 mt-12 absolute rounded-full bg-green-500' />
                    </div>
                    <div className={`p-4 flex flex-col justify-start items-start gap-3 rounded-2xl bg-[#b81dff] text-white`}>
                      <div className='flex items-center gap-3'>
                        <span className='font-medium'>Đàm Vĩnh Hưng</span>
                        <div className='flex items-center gap-3'>
                          <span className='text-gray-600'>02:39 PM</span>
                          <span className='text-[#22b922]'><LuCheckCheck size={20} /></span>
                        </div>
                      </div>
                      <div className='min-h-[44px] p-3 w-[350px] flex rounded-2xl'>
                        <span className=''>Xin chào bạn, tôi muốn mua đơn hàng này?</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`p-4 flex flex-col justify-start items-start gap-3 rounded-2xl bg-gray-200 text-black`}>
                      <div className='flex items-center gap-3'>
                        <span className='font-medium'>Đàm Vĩnh Hưng</span>
                        <div className='flex items-center gap-3'>
                          <span className='text-gray-600'>02:39 PM</span>
                          <span className='text-[#22b922]'><LuCheckCheck size={20} /></span>
                        </div>
                      </div>
                      <div className='min-h-[44px] p-3 w-[350px] flex rounded-2xl'>
                        <span className=''>Xin chào bạn, tôi muốn mua đơn hàng này?</span>
                      </div>
                    </div>
                    <div className={`flex items-center relative justify-center`}>
                      <div className='w-16 h-16 rounded-full overflow-hidden'>
                        <img className='object-cover' src="https://upload.wikimedia.org/wikipedia/commons/2/20/%C4%90%C3%80M_V%C4%A8NH_H%C6%AFNG_2023.jpg" alt="" />
                      </div>
                      <div className='w-4 h-4 ml-12 mt-12 absolute rounded-full bg-green-500' />
                    </div>
                  </>
                )
              }
            </div>
          ))}
        </div>

        <div className='h-auto'>
          <div className='flex gap-6 py-4 text-[16px] rounded-lg overflow-hidden h-[80px] items-center'>
            <input
              type="text"
              value={inputValue}
              placeholder='Vui lòng nhập nội dung'
              onChange={handleInputChange}
              className='box-border outline-none p-[14px] h-[90%] rounded-lg flex-1 bg-[#7471711f]' />
            <Popover
              placement="topRight"
              trigger="click"
              content={<EmojiPicker onEmojiClick={handleEmojiClick} />}
            >
              <BsEmojiSmile className='cursor-pointer text-xl' />
            </Popover>
            <Popover placement="topRight" trigger="click" content={<FiUploadCloud />}>
              <HiOutlineEllipsisVertical className='cursor-pointer text-xl' />
            </Popover>
            <div className='h-[80%] w-[50px] flex items-center justify-center rounded-full text-white bg-red-600'>
              <BsSendFill className='cursor-pointer' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatAdmin;
