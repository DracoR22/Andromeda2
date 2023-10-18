import { server } from "@/utils/server";
import axios from "axios";
import { Dispatch } from "redux";

// Create Product
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

  // Get All Products Of A Shop
export const getAllProductsShop: any = (id: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error: any) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// Delete Product Of A Shop
export const deleteProduct: any = (id: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error: any) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

// Get All Products
export const getAllProducts: any = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error: any) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};
