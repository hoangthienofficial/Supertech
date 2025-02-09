import { Button, Form, Input } from 'antd';
import { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import dienThoai from '../asset/dienthoaisign.png'
import bgdienThoai from '../asset/dienthoai.png'
import { useFormik } from 'formik';
import * as Yup from "yup";
import CodeInput from './components/CodeInput';
import ChangePassword from './components/ChangePassword';
import { checkEmail } from '../../../../service/user/user.service';

function ForgetPassword() {
  const [number, setNumber] = useState(1);
  const [emailUser, setEmailUser] = useState<string>('');

  const updateNumber = (newNumber: number) => {
    setNumber(newNumber);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
    }),
    onSubmit: async (values) => {
      console.log("Form data", values);
      setEmailUser(values.email)
      const response = await checkEmail(values)
      console.log(response);
      if (response.data.message == "Code sent successfully") {
        setNumber(2)
      }
    }
  });

  return (
    <div className="">
      <div className="flex overflow-hidden relative min-h-[100vh] bg-gradient-to-br from-purple-50 to-white">
        {/* Left Section */}
        <div className="hidden md:block md:w-[55%] xl:w-[60%] relative overflow-hidden">
          <div className="absolute inset-0 bg-customColor clip-diagonal-left" />

          <div className="absolute top-8 left-8 z-20">
            <NavLink to="/" className="bg-white/90 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <FaArrowLeft className="text-2xl text-customColor" />
            </NavLink>
          </div>

          <div className="absolute top-[40%] left-[35%] translate-x-[-50%] translate-y-[-50%] z-10 text-white p-8 flex flex-col items-center hidden md:flex">
            <div className="mb-8">
              <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-bold mb-4 text-center drop-shadow-lg">
                SuperTech
              </h1>
              <div className="w-24 md:w-28 lg:w-32 h-1 bg-white/60 mx-auto rounded-full mb-4 md:mb-6"></div>
              <p className="text-[1rem] md:text-[1.2rem] lg:text-[1.4rem] xl:text-[1.6rem] w-full md:w-[350px] lg:w-[450px] xl:w-[550px] text-center leading-relaxed text-white/90">
                SuperTech là trang website mua sắm trực tuyến với nhiều ưu đãi và khuyến mãi. Hãy đăng nhập để có trải nghiệm tốt nhất và đồng hành cùng chúng tôi.
              </p>
            </div>
          </div>

          <div className="absolute right-[-5%] top-[20%] z-10 animate-float hidden 2xl:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-400/20 to-transparent rounded-[3rem] blur-2xl"></div>
              <img src={dienThoai} alt="iPhone" className="w-[500px] object-contain relative z-10 transition-all duration-300" />
            </div>
          </div>

          <div className="absolute bottom-[-10%] left-0 opacity-20">
            <img src={bgdienThoai} className="w-[400px] md:w-[420px] lg:w-[400px] xl:w-[600px] transition-all duration-300" alt="" />
          </div>
        </div>

        {/* Mobile Back Button */}
        <div className="md:hidden absolute top-4 left-4 z-20">
          <NavLink to="/" className="bg-white shadow-lg w-[3rem] h-[3rem] sm:w-[4rem] sm:h-[4rem] rounded-full flex items-center justify-center">
            <FaArrowLeft className="text-[1.5rem] sm:text-[2rem] text-customColor" />
          </NavLink>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-[45%] xl:w-[40%] flex justify-center items-center p-4 sm:p-6">
          <div className="w-full max-w-[500px] p-3 sm:p-4 2xl:p-8 flex flex-col justify-center z-10">
            <h2 className="text-[2rem] sm:text-[2.5rem] 2xl:text-[3rem] font-bold mb-3 sm:mb-4 text-center">Quên mật khẩu</h2>
            <p className="mb-3 sm:mb-4 text-gray-600 text-center text-[1.3rem] sm:text-[1.5rem]">
            Quên mật khẩu? Vui lòng nhập tên người dùng hoặc địa chỉ email của bạn. Bạn sẽ nhận được liên kết để tạo mật khẩu mới qua email.
            </p>

            {number == 1 ? (
              <Form layout="vertical" className="sign-edit" onFinish={formik.handleSubmit}>
                <Form.Item
                  label="Email"
                  validateStatus={formik.touched.email && formik.errors.email ? "error" : ""}
                  help={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                  className="mb-[1rem]"
                >
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Nhập email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="py-[1.8rem] sm:py-[2.1rem] text-[1.3rem] sm:text-[1.5rem]"
                  />
                </Form.Item>
                <div className="button-edit">
                  <Button type="primary" htmlType="submit" className="w-[100%] h-[4rem] text-[1.7rem]">
                    Gửi email
                  </Button>
                </div>
              </Form>
            ) : number == 2 ? (
              <CodeInput updateNumber={updateNumber} />
            ) : (
              <ChangePassword email={emailUser} />
            )}

            <p className="mt-4 text-gray-600 text-center text-[1.2rem] 2xl:text-[1.4rem]">
              Quay lại <NavLink to="/dang-nhap" className="text-purple-600 hover:text-purple-800">đăng nhập</NavLink>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default ForgetPassword;