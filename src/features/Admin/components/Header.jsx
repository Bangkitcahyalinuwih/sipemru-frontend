import { Menu, Sun, Moon } from "lucide-react"
import { useDarkMode } from "../hooks/useDarkMode"

export default function Header({ collapsed, setCollapsed, title }) {
  const [dark, setDark] = useDarkMode()

  return (
    <div className="h-12 bg-white dark:bg-slate-800 flex items-center justify-between px-4 border-b dark:border-slate-700">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-slate-700"
        >
          <Menu className="w-4 h-4" />
        </button>

        <p className="text-sm font-medium">
          {title}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDark(!dark)}
          className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-slate-700"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button className="border px-3 py-1 rounded text-xs">
          + Ajukan
        </button>

        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-500 text-xs font-semibold text-white">
          AD
        </div>
      </div>
    </div>
  )
}