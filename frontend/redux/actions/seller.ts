import { server } from "@/utils/server";
import axios from "axios";
import { Dispatch } from "redux";


// get all sellers --- admin
export const getAllSellers: any = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: "getAllSellersRequest",
    });

    const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllSellersSuccess",
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "getAllSellerFailed",
    //   payload: error.response.data.message,
    });
  }
};