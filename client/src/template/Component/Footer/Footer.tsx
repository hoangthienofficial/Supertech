import React, { useEffect, useState } from 'react';
import { FaFacebook, FaRegPaperPlane } from 'react-icons/fa';
import { RiHeadphoneFill } from 'react-icons/ri';
import nganHang from '../../../assets/nganhang.png';
import { Container } from '../../../components/Style/Container';
import LoadingFooter from './Component/Loading/LoadingFooter';
import { getsetting } from '../../../service/setting/setting.service';
import { timeLoading } from '../../../constants';

function Footer() {
  const [settings, setSettings] = useState({
    title: '',
    description: '',
    author: '',
    color: '#fff',
    logo: '',
    favicon: '',
    noti_website: '',
    contentAutobank: '',
    token: '',
    rechargeNotice: '',
    tokenpass: ''
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const response = await getsetting();
      const settingsMap = {};
      response.data.content.forEach((setting) => {
        settingsMap[setting.id] = setting.value;
      });
      setSettings({
        title: settingsMap[1] || '',
        description: settingsMap[2] || '',
        color: settingsMap[3] || '#fff',
        author: settingsMap[4] || '',
        logo: settingsMap[5] || '',
        favicon: settingsMap[6] || '',
        noti_website: settingsMap[7] || '',
        contentAutobank: settingsMap[8] || '',
        token: settingsMap[9] || '',
        rechargeNotice: settingsMap[10] || '',
        tokenpass: settingsMap[11] || ''
      });
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);


  useEffect(() => {
    setTimeout(() => setIsLoading(false), timeLoading)
  }, []);

  if (isLoading) {
    return <LoadingFooter />;
  }

  const listFooter = [
    {
      title: 'Tìm kiếm nhanh',
      desc: ['Điện thoại', 'Laptop', 'Phụ kiện', 'Máy tính bảng']
    },
    {
      title: 'Tác vụ',
      desc: ['Liên hệ', 'Danh mục', 'Hỏi đáp', 'Có thể bạn thích', 'Giới thiệu']
    },
    {
      title: 'Chăm sóc khách hàng',
      desc: ['Câu hỏi thường gặp', 'Hỏi đáp', 'Hỗ trợ sản phẩm', 'Tài khoản', 'Tra cứu hóa đơn']
    }
  ];

  return (
    <div className="w-full m-auto mt-[1.5rem] bg-white">
    {/* Top Section */}
    <div className="bg-[var(--custom-color)] sm:rounded-t-[2rem] w-full py-[2rem] flex justify-center items-center">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-[2rem]">
        <h1 className="md:hidden text-[2.5rem] text-white text-center">SuperTech</h1>
        <div className="flex text-[1.6rem] md:text-[1.8rem] text-white gap-[1rem] items-center justify-center">
          <FaRegPaperPlane className="text-[1.6rem]" />
          <span>Đăng ký để nhận thêm ưu đãi</span>
        </div>
        <div className="flex items-center w-full md:w-auto">
          <input
            type="text"
            className="flex-1 md:w-[35rem] h-[4rem] focus:border-none focus:outline-none p-[1rem] text-[1.6rem] rounded-s-[.5rem]"
            placeholder="Nhập email của bạn"
          />
          <button className="w-[12rem] bg-[#444444] text-white h-[4rem] text-[1.6rem] rounded-e-[.5rem]">
            Đăng ký
          </button>
        </div>
      </Container>
    </div>
    
    {/* Footer Links */}
    <div className="w-[90%] xl:w-[80%] m-auto py-[3rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[3rem]">
      {/* Contact Info */}
      <div className="col-span-1">
        <h3 className="text-[2.8rem] font-semibold">SuperTech</h3>
        <div className="flex gap-[2rem] mt-[1.5rem] mb-[2rem]">
          <RiHeadphoneFill className="text-[4rem] text-[var(--custom-color)] font-semibold" />
          <div>
            <p className="text-[1.5rem]">Bạn có thắc mắc? Liên hệ ngay!</p>
            <p className="text-[1.6rem] text-[var(--custom-color)] font-semibold mt-[.5rem]">1900 6969</p>
          </div>
        </div>
        <h4 className="text-[1.8rem] font-semibold">Liên hệ</h4>
        <p className="text-[1.6rem] my-[1rem]">
          Công Viên Phần Mềm Quang Trung, Tân Chánh Hiệp, Quận 12, Hồ Chí Minh, Việt Nam
        </p>
        <FaFacebook className="text-[1.7rem]" />
      </div>
    
      {/* Footer Links */}
      {listFooter.map((item, index) => (
        <div key={index}>
          <h4 className="text-[2rem] font-semibold mb-[1rem]">{item.title}</h4>
          <ul>
            {item.desc.map((link, i) => (
              <li key={i} className="text-[1.6rem] mb-[.5rem]">
                {link}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    
    {/* Footer Bottom */}
    <div className='w-[100%] bg-[#E5E5E5] sm:h-[100%] p-[1rem] h-[4rem] flex flex-col justify-center items-center'>
          <div className='xl:w-[80%]  xmd:w-[90%] sm:w-[95%] m-auto md:flex justify-between items-center'>
          <p className='md:text-[1.5rem] xl:text-[1.8rem] text-[#34005C] sm:hidden md:block'> {settings.description || 'SuperTech - Cửa Hàng Chuyên Các Mặt Hàng Công Nghệ'}</p>
          <img src={nganHang} alt="" className='md:w-[25rem] flex justify-center items-center' />
          </div>
        </div>
    </div>
  );
}

export default Footer;
