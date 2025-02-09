import { message, Select, Upload, UploadFile, Button, Modal, Switch, GetProp } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { TbPlaylistAdd } from 'react-icons/tb';
import { UploadProps } from 'antd/lib';
import * as Yup from 'yup';
import ImgCrop from 'antd-img-crop';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { createCategoryThunk, getCatelogryThunk } from '../../../../redux/catelogry/catelogry.slice';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import ModalAdminProduct from './ModalAdminProduct';
import { Input } from '../../../../template/Component/Input/Input';
import { createProductAdminThunk, removeAllProductColors, removeProductsFromColors } from '../../../../redux/product/product.slice';
import { IMG_BACKEND } from '../../../../constants';
import { IoMdClose } from 'react-icons/io';
import { getImageProductById } from '../../../../service/product/product.service';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

function AdminAddProduct() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const listProductColor = useAppSelector(state => state.product.productColors);
  const [img,setImg]=useState([]);
  const DataCategory = [
    { label: 'Điện thoại', value: 1 },
    { label: 'Laptop', value: 2 },
    // Add more categories as needed
  ];
  const dispatch=useAppDispatch()

  const validationSchema = Yup.object().shape({
    category: Yup.string().required('Loại sản phẩm là bắt buộc'),
    price: Yup.number()
      .required('Giá sản phẩm là bắt buộc')
      .positive('Giá sản phẩm phải là số dương')
      .integer('Giá sản phẩm phải là số nguyên'),
    product_name: Yup.string().required('Tên sản phẩm là bắt buộc'),
    // hot: Yup.number()
    //   .required('Trường hot là bắt buộc')
    //   .integer('Trường hot phải là số nguyên'),
    // infor_screen: Yup.string().required('Thông tin màn hình là bắt buộc'),
    // infor_system: Yup.string().required('Hệ điều hành là bắt buộc'),
    // infor_cpu: Yup.string().required('Thông tin CPU là bắt buộc'),
    // infor_ram: Yup.number()
    //   .required('Số RAM là bắt buộc')
    //   .positive('Số RAM phải là số dương')
    //   .integer('Số RAM phải là số nguyên'),
    // infor_rom: Yup.number()
    //   .required('Bộ nhớ trong là bắt buộc')
    //   .positive('Bộ nhớ trong phải là số dương')
    //   .integer('Bộ nhớ trong phải là số nguyên'),
    // infor_frontCamera: Yup.string().required('Thông tin camera trước là bắt buộc'),
    // infor_rearCamera: Yup.string().required('Thông tin camera sau là bắt buộc'),
    // infor_scanning_frequency: Yup.string().required('Thông tin chip và pin là bắt buộc'),
    // infor_chip_battery: Yup.string().required('Thông tin chip và pin là bắt buộc'),
  });
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const prevIdsRef = useRef(); // Khai báo useRef để lưu giá trị ids trước đó
  const listCatelogry = useAppSelector(state => state.category.listCatelories);
  

  useEffect(() => {
        dispatch(removeAllProductColors());
    
    dispatch(getCatelogryThunk(""));
  }, [dispatch]);

  const formattedCategories = listCatelogry?.map(category => ({
    value: category.category_id,
    label: category.category_name,
    category_dad: category.category_dad
  }));
  const Datahe = [
    {
      value: '1',
      label: 'Ios',
    },
    {
      value: '2',
      label: 'Android',
    },
    {
      value: '3',
      label: 'HDD Level 3',
    },
  ];

  const Datagiamgia = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 10,
      label: '10%',
    },
   
    {
      value: 5,
      label: '5%',
    },
    

  ]
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (category_dad) => {
    setSelectedCategory(category_dad);
  };

  // const ids = [714, 715]; // Các ID cần lấy
  const imageIds = listProductColor.map((item) => item.image_id);

  useEffect(() => {
    const fetchApi = async () => {
      const responsive = await getImageProductById(imageIds); // Gọi API với imageIds
      if (responsive.status === 200) {
        setImg(responsive.data.content);
      }
    };

    // Chỉ gọi API nếu imageIds thay đổi
    if (JSON.stringify(imageIds) !== JSON.stringify(prevIdsRef.current)) {
      fetchApi();
      prevIdsRef.current = imageIds; // Lưu giá trị imageIds hiện tại vào ref
    }
  }, [imageIds]);


  
  return (
    <>
      <Button onClick={showModal} className="p-10" type="primary">
        <TbPlaylistAdd className="text-[18px]" />Thêm sản phẩm mới
      </Button>
       
      <Modal
        title="Danh mục sản phẩm mới"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Formik
          initialValues={{
            category: '',
            price: '',
            discount: 0,
            product_name: "",
            hot: 0,
            quantity: 0,
            moTa: "",
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
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const dataInforProduct = {
              infor_screen: values.infor_screen,
              infor_system: values.infor_system,
              infor_cpu: values.infor_cpu,
              infor_ram: values.infor_ram,
              infor_more: values.moTa,
              product_name: values.product_name,
              product_price: values.price,
              product_hot: values.hot,
           
              product_discount: values.discount,
              category_id: values.category,
              listProductColor: listProductColor,
            };
        console.log(dataInforProduct);
        dispatch(createProductAdminThunk(dataInforProduct))
        toast.success('Thêm sản phẩm thành công!');
        resetForm();
        handleCancel(); // Đóng modal
        dispatch(removeAllProductColors())


          }}
        >
             {({ setFieldValue, values,handleChange,handleBlur,resetForm }) => (
    <Form className="flex flex-col gap-1">
      {/* Chọn loại sản phẩm */}
      <div className="flex gap-[1%] py-4">
      <div className="flex w-[49%] h-auto flex-col gap-1">
  <label htmlFor="category" className="text-[14px] font-medium text-[#4A4A4A] tracking-wide">Loại sản phẩm</label>
  <Select
    value={values.category || null}  // Set initial value to null or undefined
    onChange={(value, category_dad) => {
      setFieldValue('category', value);
      handleCategoryChange(category_dad.category_dad);
    }}  // Update Formik state when changed
    options={formattedCategories}
    placeholder="Mời bạn chọn"  // Set the placeholder text
    className="h-[48px] bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px] outline-none"
  />
  <ErrorMessage name="category" component="div" className="text-[1.5rem] text-red-500" />
</div>
        {/* Nhập giá sản phẩm */}
        <div className="flex w-[49%] h-auto flex-col gap-1">
          <label htmlFor="price" className="text-[14px] font-medium text-[#4A4A4A] tracking-wide">Giá sản phẩm</label>
          <Field
            type="number"
            name="price"
            className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            placeholder="Nhập giá sản phẩm"
          />
          <ErrorMessage name="price" component="div" className="text-[1.5rem] text-red-500" />
        </div>
     
      </div>
       <div className="flex w-[100%] h-auto flex-col gap-1 py-4">
          <label htmlFor="price" className="text-[14px] font-medium text-[#4A4A4A] tracking-wide">Tên sản phẩm</label>
          <Field
            type="text"
            name="product_name"
            className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            placeholder="Nhập tên sản phẩm"
          />
          <ErrorMessage name="product_name" component="div" className="text-[1.5rem] text-red-500" />
        </div>
        <div className='flex gap-[1%] py-4'>
        <div className="flex w-[49%] h-auto flex-col gap-1">
          <label htmlFor="hot" className="text-[14px] font-medium text-[#4A4A4A] tracking-wide">Hot</label>
          <Field
            type="text"
            name="hot"
            className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            placeholder="Nhập tên sản phẩm"
          />
          <ErrorMessage name="hot" component="div" className="text-[1.5rem] text-red-500" />
        </div>
          {/* Chọn mức giảm giá */}
          <div className="flex w-[49%] h-auto flex-col gap-1">
          <label htmlFor="hot" className="text-[14px] font-medium text-[#4A4A4A] tracking-wide">Giảm giá</label>
          <Select
            value={values.discount}  // bind value to Formik state
            onChange={(value) => setFieldValue('discount', value)}  // update Formik state when changed
            options={Datagiamgia}
            className="h-[48px] bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px] outline-none"
          />
        </div>
        </div>

        {(selectedCategory == '1' || selectedCategory == '2') && (
        <div>
        <div className="grid grid-cols-3 gap-1 py-4">
              <div className="flex h-auto flex-col gap-1">
              <label htmlFor="infor_screen" className="text-[14px] font-medium">Thông tin màn hình</label>
                  
                        <Field
              name="infor_screen"
              type="text"
       
              value={values.infor_screen}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Kích thước màn hình"
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:z-30 focus:scale-105 focus:border-[#4A90E2]"
              />
                        <ErrorMessage name="infor_screen" component="div" className="text-[1.5rem] text-red-500" />

              </div>
             
              <div className="flex h-auto flex-col gap-1">
                <label htmlFor="os" className="text-[13px] font-medium">Hệ điều hành</label>
            <Field
              name="infor_system"
              type="text"
       
              value={values.infor_system}
              onChange={handleChange}
              onBlur={handleBlur}
              placehorder="Hệ điều hành"
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            />
              </div>
              <div className="flex h-auto flex-col gap-1">
              <label htmlFor="infor_ram" className="text-[13px] font-medium">Thông tin CPU</label>
              <Field
              name="infor_cpu"
              type="text"
       
              value={values.infor_cpu}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            />
              </div>
            
           
              
            </div>
      


          <div className='grid grid-cols-2 gap-1 py-4'>
        <div className="flex h-auto flex-col gap-1">
              <label htmlFor="infor_screen" className="text-[13px] font-medium">Số RAM</label>
                  
              <Field
              name="infor_ram"
              type="number"
       
              value={values.infor_ram}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            />

              </div>
        <div className="flex h-auto flex-col gap-1">
        <label htmlFor="infor_rom" className="text-[13px] font-medium">Bộ nhớ trong</label>
            <Field
              name="infor_rom"
              type="number"
       
              value={values.infor_rom}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            />

              </div>
        </div>

        <div className='grid grid-cols-2 gap-1 py-4'>
        <div className="flex h-auto flex-col gap-1">
        <label htmlFor="infor_frontCamera">Thông tin camera trước</label>
            <Field
              name="infor_frontCamera"
              type="text"
       
              value={values.infor_frontCamera}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            />

              </div>
        <div className="flex h-auto flex-col gap-1">
        <label htmlFor="infor_rearCamera">Thông tin camera sau</label>
            <Field
              name="infor_rearCamera"
              type="text"
       
              value={values.infor_rearCamera}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            />
              </div>
        </div>
        <div className='grid grid-cols-2 gap-1 py-4'>
        <div className="flex h-auto flex-col gap-1">
        <label htmlFor="infor_scanning_frequency">Thông tin chip và pin</label>
            <Field
              name="infor_scanning_frequency"
              type="text"
       
              value={values.infor_scanning_frequency}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            />
              </div>
        <div className="flex h-auto flex-col gap-1">
        <label htmlFor="infor_chip_battery">Thông tin chip và pin</label>
            <Field
              name="infor_chip_battery"
              type="text"
       
              value={values.infor_chip_battery}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none transition duration-300 ease-in-out transform focus:scale-105 focus:border-[#4A90E2]"
            />
              </div>
   
        </div>

      


          

     
       

        </div>
   )}

<ModalAdminProduct/>
<div>
{listProductColor?.map((item) => (
              <div
                  key={item.color}
              
                  className={`relative flex w-[25%] items-center gap-3 border py-4 px-6 rounded-md cursor-pointer hover:shadow-md }`}
              >
                <div className='absolute right-0 top-0 text-[1.5rem] cursor-pointer'
                onClick={(()=>{
                  dispatch(removeProductsFromColors(item.image_id))
                })}
                >
                  <IoMdClose />
                </div>
                  <img 
                      src={`${IMG_BACKEND}/${img[0]?.image_one}`}
                      alt={item?.color} 
                      className="w-20 rounded-md"
                  />
                  <div>
                      <h4 className="font-semibold text-[1.5rem]">Màu sắc: {item?.color}</h4>
                      <p className="text-red-500 font-semibold text-[1.2rem]">Dung lượng: {item.productStorage?.map((item)=>{
                        return item.storage
                      })}</p>
                  </div>
              </div>
          ))}
</div>
<div className="bg-white shadow-lg rounded-xl p-[12px] gap-3 flex flex-col py-4">
  <div className="col-span-3 flex flex-col gap-1">
    <label htmlFor="moTa" className="text-[13px] text-[#81818177] font-medium">Mô tả</label>
    <ReactQuill
      theme="snow"
      value={values.moTa}
      onChange={(value) => setFieldValue('moTa', value)}  // update Formik state when changed
      modules={{
        toolbar: toolbarOptions,
      }}
      className="bg-[#81818113] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-sm p-2 h-[500px] overflow-y-auto" // Set height to 500px and keep border-radius
    />
  </div>
</div>

      {/* Submit Button */}
      <div className='flex gap-[2rem]'>
      <Button 
  type="primary" 
  htmlType="submit" 
  className="mt-4"
  style={{
    height: "48px",
    fontSize: "16px",
    borderRadius: "8px",
    padding: "0 16px",
  }}
>
  Lưu sản phẩm
</Button>

<Button
  type="dashed"
  onClick={() => {
    dispatch(removeAllProductColors());
    resetForm();
    handleCancel();
  }}
  style={{
    height: "48px",
    fontSize: "16px",
    borderRadius: "8px",
    padding: "0 16px",
  }}
  className="mt-4"
>
  Cancel
</Button>
      </div>

      
    </Form>
  )}
        </Formik>
      </Modal>
    </>
  );
}

export default AdminAddProduct;
