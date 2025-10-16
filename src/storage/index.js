import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shop/shopSlice";
import cartReducer from "../features/cart/cartSlice"
import userReducer from "../features/user/userSlice"
import { shopApi } from "../services/shop/shopApi";
import { authApi } from "../services/authentication/authApi";
import { userApi } from "../services/user/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const storage = configureStore({
    reducer:{
        shopReducer,
        cartReducer,
        userReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware)=>(getDefaultMiddleware()
                        .concat(shopApi.middleware)
                        .concat(authApi.middleware)
                        .concat(userApi.middleware)
                    )

})

setupListeners(storage.dispatch)

export default storage