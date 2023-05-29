import { createContext } from "react";

type FormType = {
    email: string;
    password: string;
    agreeToTerms: boolean;
}

type FormContextType = {
    data: FormType;
    addEmail: (email: string) => void;
    addPassword: (password: string) => void;
    addTermsStatus: (agreed: boolean) => void;
    createAccount: (data: FormType) => void;
}

export const FormContext = createContext({} as FormContextType)