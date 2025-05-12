"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

const SessionGuard = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

    const verify = async () => {
      try {
        const res = await fetch(`${backend_url}/verify-token`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Cache-Control": "no-store",
          },
          signal: controller.signal,
        });

        const data = await res.json();
        if (!data.success) {
          throw new Error("Unauthorized, accessToken expired.");
        }

        setIsAuthenticated(true);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        try {
          const res = await fetch(`${backend_url}/access-token`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Cache-Control": "no-store",
            },
            signal: controller.signal,
          });

          const data = await res.json();
          if (!data.success) {
            throw new Error("Unauthorized, refreshToken expired. Login again");
          }

          setIsAuthenticated(true);
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") return;

          setIsAuthenticated(false);
          toast.error("Session over! Please Login again");
          router.push("/auth/login");
        }
      }
    };

    verify(); 

    const interval = setInterval(() => {
      verify();
    }, 3 * 60 * 1000);

    return () => {
      controller.abort(); 
      clearInterval(interval); 
    };
  }, [router]);

  if (isAuthenticated === null) {
    return <div className="text-lg font-mono">Loading...</div>;
  }

  return <>{children}</>;
};

export default SessionGuard;
