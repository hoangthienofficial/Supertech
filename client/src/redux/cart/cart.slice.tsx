import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Định nghĩa kiểu cho một sản phẩm trong giỏ hàng

// Định nghĩa kiểu cho state của giỏ hàng
interface CartState {
  listCart: CartItem[];
  totalItems: number; // Tổng số lượng sản phẩm
  totalAmount: number; // Tổng tiền
  discount: number | null; // Mã giảm giá
  ship: number; // Phí ship
  discount_id: number | null; // ID giảm giá
}

// Khởi tạo state ban đầu
const initialState: CartState = {
  listCart: [], // Giỏ hàng rỗng
  totalItems: 0,
  totalAmount: 0,
  discount: null, // Mặc định là null
  discount_id: null, // Mặc định là null
  ship: 30000,
};

// Tạo slice cho giỏ hàng
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Set mã giảm giá
    setDiscoutCart: (state, action) => {
      state.discount = action.payload; // setting the discount value
    },
    setDiscoutId: (state, action) => {
      state.discount_id = action.payload; // setting the discount value
    },
    // Thêm sản phẩm vào giỏ hàng
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      if (state.listCart) {
        const existingItem = state.listCart.find(item => item.product_id == action.payload.product_id);
        if (existingItem) {
          existingItem.quantity += 1;
          
        } else {
          state.listCart.push({ ...action.payload, quantity: 1 });
        }
      }
      // Cập nhật tổng số lượng và tổng tiền
      state.totalItems = state.listCart.reduce((total, item) => total + item.quantity, 0);
      // state.totalAmount = state.listCart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    // Thêm sản phẩm vào trực tiếp order
    addItemToOrder: (state, action: PayloadAction<CartItem>) => {
      // Thay thế toàn bộ listCart bằng sản phẩm mới
      state.listCart = [{ ...action.payload, quantity: 1 }];
    },
    // Xóa sản phẩm khỏi giỏ hàng
    removeItemFromCart: (state, action: PayloadAction<{ product_id: string }>) => {
      state.listCart = state.listCart.filter(item => item.product_id !== action.payload.product_id);
      // Cập nhật tổng số lượng sản phẩm
      state.totalItems = state.listCart.reduce((total, item) => total + item.quantity, 0);
  //    // Cập nhật tổng tiền
  state.totalAmount = state.listCart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Giảm số lượng sản phẩm trong giỏ hàng (nếu số lượng > 1)
    decreaseItemQuantity: (state, action: PayloadAction<{ product_id: string }>) => {
      const existingItem = state.listCart.find(item => item.product_id === action.payload.product_id);
      if (existingItem && existingItem.quantity > 1) {
        // Giảm số lượng sản phẩm khi số lượng > 1
        existingItem.quantity -= 1;
      } else {
        // Xóa sản phẩm khi số lượng = 1
        state.listCart = state.listCart.filter(item => item.product_id !== action.payload.product_id);
        toast.success("Sản phẩm đã xóa khỏi giỏ hàng");
      }
    
      // Cập nhật tổng số lượng sản phẩm
      state.totalItems = state.listCart.reduce((total, item) => total + item.quantity, 0);
    
      // Cập nhật tổng tiền
      state.totalAmount = state.listCart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    inCreaseItemQuantity: (state, action: PayloadAction<{ product_id: string }>) => {
      if (state.listCart) {
        const existingItem = state.listCart.find(item => item.product_id === action.payload.product_id);
    
        if (existingItem) {
          // Kiểm tra nếu số lượng trong giỏ nhỏ hơn tồn kho
          if (existingItem.quantity < existingItem.selectedQuantity) {
            // Tăng số lượng nếu còn đủ tồn kho
            existingItem.quantity += 1;
          } else {
            // Hiển thị thông báo lỗi nếu vượt quá tồn kho
            toast.error("Số lượng sản phẩm không đủ");
          }
        }
      }
    
      // Cập nhật tổng số lượng
      state.totalItems = state.listCart.reduce((total, item) => total + item.quantity, 0);
    
      // Cập nhật tổng tiền
      state.totalAmount = state.listCart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
      


    //Xóa tất cả
    removeAllCart:(state)=>{
        state.listCart=[]
        state.totalItems=0
        state.totalAmount=0
    },
    // Đếm tổng số lượng sản phẩm trong giỏ hàng
    numCart: (state) => {
      state.totalItems = state.listCart.reduce((total, item) => total + item.quantity, 0);
    },
  },
});

// Export các action
export const {addItemToOrder,setDiscoutCart,setDiscoutId, addItemToCart, removeItemFromCart,removeAllCart, decreaseItemQuantity,inCreaseItemQuantity, numCart } = cartSlice.actions;

// Export reducer
export const cartReducer = cartSlice.reducer;
