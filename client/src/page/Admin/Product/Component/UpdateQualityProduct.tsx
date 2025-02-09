import React, { useState } from 'react';
import { message, Select, Button, Modal, Tooltip } from 'antd';
import { AiOutlineNumber } from 'react-icons/ai';
import { Formik, Form, Field } from 'formik';
import { useAppDispatch } from '../../../../redux/hooks';
import { updateQualityProductAdminThunk } from '../../../../redux/product/product.slice';
import toast from 'react-hot-toast';

function AdminModalUpdateQualityProduct(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    props.product?.product_colors[0]?.color_id
  ); // Default to first color
  const [quality, setQuality] = useState(
    props.product.product_colors[0]?.product_qualities[0]?.quality_product || 0
  ); // Default to first color's quality

  const dispatch = useAppDispatch();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleColorChange = (value) => {
    setSelectedColor(value);

    // Find quality for the selected color
    const selectedQuality =
      props.product.product_colors.find((color) => color.color_id === value)
        ?.product_qualities[0]?.quality_product || 0;
    setQuality(selectedQuality);
  };

  return (
    <>

<Tooltip placement="top" title="Nhập kho">
<AiOutlineNumber
className='cursor-pointer flex justify-center items-center'
        onClick={showModal}
        style={{ marginRight: '5px', color: 'blue', fontSize: '18px' }}
      />
          </Tooltip>


      <Modal
        title="Cập nhật số lượng"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Formik
          initialValues={{
            quality_product: quality,
          }}
          enableReinitialize
          onSubmit={(values) => {
            const data = {
              ...values,
              color_id: selectedColor,
            };
            dispatch(updateQualityProductAdminThunk(data));
            toast.success('Cập nhật thành công');
            setIsModalOpen(false);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="flex flex-col gap-4">
                <div className="flex w-full flex-col gap-4">
                  <label
                    htmlFor="color_id"
                    className="text-[13px] text-[#81818177] font-medium"
                  >
                    Chọn màu sắc
                  </label>
                  <Select
                    className="w-full"
                    placeholder="Chọn màu sắc"
                    onChange={(value) => {
                      handleColorChange(value);
                      setFieldValue('quality_product', quality); // Update form value
                    }}
                    value={selectedColor}
                    options={props.product.product_colors.map((color) => ({
                      label: color.color,
                      value: color.color_id,
                    }))}
                  />
                </div>

                <label
                  htmlFor="quality_product"
                  className="text-[13px] text-[#81818177] font-medium"
                >
                  Số lượng
                </label>
                <Field
                  type="number"
                  name="quality_product"
                  value={values.quality_product}
                  onChange={(e) => setFieldValue('quality_product', e.target.value)}
                  className="h-[48px] bg-[#f7f7f7] border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
                />
              </div>

              <Button type="primary" htmlType="submit" className="mt-4">
                Cập nhật
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default AdminModalUpdateQualityProduct;
