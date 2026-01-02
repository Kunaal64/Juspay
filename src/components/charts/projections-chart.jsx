import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { name: "Jan", projection: 18, actual: 14 },
  { name: "Feb", projection: 22, actual: 18 },
  { name: "Mar", projection: 20, actual: 16 },
  { name: "Apr", projection: 28, actual: 24 },
  { name: "May", projection: 16, actual: 12 },
  { name: "Jun", projection: 24, actual: 20 },
]

export function ProjectionsChart() {
  return (
    <div className="bg-[#F7F9FB] dark:bg-white/10 p-5 rounded-2xl h-full min-h-[220px] flex flex-col border border-border/50 transition-colors">
      <h3 className="text-[14px] font-semibold mb-4 text-foreground">Projections vs Actuals</h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="var(--border)" className="opacity-30" />
            <XAxis
              xAxisId={0}
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "currentColor", fontSize: 11 }}
              className="text-muted-foreground"
              dy={10}
            />
            <XAxis
              xAxisId={1}
              dataKey="name"
              hide
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
              cursor={{ fill: "var(--accent)", opacity: 0.1 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-popover border border-border p-2 rounded-lg text-[12px] shadow-xl text-popover-foreground">
                      <p className="text-muted-foreground">{payload[0].payload.name}</p>
                      <p className="font-semibold">Actual: {payload[1]?.value || payload[0].value}M</p>
                      <p className="text-muted-foreground/70">Proj: {payload[0]?.value || payload[1].value}M</p>
                    </div>
                  )
                }
                return null
              }}
            />
            {/* Background Bar (Projection) */}
            <Bar
              xAxisId={1}
              dataKey="projection"
              fill="rgba(0,0,0,0.1)"
              className="dark:fill-white/10"
              radius={[4, 4, 0, 0]}
              barSize={28}
            />
            {/* Foreground Bar (Actual) */}
            <Bar 
              xAxisId={0}
              dataKey="actual" 
              fill="#A8C5DA" 
              className="text-foreground"
              radius={[4, 4, 0, 0]} 
              barSize={28} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
