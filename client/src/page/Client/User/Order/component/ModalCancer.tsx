import React, { useState } from 'react';
import { Modal, Button, Radio, Input, Result } from 'antd';
import { useAppDispatch } from '../../../../../redux/hooks';
import { changeStatusOrderThunk } from '../../../../../redux/order/Order.slice';

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({ orderId }) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<'form' | 'success' | 'error'>('form');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customReason, setCustomReason] = useState<string>('');

  const handleOk = async () => {
    try {
      const reason = selectedReason === 'other' ? customReason : selectedReason;
      const cancelOrder = {
        order_id: orderId,
        order_status: 6,
        order_status_text_cancel: reason,
      };
      await dispatch(changeStatusOrderThunk(cancelOrder)).unwrap();
      setStep('success');
    } catch {
      setStep('error');
    }
  };

  const resetModal = () => {
    setVisible(false);
    setStep('form');
    setSelectedReason('');
    setCustomReason('');
  };

  return (
    <>
      <Button type="primary" danger onClick={() => setVisible(true)}>
        Hủy đơn hàng
      </Button>
      <Modal
        visible={visible}
        footer={null}
        onCancel={resetModal}
        title="Hủy đơn hàng"
      >
        {step === 'form' && (
          <>
            <Radio.Group
              onChange={(e) => setSelectedReason(e.target.value)}
              value={selectedReason}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Radio value="Đổi ý, không muốn mua nữa">Đổi ý, không muốn mua nữa</Radio>
              <Radio value="Đặt nhầm sản phẩm">Đặt nhầm sản phẩm</Radio>
              <Radio value="Thời gian giao hàng quá lâu">Thời gian giao hàng quá lâu</Radio>
              <Radio value="other">Khác (nhập lý do)</Radio>
            </Radio.Group>
            {selectedReason === 'other' && (
              <Input.TextArea
                placeholder="Nhập lý do khác..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                style={{ marginTop: 16 }}
              />
            )}
            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <Button onClick={resetModal} style={{ marginRight: 8 }}>
                Hủy
              </Button>
              <Button
                type="primary"
                danger
                disabled={!selectedReason || (selectedReason === 'other' && !customReason.trim())}
                onClick={handleOk}
              >
                Xác nhận
              </Button>
            </div>
          </>
        )}
        {step === 'success' && (
          <Result
            status="success"
            title="Đơn hàng đã được hủy thành công!"
            extra={[
              <Button type="primary" onClick={resetModal} key="done">
                Đóng
              </Button>,
            ]}
          />
        )}
        {step === 'error' && (
          <Result
            status="error"
            title="Đã xảy ra lỗi!"
            subTitle="Vui lòng thử lại sau."
            extra={[
              <Button type="primary" onClick={() => setStep('form')} key="retry">
                Thử lại
              </Button>,
              <Button danger onClick={resetModal} key="cancel">
                Đóng
              </Button>,
            ]}
          />
        )}
      </Modal>
    </>
  );
};

export default CancelOrderModal;