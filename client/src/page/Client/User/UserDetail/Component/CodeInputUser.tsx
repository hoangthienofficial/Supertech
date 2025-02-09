/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

import { checkCode, checkEmail } from '../../../../../service/user/user.service';
import useSweetAlert from '../../../../../hooks/Notification.hook';
import CountdownTimer from '../../../Auth/Forget/components/CountDown';
import { useAppSelector } from '../../../../../redux/hooks';
import toast from 'react-hot-toast';

interface ChildComponentProps {
    updateNumber: (newNumber: number) => void;
}

function CodeInputUser({ updateNumber }: ChildComponentProps) {
    const navigate = useNavigate();
    const { showAlert } = useSweetAlert();
    const user = useAppSelector((state) => state.user.user);
    const [code, setCode] = useState<string[]>(Array(6).fill("")); // Mảng để lưu mã xác thực

    const formik = useFormik({
        initialValues: {
            code: "", // Trường cho mã xác thực
        },
        validationSchema: Yup.object({
            code: Yup.string().required("Mã xác thực là bắt buộc"),
        }),
        onSubmit: async (values) => {
            const response = await checkCode(values);
            if (response.data.message === "Code hợp lệ") {
                showAlert("success", "Xác thực thành công");
                updateNumber(4);
            } else {
                showAlert("error", response.data.message);
            }
        }
    });

    const handleChange = (index: number, value: string) => {
        const newCode = [...code];
        newCode[index] = value.replace(/[^0-9a-zA-Z]/g, '').slice(0, 1); // Chỉ cho phép 1 ký tự
        setCode(newCode);

        // Cập nhật giá trị cho Formik
        formik.setFieldValue('code', newCode.join(""));

        if (value.length === 1 && index < 5) {
            // Tự động chuyển đến ô tiếp theo nếu có ký tự
            const nextInput = document.getElementById(`code-input-${index + 1}`);
            nextInput?.focus();
        }
    };

    const values = {
        email: user?.user_email
    };

    const sendOTP = async ()  => {
        try {
            const response = await checkEmail(values);
            if (response.data.message === "Code sent successfully") {
                toast.success("Mã OTP đã được gửi đến email của bạn")
                localStorage.setItem('otpSent', 'true'); // Đánh dấu OTP đã được gửi
            } else {
                showAlert("error", response.data.message);
            }

        } catch (error) {
            showAlert("error", "Có lỗi xảy ra khi gửi mã OTP");
        }
    };

    useEffect(() => {
        // Kiểm tra nếu OTP chưa được gửi thì gửi OTP
        if (user?.user_email) {
            sendOTP();
        }

        // Khi component bị unmount, xóa trạng thái OTP đã gửi
        return () => {
            localStorage.removeItem('otpSent');
        };
    }, [ user]);

    return (
        <Form layout="vertical" className="sign-edit" onFinish={formik.handleSubmit}>
            <>
                <CountdownTimer />
                <div className="mb-[1rem]">
                    <label className="block mb-[0.5rem] text-[1.2rem] text-gray-700">Mã xác thực</label>
                    <div className="flex gap-2 justify-center">
                        {code.map((digit, index) => (
                            <Input
                                key={index}
                                id={`code-input-${index}`}
                                name={`code-${index}`}
                                placeholder=""
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                className="py-[1rem] text-[1.5rem] text-center w-[60px] h-[60px] border border-gray-300 rounded"
                                maxLength={1}
                            />
                        ))}
                    </div>
                    {formik.touched.code && formik.errors.code && (
                        <div className="mt-[0.5rem] text-red-500 text-[1rem]">
                            {formik.errors.code}
                        </div>
                    )}
                </div>
            </>
            <div className="button-edit">
                <Button type="primary" htmlType="submit" className="w-[100%] h-[4rem] text-[1.7rem]">
                    Gửi mã xác nhận
                </Button>
            </div>
        </Form>
    );
}

export default CodeInputUser;
