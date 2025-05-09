import { Suspense } from "react";
import LoginForm from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading login form...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
