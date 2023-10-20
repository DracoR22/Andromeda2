import { Dispatch } from "redux";

// add to cart
export const addTocart: any = (data: any) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: "addToCart",
      payload: data,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
  };
  
  // remove from cart
  export const removeFromCart: any = (data: any) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: "removeFromCart",
      payload: data._id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
  };