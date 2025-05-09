"use server"

import { loginSchema } from "@/schema/input-validation"
import z from 'zod'
import { signIn } from './auth'

export const login = async (
    values: z.infer<typeof loginSchema>,
    callbackUrl?: string | null
) => {
    try {
        const email = values.email;
        const password = values.password;

        await signIn("credentials", {
            email, 
            password,
            redirect: false,
            callbackUrl: callbackUrl
        }) 

        return { success: true, message: "Logged in successfully" }
    } catch (error) {
        return { success: false, message: "Invalid credentials"}
    }
}