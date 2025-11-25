import { createSlice } from '@reduxjs/toolkit'
import { getUserProfile, userLogout } from '../api/userApi';
import { clearAuthToken, setAuthToken } from '@/utils/localStorageUtils';

const initialUser = {
  name: "",
  email: "",
  auth: false,
  role: "",
  userId: ""
}

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    login: (state, action) => {
      setAuthToken(action.payload.token);
      return { ...state, ...action.payload.user, auth: true };
    },
    logout: (state) => {
      clearAuthToken();
      return { ...state, ...initialUser };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLogout.fulfilled, (state, action) => {
      clearAuthToken();
      state = { ...initialUser, auth: action.payload.auth };
      return state;
    });

    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      const { auth } = action.payload;
      if (auth) {
        return { ...state, ...action.payload, userId: action.payload.id, auth: auth }
      } else {
        clearAuthToken();
        return { ...state, auth: auth }
      }
    });
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;