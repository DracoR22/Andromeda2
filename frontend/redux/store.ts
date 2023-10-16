import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user"
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";

const store = configureStore({
    reducer: {
       user: userReducer,
       seller: sellerReducer,
       products: productReducer
    }
})

export default store