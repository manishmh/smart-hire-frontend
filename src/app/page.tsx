import { H1, Text } from "@/components/global/reusable-ui";
import ThemeToggle from "@/components/global/theme-toggle";

export default function Home() {
  return (
    <div>
      <ThemeToggle />
      <H1>Smart Hire</H1>
      <Text>A form application managing platform</Text>
      <a href="/auth/login">
        <button className="px-4 py-1 bg-blue-700">Login</button>
      </a>
    </div> 
  );
}
