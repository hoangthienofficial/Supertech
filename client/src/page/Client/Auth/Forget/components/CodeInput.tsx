import { Button, Form, Input } from 'antd';
import { useFormik } from 'formik';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import CountdownTimer from './CountDown';
import { checkCode } from '../../../../../service/user/user.service';
import useSweetAlert from '../../../../../hooks/Notification.hook';

interface ChildComponentProps {
    updateNumber: (newNumber: number) => void;
}

const CodeInput: React.FC<ChildComponentProps> = ({ updateNumber }) => {
    const navigate = useNavigate();
    const { showAlert } = useSweetAlert();
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [code, setCode] = useState<string[]>(Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const formik = useFormik({
        initialValues: {
            code: "",
        },
        validationSchema: Yup.object({
            code: isCodeSent ? Yup.string().required("Mã xác thực là bắt buộc") : Yup.string(),
        }),
        onSubmit: async (values) => {
            const response = await checkCode(values);
            if (response.data.message == "Code hợp lệ") {
                updateNumber(3);
            } else {
                showAlert("success", response.data.message);
            }
        }
    });

    const handleChange = (index: number, value: string) => {
        const newCode = [...code];
        newCode[index] = value.replace(/[^0-9a-zA-Z]/g, '').slice(0, 1);
        setCode(newCode);
        formik.setFieldValue('code', newCode.join(""));

        if (value.length === 1 && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            // Nếu ô hiện tại trống và nhấn Backspace, focus vào ô trước đó
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        const newCode = [...code];
        
        for (let i = 0; i < pastedData.length; i++) {
            if (i < 6) {
                newCode[i] = pastedData[i];
            }
        }
        
        setCode(newCode);
        formik.setFieldValue('code', newCode.join(""));
    };

    return (
        <Form layout="vertical" className="sign-edit" onFinish={formik.handleSubmit}>
            <CountdownTimer />
            
            <div className="flex flex-col items-center mt-1">
                <label className="text-[1.3rem] text-gray-700 mb-3 mt-2">
                    Nhập mã xác thực
                </label>
                
                <div className="flex gap-2 justify-center mb-4" onPaste={handlePaste}>
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => inputRefs.current[index] = el}
                            type="text"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-[69px] h-[40px] text-center text-[1.5rem] font-semibold 
                                     border-2 border-purple-500  rounded-lg focus:border-purple-500 
                                     focus:outline-none transition-all duration-300
                                     hover:border-purple-400"
                            maxLength={1}
                        />
                    ))}
                </div>

                {formik.touched.code && formik.errors.code && (
                    <div className="text-red-500 text-[1.2rem] mb-4">
                        {formik.errors.code}
                    </div>
                )}

                <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="w-[100%] h-[4rem] text-[1.7rem]"
                >
                    Gửi mã xác nhận
                </Button>
            </div>
        </Form>
    );
};

export default CodeInput;