"use client";

import { ReactNode, useState } from "react"
import { FormContext } from "./formContext"

export default function FormContextProvider({ children }: {children: ReactNode}) {
    const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    function addEmail(email: string) {
        setEmail(email)
    }

    function addPassword(password: string) {
        setPassword(password)
    }

    function addTermsStatus(agreed: boolean) {
        setAgreeToTerms(agreed)
    }

    return (
        <FormContext.Provider value={{
            data: {
                agreeToTerms,
                email,
                password,
            },
            addEmail,
            addPassword,
            addTermsStatus,
        }}>
            {children}
        </FormContext.Provider>
    )
}