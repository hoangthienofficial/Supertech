import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, message, Skeleton } from 'antd';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './css/ContactPage.css';

function Contact() {
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const onFinish = (values) => {
    setFormLoading(true);
    setTimeout(() => {
      message.success('Cảm ơn bạn đã liên hệ với chúng tôi!');
      setFormLoading(false);
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="contact-page">
      <div className="contact-header">
        {loading ? (
          <Skeleton active title={{ width: '60%' }} paragraph={{ rows: 2, width: ['80%', '90%'] }} />
        ) : (
          <>
            <h2 className="text-center text-[2rem] font-semibold">Liên Hệ Với Chúng Tôi</h2>
            <p className="text-center text-[1.5rem] py-[1.4rem]">
              Nếu bạn có bất kỳ câu hỏi nào, vui lòng điền vào biểu mẫu dưới đây hoặc xem bản đồ của chúng tôi.
            </p>
          </>
        )}
      </div>

      {/* Bố cục 2 cột: Form bên trái và Google Map bên phải */}
      <Row gutter={[32, 32]} justify="center">
        {/* Form liên hệ */}
        <Col xs={24} sm={24} md={12} lg={10}>
          <div className="contact-form formEdit">
            {loading ? (
              <Skeleton active paragraph={{ rows: 4, width: '100%' }} />
            ) : (
              <Form
                name="contact"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{ remember: true }}
              >
                <Form.Item
                  name="name"
                  label="Họ và Tên"
                  rules={[{ required: true, message: 'Vui lòng nhập họ và tên của bạn!' }]}
                >
                  <Input placeholder="Nhập họ và tên" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
                >
                  <Input placeholder="Nhập email của bạn" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Tin nhắn"
                  rules={[{ required: true, message: 'Vui lòng nhập tin nhắn của bạn!' }]}
                >
                  <Input.TextArea rows={4} placeholder="Nhập tin nhắn của bạn" />
                </Form.Item>

<div className='button-one'>
<Form.Item >
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className='button-one py-4'
                    loading={formLoading}
                  >
                    Gửi Tin Nhắn
                  </Button>
                </Form.Item>

</div>
                
              </Form>
            )}
          </div>
        </Col>

        {/* Google Maps */}
        <Col xs={24} sm={24} md={12} lg={10}>
          <div className="google-map">
            {loading ? (
              <Skeleton active paragraph={{ rows: 1, width: '100%' }} />
            ) : (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.508141509213!2d106.7017552749702!3d10.774888960464716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eeafa2e4db5%3A0x915fa7128afbe1d6!2zMTIzIMSQLiBBQkMgUXXhuq1uIFhZWiwgVGjhu4sgVMOibiwgVMOibiBCw6xuaCBIIE7Eg!5e0!3m2!1sen!2s!4v1700012356789!5m2!1sen!2s"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Contact;
