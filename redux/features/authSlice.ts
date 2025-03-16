import { getAccount } from "@/utils/db";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface auhState {
  session: object | null;
  isLoggedIn: boolean;
  isLoaded: boolean;
}

const initialState: auhState = {
  session: null,
  isLoggedIn: false,
  isLoaded: false,
};

export const getAuth = createAsyncThunk("auth/getAuth", async () => {
  const account = await getAccount();
  const promise = account.get();
  promise.then(
    function (response) {
      return response;
    },
    function (error) {
      // console.log(error);
      return null;
    }
  );
  console.log("session123", promise);
  return promise;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<object>) => {
      state.session = action.payload;
      state.isLoggedIn = true;
      state.isLoaded = true;
    },
    logout: (state) => {
      state.session = null;
      state.isLoggedIn = false;
      state.isLoaded = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuth.fulfilled, (state, action) => {
      state.session = {
        id: action.payload.$id,
        name: action.payload.name,
        email: action.payload.email,
      };
      state.isLoggedIn = true;
      state.isLoaded = true;
    });

    builder.addCase(getAuth.rejected, (state) => {
      state.isLoggedIn = false;
      state.isLoaded = true;
    });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
