import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: string;
  username: string;
  token: string;
}

interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk<
  { token: string },
  {
    email: string;
    password: string;
  },
  { rejectValue: string }
>("loginUser", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(
      "https://reqres.in/api/login",
      credentials
    );
    return response.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(
      e.response?.data?.error || "خطای نا شناخته"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.error = "null";
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<{ token: string }>) => {
        state.token = action.payload.token;
        state.status = "succeeded";
        state.error = null;
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.token = null;
      state.error = action.payload || "خطای ناشناخته";
      state.status = "failed";
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
