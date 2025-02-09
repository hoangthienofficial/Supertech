import React, { useEffect, useState } from "react";
import { Container } from "../../../components/Style/Container";
import { FaStar } from "react-icons/fa";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { IoIosReturnRight } from "react-icons/io";
import { Rate, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { data } from "./data";
import Comment from "./Component/Comment";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getProductByIdThunk } from "../../../redux/product/product.slice";
import { getCommentByIdProductThunk, setcomment } from "../../../redux/comment/comment.slice";
import CommentForm from "./Component/CommentForm";
import ProductColor from "./Component/ProductColor";
import { IMG_BACKEND, timeLoading, URL_BACKEND } from "../../../constants";
import { addItemToCart, addItemToOrder } from "../../../redux/cart/cart.slice";
import { formatCurrencyVND } from "../../../utils";
import LoadingDetailProduct from "./Component/Loading/ProductDetailLoading";
import parse from "html-react-parser";
import toast from "react-hot-toast";



function DetailProduct() {
  const { id } = useParams(); // Lấy id từ URL
  const numericId = Number(id); // Ép chuỗi id thành số
  const navigate=useNavigate();
  
  const dispatch=useAppDispatch();
  const handleAddItem = (product: any) => {

    const productToCart = {
      ...product,
      selectedColor: objectColor,
      selectedStorage: objectStorage,
      selectedQuantity: objectColor?.product_qualities[0]?.quality_product
    };
    dispatch(addItemToCart(productToCart));

    toast.success('Thêm sản phẩm thành công')
      
  };

  const handleAddOrder=(product:any)=>{
    const productToCart = {
      ...product,
      selectedColor: objectColor,
      selectedStorage: objectStorage,
      selectedQuantity: objectColor?.product_qualities[0]?.quality_product
    };
    dispatch(addItemToOrder(productToCart))
    navigate("/thanh-toan")
    
  }
  
  const productDetail=useAppSelector((state)=>state.product.productDetail)
  const socket=useAppSelector((state)=>state.socket.socket)
  const getCommentById=useAppSelector((state)=>state.listComment.listComment)

  // console.log(productDetail);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectetStorage, setSelectedStorage] = useState<any>(null);
 const [objectColor,setOjectColor]=useState<any>(null)
const [objectStorage,setObjectStorage]=useState<any>(null)
console.log(objectColor);
const [arrayImage,setArrayImage]=useState<any>({})

  
  useEffect(()=>{
    if (!isNaN(numericId)) {
      dispatch(getProductByIdThunk(numericId));
      dispatch(getCommentByIdProductThunk(numericId))
    }
 
  },[numericId,dispatch])
  useEffect(() => {
    if (productDetail?.product_colors?.length > 0) {
      const firstColor = productDetail?.product_colors[0];
      setSelectedColor(firstColor?.color);
      setOjectColor(firstColor);
  
      // Cập nhật storage nếu có
      if (firstColor?.product_storages?.length > 0) {
        const firstStorage = firstColor.product_storages[0];
        setObjectStorage(firstStorage);
        setSelectedStorage(firstStorage);
      } else {
        setObjectStorage([]); // Hoặc giá trị mặc định
        setSelectedStorage(null); 
      }
    }
  }, [productDetail]);
console.log(productDetail?.infor_product_infor_product?.infor_more);

const handleColorChange = (color: string) => {
  const newColor = productDetail?.product_colors.find((item) => item.color === color);
  
  if (newColor) {
    setSelectedColor(newColor.color);
    setOjectColor(newColor);

    // Nếu không có product_storages, đặt objectStorage về null
    if (newColor?.product_storages?.length > 0) {
      const firstStorage = newColor.product_storages[0];
      setObjectStorage(firstStorage);
      setSelectedStorage(firstStorage);
    } else {
      // Nếu không có storage, có thể reset objectStorage
      setObjectStorage([]); // Hoặc giá trị mặc định của bạn
    }
  }
};

const handleStorageChange = (storage: string) => {
  if (objectColor?.product_storages?.length > 0) {
    const newStorage = objectColor.product_storages.find((item) => item.storage === storage);
    if (newStorage) {
      setObjectStorage(newStorage);
      setSelectedStorage(newStorage);
    }
  } else {
    // Nếu không có storage, có thể đặt lại objectStorage
    setObjectStorage([]);
    setSelectedStorage(null);
  }
};

useEffect(() => {
  // Làm gì đó với objectColor.image, ví dụ chỉ hiển thị nó
  if (objectColor?.image) {
    console.log("Image:", objectColor.image);
  setArrayImage(objectColor.image);
    // Bạn có thể thực hiện các tác vụ khác với objectColor.image
  }
}, [objectColor]);
 console.log(arrayImage);
 
 const [activeImage, setActiveImage] = useState(objectColor?.image?.image_one);

 useEffect(() => {
   // Set the default image to be the first one
   if (objectColor?.image?.image_one) {
     setActiveImage(objectColor?.image?.image_one);
   }
 }, [objectColor]);
 const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), timeLoading)
  }, []);

  if (isLoading) {
    return <div className="w-full h-full flex py-[60px] justify-center items-center">
    <Spin size="large" /> {/* Hiển thị loading của Ant Design */}
  </div>
  }
  const inforMore = productDetail?.infor_product_infor_product?.infor_more;

  // Đảm bảo `inforMore` là chuỗi
  const safeInforMore = typeof inforMore === "string" ? inforMore : "<p>No information available</p>";

  return (
        <Container>
        
          <div className="py-6 text-[1.5rem] leading-10">
            {/* Breadcrumb */}
            <div className="my-[1.5rem] text-[1.5rem] text-gray-600">
              <a href="/" className="text-customColor hover:underline">Trang chủ</a>
              <span className="mx-2">/</span>
              <span>Chi tiết sản phẩm</span>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg p-[1rem]">
              {/* Left Column */}
              <div className="w-full md:w-[55%] p-6">
                <div className="w-[80%] mx-auto">
                  <img 
                    className="w-full my-8 max-w-[300px] mx-auto" 
                    src={`${IMG_BACKEND}/${activeImage}`} 
                    alt="product image" 
                  />
                </div>

                {/* Giá tiền và tên sản phẩm rps */}
                <div className="block md:hidden mt-4">
                  <h3 className="text-[2.5rem] font-semibold">{productDetail?.product_name}</h3>
                  {productDetail?.product_discount > 0 ? (
                    <div className="flex items-center  gap-4 py-4">
                      <p className="text-red-500 font-semibold text-[2rem]">
                        {formatCurrencyVND(((productDetail?.product_price + Number(objectStorage?.storage_price ||0)) *(1 - Number(productDetail?.product_discount / 100) )))}
                      </p>
                      <p className="text-xl text-gray-500 line-through">              
                {formatCurrencyVND(productDetail?.product_price + Number(productDetail?.product_colors[0]?.product_storages[0]?.storage_price || 0))}
                      </p>
                      <p className="text-xl px-4 py-2 border border-gray-300">{productDetail?.product_discount}%</p>
                    </div>
                  ) : (
                    <p className="text-red-500 font-semibold text-[2rem] py-6">
                      {formatCurrencyVND(productDetail?.product_price +  Number(objectStorage?.storage_price ||0))}
                    </p>
                  )}
                </div>

                {/* Thumbnail Images */}
            <div>
            <div className="flex items-center justify-center my-8 space-x-4">
           
         {/* Image 1 */}
         {objectColor?.image?.image_one && (
          <div 
            className={`sm:w-[70px] cursor-pointer ${activeImage === objectColor.image.image_one ? 'border-2 border-blue-500' : ''}`}
            onClick={() => setActiveImage(objectColor.image.image_one)}
          >
            <img 
            src={`${IMG_BACKEND}/${objectColor.image.image_one}`} 
            alt="Image 1" />
          </div>
        )}

        {/* Image 2 */}
        {objectColor?.image?.image_two && (
          <div 
            className={`sm:w-[70px] cursor-pointer ${activeImage === objectColor.image.image_two ? 'border-2 border-blue-500' : ''}`}
            onClick={() => setActiveImage(objectColor.image.image_two)}
          >
            <img src={`${IMG_BACKEND}/${objectColor.image.image_two}`} alt="Image 2" />
          </div>
        )}

        {/* Image 3 */}
        {objectColor?.image?.image_three && (
          <div 
            className={`sm:w-[70px] cursor-pointer ${activeImage === objectColor.image.image_three ? 'border-2 border-blue-500' : ''}`}
            onClick={() => setActiveImage(objectColor.image.image_three)}
          >
            <img src={`${IMG_BACKEND}/${objectColor.image.image_three}`} alt="Image 3" />
          </div>
        )}

        {/* Image 4 */}
        {objectColor?.image?.image_four && (
          <div 
            className={`sm:w-[70px] cursor-pointer ${activeImage === objectColor.image.image_four ? 'border-2 border-blue-500' : ''}`}
            onClick={() => setActiveImage(objectColor.image.image_four)}
          >
            <img src={`${IMG_BACKEND}/${objectColor.image.image_four}`} alt="Image 4" />
          </div>
        )}
        
                </div>

            </div>
           
            <div className="py-6 md:hidden">
              {objectColor?.product_storages?.length>0  ? <div>

                <h4 className="text-[1.6rem]">Chọn <span className="text-customColor font-semibold">dung lượng</span> để xem <span className="text-customColor font-semibold">giá</span></h4>
            <div className="flex gap-4 mb-6">

{objectColor?.product_storages?.map((variant, index) => (
<button key={index}                
onClick={()=>{handleStorageChange(variant)}}
className={`flex items-center gap-3 border py-4 px-8 rounded-md cursor-pointer hover:shadow-md ${selectetStorage.storage == variant.storage ? 'bg-slate-50' : ''}`}
>

{variant?.storage} GB
</button>
))}
</div>
              </div>:''}
           
    <h4 className="text-[1.6rem]">Chọn <span className="text-customColor font-semibold">màu</span> để xem <span className="text-customColor font-semibold">giá</span> và tình trạng hàng</h4>
    <div className="flex flex-wrap gap-4 mt-4">
        {productDetail?.product_colors?.map((item) => (
            <div
                key={item.color}
                onClick={() => handleColorChange(item.color)}
                className={`
                  flex items-center gap-3 border py-4 px-9 rounded-md cursor-pointer
                   hover:shadow-md ${selectedColor === item.color ? 'bg-slate-50' : ''}`}
            >
              
                <img 
                    src={`${IMG_BACKEND}/${item?.image?.image_one}`} 
                    alt={item.color} 
                    className="w-12 rounded-md"
                />
                <div>
                    <h4 className="font-semibold text-[1.4rem]">{item.color}</h4>
                    {/* <p className="text-red-500 font-semibold">{item.storage_price}đ</p> */}
                </div>
            </div>
        ))}
    </div>
</div>
                {/* Product Info */}
                <div>
                  <h4 className="text-[1.9rem] font-semibold">Thông tin sản phẩm</h4>
                  <div className="pb-5">
                    <h5 className="text-[1.7rem] font-semibold py-5">Mô tả sản phẩm</h5>
                    <p className="text-[1.6rem]">
                      {parse(safeInforMore)}
                    </p>
                  </div>
                  <div>
               
                </div>
                <div className="flex justify-center items-center mt-[1rem]">
                  <button className="p-[1rem] border text-[1.7rem]">
                    Xem thêm
                  </button>
                </div>

                </div>
              </div>

              {/* Right Column */}
              <div className="w-full md:w-[45%] mx-auto text-xl ">
                {/* Giá tiền với tên sp khi ở PC */}
                <h3 className="hidden md:block text-[2.5rem] font-semibold pt-[1.3rem] leading-[1.5]">
  {productDetail?.product_name}
</h3>                {productDetail?.product_discount > 0 ? (
                  <div className="hidden md:flex items-center gap-4 py-4">
                    <p className="text-red-500 font-semibold text-[2rem]">
                      {formatCurrencyVND(((productDetail?.product_price + Number(objectStorage?.storage_price ||0)) *(1 - Number(productDetail?.product_discount / 100) )))}
                    </p>
                    <p className="text-xl text-gray-500 line-through">              
                     {formatCurrencyVND(productDetail?.product_price + Number(productDetail?.product_colors[0]?.product_storages[0]?.storage_price || 0))}
                    </p>
                    <p className="text-xl px-4 py-2 border border-gray-300">{productDetail?.product_discount}%</p>
                  </div>
                ) : (
                  <p className="hidden md:block text-red-500 font-semibold text-[2rem] py-6">
                    {formatCurrencyVND(productDetail?.product_price +  Number(objectStorage?.storage_price ||0))}
                  </p>
                )}
                

                {/* Storage Variant Buttons */}
                {objectColor?.product_storages?.length>0  ? <div>

<h4 className="text-[1.6rem]">Chọn <span className="text-customColor font-semibold">dung lượng</span> để xem <span className="text-customColor font-semibold">giá</span></h4>
<div className="flex gap-4 mt-[1rem]">

{objectColor?.product_storages?.map((variant, index) => (
<button key={index}                
onClick={()=>{handleStorageChange(variant)}}
className={`flex items-center gap-3 border py-4 px-8 rounded-md cursor-pointer hover:shadow-md ${selectetStorage.storage == variant.storage ? 'bg-slate-50' : ''}`}
>

{variant?.storage} GB
</button>
))}
</div>
</div>:''}

                {/* Color Selection */}
                <div className="py-[1rem] sm:hidden md:block">
    <h4 className="text-2xl">Chọn màu để xem giá và tình trạng hàng</h4>
    <div className="flex flex-wrap gap-4 mt-4">
        {productDetail?.product_colors?.map((item) => (
            <div
                key={item.color}
                onClick={() => handleColorChange(item.color)}
                className={`flex items-center gap-3 border py-4 px-6 rounded-md cursor-pointer hover:shadow-md ${selectedColor === item.color ? 'bg-slate-50' : ''}`}
            >
              
                <img 
                    src={`${IMG_BACKEND}/${item?.image?.image_one}`} 
                    alt={item.color} 
                    className="w-10 rounded-md"
                />
                <div>
                    <h4 className="font-semibold text-lg">{item.color}</h4>
                    {/* <p className="text-red-500 font-semibold">{item.storage_price}đ</p> */}
                </div>
            </div>
        ))}
    </div>
</div>
                {/* Delivery & Warranty Info */}
                <div className="rounded-lg p-6 bg-white shadow-md mb-6">
                  <ul className="space-y-3 items-center text-2xl">
                    <li className="flex items-center">
                      <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                      Miễn phí vận chuyển toàn quốc
                    </li>
                    <li className="flex items-center">
                      <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4" />
                      </svg>
                      Bảo hành 18 tháng chính hãng
                    </li>
                    <li className="flex items-center">
                      <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4" />
                      </svg>
                      Bao xài đổi lỗi trong 30 ngày nếu có lỗi phần cứng
                    </li>
                    <li className="flex items-center">
                      <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4" />
                      </svg>
                      Giá đã bao gồm VAT
                    </li>
                  </ul>
                </div>

                {/* Promotions Section */}
                <div className="rounded-lg p-6 bg-white shadow-md mb-6">
                  <div className="flex justify-between items-center mb-4 text-2xl">
                    <h3 className="font-semibold text-2xl">Khuyến mãi</h3>
                    <span className="text-gray-500">Áp dụng từ 1/10 - 31/10</span>
                  </div>
                  <ul className="space-y-3 text-xl">
                    <li className="flex items-start text-2xl">
                      <span className="text-yellow-500 mr-3">🏅</span> Giảm ngay 600.000đ (đã trừ giá)
                    </li>
                    <li className="flex items-start text-2xl">
                      <span className="text-yellow-500 mr-3">🏅</span> Trợ giá 4G: Giảm thêm 300.000đ
                    </li>
                    <li className="flex items-start text-2xl">
                      <span className="text-yellow-500 mr-3">🏅</span> Thu cũ máy 2G, 3G lên đời máy 4G
                    </li>
                    <li className="flex items-start text-2xl">
                      <span className="text-yellow-500 mr-3">🏅</span> Mua kèm củ sạc 15W giá 169.000đ
                    </li>
                  </ul>
                </div>

              
             


                {/* Cart and Buy Now Buttons */}
                <div className="flex gap-4 mt-4">
                  <button 
                  onClick={()=>{
                    handleAddItem(productDetail)
                  }}
                  className="w-1/2 py-6 text-[1.7rem] font-medium border border-customColor text-customColor rounded-2xl hover:bg-purple-100">
                    Thêm giỏ hàng
                  </button>
                  <button 
                  onClick={()=>{handleAddOrder(productDetail)}}
                  className="w-1/2 py-6 text-[1.7rem] font-medium bg-customColor text-white rounded-2xl hover:bg-purple-700">
                    Mua ngay
                  </button>
                </div>                    
              </div>
            </div>
                {/* Ý kiến */}
      
                <Comment reviews={getCommentById}/>
                <CommentForm id={numericId}/>
          </div>
        </Container>

  );
}

export default DetailProduct;
// test