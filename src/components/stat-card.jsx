import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Displays a metric with a value, trend indicator, and dynamic styling based on the variant
export function StatCard({ title, value, trend, trendUp, variant = "default" }) {
  const isHex = variant.startsWith('#')
  
  // Specific colored cards need black text overrides in dark mode
  const needsBlackTextInDark = variant === "blue" || variant === "#E5ECF6"

  // Maps hex variants to appropriate light/dark classes
  const getHexClasses = (hex) => {
    if (hex === '#F7F9FB') return 'bg-[#F7F9FB] dark:bg-white/5'
    if (hex === '#E5ECF6') return 'bg-[#E5ECF6] dark:bg-[#E5ECF6]'
    return 'dark:bg-white/5' 
  }

  return (
    <div
      className={cn(
        "p-3 sm:p-6 rounded-2xl flex flex-col gap-2 sm:gap-4 relative overflow-hidden",
        "transition-all duration-200 ease-out",
        "hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.01]",
        "cursor-default",
        variant === "default" && "bg-secondary/50 border border-border/50",
        variant === "blue" && "bg-[#E3F5FF] dark:bg-[#E3F5FF]",
        variant === "white" && "bg-[#F7F9FB] dark:bg-white/5",
        isHex && getHexClasses(variant),
      )}
    >
      <h3 className={cn(
        "text-[10px] sm:text-[14px] font-bold truncate",
        variant === "default" ? "text-muted-foreground" : "text-foreground/80",
        needsBlackTextInDark && "dark:text-black/80"
      )}>
        {title}
      </h3>
      <div className="flex items-end justify-between gap-4">
        <span className={cn(
          "text-lg sm:text-[28px] font-semibold tracking-tight leading-none text-foreground",
          needsBlackTextInDark && "dark:text-black"
        )}>
          {value}
        </span>
        <div className="flex items-center gap-0.5 sm:gap-1.5 mb-0.5 sm:mb-1">
          <span className={cn(
            "text-[10px] sm:text-[12px] font-bold text-foreground/60",
            needsBlackTextInDark && "dark:text-black/60"
          )}>
            {trend}
          </span>
          {trendUp ? (
            <TrendingUp className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5 text-foreground/60", needsBlackTextInDark && "dark:text-black/60")} />
          ) : (
            <TrendingDown className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5 text-foreground/60", needsBlackTextInDark && "dark:text-black/60")} />
          )}
        </div>
      </div>
    </div>
  )
}
