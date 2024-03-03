import { Inter as FontSans } from "next/font/google";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Will break at build. Waiting for https://github.com/shadcn-ui/ui/issues/2377
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
