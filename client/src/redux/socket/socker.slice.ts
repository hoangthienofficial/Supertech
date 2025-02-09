// socket.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

// Định nghĩa kiểu dữ liệu cho socket
interface SocketState {
  socket: Socket | null;
}

const initialState: SocketState = {
  socket: null, // Mặc định socket là null
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket(state, action: PayloadAction<Socket | null>) {
      state.socket = action.payload; // Cập nhật socket vào Redux
    },
  },
});

export const { setSocket } = socketSlice.actions;

export const socketReducer =socketSlice.reducer;