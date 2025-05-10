import ThemeToggle from "@/components/global/theme-toggle";
import { ThemeProvider } from "@/provider/theme-provider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Hire",
  description: "A form application managing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <ThemeToggle />
            {children}
          </SessionProvider>
          <Toaster
            theme="dark"
            position="bottom-right"
            richColors={true}
            swipeDirections={["right", "bottom"]}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
