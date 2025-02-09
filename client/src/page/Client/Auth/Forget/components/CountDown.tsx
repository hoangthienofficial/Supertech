import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ reset }) => {
  const [seconds, setSeconds] = useState(180); // Thời gian bắt đầu là 180 giây

  useEffect(() => {
    if (reset) {
      setSeconds(180); // Reset time when reset is triggered
    }
  }, [reset]);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000); // Giảm 1 giây mỗi lần

      return () => clearInterval(interval); // Dọn dẹp interval khi component bị hủy
    }
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return [
      String(minutes).padStart(2, '0'),
      String(remainingSeconds).padStart(2, '0'),
    ];
  };

  return (
    <div className="my-10">
      {/* Tiêu đề */}
      <p className="text-[1.5rem] font-medium text-gray-700">
        Thời gian hiệu lực: <span className="font-bold">{formatTime(seconds).join(":")}</span>
      </p>

      {/* Thông báo khi hết thời gian */}
      {seconds === 0 && (
        <>
          <p className="text-red-500 mt-2 font-normal text-[1.5rem]">
            OTP đã hết hạn. Vui lòng lấy lại mã OTP để tiếp tục.
           
            <button 
              className="mt-2 px-6 py-2 bg-purple-600 text-white rounded-lg
              text-[1.2rem] sm:text-[1.4rem] hover:opacity-90 "
              onClick={() => setSeconds(180)}
            >
              Gửi lại mã
            </button>
         
          </p>
          
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
