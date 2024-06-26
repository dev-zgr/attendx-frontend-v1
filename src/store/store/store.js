import {configureStore} from "@reduxjs/toolkit";
import {accountDetailsSlice} from "../slices/accountDetailsSlice";
import {UISlice} from "../slices/UISlice";

const store = configureStore({
    reducer: {
        accountDetailsSlice: accountDetailsSlice.reducer,
        UISlice : UISlice.reducer
    }
});

export default store;