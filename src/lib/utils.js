import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import * as React from "react"

/**
 * Utility function to merge Tailwind CSS classes conditionally and intelligently.
 * 
 * Logic & Approach:
 * 1. Uses `clsx` to construct a class string from various input formats (strings, objects, arrays).
 *    This handles conditional rendering of classes (e.g., `isMobile && 'absolute'`).
 * 2. passes the result to `twMerge` which resolves conflicts between Tailwind classes 
 *    (e.g., 'px-2' vs 'px-4'), ensuring the last one wins.
 * 
 * @param {...any} inputs - Class names, conditional objects, or arrays of classes.
 * @returns {string} - The final, merged class string.
 */
/**
 * Utility function to merge Tailwind CSS classes conditionally and intelligently.
 * 
 * Logic & Approach:
 * 1. Uses `clsx` to construct a class string from various input formats (strings, objects, arrays).
 *    This handles conditional rendering of classes (e.g., `isMobile && 'absolute'`).
 * 2. passes the result to `twMerge` which resolves conflicts between Tailwind classes 
 *    (e.g., 'px-2' vs 'px-4'), ensuring the last one wins.
 * 
 * @param {...any} inputs - Class names, conditional objects, or arrays of classes.
 * @returns {string} - The final, merged class string.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

/**
 * Custom hook for React state persistence using localStorage.
 * Syncs state changes to window.localStorage with the given key.
 * 
 * @param {string} key - The localStorage key to use.
 * @param {any} initialValue - The default value if no stored value exists.
 * @returns {[any, Function]} - [state, setState] pair.
 */
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
