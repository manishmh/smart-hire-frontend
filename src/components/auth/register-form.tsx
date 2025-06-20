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
import { registerSchema } from "@/schema/input-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    startTransition(async () => {
      try {
        const backend_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

        const response = await axios.post(`${backend_url}/register`, values, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        });

        if (response.data.success) {
          toast.success(response.data.message);
          console.log(response.data);
        } else {
          toast.error(response.data.message)
        }
        // router.push("/company/dashboard");
      } catch (error) {
        console.error(error);

        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Registration failed");
        } else {
          toast.error("Something went wrong! Try again");
        }
      }
    });
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center h-screen">
      <div
        className={`flex flex-col gap-3 items-center justify-center px-3 w-full sm:max-w-lg rounded-lg h-full sm:h-auto border shadow-2xl dark:sm:bg-[#0a0c0e] py-20 sm:py-8 ${
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-500 dark:text-gray-300">
                      Name
                      <span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="text"
                        autoFocus
                        placeholder="Your name"
                        className="mt-1.5 rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0 bg-primary-input"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />
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
                    <FormLabel className="font-semibold text-gray-500 dark:text-gray-300">
                      Password
                      <span className="text-red-500"> *</span>
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
                className="bg-[#2a3a5e] cursor-pointer hover:bg-[#344774] dark:bg-gray-200 text-white dark:text-black dark:hover:bg-white w-full font-semibold "
              >
                Register
              </Button>
            </div>
          </form>
        </Form>
        <Link href={"/auth/login"}>
          <div className="text-gray-400 mt-3 font-medium text-sm flex gap-1 self-start">
            Already have an account ?
            <span className="text-blue-500">Login</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
