import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Định nghĩa kiểu cho một sản phẩm trong giỏ hàng

// Định nghĩa kiểu cho state của giỏ hàng
interface voucherState {

  discount: number | null; // Mã giảm giá
 
  discount_id: number | null; // ID giảm giá
}

// Khởi tạo state ban đầu
const initialState: voucherState = {

  discount: null, // Mặc định là null
  discount_id: null, // Mặc định là null
 
};

// Tạo slice cho giỏ hàng
const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
        // Set mã giảm giá
        setDiscoutCart: (state, action) => {
            state.discount = action.payload; // setting the discount value
          },
          setDiscoutId: (state, action) => {
            state.discount_id = action.payload; // setting the discount value
          },
          setDiscount :( state)=>{
            state.discount=null;
            state.discount_id = null
          }
  }

});

// Export các action
export const {setDiscoutCart,setDiscoutId, setDiscount  } = voucherSlice.actions;

// Export reducer
export const voucherReducer = voucherSlice.reducer;
