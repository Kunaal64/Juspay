import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function StatCard({ title, value, trend, trendUp, variant = "default" }) {
  const isHex = variant.startsWith('#')

  return (
    <div
      className={cn(
        "p-5 rounded-2xl flex flex-col gap-2 relative overflow-hidden transition-all",
        variant === "default" && "bg-secondary/50 border border-border/50",
        variant === "blue" && "bg-[#E3F5FF] dark:bg-[#A8C5DA]/20",
        variant === "white" && "bg-[#F7F9FB] dark:bg-[#E5ECF6]/10",
      )}
      style={isHex ? { backgroundColor: variant } : undefined}
    >
      <h3 className={cn(
        "text-[12px] font-medium",
        variant === "default" ? "text-muted-foreground" : "text-foreground/60"
      )}>
        {title}
      </h3>
      <div className="flex items-end justify-between">
        <span className="text-[24px] font-semibold tracking-tight leading-none text-foreground">
          {value}
        </span>
        <div className="flex items-center gap-1 mb-0.5">
          <span className={cn(
            "text-[11px] font-medium",
            trendUp ? "text-foreground/70" : "text-foreground/70"
          )}>
            {trend}
          </span>
          {trendUp ? (
            <TrendingUp className="w-3 h-3 text-foreground/70" />
          ) : (
            <TrendingDown className="w-3 h-3 text-foreground/70" />
          )}
        </div>
      </div>
    </div>
  )
}
