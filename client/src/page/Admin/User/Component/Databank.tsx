import Swal from "sweetalert2";

export const DataRole = [
  { value: 0, label: 'Chủ cửa hàng' },
  { value: 1, label: 'Nhân Viên Quản Lí' },
  { value: 2, label: 'Nhân Viên Bán Hàng' },
  { value: 3, label: 'Nhân Viên IT' },
  { value: 4, label: 'Nhân Viên Tiếp Thị' },
  { value: 5, label: 'Nhân Viên Kế Toán' },
  { value: 6, label: 'Nhân Viên Pháp Lý' },
  { value: 7, label: 'Nhân Viên Hỗ Trợ' },
  { value: 8, label: 'Nhân Viên Kho' },
  { value: 9, label: 'Nhân Viên Bảo Vệ' },
  { value: 10, label: 'Nhân Viên Thử Việc' },
  { value: 11, label: 'Người Dùng' }
];
export interface StaffClient {
  data: {
    user_id: number;
    user_role: boolean;
  };
}



export const imageStaffLevel = [
  { value: 0, label: 'https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034720/Boss_pukaxj.png' },
  { value: 1, label: 'https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731057050/laolang_jljhqn.png' },
  { value: 2, label: 'https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034726/hang2_jnucif.png' },
  { value: 3, label: 'https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034725/hang3_gtgheu.png' },
  { value: 4, label: 'https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034726/hang1_uv6dcs.png' },
  { value: 5, label: 'https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034720/5year_flnse0.png' },
  { value: 6, label: 'https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034719/4-5year_whzi45.png' },
  { value: 7, label: 'https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034719/1year_xmnffl.png' },
  { value: 8, label: 'https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034719/2-4year_qdloen.png' },
  { value: 9, label: 'https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034719/-1year_x8oqsg.png' }
];

export const StaffGender = [
  { value: 0, label: 'Nam' },
  { value: 1, label: 'Nữ' },
  { value: 2, label: 'Khác' },

];


export interface StaffInterface {
  user_name?: string,
  user_email?: string,
  user_password?: string,
  user_address?: string,
  user_phone?: string,
  user_role?: number | null,
  level?: number | null,
  user_gender?: number | null,
  user_birth?: string,
  user_time?: string,
  user_image?: string,
  [key: string]: string | number | null | undefined;


}


export interface DataStaffInterface {
  staffData: StaffInterface,
  tokenStaff: string
}
export interface UpdateStaffInterface {
  userId: number,
  DataStaff: DataStaffInterface;
}




export const Level = (src: number) => {
  switch (src) {
    case 0:
      return (
        <>
          <img className='rounded-full object-cover' src="https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034720/Boss_pukaxj.png" alt="" style={{ width: 50, height: 50 }} />
        </>
      )
    case 1:
      return (
        <>
          <img className='rounded-full object-cover' src="https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731057050/laolang_jljhqn.png" alt="" style={{ width: 50, height: 50 }} />
        </>
      )
    case 2:
      return (
        <>
          <img className='rounded-full object-cover' src="https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034726/hang2_jnucif.png" alt="" style={{ width: 50, height: 50 }} />
        </>
      )
    case 3:
      return (
        <>
          <img className='rounded-full object-cover' src="https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034725/hang3_gtgheu.png" alt="" style={{ width: 50, height: 50 }} />
        </>
      )
    case 4:
      return (
        <>
          <img className='rounded-full object-cover' src="https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034726/hang1_uv6dcs.png" alt="" style={{ width: 50, height: 50 }} />

        </>
      )
    case 5:
      return (
        <>
          <img className='rounded-full object-cover' src="https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034720/5year_flnse0.png" alt="" style={{ width: 50, height: 50 }} />
        </>
      )
    case 6:
      return (
        <>
          <img className='rounded-full object-cover' src="https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034719/4-5year_whzi45.png" alt="" style={{ width: 50, height: 50 }} />
        </>
      )
    case 7:
      return (
        <>


          <img className='rounded-full object-cover' src="https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034719/1year_xmnffl.png" alt="" style={{ width: 50, height: 50 }} />
        </>
      )
    case 8:
      return (
        <>

          <img className='rounded-full object-cover' src="https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034719/2-4year_qdloen.png" alt="" style={{ width: 50, height: 50 }} />
        </>
      )
    case 9:
      return (
        <>

          <img className='rounded-full object-cover' src="https://res.cloudinary.com/dcvkmhlhw/image/upload/v1731034719/-1year_x8oqsg.png" alt="" style={{ width: 50, height: 50 }} />
        </>
      )


    default:
      return (
        <>
          <img className='rounded-full object-cover' src="https://res.cloudinary.com/dcvkmhlhw/image/upload/c_thumb,w_200,g_face/v1731038485/tapsu_ejr7bo.png" alt="" style={{ width: 50, height: 50 }} />
        </>
      )
  }

}



// eslint-disable-next-line react-refresh/only-export-components
export const checkRoleAndShowAlert = (RoleStaff: number, key_role: number) => {
  const Textrole = DataRole.findIndex(role => role.value == RoleStaff);




  switch (key_role) {
    case 0:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: `Bạn Không Có Quyền Xóa Chủ, Chỉ Tài Khoản Chủ Mới Được Xóa`,
      });
    case 1:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Xóa Nhân Viên Quản Lí',
      });
    case 2:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Xóa Nhân Viên Bán Hàng',
      });
    case 3:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Xóa Nhân Viên IT',
      });
    case 4:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Xóa Nhân Viên Tiếp Thị',
      });
    case 5:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Xóa Nhân Viên Kế Toán',
      });
    case 6:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Xóa Nhân Viên Pháp Lý',
      });
    case 7:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Xóa Nhân Viên Hỗ Trợ',
      });
    case 8:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Xóa Nhân Viên Kho',
      });
    case 9:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Xóa Nhân Viên Bảo Vệ',
      });
    case 10:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Xóa Nhân Viên Thử Việc',
      });
    case 11:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Xóa Người Dùng Thường',
      });
    default:
      return Swal.fire({
        icon: 'error',
        title: 'Không Xác Định Quyền',
        text: 'Không có quyền xóa với vai trò này',
      });
  }
}



export const CheckUpdateUser = (RoleStaff: number, key_role: number) => {
  const Textrole = DataRole.findIndex(role => role.value == RoleStaff);




  switch (key_role) {
    case 0:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: `Bạn Không Có Quyền Sửa Chủ, Chỉ Tài Khoản Chủ Mới Được Sửa`,
      });
    case 1:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Sửa Nhân Viên Quản Lí',
      });
    case 2:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Sửa Nhân Viên Bán Hàng',
      });
    case 3:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Sửa Nhân Viên IT',
      });
    case 4:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Sửa Nhân Viên Tiếp Thị',
      });
    case 5:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Sửa Nhân Viên Kế Toán',
      });
    case 6:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Sửa Nhân Viên Pháp Lý',
      });
    case 7:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Sửa Nhân Viên Hỗ Trợ',
      });
    case 8:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Sửa Nhân Viên Kho',
      });
    case 9:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Sửa Nhân Viên Bảo Vệ',
      });
    case 10:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Sửa Nhân Viên Thử Việc',
      });
    case 11:
      return Swal.fire({
        icon: 'error',
        title: `Bạn là ${DataRole[Textrole].label}`,
        text: 'Bạn Không Có Quyền Sửa Người Dùng Thường',
      });
    default:
      return Swal.fire({
        icon: 'error',
        title: 'Không Xác Định Quyền',
        text: 'Không có quyền Sửa với vai trò này',
      });
  }
}