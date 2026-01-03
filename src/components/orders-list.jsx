/**
 * Comprehensive order management table with filtering, searching, sorting, and pagination.
 * Uses memoization for performance optimization on large datasets.
 */

import { useState, useMemo, useCallback, memo } from "react"
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
  X,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ============================================
// CONSTANTS
// ============================================

const STATUS_COLORS = {
  "In Progress": "text-[#8A8CD9]",
  Complete: "text-[#4AA785]",
  Pending: "text-[#59A8D4]",
  Approved: "text-[#FFC555]",
  Rejected: "text-[#1C1C1C33] dark:text-[#FFFFFF4D]",
}

const STATUS_OPTIONS = ["In Progress", "Complete", "Pending", "Approved", "Rejected"]

const SAMPLE_DATA = {
  firstNames: ["Natali", "Kate", "Drew", "Orlando", "Andi", "Koray", "Lana", "Demi", "Candice", "Marcus", "Sophia", "James", "Emma", "Michael", "Olivia", "William", "Ava", "Alexander", "Isabella", "Daniel"],
  lastNames: ["Craig", "Morrison", "Cano", "Diggs", "Lane", "Okumus", "Steiner", "Wilkinson", "Wu", "Chen", "Rodriguez", "Smith", "Johnson", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson"],
  avatars: ["/natali.jpg", "/kate.jpg", "/drew.jpg", "/orlando.jpg", "/andi.jpg", "/koray.jpg"],
  projects: ["Landing Page", "CRM Admin", "Client Portal", "Admin Dashboard", "Mobile App", "Analytics Suite", "Marketing Platform", "E-commerce Store", "User Research", "Security Audit", "API Integration", "Data Migration", "Design System", "Payment Gateway", "Chat Application"],
  addresses: ["Meadow Lane, Oakland", "Market St, San Francisco", "Bagwell Ave, Ocala", "Washburn Dr, Baton Rouge", "Nest Lane, Olivette", "Sunset Blvd, Los Angeles", "Wall St, New York", "Pacific Ave, Seattle", "Main St, Chicago", "Broadway, Austin", "Pine St, Portland", "Oak Ave, Denver", "Maple Dr, Boston", "Cedar Rd, Miami", "Elm St, Phoenix"],
  dates: ["Just now", "5 min ago", "15 min ago", "1 hour ago", "3 hours ago", "Yesterday", "2 days ago", "3 days ago", "1 week ago", "Jan 15, 2024", "Jan 10, 2024", "Dec 28, 2023", "Dec 15, 2023", "Nov 30, 2023", "Nov 15, 2023"],
}

const DATE_PRIORITY = {
  "Just now": 1, "5 min ago": 2, "15 min ago": 3, "1 hour ago": 4, "3 hours ago": 5,
  "Yesterday": 6, "2 days ago": 7, "3 days ago": 8, "1 week ago": 9,
  "Jan 15, 2024": 10, "Jan 10, 2024": 11, "Dec 28, 2023": 12,
  "Dec 15, 2023": 13, "Nov 30, 2023": 14, "Nov 15, 2023": 15,
}

// Generates 70 sample orders for demonstration
const DUMMY_ORDERS = Array.from({ length: 70 }, (_, i) => ({
  id: `#CM${(9800 + i + 1).toString()}`,
  user: {
    name: `${SAMPLE_DATA.firstNames[i % 20]} ${SAMPLE_DATA.lastNames[(i + 7) % 20]}`,
    avatar: SAMPLE_DATA.avatars[i % 6],
  },
  project: SAMPLE_DATA.projects[(i * 3 + i) % 15],
  address: SAMPLE_DATA.addresses[(i * 2 + 1) % 15],
  date: SAMPLE_DATA.dates[i % 15],
  status: STATUS_OPTIONS[(i * 7) % 5],
}))

// ============================================
// REUSABLE SUB-COMPONENTS
// ============================================

// Generic icon button wrapper with styled states
const IconButton = memo(function IconButton({ 
  children, 
  active = false, 
  onClick, 
  label,
  className = "" 
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "p-1.5 rounded transition-all duration-150 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
        active ? "text-foreground bg-accent" : "text-foreground/70 hover:bg-accent",
        className
      )}
    >
      {children}
    </button>
  )
})

// Visual status indicator with color dot
const StatusBadge = memo(function StatusBadge({ status }) {
  const colorClass = STATUS_COLORS[status] || "text-muted-foreground"
  
  return (
    <div className="flex items-center gap-1.5" role="status" aria-label={`Status: ${status}`}>
      <div 
        className={cn("w-1.5 h-1.5 rounded-full bg-current", colorClass)} 
        aria-hidden="true" 
      />
      <span className={cn("text-xs font-medium", colorClass)}>{status}</span>
    </div>
  )
})

