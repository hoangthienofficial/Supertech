import { Button, Checkbox, Popover, Tooltip } from "antd";
import { Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteCategoryThunk, getCatelogryThunk } from "../../../redux/catelogry/catelogry.slice";
import { handleExport, handleExportPdf } from "../../../components/exportFile/exportFile";
import { FiFilter } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { IoCloudDownloadOutline, IoEyeSharp } from "react-icons/io5";

import toast from "react-hot-toast";
import { CiBookmarkRemove } from "react-icons/ci";
import { deleteProductAdminThunk, getProductsAdminThunk } from "../../../redux/product/product.slice";
import { formatCurrencyVND } from "../../../utils";
import { BiSolidEdit } from "react-icons/bi";
import {  useNavigate } from "react-router-dom";


import AdminAddProduct from "./Component/AdminAddProduct";
import { GoCommentDiscussion } from "react-icons/go";

import AdminModalUpdateQualityProduct from "./Component/UpdateQualityProduct";
import { IMG_BACKEND } from "../../../constants";

// Define the Category interface
interface Category {
  category_id: number; // Assuming this is the unique identifier for each category
  category_name: string;
  category_date_task: string;
  // other fields you may have...
}

// Define a CategoryWithKey interface that adds the 'key' property
interface CategoryWithKey extends Category {
  key: number; // Add key property for use with Ant Design's Table component
}



// AdminProduct component
const AdminProduct: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const dataCategories = useAppSelector(state => state.category.listCatelories as Category[]);
  const DataCategory = [
    { label: 'Điện thoại', value: 1 },
    { label: 'Laptop', value: 2 },
    { label: 'Table', value: 3 },
  ];
  const listProducts = useAppSelector((state) => state.product.listAdminProducts)
  const handleEdit = (key: any) => {
    // AdminEditProduct    
  };
  const handleViewCommentProduct = (key: any) => {
    navigate(`/admin/quan-li-san-pham/${key}/quan-li-binh-luan`);
  };
  const getCategoryNameById = (id) => {
    const category = dataCategories?.find((cat) => cat.category_id == id);
    return category ? category.category_name : 'Unknown'; // 'Unknown' là giá trị mặc định nếu không tìm thấy id
  };
  const handleDeteleProduct = async (id: number) => {
    dispatch(deleteProductAdminThunk(id))
    toast.success('Xóa sản phẩm thành công!');

  }
  const handleEye = (id: string | number) => {
    navigate(`/admin/quan-li-san-pham-chi-tiet/${id}`)
  }
  const [selectedCheckbox, setSelectedCheckbox] = useState(''); // Lọc theo ngày
  // Column definition for the table
  const columns = [
    {
      title: 'STT',
      render: (_, __, index: number) => index + 1,
      key: 'stt',
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'product_name',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'product_colors',
      render: (colors: any[]) => (
        colors.map((color, index) => (
          <img 
            key={index} 
            className='rounded-md' 
            src={`${IMG_BACKEND}/${color.image.image_one}`} 
            alt={`Màu ${color.color}`} 
            style={{ width: 50, height: 50 }} 
          />
        ))
      ),
    },
    {
      title: 'Danh Mục',
      dataIndex: 'category_id',
      render: (categoryId) => getCategoryNameById(categoryId), // Hiển thị tên danh mục

    },
    {
      title: "Màu sắc",
      dataIndex: "product_colors",
      key: "product_colors",
      render: (colors) =>
        colors.map((color, index) => (
          <div key={index}>
            <strong>{color.color}</strong>
          </div>
        )),
    },

    {
      title: "Số lượng",
      dataIndex: "product_colors",
      key: "product_qualities",
      render: (colors) =>
        colors.map((color, index) => (
          <div key={index}>
            {color.product_qualities.length === 0
              ? "Không có số lượng"
              : color.product_qualities.map((quality, idx) => (
                  <span key={idx}>{quality.quality_product}</span>
                ))}
          </div>
        )),
    },
  
    {
      title: 'Giá Gốc',
      dataIndex: 'product_price',
      render: (price: number, recoil: any) => (
        <span>{formatCurrencyVND(price + Number(recoil?.product_colors[0]?.product_storages[0]?.storage_price || 0))}</span>
      ),
    },
    {
      title: 'Giảm',
      key: 'product_discount',
      dataIndex: 'product_discount',

      render: (record: number) => {
        // const discountedPrice = record.originalPrice * (1 - record.discountPercent / 100);
        return <span>{record}%</span>;
      },
    },
    {
      title: 'Thành tiền',
      dataIndex: 'product_price',
      render: (price: number, recoil: any) => (
        <span>{
          formatCurrencyVND(((price + Number(recoil?.product_colors[0]?.product_storages[0]?.storage_price || 0)) * (1 - Number(recoil?.product_discount / 100))))
        } </span>
      ),
    },
    
    {
      title: 'Tác Vụ',
      key: 'action',
      render: (_,record: any) => (
        <div className='flex text-[24px] gap-1'>
          {/* <div onClick={()=>{
            console.log(record);
            
          }}>Xem</div> */}
           <Tooltip placement="top" title="Xem chi tiết">
           <IoEyeSharp  className='cursor-pointer text-[#9000ff67] transition-all duration-700 hover:text-[#9000ffcb]'
            // onClick={() => handleEdit(record.key)}
            onClick={() => { handleEye(+record.product_id) }}
          />
          </Tooltip>
          <Tooltip placement="top" title="Xem bình luận chi tiết">
          <GoCommentDiscussion className='cursor-pointer text-[#9000ff67] transition-all duration-700 hover:text-[#9000ffcb]'
            onClick={() => handleViewCommentProduct(+record.product_id)}
          />
          </Tooltip>
          <Tooltip placement="top" title="Xóa sản phẩm">
          <CiBookmarkRemove
            className='cursor-pointer text-red-300 transition-all duration-700 hover:text-[red]'
            onClick={() => handleDeteleProduct(+record.product_id)}
          />
          </Tooltip>
          <Tooltip placement="top" title="Chỉnh sửa sản phẩm">
          <BiSolidEdit
            className='cursor-pointer text-[#4078f2] transition-all duration-700 hover:text-[#4078f2]'
            onClick={() => navigate(`/admin/quan-li-san-pham/sua-san-pham/${record.product_id}`)}
          />
          </Tooltip>
         
       
          <AdminModalUpdateQualityProduct product={record}/>
         
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getProductsAdminThunk(''));
    dispatch(getCatelogryThunk(''));
  }, [dispatch]);

  // Add a state for row selection
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    // Simulate AJAX request after completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  // Map over dataCategories and add the 'key' property with conditional check
  const updatedDataProducts = (listProducts || []).map((item) => ({
    ...item, // Spread the item (make sure it's an object)
    key: item.product_id, // Add key from the category_id
  }));
 // Sắp xếp lại danh mục theo "Ngày Mới Nhất" hoặc "Cũ Nhất"
 const [showInStock, setShowInStock] = useState(true);


