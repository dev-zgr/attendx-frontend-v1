import {createSlice} from "@reduxjs/toolkit";
import {DEFAULT_USER_ACCOUNT_SLICE} from "../../config/config";

export const accountDetailsSlice = createSlice({
    name: 'accountDetailsSlice',
    initialState: DEFAULT_USER_ACCOUNT_SLICE
});


export const accountActions = accountDetailsSlice.actions;