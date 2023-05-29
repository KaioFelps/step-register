import { useWizard } from "react-use-wizard"

export default function FormHeader() {
    const { activeStep } = useWizard()
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
            </h1>

            <span>Step {activeStep + 1}</span>
        </div>
    )
}