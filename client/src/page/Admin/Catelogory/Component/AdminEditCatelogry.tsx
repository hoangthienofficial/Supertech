import ImgCrop from 'antd-img-crop';
import React, { useRef, useState } from 'react';
import { BiSolidEdit } from 'react-icons/bi';
import { message, Select, Upload, UploadFile, Button, Modal, Switch } from 'antd';
import { UploadProps } from 'antd/lib';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useAppDispatch } from '../../../../redux/hooks';
import { putCategoryThunk } from '../../../../redux/catelogry/catelogry.slice';
import toast from 'react-hot-toast';

function AdminEditCatelogry(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const DataCategory = [
    { label: 'Điện thoại', value: 1 },
    { label: 'Laptop', value: 2 },
    { label: 'Sạc dự phòng', value: 3 },
    { label: 'Sạc cáp hub cáp chuyển đổi', value: 4 },
    { label: 'Ốp lưng', value: 5 },
    { label: 'Tai nghe dây bluetooth', value: 6 },
  ];

  const ShowModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dispatch = useAppDispatch();

  const CategorySchema = Yup.object().shape({
    category_name: Yup.string()
      .required('Tên loại không được để trống')
      .min(3, 'Tên loại phải có ít nhất 3 ký tự')
      .max(50, 'Tên loại không được vượt quá 50 ký tự')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Tên loại chỉ được chứa chữ cái, số và khoảng trắng'),
    category_dad: Yup.number()
      .required('Vui lòng chọn danh mục cha')
      .oneOf([1, 2, 3, 4, 5, 6], 'Danh mục cha không hợp lệ'),
  });

  return (
    <>
      <BiSolidEdit
        className='cursor-pointer text-[#9000ff67] transition-all duration-700 hover:text-[#9000ffcb]'
        onClick={ShowModal}
      />

      <Modal
        title="Sửa Danh mục sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Formik
          enableReinitialize
          initialValues={{
            category_name: props?.category?.category_name || '',
            category_dad: props?.category?.category_dad || 0,
            category_task: props?.category?.category_task || 1,
          }}
          validationSchema={CategorySchema}
          onSubmit={(values) => {
            const category_date_task = new Date();
            const data = {
              ...values,
              id: props.category.category_id,
              category_date_task: category_date_task,
            };
            setIsModalOpen(false);
            dispatch(putCategoryThunk(data));
            toast.success("Sửa loại thành công");
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="flex gap-4">
                <div className="flex w-full flex-col gap-4">
                  <label htmlFor="category_name" className="text-[13px] text-[#81818177] font-medium">
                    Tên Loại
                  </label>
                  <Field
                    type="text"
                    name="category_name"
                    className="h-[48px] bg-[#f7f7f7] border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
                  />
                  <ErrorMessage name="category_name" component="div" className="text-red-500" />
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <div className="flex w-full flex-col gap-4">
                  <label htmlFor="category_dad" className="text-[14px] font-medium text-[#4A4A4A] tracking-wide">
                    Loại sản phẩm
                  </label>
                  <Select
                    value={values.category_dad}
                    onChange={(value) => setFieldValue("category_dad", value)}
                    options={DataCategory}
                    className="h-[48px] bg-[#81818113] rounded-lg text-[13px] outline-none"
                  />
                  <ErrorMessage name="category_dad" component="div" className="text-red-500" />
                </div>
              </div>

              <Button type="primary" htmlType="submit" className="mt-4">
                Lưu sản phẩm
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default AdminEditCatelogry;
