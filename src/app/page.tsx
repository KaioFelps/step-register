"use client"
import FormHeader from "@/components/form-header"
import RegisterEmail from "@/ui/register-email"
import RegisterPassword from "@/ui/register-password"
import { Wizard } from "react-use-wizard"
import FormContextProvider from "@/contexts/formContextProvider"

export default function Home() {
  return (
    <FormContextProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="p-6 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="space-y-4 md:space-y-6 sm:p-8">
            <Wizard
              header={<FormHeader />}
            >
              <RegisterEmail />
              <RegisterPassword />
            </Wizard>
          </div>
        </div>
      </main>
    </FormContextProvider>
  )
}
