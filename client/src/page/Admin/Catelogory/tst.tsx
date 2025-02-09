

import { Popover, Button, Checkbox, Table, Menu } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { FiFilter } from 'react-icons/fi';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import { CiBookmarkRemove } from 'react-icons/ci';
import AdminAddCatelogry from './Component/AdminAddCatelogry';
import AdminEditCatelogry from './Component/AdminEditCatelogry';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { deleteCategoryThunk, getCatelogryThunk } from '../../../redux/catelogry/catelogry.slice';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { handleExport, handleExportPdf } from '../../../components/exportFile/exportFile';

function AdminCatelogry() {
  const [selectedCheckbox, setSelectedCheckbox] = useState(''); // Lọc theo ngày
  const [key, setKey] = useState(0); // Lưu trạng thái của key để mở component Edit

  const DataCategory = [
    { label: 'Điện thoại', value: 1 },
    { label: 'Laptop', value: 2 },
    { label: 'Table', value: 3 },
  ];

  const dispatch = useAppDispatch();
  const dataCategories = useAppSelector(state => state.category.listCatelories);

  useEffect(() => {
    dispatch(getCatelogryThunk(''));
  }, [dispatch]);

  const handleDelete = (key: any) => {
    dispatch(deleteCategoryThunk(key));
    toast.success("Xóa loại thành công");
  };

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
      title: 'Vai Trò',
      dataIndex: 'category_task',
      render: (value) => (value === 1 ? 'true' : 'false'),
    },
    {
      title: 'Tác Vụ',
      key: 'key',
      render: (_, record: any) => (
        <div className="flex text-[24px] box-border gap-1 items-center">
          <AdminEditCatelogry category={record} />
          <CiBookmarkRemove
            className="cursor-pointer text-red-300 transition-all duration-700 hover:text-[red]"
            onClick={() => handleDelete(record.category_id)}
          />
          <CiBookmarkRemove
            className="cursor-pointer text-red-300 transition-all duration-700 hover:text-[red]"
            onClick={() => handleDelete(record.category_id)}
          />
        </div>
      ),
    },
  ];

  const userRef = useRef<any>(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const selectRow = useCallback((record) => {
    setSelectedRowKeys((prevSelectedRowKeys) => {
      const newSelectedRowKeys = [...prevSelectedRowKeys];
      const index = newSelectedRowKeys.indexOf(record.key);
      if (index >= 0) {
        newSelectedRowKeys.splice(index, 1);
      } else {
        newSelectedRowKeys.push(record.key);
      }
      return newSelectedRowKeys;
    });
  }, []);

  const onSelectedRowKeysChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };


  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };


  const hasSelected = selectedRowKeys.length > 0;


  // Sắp xếp lại danh mục theo "Ngày Mới Nhất" hoặc "Cũ Nhất"
  const sortedData = [...dataCategories].sort((a, b) => {
    if (selectedCheckbox === 'new') {
      return new Date(b.category_date_task).getTime() - new Date(a.category_date_task).getTime();
    }
    if (selectedCheckbox === 'old') {
      return new Date(a.category_date_task).getTime() - new Date(b.category_date_task).getTime();
    }
    return 0;
  });

  // Hàm xử lý xuất Excel
  const onExportClick = () => {
    handleExport(sortedData); // Truyền dữ liệu đã sắp xếp cho hàm export
  };

  // Hàm xử lý xuất PDF
  const onPDFClick = () => {
    handleExportPdf(sortedData); // Truyền dữ liệu đã sắp xếp cho hàm export PDF
  };

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
          <Table
            className="flex-1"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={sortedData}
               onRow={(record) => ({
        onClick: () => {
          selectRow(record);
        },
      })}
            size="large"
            pagination={{ pageSize: 10 }}
          />
          {key !== 0 && <AdminEditCatelogry props={key} />}
        </div>
      </div>
    </div>
  );
}

export default AdminCatelogry;
