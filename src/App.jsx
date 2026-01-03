import { useState, useEffect, useRef } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { SidebarLeft } from '@/components/sidebar-left'
import { SidebarRight } from '@/components/sidebar-right'
import { DashboardHeader } from '@/components/dashboard-header'
import { StatCard } from '@/components/stat-card'
import { OrdersList } from '@/components/orders-list'
import { ProjectionsChart } from '@/components/charts/projections-chart'
import { RevenueChart } from '@/components/charts/revenue-chart'
import { SalesDonutChart } from '@/components/charts/sales-donut-chart'
import { RevenueByLocation } from '@/components/revenue-by-location'
import { TopProducts } from '@/components/top-products'
import { cn, usePersistentState } from '@/lib/utils'

// Main application layout managing sidebars, responsive overlays, and routing between views
export default function App() {
  const [leftSidebarVisible, setLeftSidebarVisible] = usePersistentState('juspay_sidebar_left', true)
  const [rightSidebarVisible, setRightSidebarVisible] = usePersistentState('juspay_sidebar_right', true)
  const [view, setView] = usePersistentState('juspay_current_view', "overview")
  const [isMobile, setIsMobile] = useState(false)
  const isMounted = useRef(false)

  // Handle Window Resize (Mobile Detection)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    // Initial check
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle Responsive Sidebar Switching (Only on mode change, skipping initial mount)
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    if (isMobile) {
      setLeftSidebarVisible(false)
      setRightSidebarVisible(false)
    } else {
      setLeftSidebarVisible(true)
      setRightSidebarVisible(true)
    }
  }, [isMobile, setLeftSidebarVisible, setRightSidebarVisible])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <main className="flex min-h-screen bg-background font-sans antialiased relative overflow-hidden">
        
        {/* Left Sidebar Overlay (Mobile) */}
        {isMobile && leftSidebarVisible && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden fade-in-0"
            onClick={() => setLeftSidebarVisible(false)}
          />
        )}

        {/* Left Sidebar (Drawer/Column) */}
        <div className={cn(
          "shrink-0 bg-background transition-all duration-300 ease-in-out z-50",
          isMobile 
            ? "fixed inset-y-0 left-0 h-full shadow-2xl" 
            : "relative",
          isMobile
            ? (leftSidebarVisible ? "translate-x-0" : "-translate-x-full")
            : (leftSidebarVisible ? "w-[212px] translate-x-0" : "w-0 -translate-x-full opacity-0 overflow-hidden")
        )}>
          <SidebarLeft 
            currentView={view} 
            onViewChange={(v) => {
              setView(v)
              if (isMobile) setLeftSidebarVisible(false)
            }} 
          />
        </div>

        {/* Center Content Area */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden transition-all duration-300">
          <DashboardHeader
            toggleLeftSidebar={() => setLeftSidebarVisible(!leftSidebarVisible)}
            toggleRightSidebar={() => setRightSidebarVisible(!rightSidebarVisible)}
            view={view === "overview" ? "Default" : "Order List"}
          />

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {view === "overview" ? (
              <div className="p-4 md:p-6 space-y-6">
                <h1 className="text-l font-semibold text-foreground">eCommerce</h1>
                
                {/* 1. Key Metrics & Projections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <StatCard title="Customers" value="3,781" trend="+11.01%" trendUp={true} variant="blue" />
                    <StatCard title="Orders"  value="1,219" trend="-0.03%" trendUp={false} variant="#F7F9FB" />
                    <StatCard title="Revenue"  value="$695" trend="+15.03%" trendUp={true} variant="#F7F9FB" />
                    <StatCard title="Growth"  value="30.1%" trend="+6.08%" trendUp={true} variant="#E5ECF6" />
                  </div>
                  <div className="h-full min-h-[300px] lg:min-h-auto">
                    <ProjectionsChart />
                  </div>
                </div>

                {/* 2. Revenue Trends */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-3">
                    <RevenueChart />
                  </div>
                  <div className="lg:col-span-1 h-auto lg:h-[340px]">
                    <RevenueByLocation />
                  </div>
                </div>

                {/* 3. Product Sales */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-3 overflow-x-auto">
                    <TopProducts />
                  </div>
                  <div className="lg:col-span-1 h-[300px] lg:h-auto">
                    <SalesDonutChart />
                  </div>
                </div>
              </div>
            ) : (
              <OrdersList />
            )}
          </div>
        </div>

        {/* Right Sidebar Overlay (Mobile) */}
        {isMobile && rightSidebarVisible && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setRightSidebarVisible(false)}
          />
        )}

        {/* Right Sidebar (Drawer/Column) */}
        <div className={cn(
          "shrink-0 bg-background transition-all duration-300 ease-in-out z-50",
          isMobile 
            ? "fixed inset-y-0 right-0 h-full shadow-2xl" 
            : "relative",
          isMobile
            ? (rightSidebarVisible ? "translate-x-0" : "translate-x-full")
            : (rightSidebarVisible ? "w-[280px] translate-x-0" : "w-0 translate-x-full opacity-0 overflow-hidden")
        )}>
           <SidebarRight />
        </div>
      </main>
    </ThemeProvider>
  )
}
