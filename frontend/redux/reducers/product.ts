import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, {
  productCreateRequest: (state) => {
    state.isLoading = true;
  },
  productCreateSuccess: (state: any, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  productCreateFail: (state: any, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all products of shop
  getAllProductsShopRequest: (state: any) => {
    state.isLoading = true;
  },
  getAllProductsShopSuccess: (state: any, action) => {
    state.isLoading = false;
    state.products = action.payload;
  },
  getAllProductsShopFailed: (state: any, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete product of a shop
  deleteProductRequest: (state: any) => {
    state.isLoading = true;
  },
  deleteProductSuccess: (state: any, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteProductFailed: (state: any, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all products
  getAllProductsRequest: (state: any) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state: any, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
  },
  getAllProductsFailed: (state: any, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  
  clearErrors: (state: any) => {
    state.error = null;
  },
});