import api from "@/libs/api";
import { IAccount } from "@/reducer/features/form/reducer";
import Link from "next/link";

async function getAllAccounts() {
    const response = await api.get("/accounts")
    const data = await response.data

    return data
}

interface ServerAccount extends IAccount {
    id: number
}

export default async function Page() {
    const accounts: ServerAccount[] = await getAllAccounts();

    console.log(accounts)

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <ul className="flex flex-col gap-2">
                {accounts.map(account => {
                    return (
                        <div key={account.id} className="px-10 py-6 rounded-xl bg-slate-900 shadow-lg shadow-black/50 flex flex-col gap-1">
                            <p className="px-3 py-1 rounded-lg bg-slate-800">{account.email}</p>
                            <p className="px-3 py-1 rounded-lg bg-slate-800">{account.password}</p>
                            <p className="px-3 py-1 rounded-lg bg-slate-800">{account.agreeToTerms ? "concorda com os termos" : "não concorda com os termos"}</p>
                        </div>
                    )
                })}
            </ul>

            <Link className="font-bold text-white px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 mt-4" href="/new">New account</Link>
        </main>
    )
}