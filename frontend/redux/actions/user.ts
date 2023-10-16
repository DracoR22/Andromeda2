import { server } from "@/utils/server"
import axios from "axios"

//Load User
export const loadUser = () => async(dispatch: any) => {
  try {
    dispatch: ({
       type:  "LoadUserRequest",
    })
    const { data } = await axios.get(`${server}/user/get-user`, { withCredentials: true })
    dispatch({
        type: "LoadUserSuccess",
        payload: data.user
    })
  } catch (error: any) {
    dispatch({
        type: "LoadUserFail",
        payload: error.response.data.message
    })
  }
}

// load Seller
export const loadSeller = () => async (dispatch: any) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/get-seller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error: any) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response.data.message,
    });
  }
};
