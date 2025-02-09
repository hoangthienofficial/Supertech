import { Button, Form, Input } from 'antd';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  infor_product: Yup.string().required('Thông tin sản phẩm không được để trống'),
  infor_screen: Yup.string().required('Thông tin màn hình không được để trống'),
  infor_system: Yup.string().required('Thông tin hệ điều hành không được để trống'),
  infor_cpu: Yup.string().required('Thông tin CPU không được để trống'),
  infor_ram: Yup.number().min(0, 'Số RAM không hợp lệ').required('Số RAM không được để trống'),
  infor_compan: Yup.string().required('Thông tin công ty không được để trống'),
  infor_rom: Yup.number().min(0, 'Bộ nhớ trong không hợp lệ').required('Bộ nhớ trong không được để trống'),
  infor_frontCamera: Yup.string().required('Thông tin camera trước không được để trống'),
  infor_rearCamera: Yup.string().required('Thông tin camera sau không được để trống'),
  infor_scanning_frequency: Yup.string().required('Thông tin tần số quét không được để trống'),
  infor_chip_battery: Yup.string().required('Thông tin chip và pin không được để trống'),
  infor_more: Yup.string().required('Thông tin thêm không được để trống'),
});

const FormikProductInforForm = ({ onSubmit }: { onSubmit: (values: any) => void }) => {
  const handleInputChange = (field, value) => {
    setFieldValue(field, value);
  };

  return (
    <Formik
      initialValues={{
      
        infor_screen: '',
        infor_system: '',
        infor_cpu: '',
        infor_ram: 0,
        infor_compan: '',
        infor_rom: 0,
        infor_frontCamera: '',
        infor_rearCamera: '',
        infor_scanning_frequency: '',
        infor_chip_battery: '',
        infor_more: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values); // Gửi dữ liệu lên component cha
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur,handleSubmit }) => (
        <Form onFinish={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
              <div className="flex h-auto flex-col gap-4">
              <label htmlFor="infor_screen" className="text-[13px] font-medium">Thông tin màn hình</label>
                  
                        <Field
              name="infor_screen"
              type="text"
              as={Input}
              value={values.infor_screen}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Kích thước màn hình"
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
              />
                        <ErrorMessage name="infor_screen" component="div" className="text-[1.5rem] text-red-500" />

              </div>
             
              <div className="flex h-auto flex-col gap-4">
                <label htmlFor="os" className="text-[13px] font-medium">Hệ điều hành</label>
            <Field
              name="infor_system"
              type="text"
              as={Input}
              value={values.infor_system}
              onChange={handleChange}
              onBlur={handleBlur}
              placehorder="Hệ điều hành"
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            />
              </div>
              <div className="flex h-auto flex-col gap-4">
              <label htmlFor="infor_ram" className="text-[13px] font-medium">Thông tin CPU</label>
              <Field
              name="infor_cpu"
              type="text"
              as={Input}
              value={values.infor_cpu}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            />
              </div>
            
           
              
            </div>
      


          <div className='grid grid-cols-2 gap-4'>
        <div className="flex h-auto flex-col gap-4">
              <label htmlFor="infor_screen" className="text-[13px] font-medium">Số RAM</label>
                  
              <Field
              name="infor_ram"
              type="number"
              as={Input}
              value={values.infor_ram}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            />

              </div>
        <div className="flex h-auto flex-col gap-4">
        <label htmlFor="infor_rom" className="text-[13px] font-medium">Bộ nhớ trong</label>
            <Field
              name="infor_rom"
              type="number"
              as={Input}
              value={values.infor_rom}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            />

              </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
        <div className="flex h-auto flex-col gap-4">
        <label htmlFor="infor_frontCamera">Thông tin camera trước</label>
            <Field
              name="infor_frontCamera"
              type="text"
              as={Input}
              value={values.infor_frontCamera}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            />

              </div>
        <div className="flex h-auto flex-col gap-4">
        <label htmlFor="infor_rearCamera">Thông tin camera sau</label>
            <Field
              name="infor_rearCamera"
              type="text"
              as={Input}
              value={values.infor_rearCamera}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            />
              </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
        <div className="flex h-auto flex-col gap-4">
        <label htmlFor="infor_scanning_frequency">Thông tin chip và pin</label>
            <Field
              name="infor_scanning_frequency"
              type="text"
              as={Input}
              value={values.infor_scanning_frequency}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            />
              </div>
        <div className="flex h-auto flex-col gap-4">
        <label htmlFor="infor_chip_battery">Thông tin chip và pin</label>
            <Field
              name="infor_chip_battery"
              type="text"
              as={Input}
              value={values.infor_chip_battery}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            />
              </div>
   
        </div>

      


          

     
       

        </Form>
      )}
    </Formik>
  );
};

export default FormikProductInforForm;
