import dienThoai from '../asset/dienthoaisign.png'
import bgdienThoai from '../asset/dienthoai.png'
import { Button, Form, Input } from "antd";
import { FaArrowLeft, FaFacebookF, FaGoogle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import '../css/formSign.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../../../service/auth/auth.service";
import { saveLocalStorage } from "../../../../utils";
import { useAppDispatch } from "../../../../redux/hooks";
import { setLogin, setToken } from "../../../../redux/user/user.slice";
import toast from "react-hot-toast";
import { TPayloadLogin } from "../../../../service/auth/auth.type";

function Login() {
  const navigate = useNavigate();
  const dispatch=useAppDispatch();

  const formik = useFormik({
    initialValues: {
  
      email: "",
      password: "",
  
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
      password: Yup.string()
        .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
        .required("Mật khẩu là bắt buộc"),
   
    }),
    onSubmit:async (values:TPayloadLogin) => {
     
    
      const res = await login(values);

      if (res.data.message === "Thành công!") {
        toast.success('Đăng nhập thành công')
       
        const token = res.data.content.token; 
        dispatch(setLogin(true))
  
        dispatch(setToken(token))
        window.history.back()
       
      } else {
  toast.error(res.data.message)      }


    },
  });
  return (
<div className="">
  <div className="flex overflow-hidden relative min-h-[100vh] bg-gradient-to-br from-purple-50 to-white">
    <div className="hidden md:block md:w-[55%] xl:w-[60%] relative overflow-hidden">
      <div className="absolute inset-0 bg-customColor clip-diagonal-left" />
      
      <div className="absolute top-8 left-8 z-20">
        <NavLink to="/" className="bg-white/90 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
          <FaArrowLeft className="text-2xl text-customColor"/>
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
          <img 
            src={dienThoai} 
            alt="iPhone" 
            className="w-[500px] object-contain relative z-10 transition-all duration-300" 
          />
        </div>
      </div>

      <div className="absolute bottom-[-10%] left-0 opacity-20">
        <img 
          src={bgdienThoai} 
          className="w-[400px] md:w-[420px] lg:w-[400px] xl:w-[600px] transition-all duration-300" 
          alt="" 
        />
      </div>
    </div>

    <div className="md:hidden top-4 left-4 z-20">
      <NavLink to="/" className="bg-white shadow-lg w-[3rem] h-[3rem] sm:w-[4rem] sm:h-[4rem] rounded-full flex items-center justify-center">
        <FaArrowLeft className="text-[1.5rem] sm:text-[2rem] text-customColor"/>
      </NavLink>
    </div>

    <div className="w-full md:w-[45%] xl:w-[40%] flex justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-[500px] p-3 sm:p-4 2xl:p-8 flex flex-col justify-center z-10">
        <h2 className="text-[2rem] sm:text-[2.5rem] 2xl:text-[3rem] font-bold mb-3 sm:mb-4 text-center">Đăng nhập</h2>
        <p className="mb-3 sm:mb-4 text-gray-600 text-center text-[1.3rem] sm:text-[1.5rem]">Bạn có thể đăng nhập</p>

        <div className="flex gap-2 sm:gap-3 2xl:gap-4 mb-4 sm:mb-6 w-full sm:w-[90%] 2xl:w-[70%] mx-auto">
          <button className="w-1/2 py-2 sm:py-3 2xl:py-5 border text-[1.2rem] sm:text-[1.4rem] 2xl:text-[1.6rem] border-customColor text-customColor flex items-center justify-center rounded-lg">
            <FaFacebookF className="mr-[.5rem]"/>
            <span className="hidden sm:inline">Facebook</span>
          </button>
          <button className="w-1/2 py-2 sm:py-3 2xl:py-5 border text-[1.2rem] sm:text-[1.4rem] 2xl:text-[1.6rem] border-customColor text-customColor flex items-center justify-center rounded-lg">
            <FaGoogle className="mr-[.5rem]"/>
            <span className="hidden sm:inline">Google</span>
          </button>
        </div>

        <Form
          layout="vertical"
          className="sign-edit"
          onFinish={formik.handleSubmit}
        >
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

          <Form.Item
            label="Mật khẩu"
            validateStatus={formik.touched.password && formik.errors.password ? "error" : ""}
            help={formik.touched.password && formik.errors.password ? formik.errors.password : null}
            className="mb-[.5rem]"
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

          <div className="flex justify-end">
            <NavLink to="/quen-mat-khau" className="text-[1.5rem] mb-[.5rem] text-customColor font-semibold hover:text-purple-800">
              Quên mật khẩu
            </NavLink>
          </div>

          <div className="button-edit">
            <Button type="primary" htmlType="submit" className="w-[100%] h-[4rem] text-[1.7rem]">
              Đăng nhập
            </Button>
          </div>
        </Form>

        <p className="mt-4 text-gray-600 text-center text-[1.2rem] 2xl:text-[1.4rem]">
          Bạn chưa có tài khoản? {" "}
          <NavLink to="/dang-ky" className="text-purple-600 hover:text-purple-800">
            Đăng kí ngay
          </NavLink>
        </p>
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
  `}</style>
</div>
  );
}

export default Login;
