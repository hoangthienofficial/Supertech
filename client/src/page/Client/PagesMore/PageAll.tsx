import React from 'react';

const FeatureUnderConstructionPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-300">
      <h1 className="text-4xl font-bold mb-4">Tính năng đang được phát triển 🚧</h1>
      <p className="text-lg text-center mb-8">
        Đội ngũ kỹ thuật của chúng tôi đang nâng cấp tính năng này.
        <br />
        Cảm ơn bạn đã kiên nhẫn!
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 text-[2rem] bg-blue-600 rounded hover:bg-blue-500
          
          "
        >
          Quay lại
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 text-[2rem] bg-gray-700 rounded hover:bg-gray-600"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default FeatureUnderConstructionPage;
