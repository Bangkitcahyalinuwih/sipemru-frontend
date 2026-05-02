import { sidebarMenu } from "../config/sidebarMenu";
import { Settings } from "lucide-react";

export default function Sidebar({ collapsed, active, onNavClick }) {
  return (
    <aside className="h-full bg-slate-900 flex flex-col text-sm px-2">
      <div className="h-14 flex flex-col items-center justify-center border-b border-slate-800">
        <span className="text-white font-bold text-lg tracking-tight">
          {collapsed ? "S" : "SIMARU"}
        </span>

        {!collapsed && (
          <span className="text-xs text-gray-400 font-medium tracking-wide">
            Sistem Manajemen Ruangan
          </span>
        )}
      </div>

      {/* Menu */}
      <nav className="p-2 flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-1">
          {sidebarMenu.map((item, i) => {
            if (item.section && !collapsed) {
              return (
                <div key={i} className="mt-6">
                  <p className="text-xs text-gray-500 mb-2 px-1 uppercase tracking-wider font-semibold">
                    {item.section}
                  </p>
                </div>
              );
            }

            const Icon = item.icon;

            return (
              <li
                key={item.key}
                onClick={() => onNavClick(item.key)}
                className={`flex items-center ${
                  collapsed ? "justify-center" : ""
                } px-2 py-2 cursor-pointer rounded-md transition-all text-sm
                ${
                  active === item.key
                    ? "bg-slate-700 text-white shadow-sm"
                    : "hover:bg-slate-800 text-gray-300 hover:text-white"
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {!collapsed && (
                  <span className="ml-2 truncate font-medium">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-2 border-t border-slate-800 mt-auto">
          <div className="flex items-center gap-2 px-2 py-2 cursor-pointer rounded-md hover:bg-slate-800 text-gray-300">
            <Settings className="w-4 h-4" />
            <span>Pengaturan</span>
          </div>
        </div>
      )}
    </aside>
  );
}