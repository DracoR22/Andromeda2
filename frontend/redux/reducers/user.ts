import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
}

export const userReducer = createReducer(initialState, {
    LoadUserRequest: (state: any) => {
        state.loading = true
    },
    LoadUserSuccess: (state: any, action) => {
        state.isAuthenticated = true,
        state.loading = false,
        state.user = action.payload
    },
    LoadUserFail: (state: any, action) => {
        state.loading = false,
        state.error = action.payload,
        state.isAuthenticated = false
    },

    // update user information
    updateUserInfoRequest: (state: any) => {
     state.loading = true;
    },
    updateUserInfoSuccess: (state: any, action) => {
     state.loading = false;
     state.user = action.payload;
    },
    updateUserInfoFailed: (state: any, action) => {
    state.loading = false;
    state.error = action.payload;
    },

   // update user address
  updateUserAddressRequest: (state: any) => {
    state.addressloading = true;
  },
  updateUserAddressSuccess: (state: any, action) => {
    state.addressloading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  updateUserAddressFailed: (state: any, action) => {
    state.addressloading = false;
    state.error = action.payload;
  },

  // delete user address
  deleteUserAddressRequest: (state: any) => {
    state.addressloading = true;
  },
  deleteUserAddressSuccess: (state: any, action) => {
    state.addressloading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  deleteUserAddressFailed: (state: any, action) => {
    state.addressloading = false;
    state.error = action.payload;
  },
    // get all users --- admin
    getAllUsersRequest: (state: any) => {
      state.usersLoading = true;
    },
    getAllUsersSuccess: (state: any ,action) => {
      state.usersLoading = false;
      state.users = action.payload;
    },
    getAllUsersFailed: (state: any ,action) => {
      state.usersLoading = false;
      state.error = action.payload;
    },
    clearErrors: (state: any) => {
        state.error = null
    },
    
})