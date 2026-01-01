import { useState } from "react"
import {
  LayoutDashboard,
  ShoppingBag,
  FolderKanban,
  GraduationCap,
  UserCircle,
  Settings,
  Building2,
  BookOpen,
  Share2,
  CircleDot,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function SidebarLeft({ currentView = "overview", onViewChange }) {
  const [dashboardsExpanded, setDashboardsExpanded] = useState(true)
  const [userProfileExpanded, setUserProfileExpanded] = useState(true)

  return (
    <aside className="w-[212px] h-full border-r border-border flex flex-col py-5 px-4 shrink-0 bg-background transition-colors">
      <div className="flex items-center gap-2 px-2 mb-6">
        <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
          <CircleDot className="w-4 h-4 text-background" />
        </div>
        <span className="font-semibold text-[14px] text-foreground">ByeWind</span>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar">
        {/* Favorites Section */}
        <section>
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Favorites</h3>
            <span className="text-[11px] text-muted-foreground/60">Recently</span>
          </div>
          <nav className="space-y-0.5">
            <div onClick={() => onViewChange?.("overview")}>
              <NavItem label="Overview" active={currentView === "overview"} bullet />
            </div>
            <NavItem label="Projects" bullet />
          </nav>
        </section>

        {/* Dashboards Section */}
        <section>
          <h3 className="px-2 mb-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Dashboards
          </h3>
          <nav className="space-y-0.5">
            <div onClick={() => setDashboardsExpanded(!dashboardsExpanded)}>
              <NavItem
                icon={<LayoutDashboard className="w-4 h-4" />}
                label="Default"
                active={currentView === "overview" || currentView === "order-list"}
                expandable
                expanded={dashboardsExpanded}
              />
            </div>
            {dashboardsExpanded && (
              <div className="ml-6 space-y-0.5 mt-0.5 mb-1">
                <div
                  onClick={() => onViewChange?.("overview")}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-colors",
                    currentView === "overview"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Overview
                </div>
                <div
                  onClick={() => onViewChange?.("order-list")}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-colors",
                    currentView === "order-list"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Order List
                </div>
              </div>
            )}
            <NavItem icon={<ShoppingBag className="w-4 h-4" />} label="eCommerce" expandable />
            <NavItem icon={<FolderKanban className="w-4 h-4" />} label="Projects" expandable />
            <NavItem icon={<GraduationCap className="w-4 h-4" />} label="Online Courses" expandable />
          </nav>
        </section>

        {/* Pages Section */}
        <section>
          <h3 className="px-2 mb-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Pages</h3>
          <nav className="space-y-0.5">
            {/* User Profile with dropdown */}
            <div onClick={() => setUserProfileExpanded(!userProfileExpanded)}>
              <NavItem
                icon={<UserCircle className="w-4 h-4" />}
                label="User Profile"
                expandable
                expanded={userProfileExpanded}
              />
            </div>
            {userProfileExpanded && (
              <div className="ml-6 space-y-0.5 mt-0.5 mb-1">
                {["Overview", "Projects", "Campaigns", "Documents", "Followers"].map((sub) => (
                  <div
                    key={sub}
                    className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-lg cursor-pointer transition-colors"
                  >
                    {sub}
                  </div>
                ))}
              </div>
            )}
            <NavItem icon={<Settings className="w-4 h-4" />} label="Account" expandable />
            <NavItem icon={<Building2 className="w-4 h-4" />} label="Corporate" expandable />
            <NavItem icon={<BookOpen className="w-4 h-4" />} label="Blog" expandable />
            <NavItem icon={<Share2 className="w-4 h-4" />} label="Social" expandable />
          </nav>
        </section>
      </div>
    </aside>
  )
}

function NavItem({
  icon,
  label,
  active = false,
  expandable = false,
  expanded = false,
  bullet = false,
}) {
  return (
    <div
      className={cn(
        "group flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer transition-all",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <div className="flex items-center gap-2">
        {bullet ? (
          <span className={cn("w-1.5 h-1.5 rounded-full", active ? "bg-foreground" : "bg-muted-foreground/40")} />
        ) : (
          icon && <span className={cn(active ? "text-foreground" : "text-muted-foreground/60")}>{icon}</span>
        )}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {expandable && (
        <ChevronRight
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200 text-muted-foreground/40",
            expanded ? "rotate-90 text-foreground" : "",
          )}
        />
      )}
    </div>
  )
}
