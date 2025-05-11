import { Suspense } from "react";
import EmailVerification from "@/components/auth/email-verification";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <EmailVerification />
    </Suspense>
  );
}
