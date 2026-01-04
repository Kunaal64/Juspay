import { useState } from "react"
import {
  LayoutDashboard,
  ShoppingCart,
  FolderKanban,
  BookOpen,
  UserCircle,
  Users2,
  Building2,
  FileText,
  MessageCircle,
  ChevronRight,
  ChevronDown,
  CircleDot,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Primary navigation sidebar with collapsible sections for Favorites, Dashboards, and Pages
export function SidebarLeft({ currentView = "overview", onViewChange }) {
  const [favoritesTab, setFavoritesTab] = useState("favorites")
  const [defaultExpanded, setDefaultExpanded] = useState(true)
  const [userProfileExpanded, setUserProfileExpanded] = useState(true)

  return (
    <aside 
      className="w-[212px] h-full border-r border-border flex flex-col py-5 px-4 shrink-0 bg-background transition-colors"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-2 px-2 mb-6">
        <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
          <CircleDot className="w-4 h-4 text-background" />
        </div>
        <span className="font-semibold text-[14px] text-foreground">ByeWind</span>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar">
        {/* Favorites Section */}
        <section>
          <div className="flex items-center gap-4 px-2 mb-3">
            <button
              onClick={() => setFavoritesTab("favorites")}
              className={cn(
                "text-[14px] font-medium transition-colors",
                favoritesTab === "favorites" ? "text-muted-foreground" : "text-muted-foreground"
              )}
            >
              Favorites
            </button>
            <button
              onClick={() => setFavoritesTab("recently")}
              className={cn(
                "text-[14px] font-medium transition-colors",
                favoritesTab === "recently" ? "text-muted-foreground" : "text-muted-foreground"
              )}
            >
              Recently
            </button>
          </div>
          <nav className="space-y-0.5">
            <div onClick={() => onViewChange?.("overview")}>
              <NavItem label="Overview" active={currentView === "overview"} bullet muted />
            </div>
            <NavItem label="Projects" bullet muted />
          </nav>
        </section>

        {/* Dashboards Section */}
        <section>
          <h3 className="px-2 mb-2 text-[14px] font-medium text-muted-foreground">
            Dashboards
          </h3>
          <nav className="space-y-0.5">
            <div onClick={() => setDefaultExpanded(!defaultExpanded)}>
              <NavItem
                icon={<LayoutDashboard className="w-4 h-4" />}
                label="Default"
                active={currentView === "overview" || currentView === "order-list"}
                hasActiveIndicator={currentView === "overview" || currentView === "order-list"}
                expandable
                expanded={defaultExpanded}
              />
            </div>
            {defaultExpanded && (
              <div className="ml-6 space-y-0.5 mt-0.5 mb-1">
                <div
                  onClick={() => onViewChange?.("overview")}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-colors hover:bg-[#1C1C1C]/5 dark:hover:bg-white/5",
                    currentView === "overview"
                      ? "text-foreground font-medium"
                      : "text-foreground hover:text-foreground",
                  )}
                >
                  Overview
                </div>
                <div
                  onClick={() => onViewChange?.("order-list")}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-colors hover:bg-[#1C1C1C]/5 dark:hover:bg-white/5",
                    currentView === "order-list"
                      ? "text-foreground font-medium"
                      : "text-foreground hover:text-foreground",
                  )}
                >
                  Order List
                </div>
              </div>
            )}
            <NavItem icon={<ShoppingCart className="w-4 h-4" />} label="eCommerce" expandable />
            <NavItem icon={<FolderKanban className="w-4 h-4" />} label="Projects" expandable />
            <NavItem icon={<BookOpen className="w-4 h-4" />} label="Online Courses" expandable />
          </nav>
        </section>

        {/* Pages Section */}
        <section>
          <h3 className="px-2 mb-2 text-[14px] font-medium text-muted-foreground">Pages</h3>
          <nav className="space-y-0.5">
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
                    className="px-3 py-1.5 text-sm text-foreground hover:text-foreground hover:bg-[#1C1C1C]/5 dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                  >
                    {sub}
                  </div>
                ))}
              </div>
            )}
            <NavItem icon={<Users2 className="w-4 h-4" />} label="Account" expandable />
            <NavItem icon={<Building2 className="w-4 h-4" />} label="Corporate" expandable />
            <NavItem icon={<FileText className="w-4 h-4" />} label="Blog" expandable />
            <NavItem icon={<MessageCircle className="w-4 h-4" />} label="Social" expandable />
          </nav>
        </section>
      </div>
    </aside>
  )
}

// Reusable navigation item with support for icons, bullets, and expand/collapse chevrons
function NavItem({
  icon,
  label,
  active = false,
  hasActiveIndicator = false,
  expandable = false,
  expanded = false,
  bullet = false,
  muted = false,
  onClick,
}) {
  return (
    <div
      role={expandable ? "button" : "link"}
      tabIndex={0}
      aria-expanded={expandable ? expanded : undefined}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      className={cn(
        "group flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all relative",
        "hover:bg-[#1C1C1C]/5 dark:hover:bg-white/5",
        "focus:outline-none",
        active ? "text-foreground" : "text-foreground hover:text-foreground",
      )}
    >
      {hasActiveIndicator && (
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-foreground rounded-r" 
          aria-hidden="true"
        />
      )}
      
      {expandable && (
        expanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
        )
      )}
      
      {bullet ? (
        <span 
          className={cn(
            "w-1.5 h-1.5 rounded-full", 
            muted ? "bg-muted-foreground" : (active ? "bg-foreground" : "bg-muted-foreground/50")
          )} 
          aria-hidden="true"
        />
      ) : (
        icon && (
          <span 
            className={cn(active ? "text-foreground" : "text-foreground")} 
            aria-hidden="true"
          >
            {icon}
          </span>
        )
      )}
      
      <span className={cn("text-[14px]", active && "font-medium")}>{label}</span>
    </div>
  )
}
