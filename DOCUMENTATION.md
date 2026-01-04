# Juspay UI Developer Assignment Documentation

**Live Link**: https://juspay-woad.vercel.app/

---

## Project Overview

Behold the eCommerce Analytics Dashboard—a responsive, high-performance interface designed for modern web standards. This application provides real-time insights through interactive charts, data tables, and key metrics. It features a persistent state management system and supports both light and dark themes.

## Tech Stack

*   **Frontend**: React 18
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS
*   **Charts**: Recharts, Custom SVG
*   **Icons**: Lucide React
*   **State Management**: React Hooks, LocalStorage
*   **Utilities**: clsx, tailwind-merge

---

## Features

### Analytics & Visualization
*   **Revenue Trends**: Interactive line chart comparing current vs. previous week performance.
    *   *Approach*: implemented using `recharts` LineChart with dual data keys. Custom `strokeDasharray` is used to differentiate the "previous" period line.
*   **Projections**: Stacked bar chart visualizing projected targets against actual revenue.
    *   *Approach*: Utilizes a layered BarChart technique where one bar acts as a background track for the other, achieved via multiple X-axes in Recharts.
*   **Sales Distribution**: Donut chart with asymmetric segments and tooltips.
    *   *Approach*: Built with **Custom SVG** paths rather than a library. Trigonometric calculations generate arc commands to allow for unique spacing and rounded line caps that specific libraries couldn't support.
*   **Geographic Data**: Map visualization displaying revenue distribution by location.
    *   *Approach*: Uses absolute positioning with percentage-based coordinates over a static map image to ensure markers remain accurately placed during responsive resizing.

### Responsive UI
*   **Adaptive Layout**: Scales seamlessly from mobile to desktop.
    *   *Approach*: Mobile-first Tailwind utility classes (e.g., `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
*   **Collapsible Sidebars**: Left navigation and right activity panels collapse on smaller screens.
    *   *Approach*: Controlled via React state and conditional CSS transforms (`translate-x`) to slide panels in/out without affecting the layout flow on mobile.

### Order List
*   **Filtering**: Multi-select filtering by order status (Pending, Approved, etc.).
    *   *Approach*: Client-side filtering implemented with `useMemo` to efficiently re-calculate the displayed list only when filter dependencies change.
*   **Sorting**: Sortable columns for Order ID, Username, and Date.
    *   *Approach*: State-driven sort comparators that dynamically switch between string locale comparison and custom date priority mapping.
*   **Search**: Real-time text search for user names.
    *   *Approach*: Filter logic that performs case-insensitive string matching against the data model.
*   **Scrolling**: Custom scrollbar styling.
    *   *Approach*: Browser-specific pseudo-elements (`::-webkit-scrollbar`) styled to match the theme variables.
*   **Pagination**: Smart pagination limits for managing large datasets.
    *   *Approach*: Client-side dynamic calculation of page windows (surrounding the current page) to allow navigation through large lists without overwhelming the UI.

### State Persistence
*   **Session Restoration**: Automatically saves and restores sidebar visibility, current view, and table states.
    *   *Approach*: A custom `usePersistentState` hook wraps standard `useState`, adding a side effect that synchronizes value changes to `localStorage` and hydrates state on initialization.

### Themes & Experience
*   **Dark/Light Mode**: Fully supported theming.
    *   *Approach*: Powered by `next-themes` which toggles a root class. Tailwind's `dark:` variant modifier uses this class to apply theme-specific hex codes defined in CSS variables.
*   **Animations**: Smooth transitions for hover states, sidebars, and interactions.
    *   *Approach*: CSS transitions (`transition-all`) and keyframe animations (`animate-in`) for entering/leaving elements.

---

## Project Structure

*   **src/components/**: Reusable UI components (buttons, cards, tables).
    *   **charts/**: Charting components (Revenue, Projections, Sales).
    *   **ui/**: Primitive components (Avatar, Table).
*   **src/lib/**: Utility functions and hooks.
*   **src/App.jsx**: Main application layout and routing.
*   **src/main.jsx**: Application entry point.

---

## Getting Started

### Prerequisites
*   Node.js (v16+)
*   npm or yarn

### Installation Steps

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/juspay-dashboard.git
    cd Juspay
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start development server:
    ```bash
    npm run dev
    ```

4.  Build for production:
    ```bash
    npm run build
    ```
