import React, { memo, useState, useRef } from "react"

const COLORS = {
  green: "#95A4FC",
  darkGray: "#B1E3FF",
  blue: "#BAEDBD",
  purple: "#1C1C1C",
}

const GEOMETRY = {
  viewBoxSize: 100,
  center: 50,
  outerRadius: 42,
  innerRadius: 30, // 12px thickness
  gapAngle: 6,
}

// Custom SVG donut component supporting asymmetric rounded caps (interlocking segments)
const TotalSalesDonut = memo(function TotalSalesDonut() {
  const { gapAngle } = GEOMETRY
  const halfGap = gapAngle / 2
  const [hoveredData, setHoveredData] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  // Clockwise order: Email -> Sponsored -> Direct -> Affiliate
  const data = [
    { id: "email", value: 48.96, color: COLORS.darkGray, label: "E-mail" },
    { id: "sponsored", value: 154.02, color: COLORS.green, label: "Sponsored" },
    { id: "direct", value: 300.56, color: "var(--chart-direct-segment)", label: "Direct" }, 
    { id: "affiliate", value: 135.18, color: COLORS.blue, label: "Affiliate" },
  ]

  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 180 // Start from left (9 o'clock)
  
  const segments = data.map(item => {
    const percentage = item.value / total
    const angleSpan = percentage * 360
    const start = currentAngle + halfGap
    const end = currentAngle + angleSpan - halfGap
    currentAngle += angleSpan
    return { ...item, start, end }
  })

  // Converts polar coordinates to Cartesian for SVG paths
  const getPoint = (r, angle) => {
    const rad = (angle * Math.PI) / 180
    return {
      x: GEOMETRY.center + r * Math.cos(rad),
      y: GEOMETRY.center + r * Math.sin(rad)
    }
  }

  // Generates SVG path command with one concave and one convex end cap
  const createPath = (startAngle, endAngle) => {
    const { outerRadius, innerRadius } = GEOMETRY
    const thickness = outerRadius - innerRadius
    const capRadius = thickness / 2
    
    const p1 = getPoint(outerRadius, startAngle)
    const p2 = getPoint(outerRadius, endAngle)
    const p3 = getPoint(innerRadius, endAngle)
    const p4 = getPoint(innerRadius, startAngle)
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    
    return [
      `M ${p1.x} ${p1.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
      `A ${capRadius} ${capRadius} 0 0 0 ${p3.x} ${p3.y}`, // Convex end cap
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
      `A ${capRadius} ${capRadius} 0 0 1 ${p1.x} ${p1.y}`, // Concave start cap
      "Z"
    ].join(" ")
  }

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative animate-scale-in"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredData(null)}
    >
      <svg
        viewBox={`0 0 ${GEOMETRY.viewBoxSize} ${GEOMETRY.viewBoxSize}`}
        className="w-full h-full transform transition-transform duration-500 ease-out"
        style={{ width: '100%', height: '100%' }}
      >
        {segments.map((seg) => (
          <path
            key={seg.id}
            d={createPath(seg.start, seg.end)}
            fill={seg.color}
            stroke="none"
            onMouseEnter={() => setHoveredData(seg)}
            className="transition-opacity duration-200 hover:opacity-80 cursor-pointer focus:outline-none"
          />
        ))}
      </svg>
      
      {/* Floating Tooltip */}
      {hoveredData && (
        <div 
          className="absolute z-50 pointer-events-none bg-[#1C1C1C]/80 text-white px-1.5 py-1 rounded-md shadow-xl border border-white/5 flex flex-col items-start whitespace-nowrap backdrop-blur-sm"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-50%, -130%)'
          }}
        >
          <div className="flex items-center gap-1 mb-0.5">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: hoveredData.color === "var(--chart-direct-segment)" ? "#B1E3FF" : hoveredData.color }} />
            <span className="text-[9px] font-medium opacity-80 leading-none">{hoveredData.label}</span>
          </div>
          <span className="text-xs font-bold leading-none">${hoveredData.value}</span>
        </div>
      )}
    </div>
  )
})

// Main wrapper with chart and custom compact legend
export function SalesDonutChart() {
  return (
    <div className="bg-[#F7F9FB] dark:bg-white/5 p-5 rounded-2xl h-full flex flex-col border border-border/50 transition-all duration-200 hover:shadow-md group">
      <h3 className="text-[14px] font-semibold mb-4 text-foreground">Total Sales</h3>
      <div className="flex-1 flex flex-col items-center justify-around" style={{ width: '100%', height: '100%' }}>
        <div className="relative w-[140px] h-[140px] min-h-[140px] mb-2">
          <TotalSalesDonut />
        </div>
        
        <div className="w-full space-y-2">
          {[
            { color: "var(--chart-direct-segment)", label: "Direct", value: "$300.56" },
            { color: COLORS.blue, label: "Affiliate", value: "$135.18" },
            { color: COLORS.green, label: "Sponsored", value: "$154.02" },
            { color: COLORS.darkGray, label: "E-mail", value: "$48.96" }
          ].map((item, i) => (
             <div key={i} className="flex items-center justify-between text-xs group/item transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5 p-1 rounded-md -mx-1">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full ring-2 ring-transparent transition-all duration-200 group-hover/item:ring-offset-1 group-hover/item:scale-110" 
                  style={{ backgroundColor: item.color }} 
                />
                <span className="text-foreground">{item.label}</span>
              </div>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
