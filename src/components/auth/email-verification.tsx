"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useTransition } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const EmailVerification = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    startTransition(async () => {
      try {
        const backend_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        const res = await fetch(
          `${backend_url}/email-verification?token=${token}`,
          {
            method: "GET",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        toast.success("Email verified successfully");
      } catch (error) {
        toast.error("something went wrong! try again");
        console.error(error);
      }
    });
  }, []);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      {isPending ? (
        <div>
          <RotatingLines width="30" strokeColor="white" />
        </div>
      ) : (
        <div className="flex flex-col gap-3 items-center justify-center px-5 w-full sm:max-w-lg rounded-lg h-full sm:h-auto border shadow-2xl dark:sm:bg-[#191919] py-20 sm:py-8">
          <div>Email verified Successfully</div>
          <Link href="/company/dashboard">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#2a3a5e] hover:bg-[#344774] cursor-pointer dark:bg-gray-200 text-white dark:text-black dark:hover:bg-white w-full font-semibold "
            >
              Back to work
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
