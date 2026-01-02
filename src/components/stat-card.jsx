import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function StatCard({ title, value, trend, trendUp, variant = "default" }) {
  const isHex = variant.startsWith('#')
  
  // Check if this variant needs black text in dark mode (colored backgrounds)
  const needsBlackTextInDark = variant === "blue" || variant === "#E5ECF6"

  // For hex variants, map to appropriate light/dark mode classes
  const getHexClasses = (hex) => {
    // Revenue/Orders: light hex color, dark mode white/5
    if (hex === '#F7F9FB') return 'bg-[#F7F9FB] dark:bg-white/5'
    // Growth: keep colored background in both modes (like Customers/blue)
    if (hex === '#E5ECF6') return 'bg-[#E5ECF6] dark:bg-[#E5ECF6]'
    return 'dark:bg-white/5' // Fallback
  }

  return (
    <div
      className={cn(
        "p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden transition-all",
        variant === "default" && "bg-secondary/50 border border-border/50",
        variant === "blue" && "bg-[#E3F5FF] dark:bg-[#E3F5FF]",
        variant === "white" && "bg-[#F7F9FB] dark:bg-white/5",
        isHex && getHexClasses(variant),
      )}
    >
      <h3 className={cn(
        "text-[14px] font-bold",
        variant === "default" ? "text-muted-foreground" : "text-foreground/80",
        needsBlackTextInDark && "dark:text-black/80"
      )}>
        {title}
      </h3>
      <div className="flex items-end justify-between gap-4">
        <span className={cn(
          "text-[28px] font-semibold tracking-tight leading-none text-foreground",
          needsBlackTextInDark && "dark:text-black"
        )}>
          {value}
        </span>
        <div className="flex items-center gap-1.5 mb-1">
          <span className={cn(
            "text-[12px] font-bold text-foreground/60",
            needsBlackTextInDark && "dark:text-black/60"
          )}>
            {trend}
          </span>
          {trendUp ? (
            <TrendingUp className={cn("w-3.5 h-3.5 text-foreground/60", needsBlackTextInDark && "dark:text-black/60")} />
          ) : (
            <TrendingDown className={cn("w-3.5 h-3.5 text-foreground/60", needsBlackTextInDark && "dark:text-black/60")} />
          )}
        </div>
      </div>
    </div>
  )
}
