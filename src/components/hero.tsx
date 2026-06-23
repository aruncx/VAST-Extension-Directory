"use client";

import { motion } from "framer-motion";
import { Search, Building2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-24 pb-32">

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-foreground tracking-tight max-w-4xl mb-6"
        >
          VAST Extension <span className="text-primary">Directory</span> Portal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
        >
          Find extension numbers of departments, offices, laboratories and staff instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#search-section"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-black text-primary-foreground bg-primary/90 backdrop-blur-md rounded-2xl shadow-xl hover:bg-primary transition-all border border-white/20"
          >
            <Search className="w-5 h-5 mr-2" />
            Search Directory
          </a>
          <a
            href="#departments-section"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-foreground bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-lg hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all border border-white/40 dark:border-slate-600/50"
          >
            <Building2 className="w-5 h-5 mr-2" />
            Browse Departments
          </a>
        </motion.div>
      </div>
    </section>
  );
}
