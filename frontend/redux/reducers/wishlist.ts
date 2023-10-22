import { createReducer } from "@reduxjs/toolkit";

const wishlistItems = typeof window !== 'undefined' && localStorage.getItem("wishlistItems") 

const initialState = {
  wishlist: wishlistItems && wishlistItems !== 'null' // Check for 'null' string
    ? JSON.parse(wishlistItems)
    : [],
};

export const wishlistReducer = createReducer(initialState, {
  addToWishlist: (state: any, action) => {
    const item = action.payload;
    const isItemExist = state.wishlist.find((i: any) => i._id === item._id);
    if (isItemExist) {
      return {
        ...state,
        wishlist: state.wishlist.map((i: any) =>
          i._id === isItemExist._id ? item : i
        ),
      };
    } else {
      return {
        ...state,
        wishlist: [...state.wishlist, item],
      };
    }
  },

  removeFromWishlist: (state: any, action) => {
    return {
      ...state,
      wishlist: state.wishlist.filter((i: any) => i._id !== action.payload),
    };
  },
});