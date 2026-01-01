export function RevenueByLocation() {
  const locations = [
    { name: "New York", value: "72K", progress: 75 },
    { name: "San Francisco", value: "39K", progress: 45 },
    { name: "Sydney", value: "25K", progress: 30 },
    { name: "Singapore", value: "61K", progress: 65 },
  ]

  return (
    <div className="bg-secondary/30 dark:bg-secondary/20 p-5 rounded-2xl h-full flex flex-col border border-border/50 transition-colors">
      <h3 className="text-[14px] font-semibold mb-4 text-foreground">Revenue by Location</h3>
      <div className="flex-1 flex flex-col justify-between">
        {/* World Map SVG */}
        <div className="relative w-full mb-4 flex items-center justify-center">
          <svg
            viewBox="0 0 800 400"
            className="w-full h-auto"
            style={{ maxHeight: '180px' }}
          >
            {/* World map simplified continents */}
            <g fill="currentColor" className="text-muted-foreground/20">
              {/* North America */}
              <path d="M120,80 L180,60 L220,70 L240,100 L220,140 L180,160 L140,180 L100,160 L80,120 L90,90 Z" />
              {/* South America */}
              <path d="M180,200 L200,180 L220,200 L230,260 L210,320 L180,340 L160,300 L150,240 L160,200 Z" />
              {/* Europe */}
              <path d="M380,60 L420,50 L460,60 L480,80 L470,110 L440,120 L400,115 L370,100 L360,80 Z" />
              {/* Africa */}
              <path d="M400,140 L450,130 L480,150 L500,200 L490,280 L450,320 L400,310 L370,260 L360,200 L370,160 Z" />
              {/* Asia */}
              <path d="M500,50 L600,40 L700,60 L720,100 L700,140 L650,160 L580,150 L520,130 L490,100 L480,70 Z" />
              {/* Australia */}
              <path d="M620,240 L680,230 L720,250 L730,290 L700,330 L650,340 L610,310 L600,270 Z" />
            </g>
            
            {/* Location dots with pulse effect */}
            {/* New York */}
            <circle cx="200" cy="100" r="6" fill="#A8C5DA" />
            <circle cx="200" cy="100" r="10" fill="#A8C5DA" fillOpacity="0.3" />
            
            {/* San Francisco */}
            <circle cx="120" cy="110" r="4" fill="#A8C5DA" />
            
            {/* Sydney */}
            <circle cx="680" cy="300" r="4" fill="#A8C5DA" />
            
            {/* Singapore */}
            <circle cx="620" cy="180" r="4" fill="#A8C5DA" />
          </svg>
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
