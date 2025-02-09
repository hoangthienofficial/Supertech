import { Input, Button, Steps, Modal } from "antd";
import React, { useEffect, useState } from 'react';
import { TbPlaylistAdd } from 'react-icons/tb';
import ImgCrop from 'antd-img-crop';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../../../../redux/hooks';
import { changePassword, verifyPassword } from "../../../../../service/user/user.service";
import CodeInputUser from "./CodeInputUser";
import * as Yup from "yup";

function ModalChangePassword() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1); // Quản lý các bước trong quy trình
  const [resetTimer, setResetTimer] = useState(false); // State for resetting the timer
  const dispatch = useAppDispatch();
  const PasswordValidationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .required("Vui lòng nhập mật khẩu mới"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Mật khẩu không khớp")
      .required("Vui lòng nhập lại mật khẩu"),
  });
  
  
  // Handle submit for the old password step
  const handleSubmitOldPassword = async (values: { oldPassword: string }) => {
    try {
      const response = await verifyPassword(values);
      if (response.data.message === "Thành công!") {
        setPage(2);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  // Handle modal opening and reset the timer and email sending
  const showModal = () => {
    setIsModalOpen(true);
    setResetTimer(true); // Trigger the reset for the timer

    // Simulate sending an email (replace with actual logic if needed)
    console.log('Sending email...'); // This should call the actual email sending function
  };

  // Handle modal close
  const handleCancel = () => {
    setIsModalOpen(false);
    setResetTimer(true); // Trigger timer reset when modal closes
    setPage(1)
  };

  // Handle page update during the process (steps navigation)
  const updateNumber = (newNumber: number) => {
    setPage(newNumber);
  };

  // Reset the timer once when `resetTimer` state changes
  useEffect(() => {
    if (resetTimer) {
      setResetTimer(false); // Reset the timer only once
    }
  }, [resetTimer]);

  return (
    <>
      <button onClick={showModal} 
                        className="p-[1rem] border text-[1.6rem] border-customColor text-customColor"
                        >
        Đổi mật khẩu
      </button>
      
      <Modal
        title="Danh mục sản phẩm mới"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {page === 1 && (
          <div>
            <Steps
              current={page - 1}
              labelPlacement="vertical"
              items={[
                { title: "Mật khẩu cũ" },
                { title: "Mật khẩu mới" },
              ]}
            />
            <Formik
              initialValues={{ oldPassword: "" }}
              onSubmit={async (values) => {
                const data = { ...values };
                await handleSubmitOldPassword(data);
              }}
            >
              <Form>
                <div className="form-group">
                  <label>Mật khẩu cũ:</label>
                  <Field name="oldPassword" as={Input.Password} placeholder="Nhập mật khẩu cũ" />
                  <ErrorMessage name="oldPassword" component="div" className="text-red-500" />
                </div>
                <div className="flex gap-4 justify-end mt-[1rem]">
                  <Button type="primary" htmlType="submit">Tiếp tục</Button>
                  <Button type="default" onClick={() => setPage(3)}>Quên mật khẩu</Button>
                </div>
              </Form>
            </Formik>   
          </div>
        )}

        {page === 2 && (
          <div>
            <Steps
              current={page - 1}
              labelPlacement="vertical"
              items={[
                { title: "Mật khẩu cũ" },
                { title: "Mật khẩu mới" },
              ]}
            />
            <Formik
              initialValues={{ newPassword: "", confirmNewPassword: "" }}
              validationSchema={PasswordValidationSchema}
              onSubmit={async (values) => {
                const data = { ...values };
          
                const response = await changePassword(data);
      if (response.data.message === "Đổi mật khẩu thành công") {
        toast.success(response.data.message);
        handleCancel(); // Close the modal when password change is successful
      } else {
        toast.error(response.data.message);
      }
              }}
            >
              <Form>
                <div className="form-group">
                  <label>Mật khẩu mới:</label>
                  <Field name="newPassword" as={Input.Password} placeholder="Nhập mật khẩu mới" />
                  <ErrorMessage name="newPassword" component="div" className="text-red-500" />
                </div>
                <div className="form-group">
                  <label>Nhập lại mật khẩu:</label>
                  <Field name="confirmNewPassword" as={Input.Password} placeholder="Nhập lại mật khẩu" />
                  <ErrorMessage name="confirmNewPassword" component="div" className="text-red-500" />
                </div>
                <div className="flex mt-[1rem] justify-end">
                <Button type="primary" htmlType="submit">Đổi mật khẩu</Button>

                </div>
              </Form>
            </Formik>
          </div>
        )}

        {page === 3 && (
          <div>
            <Steps
              current={0}
              labelPlacement="vertical"
              items={[
                { title: "Nhập mã otp" },
                { title: "Mật khẩu mới" },
              ]}
            />
            <CodeInputUser updateNumber={updateNumber} />
          </div>
        )}

        {page === 4 && (
          <div>
            <Steps
              current={1}
              labelPlacement="vertical"
              items={[
                { title: "Nhập mã otp" },
                { title: "Mật khẩu mới" },
              ]}
            />
            <Formik
            initialValues={{ newPassword: "", confirmNewPassword: "" }}
            validationSchema={PasswordValidationSchema}
            onSubmit={async (values) => {
              const data = { ...values };
        
              const response = await changePassword(data);
    if (response.data.message === "Đổi mật khẩu thành công") {
      toast.success(response.data.message);
      handleCancel(); // Close the modal when password change is successful
    } else {
      toast.error(response.data.message);
    }
            }}
            >
               <Form>
                <div className="form-group">
                  <label>Mật khẩu mới:</label>
                  <Field name="newPassword" as={Input.Password} placeholder="Nhập mật khẩu mới" />
                  <ErrorMessage name="newPassword" component="div" className="text-red-500" />
                </div>
                <div className="form-group">
                  <label>Nhập lại mật khẩu:</label>
                  <Field name="confirmNewPassword" as={Input.Password} placeholder="Nhập lại mật khẩu" />
                  <ErrorMessage name="confirmNewPassword" component="div" className="text-red-500" />
                </div>
                <div className="flex mt-[1rem] justify-end">
                <Button type="primary" htmlType="submit">Đổi mật khẩu</Button>

                </div>
              </Form>
            </Formik>
          </div>
        )}
      </Modal>
    </>
  );
}

export default ModalChangePassword;
