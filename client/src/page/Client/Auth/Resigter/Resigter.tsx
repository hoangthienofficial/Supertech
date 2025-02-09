import dienThoai from '../asset/dienthoaisign.png'
import bgdienThoai from '../asset/dienthoai.png'
import './css/custom.css'
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFacebookF, FaGoogle } from "react-icons/fa";
import { Button, Form, Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signup } from "../../../../service/auth/auth.service";

import toast from "react-hot-toast";
import { TPayloadRegister } from '../../../../service/auth/auth.type';
import { Paths } from '../../../../router/component/RouterValues';

function Resigter() {
  // Sử dụng hook useFormik để quản lý form
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Họ và tên là bắt buộc"),
      email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
      password: Yup.string()
        .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
        .required("Mật khẩu là bắt buộc"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không khớp")
        .required("Xác nhận mật khẩu là bắt buộc"),
    }),
    onSubmit:async (values:TPayloadRegister) => {
      const payload={
        user_name:values.fullName,
        user_email:values.email,
        user_password:values.password,

      }
      const res = await signup(payload);

      if (res.data.message === "Đăng kí thành công!") {
        toast.success('Đăng kí thành công')
        navigate(`${Paths.Login}`)
      } else {
        toast.error(res.data.message) 
      }

    },
  });

  return (
    <div className="">
      <div className="flex overflow-hidden relative min-h-[100vh] bg-gradient-to-br from-purple-50 to-white">
        {/* Form Section - Left */}
        <div className="w-full lg:w-[45%] xl:w-[40%] flex justify-center items-center p-6">
          <div className="absolute top-8 left-8 z-20">
            <NavLink to="/" className="bg-white/90 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <FaArrowLeft className="text-2xl text-customColor"/>
            </NavLink>
          </div>

          <div className="w-full max-w-[500px] p-4 2xl:p-8 flex flex-col justify-center z-10">
            <h2 className="text-[2.5rem] 2xl:text-[3rem] font-bold mb-4 text-center">Đăng kí</h2>
            <p className="mb-4 text-gray-600 text-center text-[1.5rem]">Bạn có thể đăng kí</p>

            {/* Social Buttons */}
            <div className="flex gap-2 sm:gap-3 xl:gap-4 mb-4 sm:mb-6 w-full sm:w-[90%] 2xl:w-[70%] mx-auto">
            <button className="w-1/2 py-2 sm:py-3 xl:py-5 border text-[1.2rem] sm:text-[1.4rem] 2xl:text-[1.6rem] border-customColor text-customColor flex items-center justify-center rounded-lg">
            <FaFacebookF className="mr-[.5rem]"/>
                <span className="hidden sm:inline">Facebook</span>
              </button>
              <button className="w-1/2 py-2 sm:py-3 xl:py-5  border text-[1.4rem] 2xl:text-[1.6rem] border-customColor text-customColor flex items-center justify-center rounded-lg">
                <FaGoogle className="mr-[.5rem]"/>
                <span className="hidden sm:inline">Google</span>
              </button>
            </div>

            {/* Form giữ nguyên */}
            <Form
              layout="vertical"
              onFinish={formik.handleSubmit}
              className="sign-edit"
            >
              {/* Họ và tên */}
              <Form.Item
                label="Họ và tên"
                validateStatus={formik.touched.fullName && formik.errors.fullName ? "error" : ""}
                help={formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : null}
                className="mb-[1rem]"
              >
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Nhập họ và tên"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              {/* Email */}
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
                />
              </Form.Item>

              {/* Mật khẩu */}
              <Form.Item
                label="Mật khẩu"
                validateStatus={formik.touched.password && formik.errors.password ? "error" : ""}
                help={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                className="mb-[1rem]"
              >
                <Input.Password
                  id="password"
                  name="password"
                  placeholder="Nhập mật khẩu"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              {/* Xác nhận Mật khẩu */}
              <Form.Item
                label="Xác nhận mật khẩu"
                validateStatus={formik.touched.confirmPassword && formik.errors.confirmPassword ? "error" : ""}
                help={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}
                className="mb-[1rem]"
              >
                <Input.Password
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Xác nhận mật khẩu"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              {/* Quên mật khẩu */}
              <div className="flex justify-end mb-4">
                <NavLink to="/quen-mat-khau" className="text-[1.5rem] text-customColor font-semibold hover:text-purple-800">
                  Quên mật khẩu
                </NavLink>
              </div>

              {/* Nút Đăng kí */}
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full h-16 text-[1.7rem]">
                  Đăng kí
                </Button>
              </Form.Item>
            </Form>

            <p className="mt-4 text-gray-600 text-center text-[1.2rem] 2xl:text-[1.4rem]">
              Bạn đã có tài khoản? {" "}
              <NavLink to="/dang-nhap" className="text-purple-600 hover:text-purple-800">
                Đăng nhập ngay
              </NavLink>
            </p>
          </div>
        </div>

        {/* Right Section - Advertisement */}
        <div className="hidden lg:block lg:w-[55%] xl:w-[60%] relative overflow-hidden">
          <div className="absolute inset-0 bg-customColor clip-diagonal" />
          <div className="relative top-[40%] left-[65%] translate-x-[-50%] translate-y-[-50%] z-10 text-white p-8 flex flex-col items-center 2xl:flex">
            <div className="mb-8">
              <h1 className="text-[5rem] xl:text-[6rem] font-bold mb-4 text-center drop-shadow-lg">SuperTech</h1>
              <div className="w-32 h-1 bg-white/60 mx-auto rounded-full mb-6"></div>
              <p className="text-[1.8rem] w-[600px] text-center leading-relaxed text-white/90">
                SuperTech là trang website mua sắm trực tuyến với nhiều ưu đãi và khuyến mãi...
              </p>
            </div>
          </div>

          {/* Phone Image */}
          <div className="absolute left-[-9%] top-[20%] z-10 animate-float hidden 2xl:block">
          <div className="relative">
              <div className="absolute inset-5 bg-gradient-to-b from-purple-400/20 to-transparent rounded-[3rem] blur-2xl"></div>
              <img src={dienThoai} alt="iPhone" className="w-[450px] xl:w-[500px] object-contain relative z-10" />
            </div>
          </div>

          <div className="absolute bottom-[-10%] right-0 opacity-20">
            <img src={bgdienThoai} 
          className="w-[400px] md:w-[420px] lg:w-[400px] xl:w-[600px] transition-all duration-300" 
          alt="" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 15% 100%);
        }
      `}</style>
    </div>
  );
}

export default Resigter;
