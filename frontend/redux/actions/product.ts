import { server } from "@/utils/server";
import axios from "axios";
import { Dispatch } from "redux";

export const createProduct = (
    name: string,
    description: string,
    category: string,
    tags: string,
    originalPrice: number,
    discountPrice: number,
    stock: number,
    shopId: string,
    images: any
  ) =>  async (dispatch: Dispatch) => {
      try {
        dispatch({
          type: 'productCreateRequest',
        });
  
        const { data } = await axios.post(`${server}/product/create-product`, {
          name,
          description,
          category,
          tags,
          originalPrice,
          discountPrice,
          stock,
          shopId,
          images,
      });
  
        dispatch({
          type: 'productCreateSuccess',
          payload: data.product,
        });
      } catch (error: any) {
        dispatch({
          type: 'productCreateFail',
          payload: error.response.data.message,
        });
      
    };
  };
