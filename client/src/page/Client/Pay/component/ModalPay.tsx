import React, { useEffect, useState } from 'react';
import { Button, Modal, Row, Col } from 'antd';
import { getAutoBank, getOrderAll } from '../../../../service/order/order.service';
import { CopyOutlined, DownOutlined } from '@ant-design/icons';
import CountdownTimer from './CountimePay';
import { getsetting } from '../../../../service/setting/setting.service';
function ModalPay(props:any) {
  const [data, setData] = useState(null);  
useEffect(()=>{
  if(props.isModalOpen){
    props.handleReset();
  }else{
    props.handleResetTrue()
  }
},[props.isModalOpen])  
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getAutoBank(); 
        if (response?.data?.content) {
          setData(response.data.content); 
        } else {
          console.error("No content found in response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);  
      }
    };

    fetchApi();
  }, []);
  const handleReset = () => {
    setResetTimer(true); // Kích hoạt reset
    setTimeout(() => setResetTimer(false), 100); // Tắt reset sau khi kích hoạt
  };
  const handleCancel=() => {
    props.handleCancel();
    setResetTimer(false); // Tắt reset sau khi đóng modal
  }
  const [resetTimer, setResetTimer] = useState<boolean>(false);

  // Hàm gọi để reset đồng hồ

  const [settings, setSettings] = useState({ rechargeNotice: '' });
  const fetchSettings = async () => {
    try {
        const response = await getsetting();
        const settingsMap = {};
        response.data.content.forEach(setting => {
            settingsMap[setting.id] = setting.value;
        });
        setSettings({
            rechargeNotice: settingsMap[10],
        });
        setOriginalSettings({
            ...settingsMap
        });
    } catch (error) {
        console.error('Lỗi lấy dữ liệu:', error);
    }
};

useEffect(() => {
    fetchSettings();
}, []);
console.log(props)
const totalOrder = props?.data?.order_total;
const textOrder = settings.rechargeNotice + props?.data?.order_id;

  // Ensure that data is not null and is an array with at least one element before rendering the image
  const isDataReady = Array.isArray(data) && data.length > 0;

  return (
    <>
      <Modal 
      
      
      title={props.order_total}
      
      open={props.isModalOpen} 
      onOk={props.handleOk} 
      onCancel={handleCancel}
      >
        <div>
          {isDataReady ? (
            <div>
              <Row>
                <Col span={24} >
                <span className='text-[18px]' >Bạn vui lòng thanh toán đơn hàng của mình bằng cách quét mã QR phía dưới hoặc chuyển khoản theo thông tin đăng nhập hiển thị trên màn hình !</span>
                 
                </Col>

                </Row >
                <hr className='' />
                <Row >
                  <Col className='text-center text-[18px] font-bold p-5' span={24}>-Thông Tin Chuyển Khoản-</Col>
                  <Col span={24}>
                    <h3 className='text-[16px]' > <span className='text-[#fc2d2d] font-bold' >Ngân Hàng:</span>  <span className='font-bold' >{data[0]?.short_name}</span> </h3>
                    
                  </Col>
                  <Col span={24}>
                  <h3 className='text-[16px]'> <span className='text-[#fc2d2d] font-bold' >Số Tài Khoản:</span> <span className='font-bold'>{data[0]?.accountNumber}</span> 
                  
                  <Button type="primary" icon={<CopyOutlined />} onClick={() => navigator.clipboard.writeText(data[0]?.accountNumber)} />
                  </h3>
                  
                  </Col>
                <Col span={24}>
                  <h3 className='text-[16px]'> <span className='text-[#fc2d2d] font-bold' >Tên Người Nhận:</span>  <span className='font-bold'>{data[0]?.accountName}</span></h3>
                </Col>
                <Col span={24}>
                  <h3 className='text-[16px]'> <span className='text-[#fc2d2d] font-bold' >Nội Dung Chuyển Khoản:</span> <span className='font-bold'>{textOrder}</span> 
                  <Button type="primary" icon={<CopyOutlined />} onClick={() => navigator.clipboard.writeText(textOrder)} />
                  </h3>
                </Col>
                </Row>
              
              <Col className='text-[16px] text-center p-5 ' >-Hoặc Thanh Toán Bằng Mã QR-</Col>
              <Col className='text-[20px] text-center'><DownOutlined /></Col>

              <img
                src={`https://img.vietqr.io/image/${data[0]?.short_name}-${data[0]?.accountNumber}-compact.jpg?amount=${totalOrder}&addInfo=${textOrder}&accountName=${data[0]?.accountName}`}
                alt="QR Code"
              />
<CountdownTimer reset={resetTimer} />
            
              {props.order_total}
              
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </Modal>
    </>
  );
}

export default ModalPay;