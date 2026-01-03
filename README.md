# Juspay Ui Developer Assignment

**live Link- https://juspay-woad.vercel.app/**

---

## Key Features

### Analytics & Charts
- **Revenue Trends**: Line chart comparing current vs. previous week performance using `recharts`.
- **Projections vs Actuals**: Stacked bar chart for visualizing targets against reality.
- **Sales Distribution**: Donut chart with asymmetric segments and interactive tooltips.
- **Geographic Revenue**: Visual map representation of revenue by location with progress indicators.

### Responsive Design
- **Adaptive Layout**: Mobile-first design that scales perfectly to tablets and desktops.
- **Smart Sidebars**:
  - **Left Sidebar**: Navigation drawer that collapses on mobile and persists state on desktop.
  - **Right Sidebar**: Notification, activity and contact panel with responsive behavior.
- **Optimized UI**: Compact views for mobile (e.g., single-column stats grid) and expansive layouts for desktop.

### Advanced Data Management (Order List)
- **Search & Filter**: Real-time search by user name and multi-select filtering by order status.
- **Sorting**: Sortable columns (Order ID, Username, Date) with direction toggles.
- **Pagination**: Smart pagination handling large datasets comfortably.
- **Selection**: Row selection capability for bulk actions.

### State Persistence
- **LocalStorage Integration**: Custom hook `usePersistentState` ensures that your **sidebar preferences**, **current view**, **filters**, **sorting page**, and **pagination state** are saved and restored automatically upon page refresh.

### Premium UI/UX
- **Theming**: Dark/Light mode support.
- **Animations**: Smooth transitions, hover effects, and micro-interactions.
- **Custom Components**: Reusable UI components for `Tables`, `Avatars`, `Badges`, and `StatCards`.

---

##  Tech Stack

- **Frontend Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/) & Custom SVG
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: `clsx`, `tailwind-merge`
- **State Management**: React Hooks + LocalStorage

---

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/juspay-dashboard.git
   cd Juspay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── charts/         # All chart components (Revenue, Sales, Projections)
│   ├── ui/             # Primitive UI elements (Table, Avatar, etc.)
│   ├── dashboard-header.jsx
│   ├── orders-list.jsx # Main Order List view logic
│   ├── sidebar-left.jsx
│   └── ...
├── lib/
│   └── utils.js        # Helper functions (cn, usePersistentState)
├── App.jsx             # Main layout and routing logic
├── main.jsx            # Entry point
└── index.css           # Global styles and Tailwind imports
```