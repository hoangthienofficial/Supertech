import { Breadcrumb, Form, Input, InputNumber, Radio, Select, Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import './css/formEdit.css'
import { Container } from '../../../components/Style/Container';
import axios from 'axios';
import { getUserThunk } from '../../../redux/user/user.slice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { createDetailOrder, createOrder, getOrderById, getSuccessEmailOrder } from '../../../service/order/order.service';
import { removeAllCart } from '../../../redux/cart/cart.slice';
import { useNavigate } from 'react-router-dom';
import { formatCurrencyVND, truncateText } from '../../../utils';
import { changeStatusOrderThunk, setOrderId } from '../../../redux/order/Order.slice';
import toast from 'react-hot-toast';
import { getAllCityThunk, getDistrictsCityThunk } from '../../../redux/order/City.slice';
import ModalPay from './component/ModalPay';
import CountdownTimer from './component/CountimePay';
import { Paths } from '../../../router/component/RouterValues';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { setDiscount } from '../../../redux/cart/voucher.slice';
import { createUserDiscount } from '../../../service/vourcher/voucher.service';
import { IMG_BACKEND } from '../../../constants';

// Define the validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Họ và tên là bắt buộc'),
  sdt: Yup.string()
    .matches(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số')
    .required('Số điện thoại là bắt buộc'),
  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  diaChi: Yup.string().required('Địa chỉ là bắt buộc'),
  city: Yup.string().required('Tỉnh thành phố là bắt buộc'),
  district: Yup.string().required('Quận là bắt buộc'),
  xuathoadon: Yup.string().required('Vui lòng chọn xuất hoá đơn VAT'),
});
function Pay() {
  
  const dispatch = useAppDispatch();
  const navigate=useNavigate();
  const user: any = useAppSelector((state) => state.user.user);
  const listCart:any=useAppSelector((state)=>state.cart.listCart)
  const totalItem=useAppSelector((state)=>state.cart.totalItems)
  const socket = useAppSelector((state:any) => state.socket.socket); // Get socket from Redux store
  // const orderList=useAppDispatch((state)=>state)
  
  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      name: user?.user_name || '',
      sdt: user?.user_phone || '',
      email: user?.user_email || '',
      diaChi: user?.user_address || '',
      city: '',
      district: '',
      xuathoadon: 'pear', // Default value for the radio button
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });
  
  const totalPrice = listCart.reduce((total: number, item) => {
    // Tính giá sản phẩm ban đầu cộng thêm giá storage
    const basePriceWithStorage = item.product_price + Number(item?.selectedStorage?.storage_price || 0);
  
    // Tính giảm giá
    const discountAmount = (basePriceWithStorage * item.product_discount) / 100;
  
    // Giá sau khi giảm
    const priceAfterDiscount = basePriceWithStorage - discountAmount;
  
    // Tính tổng giá của sản phẩm (giá sau giảm x số lượng)
    const itemTotalPrice = item.quantity * priceAfterDiscount;
  
    // Cộng dồn vào tổng giá
    return total + itemTotalPrice;
  }, 0);
  const getShip=useAppSelector(state=>state.cart.ship);
  const getDiscount=useAppSelector(state=>state.vourher.discount);
  const getIdDiscount=useAppSelector(state=>state.vourher.discount_id);

  const totalPriceWithVoucher = totalPrice * (1 - getDiscount / 100) + getShip;

  const [formData, setFormData] = useState({
    name: user?.user_name || '', // Gán giá trị ban đầu cho name
    sdt:user?.user_phone||'',
    email: user?.user_email||'',
    diaChi: user?.user_address||'',
    xuathoadon: '',
    district:'',
    huyen:"",
    tinhThanhPho: '', // Thêm state để lưu giá trị của Select
    paymentMethod: '', // State cho phương thức thanh toán
    totalItem

  });
  const [city,setCity]=useState([])
  const [districts,setDistricts]=useState([]);
  const [districtsCity,setDistrictsCity]=useState([])
  useEffect(() => {
    if(!(listCart.length>0)){
      
      navigate("/")
      toast.success("Bạn cần thêm sản phẩm")
    }
    const fetchProvinces = async () => {
      try {
        // Gọi API bằng async/await
        const response = await axios.get('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1');
        
        // Kiểm tra và cập nhật dữ liệu vào state
        if (response.data && response.data.data) {
          setCity(response.data.data.data);
        }
      } catch (err) {
        // setError(err.message);
      }
    };

    fetchProvinces();
  }, []);
  const listAllCity=useAppSelector((state:any)=>state.city.listAllCity);
  const listDataCity=useAppSelector((state:any)=>state.city.listDataCity);
 
  const [selectedPayment, setSelectedPayment] = useState('');
 
  useEffect(()=>{
    dispatch(getAllCityThunk())
  },[])
  const fetchDistricts = async (cityCode:string) => {
    try {
      dispatch(getDistrictsCityThunk(cityCode))
     
    } catch (err) {
      console.error(err);
    }
  };
  const fetchDistrictsCity = async (cityCode:string) => {
    try {
      const response = await axios.get(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${cityCode}&limit=-1`);
      if (response.data && response.data.data) {
        setDistrictsCity(response.data.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleCityChange = (value, option) => {
    setFormData({ ...formData, tinhThanhPho: value });
    setCity(option.key); // Lưu mã tỉnh đã chọn
  
    fetchDistricts(option.key); // Gọi API để lấy quận
   
  };
  const [dataOrder,setDataOrder]=useState(null);

  const handleDistrictsChange = (value, option) => {
    setFormData({ ...formData, district: value });
    setDistricts(option.key); // Lưu mã tỉnh đã chọn
    fetchDistrictsCity(option.key); // Gọi API để lấy quận
  };
  const [paymentMethod, setPaymentMethod] = useState('');  // Lưu trữ phương thức thanh toán đã chọn

  // Hàm xử lý khi click vào div
  const handleDivClick = (method) => {
    setPaymentMethod(method);  // Cập nhật phương thức thanh toán khi click vào div
  };
  const handleFormChange = (changedValues, allValues) => {
    setFormData({ ...formData, ...changedValues });
  };
  const handlePaymentChange = (e) => {
    setFormData({ ...formData, paymentMethod: e.target.value }); // Cập nhật phương thức thanh toán
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [reset, setReset] = useState(false); // State for reset

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setReset(true); // Trigger reset when modal is closed
  };

  const handleReset = () => {
    setReset(false); // Reset countdown timer
  };

  const handleResetTrue = () => {
    setReset(true); // Start the reset process
  };

  const handleFormSubmit = async () => {
    try {
      // Chuẩn bị dữ liệu đơn hàng
      
      // Nếu phương thức thanh toán là "bank"
      if(formData.paymentMethod !=='' && formData.sdt!=='' && formData.diaChi!==''){
        const dataOrder = {
          ...formData,
          address:`${formData.diaChi} `,
          order_total: totalPrice,
          order_total_quatity: totalItem,
          phone_number:formData.sdt,
          email_user:formData.email,
          order_pay:0,
          discount: getIdDiscount
  
        };
        console.log(dataOrder);
        
        // Gọi API tạo đơn hàng
        const resp = await createOrder(dataOrder);
    
        // Chuẩn bị danh sách chi tiết đơn hàng
        const detailOrders = listCart.map(item => {
          // Add console log to check the data
          console.log('Selected Color:', item.selectedColor);
          console.log('Selected Storage:', item.selectedStorage);
        
          return {
            product_name: item.product_name,
            product_id: item.product_id,
            order_id: resp.data.content.order_id,
            detail_order_quality: item?.quantity,
            product_color: item?.selectedColor?.color,
            product_storage: item?.selectedStorage?.storage,
            detail_order_price: item.product_price + Number(item?.selectedStorage?.storage_price || 0),
            discount_product: item.product_discount,
            color_id: item?.selectedColor?.color_id,  // Check if color_id is properly populated
            storage_id: item?.selectedStorage?.id_storage,  // Check if id_storage is properly populated
            img_name:item?.selectedColor?.image?.image_one
          };
        });
        const dataEmail = {
          email: formData.email,
          orderDetails: detailOrders,
        };     
        console.log(detailOrders)
        if (formData.paymentMethod === 'bank') {
        const response = await createDetailOrder(detailOrders);

        socket.on('orderStatusUpdated', async (updatedOrder:any) => {
          const dataDiscount={
            "discount_id":getIdDiscount
          }
          const respDis =await createUserDiscount( 
            dataDiscount
            
           )
          dispatch(  setDiscount())
        
          // Kiểm tra xem thanh toán có thành công không
          if (user.user_id == updatedOrder.user) {
            if (response) {
              await getSuccessEmailOrder(dataEmail);
              navigate(`${Paths.Bill}`);
              dispatch(setOrderId(resp.data.content.order_id));
              dispatch(removeAllCart());
            }
          } else {
            console.error("Thanh toán không thành công.");
          }
        });
        
        // Mở modal và lưu dữ liệu đơn hàng
        setIsModalOpen(true);
        setDataOrder({
          order_id: resp.data.content.order_id,
          user_id: user.user_id,
          order_total: totalPriceWithVoucher
        });
 // Điều hướng về trang chủ sau 2 phút
//         setTimeout(async () => {

//           // Delay the toast notification
//           navigate("/");  
//           dispatch(removeAllCart());

//           const cancelOrder = {
//             order_id: resp.data.content.order_id,
//             order_status: 6,
//             order_status_text_cancel: 'Quá thời gian thanh toán',
//           };
//           await dispatch(changeStatusOrderThunk(cancelOrder)).unwrap();
// setTimeout(() => {
 
//   toast.error("Đơn hàng của bạn đã bị hủy");

// }, 1000); // Delay navigation for 1 second after the toast
        
//       },3000); 
      } else {
        // Gọi API tạo chi tiết đơn hàng cho phương thức thanh toán khác
        const response = await createDetailOrder(detailOrders);
        const dataDiscount={
          "discount_id":getIdDiscount
        }
        const respDis =await createUserDiscount( 
          dataDiscount
          
         )
        dispatch(  setDiscount())
        
        if (response) {
          await getSuccessEmailOrder(dataEmail);
          navigate(`${Paths.Bill}`);
          dispatch(setOrderId(resp.data.content.order_id));
          dispatch(removeAllCart());
        }
      }
   
      } else{
        toast.error("Vui lòng chọn phương thức thanh toán");
        toast.error("Vui lòng chọn nhập số điện thoại");
        toast.error("Vui lòng chọn địa chỉ");
        return 
      }
     
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
    }
  };

  console.log(dataOrder);
  
  return (

    <Container>
    
    <div className=' py-6 text-[1.5rem]'>

    <div className='sm:hidden xmd:block xll:w-[40%] lg:w-[60%] mx-auto my-[2rem] p-[2rem]'>
          <Steps
          current={0}
          percent={60}
          items={[
            {
              title: 'Đơn hàng',
        
            },
            {
              title: 'Thanh toán',
            
          
            },
            {
              title: 'Xuất hoá đơn',
            
            },
          ]}
        />
    </div>
    <div className="flex flex-col lg:flex-row gap-5 justify-between leading-10 px-4 lg:px-0">
    {/* Cart Section */}

      <div className=' lg:w-[50%] px-10 py-5 bg-white rounded-lg shadow-xl space-y-1'>
        <h3 className='lg:text-[2.5rem] md:text-[2.2rem] py-[1rem] sm:text-[1.8rem] sm:font-semibold'>Thông tin thanh toán</h3>
        <div>
        <Form
        
        autoComplete='off' className='formEdit' onValuesChange={handleFormChange}
        
        >
        <Form.Item
    name="name"
    label="Họ và tên"
    initialValue={user?.user_name}
    rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]} // Validation rule
  >
    <Input className="w-[100%]" />
  </Form.Item>

        <Form.Item name="sdt" label="Số điện thoại" 
    
        rules={[
          { 
            required: true, 
            message: 'Vui lòng nhập số điện thoại' 
          },
          { 
            pattern: /^[0-9]{1,10}$/, 
            message: 'Số điện thoại phải là số và có độ dài từ 1 đến 10' 
          }
        ]}
        initialValue={user?.user_phone||''}>
        <Input
        name='sdt'
         className='w-[100%] '
         placeholder="Nhập số điện thoại của bạn" // Placeholder hiển thị trong ô input
         
        />

        </Form.Item>
        <Form.Item name="email" label="Email" initialValue={user?.user_email||''}>
          <Input 
                   className='w-[100%] '

           placeholder="Nhập email của bạn" // Placeholder hiển thị trong ô input
          />
        </Form.Item>
      
        <Form.Item name="diaChi" label="Địa chỉ" 
        
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ'}]}
        initialValue={user?.user_address||''}>
          <Input placeholder='Mời bạn nhập địa chỉ'/>
        </Form.Item>
        <div>
        
        <Form.Item label='Xuất hoá đơn VAT'>
                  <Radio.Group onChange={(e) => setFormData({ ...formData, xuathoadon: e.target.value })}>
                    <Radio value='apple'>Có</Radio>
                    <Radio value='pear'>Không</Radio>
                  </Radio.Group>
                </Form.Item>
        </div>
      </Form>
        </div>
      </div>

            <div className="lg:w-[45%] bg-white h-[100%] rounded-lg shadow-xl py-9">
              <div className="space-y-4 mb-10 px-7 pb-4">
                <h3 className="text-[2rem] font-semibold">Đơn đặt hàng</h3>
        <div className={`${listCart.length >2 ? "h-[25rem] custom-scrollbar" :""} overflow-y-auto custom-scrollbar`}>
        {
          listCart.map((item)=>{
            return (
              <div className="flex justify-between items-center border-b">
                <div className="flex items-center space-x-4 py-[1rem]">
                  <img
                    className="w-[8rem] h-[8rem] object-cover"
          src={`${IMG_BACKEND}/${item?.selectedColor?.image?.image_one}`}
                    alt="Iphone"
                  />
                  <div>
                    <h5 className="font-semibold tex
                    t-[1.7rem]">{truncateText(item?.product_name,25)}</h5>
                    <p className="text-[1.6rem]">    
                    {item?.selectedColor !=undefined? `${item?.selectedColor?.color}` :''}
                    {` (x${item.quantity})`}
                    </p>
                    {item?.product_discount > 0 ? (
                                          <p className="text-red-600 font-semibold">
                                           {formatCurrencyVND(
                               ( Number(item?.product_price)+Number(item?.selectedStorage?.storage_price || 0)) *
                                  (1 - Number(item?.product_discount / 100))
                          
                              )}
                                             <span className="text-[#969696] line-through ml-2">
                                             {formatCurrencyVND(item?.product_price + item?.selectedStorage?.storage_price ||0)}
                                             </span></p>

          ):(
            <p className="text-red-600 font-semibold"> 
                                        {formatCurrencyVND(item?.product_price + item?.selectedStorage?.storage_price ||0)}

            </p>


          )}
                  </div>
                </div>
                <div className="text-[1.8rem] font-semibold text-customColor sm:hidden xmd:block">      
                {formatCurrencyVND(
                               ( Number(item?.product_price) + Number(item?.selectedStorage?.storage_price || 0)) *Number(item?.quantity)*
                                  (1 - Number(item?.product_discount / 100))
                              )}
                            
                            </div>
              </div>
            )
          })
        }
        </div>
              {/* Product Information */}
           

              {/* Order Summary */}
              <div className="space-y-4 text-[1.6rem] ">
                <div className="flex justify-between ">
                  <span className="font-medium">Tạm tính</span>
                  <span className="font-semibold text-[1.8rem]">
                    
                  {formatCurrencyVND(totalPrice)}
                    
                    
                    </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Giảm giá</span>
                  <span className="font-semibold text-[1.8rem]">{getDiscount}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Giao hàng</span>
                  <span className="font-semibold text-[1.8rem]">{formatCurrencyVND(getShip)}</span>
                </div>
        
                <div className="flex justify-between border-t pt-5 font-semibold">
                  <span>Tổng tiền</span>
                  <span className="text-red-600 text-[2.2rem]">   {formatCurrencyVND(totalPriceWithVoucher)}</span>
                </div>
              </div>

              <h3 className="text-[1.8rem] py-4">Phương thức thanh toán</h3>
              <div className="space-y-10">
                {/* Payment method 1 */}
                <div className='border-customColor border py-[1rem] px-[1.5rem] relative'>
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                onChange={handlePaymentChange}
                className="absolute top-5"
              />
              <div className='ml-[2rem]'>
                 <h4 className='text-[1.7rem] font-semibold'>Chuyển hướng qua ngân hàng</h4>
              <p className='text-[1.6rem] text-[#969696] mt-[.5rem]'>
                Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng của bạn trong phần phương thức thanh toán. Đơn hàng sẽ đươc giao sau khi tiền đã chuyển.
              </p>
              </div>
             
            </div>
            <div className='border-[var(--custom-color)] border py-[1rem] px-[1.5rem] mt-[1rem] relative'>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                onChange={handlePaymentChange}
                className="absolute top-5"

              />
              <div className='ml-[2rem]'>
                <h4  className='text-[1.7rem] font-semibold'>Trả tiền mặt</h4>
                <p className='text-[1.6rem] text-[#969696] mt-[.5rem]'>
                  Trả tiền mặt sau khi giao hàng
                </p>
              </div>
             
            </div>
              </div>
              {formData.paymentMethod === 'bank' && (
   <ModalPay 
   isModalOpen={isModalOpen}
   open={showModal} // Gọi hàm để lấy giá trị boolean
    handleOk={handleOk} 
    handleCancel={handleCancel}
    data={dataOrder}
    reset={reset}
    handleReset={handleReset}
             handleResetTrue={handleResetTrue}
     />
    )}
    

              {/* Submit Button */}
              <div className="mt-5">
                <button
                  onClick={handleFormSubmit}
                  className="w-full my-[1rem] py-3 bg-customColor text-white text-[2rem] rounded-lg font-medium">
                    Đặt hàng
                </button>
              </div>
            </div>
          </div>
     
    </div>
    </div>
  </Container>
  )
}

export default Pay