// Table header with built-in sorting logic and indicators
const SortableHeader = memo(function SortableHeader({ 
  field, 
  label, 
  currentSort, 
  direction, 
  onSort 
}) {
  const isActive = currentSort === field
  
  return (
    <th
      className="px-4 py-3 font-medium cursor-pointer hover:text-foreground transition-colors"
      onClick={() => onSort(field)}
      onKeyDown={(e) => e.key === 'Enter' && onSort(field)}
      tabIndex={0}
      role="columnheader"
      aria-sort={isActive ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      <div className="flex items-center gap-1">
        {label}
        {isActive && (
          direction === 'asc' 
            ? <ArrowUp className="w-3 h-3" aria-hidden="true" /> 
            : <ArrowDown className="w-3 h-3" aria-hidden="true" />
        )}
      </div>
    </th>
  )
})

// Animated dropdown container for menus
const Dropdown = memo(function Dropdown({ isOpen, title, children, onClose }) {
  if (!isOpen) return null
  
  return (
    <div 
      className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-lg shadow-xl z-50 min-w-[180px] py-1 animate-fade-in-down"
      role="menu"
      aria-label={title}
    >
      <div className="px-3 py-1.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
        {title}
      </div>
      {children}
    </div>
  )
})

// Smart pagination component that shows window of pages around current
const Pagination = memo(function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <nav 
      className="flex items-center justify-end gap-1 px-2 py-2" 
      role="navigation" 
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="p-1.5 hover:bg-accent rounded-lg text-muted-foreground disabled:opacity-30 transition-all focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
      </button>
      
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}
          className={cn(
            "w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition-all",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            currentPage === page 
              ? "bg-accent text-foreground" 
              : "text-muted-foreground hover:bg-accent/50",
          )}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="p-1.5 hover:bg-accent rounded-lg text-muted-foreground disabled:opacity-30 transition-all focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </nav>
  )
})

// ============================================
// MAIN COMPONENT
// ============================================

