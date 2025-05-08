'use client'

import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="cursor-pointer text-xl">
        {theme === "light" ? (
            <div onClick={() => setTheme("dark")}>
                <IoMoonOutline />
            </div>
        ): (
            <div onClick={() => setTheme("light")}>
                <IoSunnyOutline />
            </div>
        )}
    </div>
  )
}

export default ThemeToggle