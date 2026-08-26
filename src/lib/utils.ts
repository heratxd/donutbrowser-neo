import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
<<<<<<< HEAD

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
=======
>>>>>>> v0.29.6
