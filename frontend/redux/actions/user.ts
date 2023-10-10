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