"use client";

import { motion } from "framer-motion";
import { Search, Building2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background pt-24 pb-32">
      {/* Decorative Network Nodes */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-40 h-40 bg-secondary rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -15, 0], x: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-accent rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

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
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-primary-foreground bg-primary rounded-xl shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all"
          >
            <Search className="w-5 h-5 mr-2" />
            Search Directory
          </a>
          <a
            href="#departments-section"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-primary bg-card border border-border rounded-xl shadow-sm hover:bg-muted hover:border-primary/30 transition-all"
          >
            <Building2 className="w-5 h-5 mr-2" />
            Browse Departments
          </a>
        </motion.div>
      </div>
    </section>
  );
}
