import GuestGuard from "@/components/global/guest-guard";
import { ReactNode } from "react";

const ProtectedAuth = ({ children }: { children: ReactNode}) => {
    return (
        <GuestGuard>
            { children }
        </GuestGuard>
    )
}

export default ProtectedAuth;