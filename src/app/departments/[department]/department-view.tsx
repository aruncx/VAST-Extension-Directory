"use client";

import { useState, useMemo } from "react";
import { ExtensionEntry } from "@/lib/data";
import { Search, ArrowUpDown, Home } from "lucide-react";
import Link from "next/link";

export function DepartmentView({ departmentName, data }: { departmentName: string, data: ExtensionEntry[] }) {
  const [query, setQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof ExtensionEntry, direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });

  const handleSort = (key: keyof ExtensionEntry) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredData = useMemo(() => {
    const q = query.toLowerCase();
    return data.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.designation.toLowerCase().includes(q) || 
      d.extension.toLowerCase().includes(q)
    );
  }, [query, data]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/"
            className="p-3 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-xl border border-white/50 dark:border-slate-600/50 rounded-2xl shadow-sm hover:shadow-md transition-all text-primary hover:text-primary/80 group flex-shrink-0"
            title="Back to Home"
          >
            <Home className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">{departmentName}</h1>
            <p className="text-muted-foreground mt-1 text-lg">{data.length} {data.length === 1 ? 'Contact' : 'Contacts'} Directory</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-xl rounded-[24px] p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search within department..."
            className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-white/40 dark:border-slate-600/50 shadow-inner rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-xl rounded-[24px] overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-transparent text-muted-foreground uppercase tracking-wider text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 cursor-pointer hover:bg-muted/80 transition-colors" onClick={() => handleSort('extension')}>
                  <div className="flex items-center gap-2">Extension <ArrowUpDown className="w-3.5 h-3.5 opacity-50" /></div>
                </th>

                <th className="px-6 py-4 cursor-pointer hover:bg-muted/80 transition-colors" onClick={() => handleSort('designation')}>
                  <div className="flex items-center gap-2">Details <ArrowUpDown className="w-3.5 h-3.5 opacity-50" /></div>
                </th>

              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {sortedData.length > 0 ? sortedData.map((row) => (
                <tr key={row.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-xl text-lg font-black bg-white/50 dark:bg-slate-800/50 border border-white/40 dark:border-slate-600/50 text-primary shadow-sm tracking-wider">
                      {row.extension}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-bold text-foreground text-base mb-0.5">{row.designation || 'Staff'}</div>
                    <div className="text-sm text-muted-foreground font-medium">{row.name}</div>
                  </td>

                </tr>
              )) : (
                <tr>
                  <td colSpan={2} className="px-6 py-16 text-center">
                    <Search className="w-10 h-10 mx-auto mb-4 text-muted-foreground opacity-20" />
                    <p className="text-muted-foreground text-lg">No matching contacts found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


      </div>
    </div>
  );
}
