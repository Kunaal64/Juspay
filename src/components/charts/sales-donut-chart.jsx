import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Direct", value: 300.56, stroke: "#A8C5DA" },
  { name: "Affiliate", value: 135.18, stroke: "#BAEDBD" },
  { name: "Sponsored", value: 154.02, stroke: "#95A4FC" },
  { name: "E-mail", value: 48.96, stroke: "#B1E3FF" },
]

export function SalesDonutChart() {
  const total = data.reduce((acc, cur) => acc + cur.value, 0)

  return (
    <div className="bg-secondary/30 dark:bg-secondary/20 p-5 rounded-2xl h-full flex flex-col border border-border/50 transition-colors">
      <h3 className="text-[14px] font-semibold mb-4 text-foreground">Total Sales</h3>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-[140px] h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.stroke} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-popover border border-border p-2 rounded-lg text-[12px] shadow-xl text-popover-foreground">
                        <p className="font-semibold">
                          {payload[0].name}: ${payload[0].value}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[18px] font-bold text-foreground">{((data[0].value / total) * 100).toFixed(0)}%</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4 w-full">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.stroke }} />
              <span className="text-[11px] text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
