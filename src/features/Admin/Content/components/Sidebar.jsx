import { sidebarMenu } from "../config/sidebarMenu";
import { Settings } from "lucide-react";

export default function Sidebar({ collapsed, active, onNavClick }) {
  return (
    <aside className="h-full bg-slate-900 flex flex-col text-sm">
      {/* Header */}
      <div className="h-16 flex flex-col items-center justify-center border-b border-slate-800/50 px-4">
        <span className="text-white font-bold text-xl tracking-tight">
          {collapsed ? "S" : "SIMARU"}
        </span>

        {!collapsed && (
          <span className="text-[10px] text-slate-400 font-medium tracking-wider mt-0.5">
            Sistem Manajemen Ruangan
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-0.5">
          {sidebarMenu.map((item, i) => {
            // Section Header
            if (item.section && !collapsed) {
              return (
                <div key={i} className={`${i > 0 ? 'mt-6' : 'mt-0'} mb-3`}>
                  <p className="text-[10px] text-slate-500 px-3 uppercase tracking-widest font-bold">
                    {item.section}
                  </p>
                </div>
              );
            }

            const Icon = item.icon;
            const isActive = active === item.key;

            return (
              <li key={item.key}>
                <button
                  onClick={() => onNavClick(item.key)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-all duration-200 font-medium text-sm
                    ${collapsed ? "justify-center" : ""}
                    ${
                      isActive
                        ? "bg-slate-800 text-white shadow-lg shadow-slate-900/50 border-l-2 border-blue-500"
                        : "text-slate-300 hover:bg-slate-800/60 hover:text-white border-l-2 border-transparent"
                    }
                  `}
                >
                  {Icon && (
                    <Icon 
                      className={`w-[18px] h-[18px] flex-shrink-0 ${
                        isActive ? "text-blue-400" : ""
                      }`} 
                    />
                  )}
                  {!collapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Settings Footer */}
      <div className="border-t border-slate-800/50 p-3">
        <button
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
            transition-all duration-200 font-medium text-sm
            text-slate-300 hover:bg-slate-800/60 hover:text-white
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <Settings className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span>Pengaturan</span>}
        </button>
      </div>
    </aside>
  );
}