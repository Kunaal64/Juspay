import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { name: "Jan", current: 12, previous: 14 },
  { name: "Feb", current: 20, previous: 16 },
  { name: "Mar", current: 16, previous: 20 },
  { name: "Apr", current: 22, previous: 18 },
  { name: "May", current: 18, previous: 22 },
  { name: "Jun", current: 24, previous: 20 },
]

// Line chart comparing Current vs Previous week revenue using solid and dashed lines
export function RevenueChart() {
  return (
    <div className="bg-[#F7F9FB] dark:bg-white/5 p-5 rounded-2xl h-[340px] flex flex-col border border-border/50 transition-all duration-200 hover:shadow-md">
      {/* Custom Legend Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-4">
        <h3 className="text-[14px] font-semibold text-foreground">Revenue</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-foreground"></div>
            <span className="text-[12px] text-foreground/70 font-medium">
              Current Week <span className="text-foreground font-semibold ml-1">$58,211</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#A8C5DA]"></div>
            <span className="text-[12px] text-muted-foreground font-medium">
              Previous Week <span className="text-foreground/60 font-semibold ml-1">$68,768</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[200px]" style={{ width: '100%', height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={1}>
          <LineChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="currentColor" strokeOpacity={0.08} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "currentColor", fontSize: 11 }}
              className="text-muted-foreground"
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "currentColor", fontSize: 11 }}
              className="text-muted-foreground"
              ticks={[0, 10, 20, 30]}
              tickFormatter={(val) => `${val}M`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-popover border border-border p-2 rounded-lg text-[12px] shadow-xl text-popover-foreground">
                      <p className="font-semibold">{payload[0].value}M</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="currentColor"
              className="text-foreground/20"
              strokeWidth={2}
              dot={false}
              strokeDasharray="4 4"
            />
            <Line type="monotone" dataKey="current" stroke="#A8C5DA" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
