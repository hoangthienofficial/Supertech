import { Button, Checkbox, Popover, Table } from "antd";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";
import { CiBookmarkRemove } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getAllUserThunk } from "../../../redux/user/user.slice";
import { useAvatar } from "../../../hooks/UseAvatar.hook";
import { IMG_BACKEND_USER, URL_BACKEND } from "../../../constants";

function AdminUser() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Alluser: any = useAppSelector((state) => state.user.Alluser);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [DataAlluser, setDataAlluser] = useState<any[]>([]);
  const AppDispatch = useAppDispatch();
  const [userKeys, setuserKeys] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [columns, setColumns] = useState<any[]>([]);
  const [valueInputSearch, setvalueInputSearch] = useState(``);

  useEffect(() => {
    AppDispatch(getAllUserThunk());

  }, [AppDispatch]);
  useEffect(() => {
    // Cập nhật `DataAlluser` khi `Alluser` thay đổi
    setDataAlluser(Alluser);
  }, [Alluser]); // Theo dõi `Alluser` và chỉ cập nhật khi nó thay đổi.
  console.log(DataAlluser);

  useEffect(() => {
    if (Alluser && Alluser.length > 0) {
      const keys = Alluser.map((staff: string) => Object.keys(staff));
      keys.push("tacvu");

      setuserKeys([...new Set(keys.flat())] as string[]);
    }
  }, [Alluser]);


  useEffect(() => {
    const ColumnStaffs = userKeys
      .map((user) => {
        switch (user) {
          case "stt": // Thêm cột số thứ tự
            return {
              title: "STT",
              key: "stt",
              render: (_: any, __: any, index: number) => index + 1, // Hiển thị số thứ tự
            };
          case "user_image":
            return {
              title: "Hình",
              dataIndex: user,
              key: user,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              render: (src: any, record: any) => (
                <>
                  {src ? (
                    <img
                      className="rounded-full object-cover"
                      src={`${IMG_BACKEND_USER}/${src}`}
                      alt={record.user_name} // Đảm bảo rằng alt chỉ là một chuỗi (tên người dùng)
                      style={{ width: 50, height: 50 }}
                    />
                  ) : (
                    <div
                      className="rounded-full flex items-center justify-center"
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: 'rgb(37 99 235 / var(--tw-bg-opacity))',
                        color: 'white',
                        fontSize: '20px',
                      }}
                    >
                      {record.user_name ? record.user_name.charAt(0).toUpperCase() : '?'} {/* Hiển thị chữ cái đầu tiên từ tên người dùng */}
                    </div>
                  )}
                </>
              ),


            };
          case "user_name":
            return {
              title: "Tên",
              dataIndex: user,
              key: user,
              render: (text: any) => (
                <div className="flex-1 flex items-center gap-3">
                  {text == null || text == undefined ? "Chưa có dữ liệu" : text}
                </div>
              ),
            };

          case "user_birth":
            return {
              title: "Tuổi",
              dataIndex: user,
              key: user,
              render: (text: any) => (
                <div className="flex-1 flex items-center gap-3">
                  {text == null || text == undefined ? "Chưa có dữ liệu" : text}
                </div>
              ),
            };
          case "user_time":
            return {
              title: "Ngày tham gia",
              dataIndex: user,
              key: user,
              render: (_, record) => (
                <div className="flex-1 flex items-center gap-3">
                  {new Date(record.user_time).toLocaleDateString('vi-VN')}
                </div>
              ),
            };


          case "user_phone":
            return {
              title: "Số điện thoại",
              dataIndex: user,
              key: user,
              render: (text: any) => (
                <div className="flex-1 flex items-center gap-3">
                  {text == null || text == undefined ? "Chưa có dữ liệu" : text}
                </div>
              ),
            };

          case "user_email":
            return {
              title: "Email",
              dataIndex: user,
              key: user,
              render: (text: any) => (
                <div className="flex-1 flex items-center gap-3">
                  {text == null || text == undefined ? "Chưa có dữ liệu" : text}
                </div>
              ),
            };

          case "user_address":
            return {
              title: "Địa Chỉ",
              dataIndex: user,
              key: user,
              render: (text: any) => (
                <div className="flex-1 flex items-center gap-3">
                  {text == null || text == undefined ? "Chưa có dữ liệu" : text}
                </div>
              ),
            };
          case "user_role":
            return {
              title: "Vai trò",
              dataIndex: user,
              key: user,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              render: (text: any) => (
                <div className="flex-1 flex items-center gap-3">
                  <div
                    className={`w-[10px] rounded-full h-[10px] ${text == 11 ? "bg-[#2af52a]" : ""
                      } ${text == 1 ? "bg-[#ffd000]" : ""} ${text == 0 ? "bg-[red]" : ""
                      }`}
                  ></div>
                </div>
              ),
            };
          case "level":
            return {
              title: "Thăng hạng",
              dataIndex: user,
              key: user,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              render: (text: any) => (
                <div className="flex-1 flex items-center gap-3">
                  {text == 4 ? "Đồng" : ""} {text == 3 ? "Bạc" : ""}{" "}
                  {text == 2 ? "Vàng" : ""} {text == 1 ? "Kim Cương" : ""}{" "}
                  {text == 0 ? "Tối Thượng" : ""}
                  {text == null || text == undefined ? "Chưa có dữ liệu" : ""}
                </div>
              ),
            };

          case "tacvu": {
            return {
              title: "Tác Vụ",
              key: "tacvu",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              render: (record: any) => (
                <div className="flex text-[24px] box-border gap-1 items-center">
                  <CiBookmarkRemove
                    className="cursor-pointer text-red-300 transition-all duration-700 hover:text-[red]"
                    onClick={() => handleDelete(record.user_id)}
                  />
                </div>
              ),
            };
          }

          default:
            return null;
        }
      })
      .filter((col) => col !== null);
    setColumns([
      {
        title: "STT",
        key: "stt",
        render: (_: any, __: any, index: number) => index + 1,
      },
      ...ColumnStaffs,
    ]);
  }, [userKeys]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setvalueInputSearch(e.target.value);
  };

  useEffect(() => {
    if (valueInputSearch.trim() === "") {
      setDataAlluser(Alluser);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sanitizedSearchTerm = valueInputSearch
        .replace(/\s+/g, "")
        .toLowerCase();

      const filteredData = Alluser.filter((item: any) => {
        const userName = item?.user_name;
        const userEmail = item?.user_email;
        const userPhone = item?.user_phone;

        const userNameString =
          typeof userName === "string" || userName instanceof String
            ? userName
            : String(userName || "");
        const userEmailString =
          typeof userEmail === "string" || userEmail instanceof String
            ? userEmail
            : String(userEmail || "");
        const userPhoneString =
          typeof userPhone === "string" || userPhone instanceof String
            ? userPhone
            : String(userPhone || "");

        return (
          userNameString
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(sanitizedSearchTerm) ||
          userEmailString
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(sanitizedSearchTerm) ||
          userPhoneString
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(sanitizedSearchTerm)
        );
      });

      setDataAlluser(filteredData);
    }
  }, [valueInputSearch, Alluser]);

  const [selectedCheckbox, setSelectedCheckbox] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = (key: any) => {
    Swal.fire({
      icon: "warning",
      showDenyButton: true,
      title: `Bạn Chọn Người Dùng Có ID ${key}`,
      text: `Bạn có chắc muốn chặn ?`,
      confirmButtonText: "Chặn",
      denyButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Đã chặn",
          text: `Bạn đã chặn ${key}`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Đã Hủy",
          text: "Bạn đã hủy thao tác chặn.",
        });
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  // eslint-disable-next-line @typescript-eslint/no-explicit-any


  const sortedData = [...DataAlluser]?.sort((a, b) => {
    if (selectedCheckbox === 'new') {
      return new Date(b.user_time).getTime() - new Date(a.user_time).getTime();
    }
    if (selectedCheckbox === 'old') {
      return new Date(a.user_time).getTime() - new Date(b.user_time).getTime();
    }
    return 0;
  });
  return (
    <div className="flex flex-col p-12 gap-5 bg-[#f2edf3]">
      <div className="flex-1 bg-white flex flex-col rounded-xl shadow-lg">
        <div className="flex items-center justify-between box-border p-[24px]">
          <span className="text-[30px] text-[#FFD700] font-bold">
            Khách Hàng
          </span>
          <div className="flex gap-3">
            <Button className="p-10">
              <IoCloudDownloadOutline className="text-[18px]" />
              Tải về PDF
            </Button>
            <Link to={"/admin/quản-lí-khách-hàng/tạo-khách-hàng-mới"}>
              <Button className="p-10" type="primary">
                <AiOutlineUserAdd className="text-[18px]" />
                Thêm Người Mới
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex p-[24px] items-center justify-between gap-3">
          <div className="flex-1 flex bg-[#00000008] focus:outline-dotted rounded-lg p-[16px]">
            <input
              type="text"
              className="flex-1 text-[15px] outline-none bg-transparent"
              onChange={handleSearch}
              placeholder="Tìm kiếm người dùng..."
            />
            <GoSearch className="text-[18px]" />
          </div>

          <Popover
            content={
              <div className="flex flex-col">
                <div className="flex justify-between p-[12px] w-[200px] gap-2">
                  <label className="text-[14px]">Mới nhất</label>
                  <Checkbox
                    checked={selectedCheckbox === "new"}
                    onChange={() => setSelectedCheckbox("new")}
                  ></Checkbox>
                </div>
                <div className="flex gap-2 justify-between p-[12px]">
                  <label className="text-[14px]">Cũ nhất</label>
                  <Checkbox
                    checked={selectedCheckbox === "old"}
                    onChange={() => setSelectedCheckbox("old")}
                  ></Checkbox>
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

            columns={columns || []}
            dataSource={
              Array.isArray(sortedData)
                ? sortedData.filter((user) => user.user_role == 11)
                : []
            }
            size="large"
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminUser;