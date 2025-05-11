"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

    const checkAuth = async () => {
      try {
        const res = await fetch(`${backend_url}/verify-token`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Cache-Control": "no-store",
          },
        });

        const data = await res.json();

        if (data.success) {
          router.replace("/company/dashboard");
        } else {
          setChecked(true); 
        }
      } catch {
        setChecked(true); 
      }
    };

    checkAuth();
  }, [router]);

  if (!checked) {
    return <div className="text-lg font-mono">Checking user...</div>;
  }

  return <>{children}</>;
};

export default GuestGuard;
