import { Suspense } from "react";
import NewPassword from "@/components/auth/new-password";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <NewPassword />
    </Suspense>
  );
}
