import { Button, Checkbox, Popover } from "antd";
import { Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteCategoryThunk, getCatelogryThunk } from "../../../redux/catelogry/catelogry.slice";
import { handleExport, handleExportPdf } from "../../../components/exportFile/exportFile";
import { FiFilter } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { IoCloudDownloadOutline } from "react-icons/io5";
import AdminAddCatelogry from './Component/AdminAddCatelogry';
import toast from "react-hot-toast";
import AdminEditCatelogry from "./Component/AdminEditCatelogry";
import { CiBookmarkRemove } from "react-icons/ci";

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



// AdminCatelogry component
const AdminCatelogry: React.FC = () => {
  const dispatch = useAppDispatch();
  const dataCategories = useAppSelector(state => state.category.listCatelories as Category[]);
  const DataCategory = [
    { label: 'Điện thoại', value: 1 },
    { label: 'Laptop', value: 2 },
    { label: 'Sạc dự phòng ', value: 3 },
    { label: 'Sạc cáp hub cáp chuyển đổi', value: 4 },
    { label: 'Ốp lưng', value: 5 },
    { label: 'Tai nghe dây bluetooth', value: 6 },
    
    // Add more categories as needed
  ];

  const [selectedCheckbox, setSelectedCheckbox] = useState(''); // Lọc theo ngày

  // Column definition for the table
  const columns = [
    {
      title: 'STT',
      render: (_, __, index: number) => index + 1,
      key: 'stt',
    },
    {
      title: 'Tên Danh Mục',
      dataIndex: 'category_name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Ngày',
      dataIndex: 'category_date_task',
      render: (date: string) => {
        return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: 'Loại chung',
      dataIndex: 'category_dad',
      render: (value: number) => {
        const category = DataCategory.find(item => item.value === value);
        return category ? category.label : 'Không xác định';
      },
    },
 
    {
      title: 'Tác Vụ',
      key: 'key',
      render: (_, record: any) => (
        <div className="flex text-[24px] box-border gap-1 items-center">
          <AdminEditCatelogry category={record} />
          <CiBookmarkRemove
            className="cursor-pointer text-red-300 transition-all duration-700 hover:text-[red]"
            onClick={() => handleDelete([record.category_id])}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
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
  const updatedDataCategories: CategoryWithKey[] = (dataCategories || []).map((item) => ({
    ...item, // Spread the item (make sure it's an object)
    key: item.category_id, // Add key from the category_id
  }));
 // Sắp xếp lại danh mục theo "Ngày Mới Nhất" hoặc "Cũ Nhất"
 const sortedData = [...updatedDataCategories].sort((a, b) => {
  if (selectedCheckbox === 'new') {
    return new Date(b.category_date_task).getTime() - new Date(a.category_date_task).getTime();
  }
  if (selectedCheckbox === 'old') {
    return new Date(a.category_date_task).getTime() - new Date(b.category_date_task).getTime();
  }
  return 0;
});
const handleDelete = (key: any) => {
  dispatch(deleteCategoryThunk(key));
};
  const onExportClick = () => {
    handleExport(sortedData); 
  };

  const onPDFClick = () => {
    handleExportPdf(sortedData); 
  };
  const userRef = useRef<any>(null);

  return (
    <div className="flex flex-col p-12 gap-5 bg-[#f2edf3]">
    <div className="flex-1 bg-white flex flex-col rounded-xl shadow-lg">
      <div className="flex items-center justify-between box-border p-[24px]">
        <span className="text-[30px] font-medium text-[#ffd700]">Danh Mục Sản Phẩm</span>
        <div className="flex gap-3">
          <Button className="p-10" onClick={onExportClick}>
            <IoCloudDownloadOutline className="text-[18px]" />
            Tải file Excel
          </Button>
          <Button className="p-10" onClick={onPDFClick}>
            <IoCloudDownloadOutline className="text-[18px]" />
            Tải file PDF
          </Button>
          <AdminAddCatelogry />
        </div>
      </div>

      <div className="flex p-[24px] items-center justify-between gap-3">
        <form className="flex-1 flex bg-[#00000008] focus:outline-dotted rounded-lg p-[16px]">
          <input
            type="text"
            className="flex-1 text-[15px] outline-none bg-transparent"
            onChange={(e) => {
              const value = e.target.value;
              if (userRef.current) {
                clearTimeout(userRef.current);
              }
          
              userRef.current = setTimeout(() => {
                dispatch(getCatelogryThunk(value));
              }, 400);
            }}
            placeholder="Tìm kiếm danh mục sản phẩm..."
          />
          <GoSearch className="text-[18px]" />
        </form>
        <Popover
          content={
            <div className="flex flex-col">
              <div className="flex justify-between p-[12px] w-[200px] gap-2">
                <label className="text-[14px]">Mới nhất</label>
                <Checkbox
                  checked={selectedCheckbox === 'new'}
                  onChange={() => setSelectedCheckbox('new')}
                />
              </div>
              <div className="flex gap-2 justify-between p-[12px]">
                <label className="text-[14px]">Cũ nhất</label>
                <Checkbox
                  checked={selectedCheckbox === 'old'}
                  onChange={() => setSelectedCheckbox('old')}
                />
              </div>
            </div>
          }
          title="Lọc"
          trigger="click"
          placement="bottomRight"
        >
          <Button className="p-10">
            <FiFilter className="text-[18px]" />
            Lọc
          </Button>
        </Popover>
      </div>
          
      <div className="p-[24px] relative overflow-x-auto h-[1000px] flex flex-col">
      <div className="text-[1.5rem] flex gap-[1rem]">
           
           
            <button className="py-[1rem] text-[#205cff]" onClick={()=>{
              handleDelete(selectedRowKeys)
            }}>Xóa</button>
          </div>
        <Table
          className="flex-1"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={sortedData}
          
          size="large"
          pagination={{ pageSize: 10 }}
        />
        {/* {key !== 0 && <AdminEditCatelogry props={key} />} */}
      </div>
    </div>
  </div>
  );
};

export default AdminCatelogry;
