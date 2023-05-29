"use client"

import { createAccountAsync, set_agreeToTerms, set_password } from "@/reducer/features/form/reducer"
import { formSelector } from "@/reducer/features/form/selectors"
import { store } from "@/reducer/store"
import { yupResolver } from "@hookform/resolvers/yup"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import * as y from "yup"

export default function RegisterPassword() {
    const { push } = useRouter()
    const dispatch = useDispatch()

    const secondStepSchema = y.object({
        password: y.string().required("This is a mandatory field.").min(6, "Mustn't have less than 6 chars.").max(32, "Mustn't have more than 32 chars."),
        confirmPassword: y.string().required("This is a mandatory field.").equals([y.ref("password")], "Passwords should match."),
        agreeToTerms: y.bool().isTrue("You shall agree to our terms.").required("This is a mandatory field")
    }).required()

    type FormData = y.InferType<typeof secondStepSchema>
    
    const { register, formState:{ isValid, isSubmitting, errors, isValidating }, handleSubmit: onSubmit, } = useForm<FormData>({
        resolver: yupResolver(secondStepSchema),
        mode: "onSubmit",
        reValidateMode: "onSubmit"
    })

    async function handleSubmit(formData: FormData) {
        dispatch(set_agreeToTerms({agreed: formData.agreeToTerms}))
        dispatch(set_password({password: formData.password}))

        await createAccountAsync(formSelector(store.getState()))
        push("/")
    }

    return (
        <form onSubmit={onSubmit(handleSubmit)}>
            {!!errors &&
                <div className="flex flex-col gap-1 mb-3">
                    {errors.password && <div className="text-red-500 bg-red-500/20 px-4 py-2 rounded-xl mb-">{errors.password.message}</div>}
                    {errors.confirmPassword && <div className="text-red-500 bg-red-500/20 px-4 py-2 rounded-xl mb-">{errors.confirmPassword.message!.toString()}</div>}
                    {errors.agreeToTerms && <div className="text-red-500 bg-red-500/20 px-4 py-2 rounded-xl mb-">{errors.agreeToTerms.message}</div>}
                </div>
            }

            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("password")}
                />
            </div>
            <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("confirmPassword")}
                />
            </div>
            <div className="flex items-start mt-2">
                <div className="flex items-center h-5">
                    <input
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        {...register("agreeToTerms")}
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                </div>
            </div>

            <button
                className={clsx(
                "w-full mt-5 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-all duration-100",
                !isValid && "opacity-75 cursor-not-allowed",
                )}
                type="submit"
                disabled={isSubmitting}
            >
                { isSubmitting ? "Loading" : isValidating ? "Validating" : "Create"}
            </button>
        </form>
    )
}