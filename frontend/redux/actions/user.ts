import { server } from "@/utils/server"
import axios from "axios"
import { Dispatch } from "redux"

// Load User
export const loadUser: any = () => async(dispatch: any) => {
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
export const loadSeller: any = () => async (dispatch: any) => {
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
export const updateUserInformation: any = (name: string, email: string, phoneNumber: number) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
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

  // update user address
export const updatUserAddress: any = (country: string, city: string, address1: string, address2: string, zipCode: number, addressType: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: "updateUserAddressRequest",
    });

    const { data } = await axios.put(
      `${server}/user/update-user-addresses`,
      {
        country,
        city,
        address1,
        address2,
        zipCode,
        addressType,
      },
      { withCredentials: true }
    );

    dispatch({
      type: "updateUserAddressSuccess",
      payload: {
        successMessage: "User address updated succesfully!",
        user: data.user,
      },
    });
  } catch (error: any) {
    dispatch({
      type: "updateUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};

// delete user address
export const deleteUserAddress: any = (id: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });

    const { data } = await axios.delete(`${server}/user/delete-user-address/${id}`,{ withCredentials: true });

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "User deleted successfully!",
        user: data.user,
      },
    });
  } catch (error: any) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};

// get all users --- admin
export const getAllUsers: any = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error: any) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};
