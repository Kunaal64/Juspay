import { useState, useMemo } from "react"
import {
  MoreHorizontal,
  Plus,
  ListFilter,
  ArrowUpDown,
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

const STATUS_COLORS = {
  "In Progress": "text-[#8A8CD9]",
  Complete: "text-[#4AA785]",
  Pending: "text-[#59A8D4]",
  Approved: "text-[#FFC555]",
  Rejected: "text-[#1C1C1C33] dark:text-[#FFFFFF4D]",
}

const FIRST_NAMES = ["Natali", "Kate", "Drew", "Orlando", "Andi", "Koray", "Lana", "Demi", "Candice", "Marcus", "Sophia", "James", "Emma", "Michael", "Olivia", "William", "Ava", "Alexander", "Isabella", "Daniel"]
const LAST_NAMES = ["Craig", "Morrison", "Cano", "Diggs", "Lane", "Okumus", "Steiner", "Wilkinson", "Wu", "Chen", "Rodriguez", "Smith", "Johnson", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson"]
const AVATARS = ["/natali.jpg", "/kate.jpg", "/drew.jpg", "/orlando.jpg", "/andi.jpg", "/koray.jpg"]
const PROJECTS = ["Landing Page", "CRM Admin", "Client Portal", "Admin Dashboard", "Mobile App", "Analytics Suite", "Marketing Platform", "E-commerce Store", "User Research", "Security Audit", "API Integration", "Data Migration", "Design System", "Payment Gateway", "Chat Application"]
const ADDRESSES = ["Meadow Lane, Oakland", "Market St, San Francisco", "Bagwell Ave, Ocala", "Washburn Dr, Baton Rouge", "Nest Lane, Olivette", "Sunset Blvd, Los Angeles", "Wall St, New York", "Pacific Ave, Seattle", "Main St, Chicago", "Broadway, Austin", "Pine St, Portland", "Oak Ave, Denver", "Maple Dr, Boston", "Cedar Rd, Miami", "Elm St, Phoenix"]
const DATES = ["Just now", "5 min ago", "15 min ago", "1 hour ago", "3 hours ago", "Yesterday", "2 days ago", "3 days ago", "1 week ago", "Jan 15, 2024", "Jan 10, 2024", "Dec 28, 2023", "Dec 15, 2023", "Nov 30, 2023", "Nov 15, 2023"]

// Date priority for sorting (lower number = more recent)
const DATE_PRIORITY = {
  "Just now": 1,
  "5 min ago": 2,
  "15 min ago": 3,
  "1 hour ago": 4,
  "3 hours ago": 5,
  "Yesterday": 6,
  "2 days ago": 7,
  "3 days ago": 8,
  "1 week ago": 9,
  "Jan 15, 2024": 10,
  "Jan 10, 2024": 11,
  "Dec 28, 2023": 12,
  "Dec 15, 2023": 13,
  "Nov 30, 2023": 14,
  "Nov 15, 2023": 15,
}

const DUMMY_ORDERS = Array.from({ length: 70 }, (_, i) => ({
  id: `#CM${(9800 + i + 1).toString()}`,
  user: {
    name: `${FIRST_NAMES[i % 20]} ${LAST_NAMES[(i + 7) % 20]}`,
    avatar: AVATARS[i % 6],
  },
  project: PROJECTS[(i * 3 + i) % 15],
  address: ADDRESSES[(i * 2 + 1) % 15],
  date: DATES[i % 15],
  status: ["In Progress", "Complete", "Pending", "Approved", "Rejected"][(i * 7) % 5],
}))

export function OrdersList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrders, setSelectedOrders] = useState([])
  const [sortField, setSortField] = useState(null) // 'username', 'orderId', 'date'
  const [sortDirection, setSortDirection] = useState('asc') // 'asc' or 'desc'
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [statusFilters, setStatusFilters] = useState([]) // Array of selected statuses
  const [searchQuery, setSearchQuery] = useState('') // Search by username
  const itemsPerPage = 10

  const STATUS_OPTIONS = ["In Progress", "Complete", "Pending", "Approved", "Rejected"]

  // Filter orders based on status and search
  const filteredOrders = useMemo(() => {
    let orders = DUMMY_ORDERS
    
    // Filter by status
    if (statusFilters.length > 0) {
      orders = orders.filter(order => statusFilters.includes(order.status))
    }
    
    // Filter by search query (username)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      orders = orders.filter(order => 
        order.user.name.toLowerCase().includes(query)
      )
    }
    
    return orders
  }, [statusFilters, searchQuery])

  // Sort filtered orders based on current sort settings
  const sortedOrders = useMemo(() => {
    if (!sortField) return filteredOrders

    return [...filteredOrders].sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case 'username':
          comparison = a.user.name.localeCompare(b.user.name)
          break
        case 'orderId':
          // Extract numeric part for proper sorting
          const numA = parseInt(a.id.replace('#CM', ''))
          const numB = parseInt(b.id.replace('#CM', ''))
          comparison = numA - numB
          break
        case 'date':
          comparison = (DATE_PRIORITY[a.date] || 99) - (DATE_PRIORITY[b.date] || 99)
          break
        default:
          comparison = 0
      }

      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [sortField, sortDirection, filteredOrders])

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage)
  const currentOrders = sortedOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      // New field, start with ascending
      setSortField(field)
      setSortDirection('asc')
    }
    setCurrentPage(1) // Reset to first page when sorting
    setShowSortMenu(false)
  }

  const clearSort = () => {
    setSortField(null)
    setSortDirection('asc')
    setCurrentPage(1)
    setShowSortMenu(false)
  }

  const toggleStatusFilter = (status) => {
    setStatusFilters(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    )
    setCurrentPage(1) // Reset to first page when filtering
  }

  const clearFilters = () => {
    setStatusFilters([])
    setCurrentPage(1)
    setShowFilterMenu(false)
  }

  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-semibold text-foreground">Order List</h1>
      </div>

      <div className="flex flex-col gap-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between bg-secondary/30 dark:bg-white/5 rounded-lg px-2 py-1.5 border border-border/50">
          <div className="flex items-center gap-0.5">
            <button className="p-1.5 hover:bg-accent rounded text-foreground/70 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
            {/* Filter Button with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowFilterMenu(!showFilterMenu); setShowSortMenu(false); }}
                className={cn(
                  "p-1.5 hover:bg-accent rounded transition-colors",
                  statusFilters.length > 0 ? "text-foreground bg-accent" : "text-foreground/70"
                )}
              >
                <ListFilter className="w-4 h-4" />
              </button>
              
              {/* Filter Dropdown Menu */}
              {showFilterMenu && (
                <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-xl z-50 min-w-[180px] py-1">
                  <div className="px-3 py-1.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    Filter by Status
                  </div>
                  
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status}
                      onClick={() => toggleStatusFilter(status)}
                      className={cn(
                        "w-full px-3 py-2 text-xs text-left flex items-center gap-2 hover:bg-accent transition-colors",
                        statusFilters.includes(status) && "bg-accent/50"
                      )}
                    >
                      <div className={cn(
                        "w-3 h-3 rounded border border-border flex items-center justify-center",
                        statusFilters.includes(status) && "bg-foreground border-foreground"
                      )}>
                        {statusFilters.includes(status) && (
                          <svg className="w-2 h-2 text-background" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className={cn("w-1.5 h-1.5 rounded-full", STATUS_COLORS[status].replace('text-', 'bg-'))} />
                        <span>{status}</span>
                      </div>
                    </button>
                  ))}
                  
                  {statusFilters.length > 0 && (
                    <>
                      <div className="border-t border-border my-1" />
                      <button
                        onClick={clearFilters}
                        className="w-full px-3 py-2 text-xs text-left text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      >
                        Clear filters
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            {/* Sort Button with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowSortMenu(!showSortMenu); setShowFilterMenu(false); }}
                className={cn(
                  "p-1.5 hover:bg-accent rounded transition-colors",
                  sortField ? "text-foreground bg-accent" : "text-foreground/70"
                )}
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
              
              {/* Sort Dropdown Menu */}
              {showSortMenu && (
                <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-xl z-50 min-w-[180px] py-1">
                  <div className="px-3 py-1.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    Sort by
                  </div>
                  
                  <button
                    onClick={() => handleSort('username')}
                    className={cn(
                      "w-full px-3 py-2 text-xs text-left flex items-center justify-between hover:bg-accent transition-colors",
                      sortField === 'username' && "bg-accent/50"
                    )}
                  >
                    <span>Username</span>
                    {sortField === 'username' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleSort('orderId')}
                    className={cn(
                      "w-full px-3 py-2 text-xs text-left flex items-center justify-between hover:bg-accent transition-colors",
                      sortField === 'orderId' && "bg-accent/50"
                    )}
                  >
                    <span>Order ID</span>
                    {sortField === 'orderId' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleSort('date')}
                    className={cn(
                      "w-full px-3 py-2 text-xs text-left flex items-center justify-between hover:bg-accent transition-colors",
                      sortField === 'date' && "bg-accent/50"
                    )}
                  >
                    <span>Date</span>
                    {sortField === 'date' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    )}
                  </button>
                  
                  {sortField && (
                    <>
                      <div className="border-t border-border my-1" />
                      <button
                        onClick={clearSort}
                        className="w-full px-3 py-2 text-xs text-left text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      >
                        Clear sort
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1) // Reset to first page when searching
              }}
              className="bg-transparent border border-border/50 rounded-lg pl-8 pr-3 py-1 text-xs w-44 focus:outline-none focus:border-border transition-all placeholder:text-muted-foreground/50"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filter/Sort/Search indicators */}
        {(sortField || statusFilters.length > 0 || searchQuery) && (
          <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
            {searchQuery && (
              <div className="flex items-center gap-2">
                <span>Searching:</span>
                <span className="font-medium text-foreground">"{searchQuery}"</span>
              </div>
            )}
            {statusFilters.length > 0 && (
              <div className="flex items-center gap-2">
                <span>Filtered by:</span>
                <div className="flex items-center gap-1">
                  {statusFilters.map((status, index) => (
                    <span key={status} className="font-medium text-foreground">
                      {status}{index < statusFilters.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
                <span className="text-muted-foreground">({filteredOrders.length} orders)</span>
              </div>
            )}
            {sortField && (
              <div className="flex items-center gap-2">
                <span>Sorted by:</span>
                <span className="font-medium text-foreground capitalize">
                  {sortField === 'orderId' ? 'Order ID' : sortField}
                </span>
                <span className="text-muted-foreground">
                  ({sortDirection === 'asc' ? 'A-Z' : 'Z-A'})
                </span>
              </div>
            )}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
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
                <th 
                  className="px-4 py-3 font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort('orderId')}
                >
                  <div className="flex items-center gap-1">
                    Order ID
                    {sortField === 'orderId' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort('username')}
                >
                  <div className="flex items-center gap-1">
                    User
                    {sortField === 'username' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Address</th>
                <th 
                  className="px-4 py-3 font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-1">
                    Date
                    {sortField === 'date' && (
                      sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className={cn(
                    "hover:bg-[#F7F9FB] dark:hover:bg-white/5 transition-colors group",
                    selectedOrders.includes(order.id) && "bg-[#F7F9FB] dark:bg-white/5",
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
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <img
                        src={order.user.avatar || "/placeholder.svg"}
                        alt=""
                        className="w-5 h-5 rounded-full bg-accent"
                      />
                      <span className="font-medium text-foreground text-[11px]">{order.user.name}</span>
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

      {/* Click outside to close menus */}
      {(showSortMenu || showFilterMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => { setShowSortMenu(false); setShowFilterMenu(false); }}
        />
      )}
    </div>
  )
}
