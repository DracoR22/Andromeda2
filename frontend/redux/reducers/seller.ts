import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const sellerReducer = createReducer(initialState, {
  LoadSellerRequest: (state: any) => {
    state.isLoading = true;
  },
  LoadSellerSuccess: (state: any, action) => {
    state.isSeller = true;
    state.isLoading = false;
    state.seller = action.payload;
  },
  LoadSellerFail: (state: any, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isSeller = false;
  },
  clearErrors: (state: any) => {
    state.error = null;
  },
});