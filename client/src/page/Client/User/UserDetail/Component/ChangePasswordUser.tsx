import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Button, Steps } from "antd";
import toast from "react-hot-toast";
import { verifyPassword, changePassword  } from "../../../../../service/user/user.service";
import { useNavigate } from "react-router-dom";
import CodeInputUser from "./CodeInputUser";

function ChangePasswordUser() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1); // Quản lý các bước trong quy trình
  const updateNumber = (newNumber: number) => {
    setPage(newNumber);
  };
  // Validation schemas
  const validationSchemaStep1 = Yup.object({
    oldPassword: Yup.string().required("Vui lòng nhập mật khẩu cũ"),
  });

  const validationSchemaStep2 = Yup.object({
    newPassword: Yup.string()
      .required("Vui lòng nhập mật khẩu mới")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không khớp")
      .required("Vui lòng nhập lại mật khẩu mới"),
  });

  const validationSchemaStep3 = Yup.object({
    email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  });

  const validationSchemaStep4 = Yup.object({
    otp: Yup.string().required("Vui lòng nhập mã OTP"),
  });

  // Submit mật khẩu cũ
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


 
  // Xác minh OTP
  const handleSubmitOtp = async (values: { otp: string }) => {
    try {
    //   const response = await verifyOtp(values.otp);
    //   if (response.data.message === "Xác minh OTP thành công") {
    //     toast.success(response.data.message);
    //     setPage(2); // Chuyển sang bước nhập mật khẩu mới
    //   } else {
    //     toast.error(response.data.message);
    //   }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  // Đổi mật khẩu mới
  const handleSubmitNewPassword = async (values: { newPassword: string; confirmNewPassword: string }) => {
    try {
      const response = await changePassword(values);
      if (response.data.message === "Đổi mật khẩu thành công") {
        toast.success(response.data.message);
        navigate("/nguoi-dung");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: "400px", margin: "auto" }}>
      

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
          validationSchema={validationSchemaStep1}
          onSubmit={handleSubmitOldPassword}
        >
          <Form>
            <div className="form-group">
              <label>Mật khẩu cũ:</label>
              <Field name="oldPassword" as={Input.Password} placeholder="Nhập mật khẩu cũ" />
              <ErrorMessage name="oldPassword" component="div" className="text-red-500" />
            </div>
            <div className="flex gap-4">
              <Button type="primary" htmlType="submit">
                Tiếp tục
              </Button>
              <Button type="default" onClick={() => setPage(3)}>
                Quên mật khẩu
              </Button>
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
          validationSchema={validationSchemaStep2}
          onSubmit={handleSubmitNewPassword}
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
            <Button type="primary" htmlType="submit">
              Đổi mật khẩu
            </Button>
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
     <CodeInputUser updateNumber={updateNumber}/>
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
           validationSchema={validationSchemaStep2}
           onSubmit={handleSubmitNewPassword}
        >
          <Form>
            <div className="form-group">
              <label>Email:</label>
              <Field name="email" as={Input} placeholder="Nhập email" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <Button type="primary" htmlType="submit">
              Gửi OTP
            </Button>
          </Form>
        </Formik>
        </div>
       
      )}

     
    </div>
  );
}

export default ChangePasswordUser;