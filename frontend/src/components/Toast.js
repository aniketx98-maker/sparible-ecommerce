import { Toaster } from 'react-hot-toast';
import React from 'react';

const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 2000,
        style: {
          background: '#333',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '14px',
        },
        success: {
          iconTheme: {
            primary: '#FF6B00',
            secondary: '#fff',
          },
        },
      }}
    />
  );
};

export default ToastProvider;