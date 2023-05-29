import { configureStore } from "@reduxjs/toolkit"
import formReducer from "./features/form/reducer"

const rootReducer = {
    form: formReducer
}


export const store = configureStore({
    reducer: rootReducer,
})

export type RootStore = ReturnType<typeof store.getState>