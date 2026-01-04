import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import * as React from "react"

// Utility to merge Tailwind classes
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

// Persistent state hook using localStorage
export function usePersistentState(key, initialValue) {
    // Use React.useState to access the hook inside standard components
    const [state, setState] = React.useState(() => {
        try {
            const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error)
            return initialValue
        }
    })

    React.useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(state))
            }
        } catch (error) {
            console.warn(`Error writing localStorage key "${key}":`, error)
        }
    }, [key, state])

    return [state, setState]
}
