import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user"
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";

const store = configureStore({
    reducer: {
       user: userReducer,
       seller: sellerReducer,
       products: productReducer,
       events: eventReducer
    }
})

export default store