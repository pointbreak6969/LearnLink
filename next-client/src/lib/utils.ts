import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const api = axios.create({
  baseURL: (process.env.BACKEND_URL as string) || "http://localhost:5050/api/v1",
  withCredentials: true,
})
export {api}; 