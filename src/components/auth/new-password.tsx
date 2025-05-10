"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { newPasswordSchema } from "@/schema/input-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const NewPassword = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    },
  });

  const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    startTransition(async () => {
      try {
        const backend_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        const response = await fetch(`${backend_url}/new-password?token=${token}`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message);
          return;
        }

        toast.success("Password reset successfully! continue to login");
        setTimeout(() => {
            router.push("/auth/login");
        }, 2000)
      } catch (error) {
        toast.error("Something went wrong! try again");
        console.error(error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen">
      <div
        className={`flex flex-col gap-3 items-center justify-center px-5 w-full sm:max-w-lg rounded-lg h-full sm:h-auto border shadow-2xl dark:sm:bg-[#191919] py-20 sm:py-8 ${
          isPending ? "pointer-events-none opacity-80" : "pointer-events-auto"
        } `}
      >
        <h1 className="font-bold text-2xl">Set new password</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-3 items-center max-w-md"
          >
            <div className="space-y-3 w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-500 dark:text-gray-300">
                      New Password
                      <span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="password"
                        placeholder="********"
                        className="mt-1.5 rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0 bg-primary-input"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-500 dark:text-gray-300 flex justify-between pt-2">
                      <div>
                        Confirm Password
                        <span className="text-red-500"> *</span>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="password"
                        placeholder="********"
                        className="mt-1.5 rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0 bg-primary-input "
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#2a3a5e] hover:bg-[#344774] cursor-pointer dark:bg-gray-200 text-white dark:text-black dark:hover:bg-white w-full font-semibold "
              >
                Change Password
              </Button>
            </div>
          </form>
        </Form>
        <Link href={"/auth/login"}>
          <div className="text-blue-500 mt-3 font-medium text-sm flex gap-1 self-start">
            Back to?
            <span className="text-blue-500">Login</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NewPassword;
