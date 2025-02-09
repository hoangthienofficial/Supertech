import { Button, Drawer, Select, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { BiSolidEdit } from 'react-icons/bi';
import { CiBookmarkRemove } from 'react-icons/ci';
import { FiFilter } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';
import { IoCloudDownloadOutline, IoEyeSharp } from 'react-icons/io5';
import { TbPlaylistAdd } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { deleteProductAdminThunk, getProductsAdminThunk } from '../../../redux/product/product.slice';
import { getCatelogryThunk } from '../../../redux/catelogry/catelogry.slice';
import AdminFilterProduct from './Component/AdminFilterProduct';
import { formatCurrencyVND } from '../../../utils';
function AdminProduct() {
  const navigate = useNavigate();
  const listProductColor=useAppSelector(state=>state.product.productColors)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (key: any) => {
    
    navigate(`/admin/quản-lí-sản-phẩm/sửa-sản-phẩm/${key}`);
  };

  const [filteredProducts, setFilteredProducts] = useState([]); // Dữ liệu đã lọc

  // Hàm để xử lý sản phẩm đã lọc từ component con
  const handleFilterProducts = (filteredData) => {
    setFilteredProducts(filteredData);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = (key: any) => {
    Swal.fire({
      icon: 'warning',
      showDenyButton: true,
      title: `Bạn Chọn Sản Phẩm Có ID ${key}`,
      text: `Bạn có chắc muốn xóa?`,
      confirmButtonText: 'Xóa',
      denyButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Đã Xóa',
          text: `Bạn đã xóa sản phẩm với ID ${key}`,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Đã Hủy',
          text: 'Bạn đã hủy thao tác xóa.',
        });
      }
    });
  };
  const [products, setProducts] = useState([]); // Dữ liệu gốc của sản phẩm


  const dispatch=useAppDispatch();
  const listProducts=useAppSelector((state)=>state.product.listAdminProducts)
  const listCatelogry=useAppSelector((state)=>state.category.listCatelories)
  const handleDeteleProduct=async (id:number)=>{
    dispatch(deleteProductAdminThunk(id))
  }
  useEffect(()=>{
    dispatch(getProductsAdminThunk(''));
    dispatch(getCatelogryThunk(""));

  },[dispatch])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(()=>{
    setProducts(listProducts);
    setFilteredProducts(listProducts); // Mặc định hiển thị tất cả sản phẩm
  },[listProducts])
  const handleEye=(id:string|number)=>{
    navigate(`/admin/quan-li-san-pham-chi-tiet/${id}`)
  }
  const getCategoryNameById = (id) => {
    const category = listCatelogry?.find((cat) => cat.category_id == id);
    return category ? category.category_name : 'Unknown'; // 'Unknown' là giá trị mặc định nếu không tìm thấy id
  };
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
      dataIndex: 'image',
      render: (src: string) => (
        <img className='rounded-md' 
        src="https://zshop.vn/images/detailed/129/iphone-15-pro-finish__5__cjwb-3i.jpg" alt="" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: 'Danh Mục',
      dataIndex: 'category_id',
      render: (categoryId) => getCategoryNameById(categoryId), // Hiển thị tên danh mục

    },
    {
      title: 'Giá Gốc',
      dataIndex: 'product_price',
      render: (price: number,recoil:any) => (
        <span>{formatCurrencyVND(price+Number(recoil?.product_colors[0]?.product_storages[0]?.storage_price ||0))}</span>
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
      render: (price: number,recoil:any) => (
        <span>{
          formatCurrencyVND(((price + Number(recoil?.product_colors[0]?.product_storages[0]?.storage_price ||0)) *(1 - Number(recoil?.product_discount / 100) )))
          } </span>
      ),
    },
    {
      title: 'Tác Vụ',
      key: 'action',
      render: (record: any) => (
        <div className='flex text-[24px] gap-1'>


          <BiSolidEdit className='cursor-pointer text-[#9000ff67] transition-all duration-700 hover:text-[#9000ffcb]'
            onClick={() => handleEdit(+record.product_id)}
          />
          <IoEyeSharp  className='cursor-pointer text-[#9000ff67] transition-all duration-700 hover:text-[#9000ffcb]'
            // onClick={() => handleEdit(record.key)}
            onClick={()=>{handleEye(+record.product_id)}}
          />
          <CiBookmarkRemove
            className='cursor-pointer text-red-300 transition-all duration-700 hover:text-[red]'
            onClick={() => handleDeteleProduct(+record.product_id)}
          />
        </div>
      ),
    },
  ];


console.log(listProducts);

const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  setSelectedRowKeys(newSelectedRowKeys);
};

const rowSelection = {
  selectedRowKeys,
  onChange: onSelectChange,
};
  const userRef = useRef<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showModal = (count: any) => {
    Swal.fire({
      icon: "info",
      title: `Bạn Vừa Chọn ${count} Sản Phẩm`,
      text: 'Bạn có muốn tiếp tục?',
      showDenyButton: true,
      denyButtonText: 'Xóa',
      confirmButtonText: 'Sửa',
      customClass: {
        confirmButton: 'bg-green-700 text-white',
        denyButton: 'bg-red-500 text-white',
      },
      backdrop: true,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isDenied) {
        Swal.fire({
          icon: "warning",
          title: `Bạn có chắc chắn muốn xóa ${count} Sản Phẩm này?`,
          showCancelButton: true,
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy',
          customClass: {
            confirmButton: 'bg-red-500 text-white',
            cancelButton: 'bg-gray-500 text-white',
          },
        }).then((kq) => {
          if (kq.isConfirmed) {
            Swal.fire('Đã xóa!', '', 'success');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Đã Hủy',
              text: 'Bạn đã hủy thao tác xóa.',
            });
          }
        });
      } else if (result.isConfirmed) {
        Swal.fire({
          icon: 'info',
          text: `Đã mở trang sửa cho ${count} Sản Phẩm`,
          confirmButtonText: 'OK',
        });
      }
    });
  };

   const [priceRange, setPriceRange] = useState([0, 30000000]); // Set initial range values
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (value: any) => {
    setPriceRange(value);
  };
  console.log(filteredProducts);
  
  return (
    <div className='flex flex-col p-12 gap-5 bg-[#f2edf3]'>
      <div className='flex-1 bg-white flex flex-col rounded-xl shadow-lg'>
        <div className='flex items-center justify-between box-border p-[24px]'>
          <span className='text-[30px] font-medium text-[#ffd700]'>Sản Phẩm</span>
          <div className='flex gap-3'>
            <Button className='p-10'>
              <IoCloudDownloadOutline className='text-[18px]' />
              Tải về PDF
            </Button>
            <Link to={`/admin/quản-lí-sản-phẩm/tạo-sản-phẩm-mới`}>
              <Button className='p-10' type="primary">
                <TbPlaylistAdd className='text-[18px]' />
                Thêm Sản Phẩm Mới
              </Button>
            </Link>

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

          <AdminFilterProduct product={listProducts} onFilter={handleFilterProducts} />

        </div>

        <div className='p-[24px] relative overflow-x-auto h-[1000px] flex flex-col'>
          <Table
            className='flex-1'
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredProducts}
            size='large'
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminProduct;
