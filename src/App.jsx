import { useState, useEffect } from 'react'
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
import { cn } from '@/lib/utils'

export default function App() {
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true)
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true)
  const [view, setView] = useState("overview")
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive sidebar state
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setLeftSidebarVisible(false)
        setRightSidebarVisible(false)
      } else {
        setLeftSidebarVisible(true)
        setRightSidebarVisible(true)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <main className="flex min-h-screen bg-background font-sans antialiased relative overflow-hidden">
        {/* Mobile Backdrop for Left Sidebar */}
        {isMobile && leftSidebarVisible && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden fade-in-0"
            onClick={() => setLeftSidebarVisible(false)}
          />
        )}

        {/* Left Sidebar Wrapper */}
        <div className={cn(
          "shrink-0 bg-background transition-all duration-300 ease-in-out z-50",
          isMobile 
            ? "fixed inset-y-0 left-0 h-full shadow-2xl" 
            : "relative",
          // Visibility & Width Logic
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

        <div className="flex-1 flex flex-col min-h-screen overflow-hidden transition-all duration-300">
          <DashboardHeader
            toggleLeftSidebar={() => setLeftSidebarVisible(!leftSidebarVisible)}
            toggleRightSidebar={() => setRightSidebarVisible(!rightSidebarVisible)}
            view={view === "overview" ? "Default" : "Order List"}
          />

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {view === "overview" ? (
              <div className="p-4 md:p-6 space-y-6">
                {/* Row 1: Stat Cards (50%) + Projections Chart (50%) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: 2x2 Stat Cards Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard title="Customers" value="3,781" trend="+11.01%" trendUp={true} variant="blue" />
                    <StatCard title="Orders" value="1,219" trend="-0.03%" trendUp={false} variant="#F7F9FB" />
                    <StatCard title="Revenue" value="$695" trend="+15.03%" trendUp={true} variant="#F7F9FB" />
                    <StatCard title="Growth" value="30.1%" trend="+6.08%" trendUp={true} variant="#E5ECF6" />
                  </div>
                  {/* Right: Projections Chart */}
                  <div className="h-full min-h-[300px] lg:min-h-auto">
                    <ProjectionsChart />
                  </div>
                </div>

                {/* Row 2: Revenue Chart (75%) + Revenue By Location (25%) */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-3">
                    <RevenueChart />
                  </div>
                  <div className="lg:col-span-1 h-auto lg:h-[340px]">
                    <RevenueByLocation />
                  </div>
                </div>

                {/* Row 3: Top Products (75%) + Sales Donut (25%) */}
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

        {/* Mobile Backdrop for Right Sidebar */}
        {isMobile && rightSidebarVisible && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setRightSidebarVisible(false)}
          />
        )}

        {/* Right Sidebar Wrapper */}
        <div className={cn(
          "shrink-0 bg-background transition-all duration-300 ease-in-out z-50",
          isMobile 
            ? "fixed inset-y-0 right-0 h-full shadow-2xl" 
            : "relative",
          // Visibility & Width Logic
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
