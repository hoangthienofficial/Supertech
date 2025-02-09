

import { Button, Checkbox, Popover, Table } from 'antd';
import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { FiFilter } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import { BiSolidEdit } from 'react-icons/bi';
import { CiBookmarkRemove } from 'react-icons/ci';
import { TbPlaylistAdd } from 'react-icons/tb';

function AdminCommentPost() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (key: any) => {

    Swal.fire({
      title: "Nhập câu trả lời của bạn",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Gửi",
      preConfirm: (reply) => {
        if (!reply) {
          Swal.showValidationMessage('Bạn cần nhập câu trả lời.');
        }
        return reply;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          text: `Đã trả lời bình luận có ID: ${key}`,
          confirmButtonText: 'OK',
        });
      }
    });


  };


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = (key: any) => {
    Swal.fire({
      icon: 'warning',
      showDenyButton: true,
      title: `Bạn Chọn Bình Luận Có ID ${key}`,
      text: `Bạn có chắc muốn xóa ?`,
      confirmButtonText: 'Xóa',
      denyButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Đã Xóa',
          text: `Bạn đã Xóa ${key}`,
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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Người Bình Luận',
      dataIndex: 'userName',
    }, {
      title: 'Hình Người Dùng',
      dataIndex: 'image',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (src: any) => (
        <img className='rounded-full object-cover' src={src} alt="" style={{ width: 50, height: 50 }} />
      ),
    },


    {
      title: 'Bài Viết',
      dataIndex: 'article',
    },
    {
      title: 'Nội Dung Bình Luận',
      dataIndex: 'comment',
    },

    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      render: (text: string) => (
        <div className="flex-1 flex items-center gap-3">
          <div className={`w-[10px] rounded-full h-[10px] ${text === 'Đã trả lời' ? 'bg-[#2af52a]' : ''} ${text === 'Chưa trả lời' ? 'bg-[red]' : ''}`} ></div>
          {text}
        </div>
      ),

    },
    {
      title: 'Ngày Bình Luận',
      dataIndex: 'commentDate',
    },


    {
      title: 'Tác Vụ',
      key: 'key',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (record: any) => (
        <div className='flex text-[24px] box-border gap-1 items-center'>
          <BiSolidEdit className='cursor-pointer text-[#9000ff67] transition-all duration-700 hover:text-[#9000ffcb]'
            onClick={() => handleEdit(record.key)}
          />
          <CiBookmarkRemove
            className='cursor-pointer text-red-300 transition-all duration-700 hover:text-[red]'
            onClick={() => handleDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      userName: "Nguyễn Văn A",
      image: "https://mcdn.coolmate.me/image/March2023/thay-ong-noi-meme-1440_204.jpg",
      article: 'Cách sử dụng điện thoại Android hiệu quả',
      comment: 'Bài viết rất hữu ích!',
      commentDate: "2024-10-01",
      status: 'Đã trả lời',
    },
    {
      key: 2,
      userName: "Trần Thị B",
      image: "https://cdn.tuoitre.vn/471584752817336320/2023/4/28/nguyen-phuong-hang-1682653896408145566878.jpeg",
      article: 'Những tính năng mới trên iOS 17',
      comment: 'Mình rất thích!',
      commentDate: "2024-10-02",
      status: 'Chưa trả lời',
    },
    {
      key: 3,
      userName: "Lê Văn C",
      image: "https://image.congan.com.vn/thumbnail/CATP-480-2022-5-16/diem-my.jpeg",
      article: 'Đánh giá nhanh Samsung Galaxy S23',
      comment: 'Rất hay!',
      commentDate: "2024-10-03",
      status: 'Đã trả lời',
    },
    {
      key: 4,
      userName: "Phạm Thị D",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdLoBWOPhmtxeICICCEtBzPhOTTN9Bqjt4p9W4mcWZVayi8A7UfD7GBen9WsmURjMYM08&usqp=CAU",
      article: 'So sánh các dòng laptop nổi bật',
      comment: 'Thông tin rất cần thiết!',
      commentDate: "2024-10-04",
      status: 'Chưa trả lời',
    },
    {
      key: 5,
      userName: "Nguyễn Văn E",
      image: "https://mcdn.coolmate.me/image/March2023/thay-ong-noi-meme-1440_204.jpg",
      article: 'Các mẹo chụp ảnh bằng smartphone',
      comment: 'Rất bổ ích!',
      commentDate: "2024-10-05",
      status: 'Đã trả lời',
    },
    {
      key: 6,
      userName: "Trần Văn F",
      image: "https://cdn.tuoitre.vn/471584752817336320/2023/4/28/nguyen-phuong-hang-1682653896408145566878.jpeg",
      article: 'Cách bảo vệ điện thoại khỏi virus',
      comment: 'Cảm ơn bạn!',
      commentDate: "2024-10-06",
      status: 'Chưa trả lời',
    },
    {
      key: 7,
      userName: "Lê Thị G",
      image: "https://image.congan.com.vn/thumbnail/CATP-480-2022-5-16/diem-my.jpeg",
      article: 'Tổng hợp các ứng dụng học tập hay',
      comment: 'Mình sẽ thử ngay!',
      commentDate: "2024-10-07",
      status: 'Đã trả lời',
    },
    {
      key: 8,
      userName: "Phạm Văn H",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdLoBWOPhmtxeICICCEtBzPhOTTN9Bqjt4p9W4mcWZVayi8A7UfD7GBen9WsmURjMYM08&usqp=CAU",
      article: 'Hướng dẫn cài đặt Windows 11',
      comment: 'Rất dễ hiểu!',
      commentDate: "2024-10-08",
      status: 'Chưa trả lời',
    },
    {
      key: 9,
      userName: "Nguyễn Thị I",
      image: "https://mcdn.coolmate.me/image/March2023/thay-ong-noi-meme-1440_204.jpg",
      article: 'Bí quyết sử dụng mạng xã hội hiệu quả',
      comment: 'Thông tin rất hữu ích!',
      commentDate: "2024-10-09",
      status: 'Đã trả lời',
    },
    {
      key: 10,
      userName: "Trần Văn J",
      image: "https://cdn.tuoitre.vn/471584752817336320/2023/4/28/nguyen-phuong-hang-1682653896408145566878.jpeg",
      article: 'Cách chọn mua phụ kiện điện thoại',
      comment: 'Rất bổ ích!',
      commentDate: "2024-10-10",
      status: 'Chưa trả lời',
    },
  ];









  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedCheckbox, setSelectedCheckbox] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedCheckbox(selectedRowKeys);
    if (selectedRowKeys.length > 0) {
      showModal(selectedRowKeys.length);
    }
  };
  const rowSelection = {
    onChange: onSelectChange,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showModal = (count: any) => {
    Swal.fire({
      icon: "info",
      title: `Bạn Vừa Chọn ${count} Bình Luận`,
      text: 'Bạn có muốn tiếp tục?',
      showDenyButton: true,
      denyButtonText: 'Xóa',
      confirmButtonText: 'Trả lời',
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
          title: `Bạn có chắc chắn muốn xóa ${count} Bình Luận này?`,
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
          title: "Nhập câu trả lời của bạn",
          input: "text",
          inputAttributes: {
            autocapitalize: "off"
          },
          showCancelButton: true,
          confirmButtonText: "Gửi",
          preConfirm: (reply) => {
            if (!reply) {
              Swal.showValidationMessage('Bạn cần nhập câu trả lời.');
            }
            return reply;
          },
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              text: `Đã trả lời bình luận có ID: ${count}`,
              confirmButtonText: 'OK',
            });
          }
        });

      }
    });
  };





  return (
    <div className='flex  flex-col p-12 gap-5 bg-[#f2edf3]'>
      <div className='flex-1 gap-3 bg-white flex flex-col rounded-xl shadow-lg'>
        <div className='flex items-center justify-between box-border p-[24px]'>
          <span className='text-[30px] font-medium text-[#ffd700]'>Bình Luận Bài Viết</span>
          <div className='flex gap-3'>
            <Button className='p-10'>
              <IoCloudDownloadOutline className='text-[18px]' />
              Tải về PDF
            </Button>
            <Button className='p-10' type="primary">
              <TbPlaylistAdd className='text-[18px]' />
              Bình Luận Bài Viết Mới
            </Button>
          </div>
        </div>

        <div className='flex p-[24px] items-center justify-between gap-3'>
          <div className='flex-1 flex bg-[#00000008] focus:outline-dotted rounded-lg p-[16px]'>
            <input type="text" className='flex-1 text-[15px] outline-none bg-transparent' placeholder='Tìm kiếm bình luận bài viết...' />
            <GoSearch className='text-[18px]' />
          </div>

          <Popover
            content={<div className='flex flex-col'>


              <div className='flex justify-between p-[12px] w-[200px] gap-2'>
                <label className='text-[14px]'>Mới nhất</label>
                <Checkbox checked={selectedCheckbox === 'new'} onChange={() => setSelectedCheckbox('new')}></Checkbox>
              </div>
              <div className='flex gap-2 justify-between p-[12px]'>
                <label className='text-[14px]'>Cũ nhất</label>
                <Checkbox checked={selectedCheckbox === 'old'} onChange={() => setSelectedCheckbox('old')}></Checkbox>
              </div>
              <div className='flex justify-between p-[12px] w-[200px] gap-2'>
                <label className='text-[14px]'>Đã trả lời</label>
                <Checkbox checked={selectedCheckbox === 'rep'} onChange={() => setSelectedCheckbox('rep')}></Checkbox>
              </div>
              <div className='flex gap-2 justify-between p-[12px]'>
                <label className='text-[14px]'>Chưa trả lời</label>
                <Checkbox checked={selectedCheckbox === 'norep'} onChange={() => setSelectedCheckbox('norep')}></Checkbox>
              </div>



            </div>}
            title="Lọc"
            trigger="click"
            placement="bottomRight"
          >
            <Button className='p-10'>
              <FiFilter className='text-[18px]' />
              Lọc
            </Button>
          </Popover>
        </div>

        <div className='p-[24px] relative overflow-x-auto h-[1000px] flex flex-col'>
          <Table
            className='flex-1'
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            size='large'
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminCommentPost;
