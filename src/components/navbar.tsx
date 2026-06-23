"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border-b border-white/40 dark:border-slate-700/50 shadow-sm mb-4">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <img src="/logo.png" alt="VAST Logo" className="w-10 h-10 sm:w-11 sm:h-11 object-contain shrink-0" onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }} />
          <span className="font-black text-sm sm:text-lg md:text-xl text-foreground leading-tight tracking-tight line-clamp-2 sm:line-clamp-none max-w-[220px] sm:max-w-none">Vidya Academy of Science and Technology</span>
        </Link>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
