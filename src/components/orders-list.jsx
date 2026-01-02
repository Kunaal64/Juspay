import { useState } from "react"
import {
  MoreHorizontal,
  Plus,
  ListFilter,
  ArrowUpDown,
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const STATUS_COLORS = {
  "In Progress": "text-[#8A8CD9]",
  Complete: "text-[#4AA785]",
  Pending: "text-[#59A8D4]",
  Approved: "text-[#FFC555]",
  Rejected: "text-[#1C1C1C33] dark:text-[#FFFFFF4D]",
}

const DUMMY_ORDERS = Array.from({ length: 50 }, (_, i) => ({
  id: `#CM980${(i + 1).toString().padStart(2, "0")}`,
  user: {
    name: [
      "Natali Craig",
      "Kate Morrison",
      "Drew Cano",
      "Orlando Diggs",
      "Andi Lane",
      "Koray Okumus",
      "Lana Steiner",
      "Lana Steiner",
      "Demi Wilkinson",
      "Candice Wu",
    ][i % 10],
    avatar: `/placeholder.svg?height=24&width=24&query=user-${i} avatar`,
  },
  project: [
    "Landing Page",
    "CRM Admin pages",
    "Client Project",
    "Admin Dashboard",
    "App Landing Page",
    "Analytics View",
    "Marketing Suite",
    "Product Launch",
    "User Research",
    "Security Audit",
  ][i % 10],
  address: [
    "Meadow Lane Oakland",
    "Larry San Francisco",
    "Bagwell Avenue Ocala",
    "Washburn Baton Rouge",
    "Nest Lane Olivette",
    "Sunset Blvd Los Angeles",
    "Wall St New York",
    "Pacific Ave Seattle",
    "Main St Chicago",
    "Broadway Austin",
  ][i % 10],
  date: ["Just now", "A minute ago", "1 hour ago", "Yesterday", "Feb 2, 2023", "2 days ago", "1 week ago"][i % 7],
  status: ["In Progress", "Complete", "Pending", "Approved", "Rejected"][i % 5],
}))

export function OrdersList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrders, setSelectedOrders] = useState([])
  const itemsPerPage = 10
  const totalPages = Math.ceil(DUMMY_ORDERS.length / itemsPerPage)

  const currentOrders = DUMMY_ORDERS.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const toggleSelectAll = () => {
    if (selectedOrders.length === currentOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(currentOrders.map((o) => o.id))
    }
  }

  const toggleSelectOrder = (id) => {
    setSelectedOrders((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-semibold text-foreground">Order List</h1>
      </div>

      <div className="flex flex-col gap-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground transition-colors">
              <Plus className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground transition-colors">
              <ListFilter className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-accent rounded-lg text-muted-foreground transition-colors">
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border border-border rounded-lg pl-9 pr-4 py-1.5 text-sm w-56 focus:outline-none focus:ring-1 focus:ring-ring transition-all placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === currentOrders.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-border bg-transparent accent-[#A8C5DA]"
                  />
                </th>
                <th className="px-4 py-3 font-medium">Order ID</th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Address</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className={cn(
                    "hover:bg-accent/30 transition-colors group",
                    selectedOrders.includes(order.id) && "bg-accent/20",
                  )}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => toggleSelectOrder(order.id)}
                      className="w-4 h-4 rounded border-border bg-transparent accent-[#A8C5DA]"
                    />
                  </td>
                  <td className="px-4 py-3 text-foreground">{order.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={order.user.avatar || "/placeholder.svg"}
                        alt=""
                        className="w-6 h-6 rounded-full bg-accent"
                      />
                      <span className="font-medium text-foreground">{order.user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground">{order.project}</td>
                  <td className="px-4 py-3 text-foreground">{order.address}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{order.date}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className={cn("w-1.5 h-1.5 rounded-full bg-current", STATUS_COLORS[order.status])} />
                      <span className={cn("text-xs font-medium", STATUS_COLORS[order.status])}>{order.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-accent rounded transition-all">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-1 px-2 py-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 hover:bg-accent rounded-lg text-muted-foreground disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={cn(
                "w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition-all",
                currentPage === page ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50",
              )}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 hover:bg-accent rounded-lg text-muted-foreground disabled:opacity-30 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
