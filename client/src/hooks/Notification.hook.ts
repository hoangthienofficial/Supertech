import Swal from 'sweetalert2';

const useSweetAlert = () => {
  const showAlert = (icon: 'success' | 'error', title: string) => {
    Swal.fire({
      position: 'top-end',
    //   icon: icon,
      title: title || 'Đã có lỗi xảy ra', // Thông điệp fallback
      showConfirmButton: false,
      timer: 1500, // Thời gian hiển thị
      timerProgressBar: true, // Kích hoạt thanh tiến trình
    });
  };

  return { showAlert };
};

export default useSweetAlert;