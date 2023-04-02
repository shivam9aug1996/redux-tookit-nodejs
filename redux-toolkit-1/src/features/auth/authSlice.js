import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk(
  "signupUser",
  async (data, { rejectWithValue }) => {
    let data1 = await fetch("/api/v1/signup", {
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

export const signInUser = createAsyncThunk(
  "signInUser",
  async (data, { rejectWithValue }) => {
    let data1 = await fetch("/api/v1/signin", {
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

export const logout = createAsyncThunk(
  "logout",
  async (data, { rejectWithValue }) => {
    let data1 = await fetch("/api/v1/logout", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data}`,
      },
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    user: {},
    signUpState: {
      error: "",
      loading: false,
    },
    signInState: {
      error: "",
      loading: false,
    },
    logoutState: {
      error: "",
      loading: false,
    },
  },
  reducers: {
    startApp: (state, action) => {
      let f = localStorage?.getItem("token") || "";
      let j = localStorage?.getItem("user") || null;
      console.log(j);
      state.token = f || "";
      state.user = j ? JSON?.parse(j) : {};
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      state.token = action.payload.token;
      state.signUpState.loading = false;
      state.user = action.payload.data;
    },
    [signupUser.rejected]: (state, action) => {
      state.signUpState.error = action.payload;
      state.signUpState.loading = false;
    },
    [signupUser.pending]: (state, action) => {
      state.signUpState.loading = true;
    },

    [signInUser.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      state.token = action.payload.token;
      state.signInState.loading = false;
      state.user = action.payload.data;
    },
    [signInUser.rejected]: (state, action) => {
      state.signInState.error = action.payload;
      state.signInState.loading = false;
    },
    [signInUser.pending]: (state, action) => {
      state.signInState.loading = true;
    },

    [logout.fulfilled]: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.token = "";
      state.logoutState.loading = false;
      state.user = {};
    },
    [logout.rejected]: (state, action) => {
      state.logoutState.error = action.payload;
      state.logoutState.loading = false;
    },
    [logout.pending]: (state, action) => {
      state.logoutState.loading = true;
    },
  },
});

export const { startApp } = authSlice.actions;

export const authSliceReducer = authSlice.reducer;
