"use client"

import { set_email } from "@/reducer/features/form/reducer";
import { formSelector } from "@/reducer/features/form/selectors";
import { store } from "@/reducer/store";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { useWizard } from "react-use-wizard";
import * as y from "yup"

export default function RegisterEmail() {
    const dispatch = useDispatch()
    const { nextStep } = useWizard()

    const emailSchema = y.object({
        email: y.string().email("This is not an valid e-mail.").required("This is a mandatory field."),
    }).required();

    type FormValues = y.InferType<typeof emailSchema>
    
    const { register, handleSubmit: onSubmit, formState: {isSubmitting, isValid, errors} } = useForm<FormValues>({
        resolver: yupResolver(emailSchema),
        mode: "onSubmit",
        reValidateMode: "onSubmit"
    })

    function handleSubmit(data: FormValues) {
        dispatch(set_email({email: data.email}));
        nextStep();
    }

    return (
        <form onSubmit={onSubmit(handleSubmit)}>
            {errors.email && <div className="text-red-500 bg-red-500/20 px-4 py-2 rounded-xl mb-3">{errors.email.message}</div>}


            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input
                type="email"
                {...register("email")}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
            />

            <button
                className={clsx(
                "w-full mt-5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-all duration-100",
                !isValid && "opacity-75",
                )}
                type="submit"
                disabled={isSubmitting}
            >
                { isSubmitting ? "Loading" : "Next"}
            </button>
        </form>
    )
}