import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store.tsx';
import toast, { Toaster } from 'react-hot-toast';
import ToasterConfig from './components/toask/Toask.tsx';
import { getsetting } from './service/setting/setting.service';

const persistor = persistStore(store);

const Root = () => {
    useEffect(() => {
        const fetchColorSetting = async () => {
            try {
                const response = await getsetting();  
                const settingsMap = {};
                response.data.content.forEach(setting => {
                    settingsMap[setting.id] = setting.value;
                });
                const newColor = settingsMap[3];  
                document.documentElement.style.setProperty('--custom-color', newColor); // Cập nhật biến CSS
            } catch (error) {
                console.error('Lỗi khi lấy màu:', error);
            }
        };

        fetchColorSetting();  
    }, []); 

    return (
        <>
            <App />
            <ToasterConfig />
        </>
    );
};

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Root />
        </PersistGate>
    </Provider>,
);