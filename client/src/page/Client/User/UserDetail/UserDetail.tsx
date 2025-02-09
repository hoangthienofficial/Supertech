import { useEffect, useRef } from "react";
import "../../../../components/Style/formEdit.css";
import { FaEdit } from "react-icons/fa";
import { Form as AntForm, Input, Radio, DatePicker } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  getUserThunk,
  updateUserDetailThunk,
} from "../../../../redux/user/user.slice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ImageUploader from "./Component/ChangeImage";
import { Link, NavLink } from "react-router-dom";
import "./css/ModalEdit.css";
import moment from "dayjs";
import toast from "react-hot-toast";
import ModalChangePassword from "./Component/ModalChangePassword";
import { formatDate } from "../../../../utils";

// Yup schema validation
const validationSchema = Yup.object().shape({
  user_name: Yup.string().required("Vui lòng nhập họ và tên"),
  user_phone: Yup.number()
    .typeError("Số điện thoại phải là một số")
    .required("Vui lòng nhập số điện thoại"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhp email"),
  user_address: Yup.string().required("Vui lòng nhập địa chỉ"),
  gender: Yup.string().required("Vui lòng chọn giới tính"),
  date: Yup.string().required("Vui lòng nhập ngày sinh"),
});

function UserDetail() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  // Add a ref to the Formik component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formikRef = useRef<any>(null);

  const handleClickSubmit = () => {
    // Kiểm tra xem form có hợp lệ và không có lỗi nào
    if (
      formikRef.current &&
      formikRef.current.isValid &&
      Object.keys(formikRef.current.errors).length === 0
    ) {
      formikRef.current.submitForm(); // Nếu hợp lệ, gửi dữ liệu
      toast.success("Cập nhận thành công."); // Hiển thị thông báo nếu form không hợp lệ
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin."); // Hiển thị thông báo nếu form không hợp lệ
    }
    // if(formikRef.current.values.user_address=='chưa cập nhật'){
    //   toast.error("Vui lòng nhập địa chỉ cập nhật."); // Hiển thị thông báo nếu form không h��p lệ
    // }
  };
  const handleSubmit = (values: any) => {
    if (formikRef.current.values) {
      dispatch(updateUserDetailThunk(values));
      dispatch(getUserThunk());
      console.log(formikRef.current.values);
    }
  };

  return (
    <div className="pt-[1rem] px-[1rem] md:px-[2rem]">
      <div>
        <div className="flex flex-col md:flex-row justify-between gap-[1rem] md:gap-0">
          <div>
            <h4 className="text-[1.8rem] md:text-[2.2rem] font-semibold">
              Hồ sơ của tôi
            </h4>
            <p className="text-[1.6rem] md:text-[1.8rem] pt-[.5rem]">
              Quản lí hồ sơ để bảo mật tài khoản
            </p>
          </div>
          <button
            onClick={() => handleClickSubmit()} // Trigger submit externally
            className="text-[1.7rem] rounded-[5px] flex gap-[.5rem] bg-customColor h-[3.5rem] justify-center items-center px-[1.3rem] text-white"
          >
            <FaEdit />
            Sửa
          </button>
        </div>

        <div className="border-t-customColor border border-transparent mt-[1.5rem]">
          <div className="flex flex-col md:flex-row">
            <div className="border-b-customColor md:border-b-transparent md:border-r-customColor flex flex-col justify-between p-[1rem] md:pr-[3rem] border border-transparent">
              <div className="flex flex-col items-center">
                <ImageUploader />
              </div>
              <div className="text-[1.5rem] md:text-[1.7rem] text-center mt-[2rem] md:mt-0">
                Tham gia vào ngày:
                <p className="mt-[.3rem] font-semibold">
                  {user ? formatDate(user.user_time) : "Chưa có thông tin"}
                </p>
              </div>
            </div>

            <div className="md:p-[2rem] w-[100%] ">
              <Formik
                innerRef={formikRef} // Assign the ref here
                initialValues={{
                  user_name: user?.user_name || "",
                  user_phone: user?.user_phone || "Chưa cập nhật",
                  email: user?.user_email || "",
                  user_address: user?.user_address || "Chưa cập nhật",
                  gender: String(user?.user_gender) || "1",
                  date: user?.user_birth || "", // Ensure date is part of the initial values
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, errors, touched, values }) => (
                  <Form className="formEdit w-[100%]">
                    <div className="w-[100%]">
                      <AntForm.Item label="Họ và tên">
                        <Field name="user_name" as={Input} />
                        {errors.user_name && touched.user_name ? (
                          <div className="error text-red-600">
                            {errors.user_name}
                          </div>
                        ) : null}
                      </AntForm.Item>
                    </div>
                    <div className="md:flex w-[100%] justify-between">
                      <AntForm.Item
                        className="md:w-[49%]"
                        label="Số điện thoại"
                      >
                        <Field name="user_phone" as={Input} />
                        {errors.user_phone && touched.user_phone ? (
                          <div className="error text-red-600">
                            {errors.user_phone}
                          </div>
                        ) : null}
                      </AntForm.Item>

                      <AntForm.Item className="md:w-[49%]" label="Email">
                        <Field name="email" as={Input} />
                        {errors.email && touched.email ? (
                          <div className="error text-red-600">
                            {errors.email}
                          </div>
                        ) : null}
                      </AntForm.Item>
                    </div>

                    <AntForm.Item label="Địa chỉ">
                      <Field name="user_address" as={Input} />
                      {errors.user_address && touched.user_address ? (
                        <div className="error text-red-600">
                          {errors.user_address}
                        </div>
                      ) : null}
                    </AntForm.Item>

                    <AntForm.Item label="Giới tính">
                      <Field name="gender">
                        {({ field }) => (
                          <Radio.Group
                            {...field}
                            onChange={(e) =>
                              setFieldValue("gender", e.target.value)
                            } // Cập nhật giá trị khi thay đổi
                            value={String(values.gender)} // Đảm bảo giá trị trong Formik là chuỗi
                          >
                            <Radio value="1">Nam</Radio>
                            <Radio value="2">Nữ</Radio>
                            <Radio value="3">Khác</Radio>
                          </Radio.Group>
                        )}
                      </Field>
                      {errors.gender && touched.gender ? (
                        <div className="error text-red-600">
                          {errors.gender}
                        </div>
                      ) : null}
                    </AntForm.Item>
                    <div className="flex">
                      <AntForm.Item label="Ngày sinh" className="w-[100%]">
                        <DatePicker
                          className="w-[100%]"
                          value={values.date ? moment(values.date) : null} // Set the selected date
                          onChange={(date, dateString) => {
                            // Cập nhật giá trị trong Formik
                            setFieldValue("date", dateString);

                            // Kiểm tra tuổi
                            if (date) {
                              const birthYear = date.year();
                              const currentYear = moment().year();
                              const age = currentYear - birthYear;

                              if (age < 10 || age > 80) {
                                toast.error(
                                  "Tuổi phải nằm trong khoảng từ 10 đến 80."
                                );
                                setFieldValue("date", ""); // Reset giá trị nếu không hợp lệ
                              }
                            }
                          }}
                        />
                      </AntForm.Item>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="flex justify-end gap-[1rem] mt-[1.5rem]">
                <ModalChangePassword />
                <button
                  type="button"
                  onClick={() => handleClickSubmit()} // Submit manually
                  className="p-[1rem] border text-[1.6rem] border-customColor text-customColor"
                >
                  Cập nhật
                </button>
                {user?.user_role !== 11 ? (
                  <Link
                    className="p-[1rem] border text-[1.6rem] border-customColor text-customColor"
                    to="/admin"
                  >
                    Admin
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
