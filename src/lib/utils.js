import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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
