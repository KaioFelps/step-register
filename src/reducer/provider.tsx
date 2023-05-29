"use client";

import { ReactNode } from "react";
import {Provider} from "react-redux"
import { store } from "./store";

interface IReduxProvider {
    children: ReactNode
}

export default function ReduxProvider({ children }: IReduxProvider) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}