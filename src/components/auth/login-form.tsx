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
import { loginSchema } from "@/schema/input-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/user-slice";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      try {
        const backend_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        const response = await fetch(`${backend_url}/login`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message);
          return;
        }

        const user = {
          ...data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }

        toast.success("User logged in successfully")
        dispatch(setUser(user))
        router.push("/company/dashboard")
      } catch (error) {
        toast.error("Something went wrong! try again");
        console.error(error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen">
      <div
        className={`flex flex-col gap-3 items-center justify-center px-5 w-full sm:max-w-lg rounded-lg h-full sm:h-auto border shadow-2xl dark:sm:bg-[#0a0c0e] py-20 sm:py-8 ${
          isPending ? "pointer-events-none opacity-80" : "pointer-events-auto"
        } `}
      >
        <h1 className="font-bold text-2xl">Create an account</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-3 items-center max-w-md"
          >
            <div className="space-y-3 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-500 dark:text-gray-300">
                      Email
                      <span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="email"
                        placeholder="manish@gmail.com"
                        className="mt-1.5 rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0 bg-primary-input"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-500 dark:text-gray-300 flex justify-between pt-2">
                      <div>
                        Password
                        <span className="text-red-500"> *</span>
                      </div>
                        <Link href="/auth/reset-password" className="text-gray-400 font-normal hover:underline">
                          Forgot your password?
                        </Link>
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
                className="bg-[#2a3a5e] hover:bg-[#344774] cursor-pointer dark:bg-[#D0D1D1] text-white dark:text-black dark:hover:bg-white w-full font-semibold "
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
        <Link href={"/auth/register"}>
          <div className="text-gray-400 mt-3 font-medium text-sm flex gap-1 self-start">
            Create a new account?
            <span className="text-blue-500">Register</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
