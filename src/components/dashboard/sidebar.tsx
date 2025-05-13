"use client";

import { bottomItems, topItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../global/theme-toggle";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="border-r w-[230px] space-y-6 h-screen p-2 py-4 flex flex-col dark:bg-black bg-slate-50 shrink-0">
      <div className="flex items-center justify-between w-full">
        <div className="pointer-events-none h-6 object-cover overflow-hidden pl-2">
          <Image
            src="/smart-hire-dark.png"
            alt="smart-hire-logo"
            height={60}
            width={200}
            className="w-full h-full object-contain brightness-0 dark:brightness-100"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between h-full dark:text-gray-200">
        <div className="flex flex-col gap-2">
          {topItems.map((items, index) => (
            <Link href={items.link} key={`${items}-${index}`}>
              <div
                className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md border border-transparent
                hover:dark:bg-[#151617]  hover:dark:border-gray-900 hover:bg-gray-200
                ${
                  pathname === items.link &&
                  "dark:bg-[#151617] border dark:border-gray-900"
                }
              `}
              >
                <div>{items.logo}</div>
                <div>{items.title}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="space-y-3">
          <div className="px-2 hover:dark:bg-[#151617]  hover:dark:border-gray-900 hover:bg-gray-200 py-1 rounded-md transition-all duration-300">
            <ThemeToggle />
          </div>
          {bottomItems.map((items, index) => (
            <Link href={items.link} key={`${items}-${index}`}>
              <div
                className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md border border-transparent
                hover:dark:bg-[#151617] hover:dark:border-gray-900 hover:bg-gray-200
                ${
                  pathname === items.link &&
                  "dark:bg-[#151617] border dark:border-gray-900"
                }
              `}
              >
                <div>{items.logo}</div>
                <div>{items.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