console.log(updatedDataProducts[0]);

  const userRef = useRef<any>(null);




 

  return (
    <div className='flex flex-col p-12 gap-5 bg-[#f2edf3]'>
    <div className='flex-1 bg-white flex flex-col rounded-xl shadow-lg'>
      <div className='flex items-center justify-between box-border p-[24px]'>
        <span className='text-[30px] font-medium text-[#ffd700]'>Sản Phẩm</span>
        <div className='flex gap-3'>
         
   
          <AdminAddProduct/>
   

          </div>
        </div>

        <div className='flex p-[24px] items-center justify-between gap-3'>
      
          <div className='flex-1 flex bg-[#00000008] focus:outline-dotted rounded-lg p-[16px]'>
            <input type="text"
              onChange={async (e) => {
                if (userRef.current) {
                  clearTimeout(userRef.current);
                }
                userRef.current = setTimeout(async () => {
                  console.log(e.target.value);
                  dispatch(getProductsAdminThunk(e.target.value));
                }, 400);
              }}
              className='flex-1 text-[15px] outline-none bg-transparent' placeholder='Tìm kiếm sản phẩm...' />
            <GoSearch className='text-[18px]' />
          </div>

          {/* <AdminFilterProduct product={listProducts} onFilter={handleFilterProducts} /> */}

        </div>

        <div className='p-[24px] relative overflow-x-auto h-[1000px] flex flex-col'>
        <div className="text-[1.5rem] flex gap-[1rem]">
           
           
        
         </div>
          <Table
            className='flex-1'
            rowSelection={rowSelection}
            columns={columns}
            dataSource={updatedDataProducts}
            size='large'
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
