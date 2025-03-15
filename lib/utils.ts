import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string to a relative time format (e.g., "2 days ago", "1 week ago")
 * @param dateString - ISO date string to format
 * @returns Formatted relative time string
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 14) return "1 week ago";
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 60) return "1 month ago";
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} year${Math.floor(diffInDays / 365) > 1 ? "s" : ""} ago`;
}

/**
 * Formats a number to Indian currency format (e.g., ₹1,23,456.78)
 * @param amount - Number to format
 * @param showSymbol - Whether to include the ₹ symbol (default: true)
 * @returns Formatted currency string
 */
export function formatIndianCurrency(
  amount: number,
  showSymbol: boolean = true
): string {
  const [whole, decimal] = amount.toFixed(2).split(".");
  let formattedWhole = "";
  const digits = whole.split("");
  for (let i = digits.length - 1, count = 0; i >= 0; i--, count++) {
    if (count === 3 || (count > 3 && (count - 3) % 2 === 0)) {
      formattedWhole = "," + formattedWhole;
    }
    formattedWhole = digits[i] + formattedWhole;
  }
  const formattedAmount = `${formattedWhole}.${decimal}`;
  return showSymbol ? `₹${formattedAmount}` : formattedAmount;
}
