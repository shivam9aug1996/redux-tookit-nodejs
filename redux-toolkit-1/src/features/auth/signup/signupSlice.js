import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk(
  "signupUser",
  async (data, { rejectWithValue }) => {
    let data1 = await fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await data1.json();
    await new Promise((res) => {
      setTimeout(() => {
        res("8");
      }, 2000);
    });
    console.log(res);
    if (res.error) {
      return rejectWithValue(res.error);
    } else return res;
  }
);

export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (data, { rejectWithValue }) => {
    let data1 = await fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await data1.json();
    await new Promise((res) => {
      setTimeout(() => {
        res("8");
      }, 2000);
    });
    console.log(res);
    if (res.error) {
      return rejectWithValue(res.error);
    } else return res;
  }
);

const signUpSlice = createSlice({
  name: "signup",
  initialState: {
    token: "",
    user: {},
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
    },
    [signupUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [signupUser.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const signUpSliceReducer = signUpSlice.reducer;