export function OrdersList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrders, setSelectedOrders] = useState([])
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [statusFilters, setStatusFilters] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  
  const itemsPerPage = 10

  // Efficiently filter dataset based on search inputs and filter tags
  const filteredOrders = useMemo(() => {
    let orders = DUMMY_ORDERS
    
    if (statusFilters.length > 0) {
      orders = orders.filter(order => statusFilters.includes(order.status))
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      orders = orders.filter(order => 
        order.user.name.toLowerCase().includes(query)
      )
    }
    
    return orders
  }, [statusFilters, searchQuery])

  // Sort the filtered dataset dynamically
  const sortedOrders = useMemo(() => {
    if (!sortField) return filteredOrders

    return [...filteredOrders].sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case 'username':
          comparison = a.user.name.localeCompare(b.user.name)
          break
        case 'orderId':
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
  const currentOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  )

  const handleSelectAll = useCallback(() => {
    setSelectedOrders(prev => 
      prev.length === currentOrders.length 
        ? [] 
        : currentOrders.map(o => o.id)
    )
  }, [currentOrders])

  const handleSelectOrder = useCallback((id) => {
    setSelectedOrders(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    )
  }, [])

  const handleSort = useCallback((field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
    setCurrentPage(1)
    setShowSortMenu(false)
  }, [sortField])

  const handleClearSort = useCallback(() => {
    setSortField(null)
    setSortDirection('asc')
    setCurrentPage(1)
    setShowSortMenu(false)
  }, [])

  const handleToggleFilter = useCallback((status) => {
    setStatusFilters(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    )
    setCurrentPage(1)
  }, [])

  const handleClearFilters = useCallback(() => {
    setStatusFilters([])
    setCurrentPage(1)
    setShowFilterMenu(false)
  }, [])

  const handleSearch = useCallback((value) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }, [])

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page)
    setSelectedOrders([])
  }, [])

  const closeAllMenus = useCallback(() => {
    setShowSortMenu(false)
    setShowFilterMenu(false)
  }, [])

  const hasActiveFilters = statusFilters.length > 0 || searchQuery || sortField

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h1 className="text-sm font-semibold text-foreground">Order List</h1>
        {sortedOrders.length !== DUMMY_ORDERS.length && (
          <span className="text-xs text-muted-foreground">
            Showing {sortedOrders.length} of {DUMMY_ORDERS.length} orders
          </span>
        )}
      </header>

      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Toolbar controls for filter, sort, and search */}
        <div 
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-secondary/30 dark:bg-white/5 rounded-lg px-2 py-1.5 border border-border/50"
          role="toolbar"
          aria-label="Order list controls"
        >
          <div className="flex items-center gap-0.5">
            <IconButton label="Add new order">
              <Plus className="w-4 h-4" aria-hidden="true" />
            </IconButton>
            
            <div className="relative">
              <IconButton 
                onClick={() => { setShowFilterMenu(!showFilterMenu); setShowSortMenu(false); }}
                active={statusFilters.length > 0}
                label="Filter orders"
              >
                <ListFilter className="w-4 h-4" aria-hidden="true" />
              </IconButton>
              
              <Dropdown 
                isOpen={showFilterMenu} 
                title="Filter by Status"
                onClose={() => setShowFilterMenu(false)}
              >
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleToggleFilter(status)}
                    role="menuitemcheckbox"
                    aria-checked={statusFilters.includes(status)}
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
                        <Check className="w-2 h-2 text-background" aria-hidden="true" />
                      )}
                    </div>
                    <StatusBadge status={status} />
                  </button>
                ))}
                
                {statusFilters.length > 0 && (
                  <>
                    <div className="border-t border-border my-1" role="separator" />
                    <button
                      onClick={handleClearFilters}
                      className="w-full px-3 py-2 text-xs text-left text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      role="menuitem"
                    >
                      Clear filters
                    </button>
                  </>
                )}
              </Dropdown>
            </div>
            
            <div className="relative">
              <IconButton 
                onClick={() => { setShowSortMenu(!showSortMenu); setShowFilterMenu(false); }}
                active={!!sortField}
                label="Sort orders"
              >
                <ArrowUpDown className="w-4 h-4" aria-hidden="true" />
              </IconButton>
              
              <Dropdown 
                isOpen={showSortMenu} 
                title="Sort by"
                onClose={() => setShowSortMenu(false)}
              >
                {[
                  { field: 'username', label: 'Username' },
                  { field: 'orderId', label: 'Order ID' },
                  { field: 'date', label: 'Date' },
                ].map(({ field, label }) => (
                  <button
                    key={field}
                    onClick={() => handleSort(field)}
                    role="menuitemradio"
                    aria-checked={sortField === field}
                    className={cn(
                      "w-full px-3 py-2 text-xs text-left flex items-center justify-between hover:bg-accent transition-colors",
                      sortField === field && "bg-accent/50"
                    )}
                  >
                    <span>{label}</span>
                    {sortField === field && (
                      sortDirection === 'asc' 
                        ? <ArrowUp className="w-3 h-3" aria-hidden="true" /> 
                        : <ArrowDown className="w-3 h-3" aria-hidden="true" />
                    )}
                  </button>
                ))}
                
                {sortField && (
                  <>
                    <div className="border-t border-border my-1" role="separator" />
                    <button
                      onClick={handleClearSort}
                      className="w-full px-3 py-2 text-xs text-left text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      role="menuitem"
                    >
                      Clear sort
                    </button>
                  </>
                )}
              </Dropdown>
            </div>
          </div>
          
          <div className="relative w-full sm:w-auto">
            <Search 
              className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50" 
              aria-hidden="true" 
            />
            <input
              type="search"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              aria-label="Search orders by username"
              className="w-full sm:w-44 md:w-52 bg-transparent border border-border/50 rounded-lg pl-8 pr-8 py-1.5 sm:py-1 text-xs focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all placeholder:text-muted-foreground/50"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3 h-3" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {hasActiveFilters && (
          <div 
            className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap"
            role="status"
            aria-live="polite"
          >
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
              </div>
            )}
            {sortField && (
              <div className="flex items-center gap-2">
                <span>Sorted by:</span>
                <span className="font-medium text-foreground capitalize">
                  {sortField === 'orderId' ? 'Order ID' : sortField}
                </span>
                <span>({sortDirection === 'asc' ? 'A-Z' : 'Z-A'})</span>
              </div>
            )}
          </div>
        )}

        {/* Data Table with selection and actions */}
        <div className="overflow-x-auto" role="region" aria-label="Orders table">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === currentOrders.length && currentOrders.length > 0}
                    onChange={handleSelectAll}
                    aria-label="Select all orders on this page"
                    className="w-4 h-4 rounded border-border bg-transparent accent-[#A8C5DA] cursor-pointer"
                  />
                </th>
                <SortableHeader 
                  field="orderId" 
                  label="Order ID" 
                  currentSort={sortField} 
                  direction={sortDirection} 
                  onSort={handleSort} 
                />
                <SortableHeader 
                  field="username" 
                  label="User" 
                  currentSort={sortField} 
                  direction={sortDirection} 
                  onSort={handleSort} 
                />
                <th className="hidden md:table-cell px-4 py-3 font-medium">Project</th>
                <th className="hidden lg:table-cell px-4 py-3 font-medium">Address</th>
                <SortableHeader 
                  field="date" 
                  label="Date" 
                  currentSort={sortField} 
                  direction={sortDirection} 
                  onSort={handleSort} 
                />
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 w-10">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    No orders found matching your criteria
                  </td>
                </tr>
              ) : (
                currentOrders.map((order) => (
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
                        onChange={() => handleSelectOrder(order.id)}
                        aria-label={`Select order ${order.id}`}
                        className="w-4 h-4 rounded border-border bg-transparent accent-[#A8C5DA] cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 text-foreground font-mono">{order.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <img
                          src={order.user.avatar}
                          alt=""
                          className="w-5 h-5 rounded-full bg-accent object-cover"
                          loading="lazy"
                        />
                        <span className="font-medium text-foreground text-[11px]">
                          {order.user.name}
                        </span>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-4 py-3 text-foreground">{order.project}</td>
                    <td className="hidden lg:table-cell px-4 py-3 text-foreground">{order.address}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-foreground">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        <time>{order.date}</time>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-accent rounded transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
                        aria-label={`More actions for order ${order.id}`}
                      >
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        )}
      </div>

      {(showSortMenu || showFilterMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeAllMenus}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
