import Cookies from 'js-cookie';

type TFunction = () => any;
export const IIFE = (cb: TFunction) => {
    cb();
};

export const getCookie = () => {
    try {
      return Cookies.get('token'); 
    } catch (e) {
      return null;
    }
  };
  
  export const saveLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  export const getLocalStorage = (key: string) => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? "");
    } catch (e) {
      return null;
    }
  };
  
  export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };
  export const truncateText = (text: string | null | undefined, limit: number) => {
    if (typeof text !== 'string') {
      return '';
    }
  
    if (text.length <= limit) {
      return text;
    } else {
      return text.substring(0, limit) + "...";
    }
  };
  export const formatCurrencyVND = (amount: number) => {
    // Làm tròn số đến hàng đơn vị
    const roundedAmount = Math.round(amount);
  
    // Định dạng số sang tiền Việt Nam
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(roundedAmount);
  };
  
  export const formatDate = (date: string | number) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric", // Năm
      month: "2-digit", // Tháng (định dạng 2 chữ số)
      day: "2-digit", // Ngày (định dạng 2 chữ số)
      hour: "2-digit", // Giờ
      minute: "2-digit", // Phút
    };
  
    // Chuyển đổi ngày tháng với ngôn ngữ Việt Nam
    const formattedDate = new Date(date).toLocaleString("vi-VN", options);
    return formattedDate;
  };
  export const formatTimeAgo = (date: string | undefined) => {
    if (!date) return ''; // Trả về chuỗi rỗng nếu date là undefined hoặc null
  
    const now = new Date();
    const commentDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);
  
    // Bạn có thể kiểm tra diffInSeconds và xử lý các trường hợp như sau
    if (diffInSeconds < 60) {
      return `${diffInSeconds} giây trước`;
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return `${diffInMinutes} phút trước`;
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      return `${diffInHours} giờ trước`;
    } else if (diffInSeconds < 2592000) {
      const diffInDays = Math.floor(diffInSeconds / 86400);
      return `${diffInDays} ngày trước`;
    } else if (diffInSeconds < 31536000) {
      const diffInMonths = Math.floor(diffInSeconds / 2592000);
      return `${diffInMonths} tháng trước`;
    } else {
      const diffInYears = Math.floor(diffInSeconds / 31536000);
      return `${diffInYears} năm trước`;
    }
  };
  