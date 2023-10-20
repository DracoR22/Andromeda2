import { Dispatch } from "redux";

// add to wishlist
export const addToWishlist: any = (data: any) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: "addToWishlist",
      payload: data,
    });
  
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
    return data;
  };
  
  // remove from wishlist
  export const removeFromWishlist: any = (data: any) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: "removeFromWishlist",
      payload: data._id,
    });
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
    return data;
  };
  