'use client'

import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="cursor-pointer">
        {theme === "light" ? (
            <div onClick={() => setTheme("dark")} className="flex items-center gap-2">
                <IoMoonOutline />
                Theme
            </div>
        ): (
            <div onClick={() => setTheme("light")} className="flex items-center gap-2">
                <IoSunnyOutline />
                Theme
            </div>
        )}
    </div>
  )
}

export default ThemeToggle