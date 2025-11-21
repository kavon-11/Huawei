import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialAuthState = {
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
};

// Async thunk للـ login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/api/login', credentials);
      return response.data; // نفترض backend بيرجع object فيه token
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token; // backend بيرجع token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const Actions = { loginUser, logout };

export default store;
