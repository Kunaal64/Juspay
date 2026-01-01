import { Search, Bell, History, SidebarIcon, Sun, Moon, Star } from "lucide-react"
import { useTheme } from "next-themes"

export function DashboardHeader({ toggleLeftSidebar, toggleRightSidebar, view = "Default" }) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="h-[68px] border-b border-border flex items-center justify-between px-4 lg:px-6 shrink-0 bg-background transition-colors">
      <div className="flex items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2">
          <button onClick={toggleLeftSidebar} className="p-1 hover:bg-accent rounded-md transition-colors">
            <SidebarIcon className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-1 hover:bg-accent rounded-md transition-colors hidden sm:block">
            <Star className="w-4 h-4 text-muted-foreground/40" />
          </button>
          <div className="w-4 h-4 hidden sm:flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-muted-foreground/40"
            >
              <path
                d="M3.33333 11.3333L6 8.66667L3.33333 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[14px]">
          <span className="text-muted-foreground hidden sm:inline">Dashboards</span>
          <span className="text-muted-foreground/30 hidden sm:inline">/</span>
          <span className="text-foreground/90 font-medium">{view}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <div className="relative group hidden md:block">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-muted-foreground/40" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="h-8 w-[160px] bg-secondary/50 rounded-lg pl-9 pr-3 text-[13px] border-none focus:ring-1 focus:ring-accent transition-all outline-none text-foreground placeholder:text-muted-foreground/40"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <span className="text-[10px] text-muted-foreground/30">⌘/</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <HeaderIcon
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            icon={theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          />
          <HeaderIcon icon={<History className="w-5 h-5" />} />
          <HeaderIcon icon={<Bell className="w-5 h-5" />} />
          <HeaderIcon onClick={toggleRightSidebar} icon={<SidebarIcon className="w-5 h-5" />} />
        </div>
      </div>
    </header>
  )
}

function HeaderIcon({ icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all"
    >
      {icon}
    </button>
  )
}
