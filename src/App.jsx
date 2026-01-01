import { useState } from 'react'
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

export default function App() {
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true)
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true)
  const [view, setView] = useState("overview")

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <main className="flex min-h-screen bg-background font-sans antialiased">
        {leftSidebarVisible && (
          <SidebarLeft currentView={view} onViewChange={setView} />
        )}

        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <DashboardHeader
            toggleLeftSidebar={() => setLeftSidebarVisible(!leftSidebarVisible)}
            toggleRightSidebar={() => setRightSidebarVisible(!rightSidebarVisible)}
            view={view === "overview" ? "Default" : "Order List"}
          />

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {view === "overview" ? (
              <div className="p-6 space-y-6">
                {/* Row 1: Stat Cards (50%) + Projections Chart (50%) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: 2x2 Stat Cards Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard title="Customers" value="3,781" trend="+11.01%" trendUp={true} variant="blue" />
                    <StatCard title="Orders" value="1,219" trend="-0.03%" trendUp={false} variant="white" />
                    <StatCard title="Revenue" value="$695" trend="+15.03%" trendUp={true} variant="blue" />
                    <StatCard title="Growth" value="30.1%" trend="+6.08%" trendUp={true} variant="white" />
                  </div>
                  {/* Right: Projections Chart */}
                  <div className="h-full">
                    <ProjectionsChart />
                  </div>
                </div>

                {/* Row 2: Revenue Chart (75%) + Revenue By Location (25%) */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-3">
                    <RevenueChart />
                  </div>
                  <div className="lg:col-span-1">
                    <RevenueByLocation />
                  </div>
                </div>

                {/* Row 3: Top Products (75%) + Sales Donut (25%) */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-3">
                    <TopProducts />
                  </div>
                  <div className="lg:col-span-1">
                    <SalesDonutChart />
                  </div>
                </div>
              </div>
            ) : (
              <OrdersList />
            )}
          </div>
        </div>

        {rightSidebarVisible && <SidebarRight />}
      </main>
    </ThemeProvider>
  )
}
