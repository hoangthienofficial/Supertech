// src/ToasterConfig.js

import { Toaster } from 'react-hot-toast';

const ToasterConfig = () => (
  <Toaster
    position="top-right"
    reverseOrder={false}
    toastOptions={{
      duration: 1000,
      style: {
        padding: '12px',
        fontSize: '14px',
        color: '#333',
        borderRadius: '8px',
      },
      success: {
        style: {
          background: '#4caf50',
          color: 'white',
        },
      },
      error: {
        style: {
          background: '#f44336',
          color: 'white',
        },
      },
    }}
  />
);

export default ToasterConfig;