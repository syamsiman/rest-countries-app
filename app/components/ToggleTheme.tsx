import { Moon } from "lucide-react";
import { useState, useEffect } from "react";

const ToggleTheme = () => {
 const [darkMode, setDarkMode] = useState<Boolean>(false);

 useEffect(() => {
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "dark") {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
  }
}, [])

 const toggleTheme = () => {
    setDarkMode(!darkMode)

    if (!darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", 'light')
    }
}

  return (
    <button 
    onClick={toggleTheme}
    className="flex gap-x-1 sm:gap-x-2 transition-all duration-1000 items-center cursor-pointer text-sm sm:text-[15px]">
        {darkMode ? <Moon fill="white" /> : <Moon/>}
        <span className="text-nowrap">Dark Mode</span>
    </button>
  )
}

export default ToggleTheme