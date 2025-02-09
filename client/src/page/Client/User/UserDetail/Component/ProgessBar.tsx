import React from "react";

interface ProgressBarProps {
  currentAmount: number; // Số tiền đã chi tiêu
  targetAmount: number;  // Số tiền mục tiêu
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentAmount, targetAmount }) => {
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100); // Đảm bảo không vượt quá 100%

  return (
    <div className="w-full p-4 bg-gray-100 rounded-lg shadow">
      <div className="text-lg font-bold mb-2">
        Bạn đã chi tiêu: {currentAmount.toLocaleString()} / {targetAmount.toLocaleString()} VNĐ
      </div>
      <div className="w-full h-6 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-sm text-right mt-1">
        {percentage >= 100 ? "Chúc mừng! Bạn đã đạt mục tiêu!" : `${Math.round(percentage)}% hoàn thành`}
      </div>
    </div>
  );
};

export default ProgressBar;