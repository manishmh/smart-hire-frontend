"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

const SessionGuard = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

    const verify = async () => {
      try {
        const res = await fetch(`${backend_url}/verify-token`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Cache-Control": "no-store",
          },
        });

        const data = await res.json();
        if (!data.success) {
          throw new Error("Unauthorized, accessToken expired.")
        }

        if (isMounted) setIsAuthenticated(true);
      } catch (err) {
        if (isMounted) {
          try {
            const res = await fetch(`${backend_url}/access-token`, {
              method: "GET",
              credentials: "include",
              headers: {
                "Cache-Control": "no-store",
              }
            }) 

            const data = await res.json();
            if (!data.success) {
              throw new Error("Unauthorized, refreshToken expired. Login again")
            }

          } catch (error) {
            setIsAuthenticated(false);
            toast.error("Session over! Please Login again");
            router.push("/auth/login");
          }
        }
      }
    };

    verify();

    const interval = setInterval(verify, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [router]);

  if (isAuthenticated === null) {
    return <div className="text-lg font-mono">Loading...</div>;
  }

  return <>{children}</>;
};

export default SessionGuard;
