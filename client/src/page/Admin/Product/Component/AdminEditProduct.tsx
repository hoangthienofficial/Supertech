import { message, Select, Upload, UploadFile, Button, Modal, Switch, GetProp } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { TbPlaylistAdd } from 'react-icons/tb';
import { UploadProps } from 'antd/lib';
import ImgCrop from 'antd-img-crop';
import { Formik, Form, Field } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { createCategoryThunk, getCatelogryThunk } from '../../../../redux/catelogry/catelogry.slice';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import ModalAdminProduct from './ModalAdminProduct';
import { Input } from '../../../../template/Component/Input/Input';
import { createProductAdminThunk, getProductByIdThunk, putInforProductAdminThunk, removeAllProductColors, removeProductsFromColors, setProductColors } from '../../../../redux/product/product.slice';
import { IMG_BACKEND } from '../../../../constants';
import { IoMdClose } from 'react-icons/io';
import { deleteColorsProduct, getImageProductById, putProductById } from '../../../../service/product/product.service';
import { BiSolidEdit } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

function AdminEditProduct() {
  const { id } = useParams(); // Lấy id từ URL
  const numericId = Number(id); // Ép chuỗi id thành số
  const listProductColor = useAppSelector(state => state.product.productColors);
  const [img,setImg]=useState([]);
  const listCatelogry = useAppSelector(state => state.category.listCatelories);

  const productDetail=useAppSelector((state)=>state.product.productDetail)
  const [productColors,setProductColor] = useState([]);
  
  const dispatch=useAppDispatch()

  const validationSchema = Yup.object({
    product_name: Yup.string().required('Tên sản phẩm là bắt buộc'),
    price: Yup.number().required('Giá sản phẩm là bắt buộc').positive('Giá sản phẩm phải là số dương'),
    category: Yup.string().required('Loại sản phẩm là bắt buộc'),
    discount: Yup.number().required('Giảm giá là bắt buộc').min(0, 'Giảm giá không thể nhỏ hơn 0').max(100, 'Giảm giá không thể lớn hơn 100'),
    hot: Yup.number().required('Trạng thái Hot là bắt buộc').min(0, 'Trạng thái Hot không hợp lệ').max(1, 'Trạng thái Hot không hợp lệ'),
    // infor_screen: Yup.string().required('Thông tin màn hình là bắt buộc'),
    // infor_system: Yup.string().required('Hệ điều hành là bắt buộc'),
    // infor_cpu: Yup.string().required('Thông tin CPU là bắt buộc'),
    // infor_ram: Yup.number().required('Số RAM là bắt buộc').positive('Số RAM phải là số dương'),
    // infor_rom: Yup.number().required('Bộ nhớ trong là bắt buộc').positive('Bộ nhớ trong phải là số dương'),
    // infor_frontCamera: Yup.string().required('Thông tin camera trước là bắt buộc'),
    // infor_rearCamera: Yup.string().required('Thông tin camera sau là bắt buộc'),
    // infor_scanning_frequency: Yup.string().required('Thông tin tần số quét là bắt buộc'),
    // infor_chip_battery: Yup.string().required('Thông tin chip và pin là bắt buộc')
  });
  // console.log(props);
  useEffect(()=>{
    if (!isNaN(numericId)) {
      dispatch(getProductByIdThunk(numericId));
    }
 
  },[numericId,dispatch])

console.log(productDetail.product_name);

  useEffect(() => {
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
  const prevIdsRef = useRef(); // Khai báo useRef để lưu giá trị ids trước đó

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

  useEffect(() => {
    const matchingCategory = formattedCategories?.find(
      (category) => category.value === productDetail.category_id
    );
    if (matchingCategory) {
      setSelectedCategory(matchingCategory.category_dad);
    } else {
       // setSelectedCategory("Không tìm thấy");
    }
 }, [formattedCategories, productDetail.category_id]);
console.log(productDetail);
const imageIds = listProductColor.map((item) => item.image_id);
console.log(imageIds);

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

const navigate=useNavigate();
useEffect(()=>{
  if( productDetail.product_colors){
    dispatch(removeAllProductColors());
    productDetail.product_colors?.map((item)=>{
      
      dispatch(setProductColors({
        color_id:item.color_id,
        color: item.color,
        quantity:     item?.product_qualities[0]?.quality_product || 0
        ,
        image_id: item.image.image_id      , // Include image_id here
        // productStorage: [
        //   {
        //     storage: values.capacity,
        //     storage_price: values.additionalPrice,
        //   }
        // ]
      })
    );
    })
  
    
  }
 
  
},[dispatch, productDetail])
// console.log(item.product_qualities?.quality_product);

  const productColorDelete=async (item:object,id:number)=>{
    const resp=await deleteColorsProduct(id);
    toast.success('Xóa màu sắc thành công');

    
    dispatch(removeProductsFromColors(item.image_id))
  }
console.log(productColors);


  useEffect(() => {
      

    // Kết hợp thông tin màu sắc và hình ảnh
    const combinedList = listProductColor.map(colorItem => {
        const imageItem = img.find(img => img.image_id == colorItem.image_id);
        return {
            ...colorItem,
            image_one: imageItem ? imageItem.image_one : null,
        };
    });

    // Cập nhật vào state
    setProductColor(combinedList);

}, [img, listProductColor]); // Dependency array rỗng, chỉ chạy khi component mount
  
  return (
    <div className='w-[80%] m-auto'>
    
  
        <Formik
          enableReinitialize={true}

      initialValues={{
        category: productDetail.category_id || "",
        price: productDetail.product_price || 123,
        discount: productDetail.product_discount || 0,
        product_name: productDetail.product_name || "",
        hot: productDetail.product_hot || 0,
        moTa: productDetail?.infor_product_infor_product?.infor_more || "",
        infor_screen: productDetail?.infor_product_infor_product?.infor_screen || "",
        infor_system: productDetail?.infor_product_infor_product?.infor_system || "",
        infor_cpu: productDetail?.infor_product_infor_product?.infor_cpu || "",
        infor_ram: productDetail?.infor_product_infor_product?.infor_ram || "",
        infor_rom: productDetail?.infor_product_infor_product?.infor_rom || "",
        infor_frontCamera: productDetail?.infor_product_infor_product?.infor_frontCamera || "",
        infor_rearCamera: productDetail?.infor_product_infor_product?.infor_rearCamera || "",
        infor_scanning_frequency: productDetail?.infor_product_infor_product?.infor_scanning_frequency || "",
        infor_chip_battery: productDetail?.infor_product_infor_product?.infor_chip_battery || "",
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
          product_id: productDetail.product_id,
        };
        dispatch(putInforProductAdminThunk(dataInforProduct));
        resetForm();
        toast.success('Sửa sản phẩm thành công!');
        dispatch(removeAllProductColors());
        navigate("/admin/quan-li-san-pham");
      }}
    >
      {({ setFieldValue, values, handleChange, handleBlur, resetForm, errors, touched }) => (
        <Form className="flex flex-col gap-1">
          {/* Chọn loại sản phẩm */}
          <div className="flex gap-[1%] py-4">
            <div className="flex w-[49%] h-auto flex-col gap-1">
              <label htmlFor="category" className="text-[14px] font-medium text-[#4A4A4A] tracking-wide">Loại sản phẩm</label>
              <Select
                value={values.category || null}
                onChange={(value, category_dad) => {
                  setFieldValue('category', value);
                  handleCategoryChange(category_dad.category_dad);
                }}
                options={formattedCategories}
                placeholder="Mời bạn chọn"
                className="h-[48px] bg-[#81818113] focus:text-[white] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px] outline-none"
              />
              {touched.category && errors.category && <div className="text-red-500">{errors.category}</div>}
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
        {touched.price && errors.price && <div className="text-red-500 text-2xl">{errors.price}</div>}  
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
          {touched.product_name && errors.product_name && <div className="text-red-500 text-2xl">{errors.product_name}</div>}
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
          {touched.hot && errors.hot && <div className="text-red-500 text-2xl">{errors.hot}</div>}
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
          {touched.discount && errors.discount && <div className="text-red-500 text-2xl">{errors.discount}</div>}
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
                        {/* <ErrorMessage name="infor_screen" component="div" className="text-[1.5rem] text-red-500" /> */}

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
        <label htmlFor="infor_frontCamera " className='text-[13px] font-medium'>Thông tin camera trước</label>
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
        <label htmlFor="infor_rearCamera " className='text-[13px] font-medium'>Thông tin camera sau</label>
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
        <label htmlFor="infor_scanning_frequency " className='text-[13px] font-medium'>Thông tin chip và pin</label>
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
        <label htmlFor="infor_chip_battery" className='text-[13px] font-medium'>Thông tin chip và pin</label>
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

<ModalAdminProduct font={1.6}/>
<div className='flex gap-[1rem]'>
{productColors?.map((item) => (
              <div
                  key={item.color}
              
                  className={`relative flex w-[250px] items-center gap-3 border py-4 px-6 rounded-md cursor-pointer hover:shadow-md }`}
              >
                <div className='absolute right-0 top-0 text-[1.5rem] cursor-pointer'
                onClick={(()=>{
                  productColorDelete(item,item.color_id)
                })}
                >
                  <IoMdClose />
                </div>
                  <img 
                      src={`${IMG_BACKEND}/${item.image_one}`}
                      alt={item?.color} 
                      className="w-28 rounded-md"
                  />
                  <div>
                      <h4 className="font-semibold text-[1.7rem]">Màu sắc: {item?.color}</h4>
                      {/* <p className="text-red-500 my-2 font-semibold text-[1.2rem]">Dung lượng: {item.productStorage?.map((item)=>{
                        return item.storage
                      })}</p> */}
                      <p className="text-red-500 font-semibold text-[1.2rem]">Số lượng: {item?.quantity}</p>
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
    navigate("/admin/quan-li-san-pham");
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
  
    </div>
  );
}

export default AdminEditProduct;
