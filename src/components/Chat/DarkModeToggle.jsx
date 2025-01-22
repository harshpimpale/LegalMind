import { Sun, Moon } from "lucide-react";

export function DarkModeToggle({ isDarkMode, setIsDarkMode }) {
  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <>
          <Sun className="w-5 h-5" />
          <span className="text-sm hidden sm:inline">Light mode</span>
        </>
      ) : (
        <>
          <Moon className="w-5 h-5" />
          <span className="text-sm hidden sm:inline">Dark mode</span>
        </>
      )}
    </button>
  );
}
