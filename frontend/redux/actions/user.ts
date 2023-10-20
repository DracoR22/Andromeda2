import { server } from "@/utils/server"
import axios from "axios"
import { Dispatch } from "redux"

// Load User
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

// user update information
export const updateUserInformation: any = (name: string, email: string, phoneNumber: number, password: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error: any) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data.message,
      });
    }
  };
