"use client";

import { bottomItems, topItems } from "@/constants";
import { isNotCompletedForm } from "@/lib/api/forms";
import {
  handleIncompletedForm,
  useIncompletedForms,
} from "@/store/dashboard/incompleted-forms-slice";
import { openNewFormModal } from "@/store/dashboard/new-form-modal-slice";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronUp, FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import ThemeToggle from "../global/theme-toggle";

export type Form = {
  id: string;
  name: string;
  description: string | null;
  userId: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const Sidebar = () => {
  const pathname = usePathname();
  const incompletedForms = useIncompletedForms();
  console.log("incompletedforms sidebar", incompletedForms);
  const [showIncompletedForms, setShowIncompletedForms] =
    useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNewForms = async () => {
      try {
        const data = await isNotCompletedForm();
        if (data?.success) {
          dispatch(handleIncompletedForm(data.forms));
        }
      } catch (err) {
        console.error("Failed to fetch new forms", err);
      }
    };

    fetchNewForms();
  }, []);

  return (
    <div className="border-r w-[230px] space-y-6 h-screen p-2 py-4 flex flex-col dark:bg-black bg-slate-100 shrink-0">
      <div className="flex items-center justify-between w-full">
        <div className="pointer-events-none h-6 object-cover overflow-hidden pl-2">
          <Image
            src="/smart-hire-dark.png"
            alt="smart-hire-logo"
            height={60}
            width={200}
            priority
            className="w-full h-full object-contain brightness-0 dark:brightness-100"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between h-full dark:text-gray-200">
        <div className="flex flex-col gap-2">
          {topItems.map((items, index) => (
            <div key={`${items}-${index}`}>
              <Link href={items.link}>
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
              {items.link === "/dashboard/new-form" && (
                <div className="pl-4">
                  <div className="relative">
                    <div
                      className={`absolute z-10 cursor-pointer right-0 text-xs hover:bg-gray-200 flex items-center px-2 rounded-xs h-full 
                        ${!incompletedForms && "hidden"}   
                      `}
                      onClick={() =>
                        setShowIncompletedForms(!showIncompletedForms)
                      }
                    >
                      <div
                        className={`transition-all duration-300 ${
                          !showIncompletedForms ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <FaChevronUp />{" "}
                      </div>
                    </div>
                    <div
                      className="relative flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md border border-transparent
                    hover:dark:bg-[#151617]  hover:dark:border-gray-900 hover:bg-gray-200"
                      onClick={() => dispatch(openNewFormModal())}
                    >
                      <FaPlus className="text-xs" /> New form
                    </div>
                  </div>
                  <div className="max-h-[150px] scroll-container scrollbar-none overflow-y-scroll pb-2">
                    {/* Mapping all forms that are not completed yet! */}
                    {incompletedForms &&
                      showIncompletedForms &&
                      incompletedForms.map((form) => (
                        <Link
                          href={`/dashboard/new-form/${form.id}`}
                          key={form.id}
                        >
                          <div>
                            <div
                              className="flex items-center gap-2 cursor-pointer px-2 py-0.5 rounded-md border border-transparent
                  hover:dark:bg-[#151617]  hover:dark:border-gray-900 hover:bg-gray-200"
                            >
                              <span className="text-gray-400">-</span>
                              {form.name}
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>
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
