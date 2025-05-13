'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react";

const Page = () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/company/dashboard")
    }, [router])
}

export default Page