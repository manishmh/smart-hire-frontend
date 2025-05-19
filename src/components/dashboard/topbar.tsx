"use client";
import {
  addHistory,
  removeHistory,
  useHistory,
} from "@/store/dashboard/dashboard-back-button-slice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoCaretBack } from "react-icons/io5";
import { useDispatch } from "react-redux";

const Topbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname.startsWith("/company/dashboard")) {
      dispatch(addHistory(pathname));
    }
  }, [pathname]);

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); 
      const previous = newHistory[newHistory.length - 1];
      if (previous) {
        dispatch(removeHistory());
        router.push(previous);
      }
    }
  };

  return (
    <div className="border-b py-2 px-4 bg-slate-100 dark:bg-black w-full flex">
      <div>
        <button
          className={`flex items-center py-1 gap-1 px-2 rounded-sm transition-colors duration-300 
            ${
              history.length <= 1 
                ? "text-gray-600 cursor-normal"
                : "hover:dark:bg-[#151617] hover:dark:border-gray-900 hover:bg-gray-200 cursor-pointer"
            }
          `}
          onClick={handleBack}
          disabled={history.length <= 1}
        >
          <span className="pt-[1px]">
            <IoCaretBack />
          </span>
          back
        </button>
      </div>
    </div>
  );
};

export default Topbar;
