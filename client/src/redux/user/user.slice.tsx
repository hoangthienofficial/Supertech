import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePassword, getUserDetail, updateUserDetail, uploadImage, verifyPassword, getAllUser, UpdateStaff, DeleteStaffSend, createStaff, DeleteImgCloud } from '../../service/user/user.service';
import { TpayloadUser } from "../../service/user/user.type";
import Swal from "sweetalert2";
import { DataStaffInterface, UpdateStaffInterface } from "../../page/Admin/User/Component/DataStaff";
interface UserState {
  Alluser: TpayloadUser | object | null;
  user: TpayloadUser | null;
  token: string | null;
  login: boolean;
  thongBao: string;
  imgUser: string;
}

export const getAllUserThunk = createAsyncThunk(
  "getAllUserThunk",
  async () => {
    try {
      const resp = await getAllUser();
      return resp.data.content;
    } catch (e) {
      console.log(e);

    }
  },
)


export const getUserThunk = createAsyncThunk(
  "getUserThunk",
  async () => {
    try {
      const resp = await getUserDetail();
      return resp.data.content;
    } catch (e) {
      console.log(e);
    }
  },
);

export const updateUserDetailThunk = createAsyncThunk(
  "updateUserThunk",
  async (payload: TpayloadUser) => {
    try {
      const resp = await updateUserDetail(payload);
      return resp.data.content;
    } catch (e) {
      console.log(e);
    }
  },
);
export const verifyPasswordDetail = createAsyncThunk(
  "verifyPasswordThunk",
  async (payload: string) => {
    try {
      const resp = await verifyPassword(payload);
      console.log(resp.data);

      return resp.data;
    } catch (e) {
      console.log(e);
    }
  },
);
export const changePasswordDetail = createAsyncThunk(
  "changePasswordDetail",
  async (payload: string) => {
    try {
      const resp = await changePassword(payload);
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  },
);
export const changeUploadImage = createAsyncThunk(
  "changeUploadImage",
  async (payload: string, { dispatch }) => {
    try {
      await uploadImage(payload);
      const response = await dispatch(getUserThunk());
      return response.payload;
    } catch (e) {
      console.log(e);
    }
  },
);

export const createStaffThunk = createAsyncThunk(
  "createStaffThunk",
  async (DataStaff: DataStaffInterface) => {
    try {
      const resp = await createStaff(DataStaff);
      if (resp.data.statusCode === 200) {
        return resp.data.content;
      } else {
        Swal.fire({
          title: `Thất bại lỗi ${resp.data.statusCode}`,
          text: `${resp.data.message}`,
          icon: 'error',
          showCancelButton: true,
          cancelButtonText: `Thử lại`,
          cancelButtonColor: "#d33",
          showConfirmButton: false
        })
        return;
      }
    } catch (e) {
      console.log(e);
    }
  },
);
export const DeleteImgCloudThunk = createAsyncThunk(
  "DeleteImgCloudThunk",
  async (data: any) => {
    try {
      const resp = await DeleteImgCloud(data);
      return resp.data;
    } catch (e) {
      console.log(e);

    }
  },
)

export const UpdateStaffThunk = createAsyncThunk(
  "UpdateStaffThunk", async (UpdateStaffSend: UpdateStaffInterface) => {

    try {
      const resp = await UpdateStaff(UpdateStaffSend);
      if (resp.data.statusCode === 200) {
        return resp.data.content;
      } else {
        Swal.fire({
          title: `Thất bại lỗi ${resp.data.statusCode}`,
          text: `${resp.data.message}`,
          icon: 'error',
          showCancelButton: true,
          cancelButtonText: `Thử lại`,
          cancelButtonColor: "#d33",
          showConfirmButton: false
        })
        return;
      }
    } catch (e) {
      console.log(e);
    }
  },
);


export const deleteStaffThunk = createAsyncThunk(
  "deleteStaffThunk",
  async (id: number) => {
    try {
      const resp = await DeleteStaffSend(id);
      return resp.data.content;

    } catch (e) {
      console.log(e);

    }
  },
);



const initialState: UserState = {
  Alluser: {},
  user: null,
  token: null,
  login: false,
  thongBao: "",
  imgUser: ""
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setAllUser: (state, { payload }) => {
      state.Alluser = payload;
    },
    setLogin: (state, { payload }) => {
      state.login = payload;
    },
    setUserDetail: (state, { payload }) => {
      state.user = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserThunk.fulfilled, (state, { payload }) => {
        console.log('Payload:', payload);
        state.Alluser = payload;
      })
    builder
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
    builder
      .addCase(updateUserDetailThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
    builder
      .addCase(verifyPasswordDetail.fulfilled, (state, { payload }) => {
        state.thongBao = payload;
      })
    builder
      .addCase(changePasswordDetail.fulfilled, (state, { payload }) => {
        state.thongBao = payload;
      })
    builder
      .addCase(changeUploadImage.fulfilled, (state, { payload }) => {
        const user = state.user as TpayloadUser; 
        user.user_image = payload;
      })

    builder
      .addCase(deleteStaffThunk.fulfilled, (state, { payload }) => {
        state.Alluser = payload
      })

  },
});

export const { setAllUser, setUserDetail, setToken, setLogin } = userSlice.actions;

export const userReducer = userSlice.reducer;