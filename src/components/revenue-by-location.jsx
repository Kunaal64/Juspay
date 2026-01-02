export function RevenueByLocation() {
  const locations = [
    { name: "New York", value: "72K", progress: 75 },
    { name: "San Francisco", value: "39K", progress: 45 },
    { name: "Sydney", value: "25K", progress: 30 },
    { name: "Singapore", value: "61K", progress: 65 },
  ]

  return (
    <div className="bg-[#F7F9FB] dark:bg-white/10 p-5 rounded-2xl h-full flex flex-col border border-border/50 transition-colors">
      <h3 className="text-[14px] font-semibold mb-4 text-foreground">Revenue by Location</h3>
      <div className="flex-1 flex flex-col justify-between">
        {/* World Map Image */}
        <div className="relative w-full mb-6 mt-2">
          <img 
            src="/world-map.png" 
            alt="World Map" 
            className="w-full h-auto object-contain opacity-90"
            style={{ maxHeight: '180px' }}
          />
          
          {/* Location Dots */}
          {[
            { name: "New York", top: "34%", left: "26%" },
            { name: "San Francisco", top: "37%", left: "16%" },
            { name: "Sydney", top: "78%", left: "86%" },
            { name: "Singapore", top: "62%", left: "74%" },
          ].map((dot) => (
            <div 
              key={dot.name}
              className="absolute w-3 h-3 flex items-center justify-center"
              style={{ top: dot.top, left: dot.left, transform: 'translate(-50%, -50%)' }}
            >
              <div className="absolute w-6 h-6 bg-[#A8C5DA] rounded-full opacity-30" />
              <div className="relative w-2 h-2 bg-[#A8C5DA] rounded-full border border-background shadow-sm" />
            </div>
          ))}
        </div>

        {/* Location Progress Bars */}
        <div className="space-y-3">
          {locations.map((loc) => (
            <div key={loc.name} className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-medium">
                <span className="text-foreground/70">{loc.name}</span>
                <span className="text-foreground">{loc.value}</span>
              </div>
              <div className="h-1 w-full bg-accent rounded-full overflow-hidden">
                <div className="h-full bg-[#A8C5DA] rounded-full transition-all" style={{ width: `${loc.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
