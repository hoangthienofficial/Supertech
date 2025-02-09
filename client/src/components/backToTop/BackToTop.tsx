import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Import biểu tượng mũi tên lên từ react-icons
import { IoIosArrowUp } from 'react-icons/io';

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false); // Trạng thái hiển thị nút

  // Hàm kiểm tra vị trí cuộn của trang
  const checkScrollPosition = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);  // Hiển thị nút khi cuộn xuống hơn 200px
    } else {
      setIsVisible(false); // Ẩn nút khi cuộn lên trên
    }
  };

  // Đặt sự kiện cuộn trang khi component được mount
  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);

    // Cleanup event listener khi component unmount
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  // Hàm để cuộn trang lên đầu
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Cuộn một cách mượt mà
    });
  };

  return (
    <div
      className={`fixed bottom-10 right-10 bg-[var(--custom-color)] text-white p-3 rounded-full cursor-pointer transition-opacity ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={scrollToTop}
      style={{ transition: 'opacity 0.3s ease' }}
    >
      <IoIosArrowUp  size={24} />
    </div>
  );
}

export default BackToTopButton;
