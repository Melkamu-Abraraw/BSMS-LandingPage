import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isLoggedIn: false,
    username: "",
    email: "",
    token: "",
  },
};

const initialStateForProfileImage = {
  value: {
    url: "",
    baseUrl: "http://localhost:3001/api/",
  },
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
    login: (state, action) => {
      return {
        ...state,
        value: {
          isLoggedIn: true,
          token: action.payload
        },
      };
    },
  },
});

export const authForProfileImageSlice = createSlice({
  name: "authForProfileImage",
  initialState: initialStateForProfileImage,
  reducers: {
    loadProfile: (state, action) => {
      return {
        ...state,
        value: {
          url: action.payload,
        },
      };
    },
  },
});

export const { logout, login } = authSlice.actions;
export const { loadProfile } = authForProfileImageSlice.actions;

export const authReducer = authSlice.reducer;
export const authForProfileImageReducer = authForProfileImageSlice.reducer;
