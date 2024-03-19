import {configureStore} from "@reduxjs/toolkit";
import {accountDetailsSlice} from "../slices/accountDetailsSlice";
const store = configureStore({
    reducer: {
        accountDetailsSlice: accountDetailsSlice.reducer
    }
    //  Use this if you have multiple slices ==>reducers: {counter: counterSlice.reducer, pointer: pointerSlice.reducer}
});

export default store;