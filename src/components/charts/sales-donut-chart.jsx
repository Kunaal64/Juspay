import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Direct", value: 300.56, stroke: "#C6C7F8" },
  { name: "Affiliate", value: 135.18, stroke: "#BAEDBD" },
  { name: "Sponsored", value: 154.02, stroke: "#95A4FC" },
  { name: "E-mail", value: 48.96, stroke: "#B1E3FF" },
]

export function SalesDonutChart() {
  return (
    <div className="bg-[#F7F9FB] dark:bg-white/5 p-5 rounded-2xl h-full flex flex-col border border-border/50 transition-colors">
      <h3 className="text-[14px] font-semibold mb-4 text-foreground">Total Sales</h3>
      <div className="flex-1 flex flex-col items-center justify-between">
        <div className="relative w-[140px] h-[140px] mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                cornerRadius={10}
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
                      <div className="bg-primary text-primary-foreground border-none px-3 py-1.5 rounded-lg text-xs shadow-xl ">
                        <span className="font-medium">{((payload[0].value / 638.72) * 100).toFixed(1)}%</span>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-full space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.stroke }} />
                <span className="text-foreground">{item.name}</span>
              </div>
              <span className="text-foreground font-medium">${item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
