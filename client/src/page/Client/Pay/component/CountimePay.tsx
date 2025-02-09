import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  reset: boolean; // Trigger để reset thời gian
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ reset }) => {
  const [seconds, setSeconds] = useState(180); // 3 phút

  // Xử lý reset
  useEffect(() => {
    if (reset) {
      setSeconds(180); // Reset lại thời gian
    }
  }, [reset]);

  // Giảm thời gian mỗi giây
  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval
    } 
  }, [seconds]);

  // Chuyển đổi giây thành phút và giây còn lại
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div>
      <h1 className="text-[20px] text-center">
        Time Left: {minutes < 10 ? `0${minutes}` : minutes}:
        {remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
      </h1>
      <p className="text-[16px] text-center text-[#ff4a4a]">
        Please pay within the specified time, or your order will be canceled.
      </p>
    </div>
  );
};

export default CountdownTimer;
