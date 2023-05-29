import api from "@/libs/api";
import { createSlice } from "@reduxjs/toolkit"

export interface IAccount {
    email: string;
    password: string;
    agreeToTerms: boolean;
}

const formSlice = createSlice({
    name: "form",
    initialState: {
        email: "",
        password: "",
        agreeToTerms: false,
    } as IAccount,
    reducers: {
        "set_email": (state, {payload: {email}}) => {
            return {
                ...state,
                email
            }
        },
        "set_password": (state, {payload: {password}}) => {
            return {
                ...state,
                password
            }
        },
        "set_agreeToTerms": (state, {payload: {agreed}}) => {
            return {
                ...state,
                agreeToTerms: agreed
            }
        },
    },
})

export const {set_agreeToTerms, set_email, set_password} = formSlice.actions
export const createAccountAsync = async (state: IAccount) => {
    await api.post("/accounts", state)
}

const formReducer = formSlice.reducer
export default formReducer