"use client";

import { useState, useMemo } from "react";
import { Search, User, Building2, X, Phone } from "lucide-react";
import { useRecentContacts } from "@/hooks/use-recent-contacts";
import { ExtensionEntry } from "@/lib/data";

export function GlobalSearch({ data }: { data: ExtensionEntry[] }) {
  const [query, setQuery] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<ExtensionEntry | null>(null);
  const { addRecentContact } = useRecentContacts();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return data.filter(
      (entry) =>
        entry.name.toLowerCase().includes(q) ||
        entry.designation.toLowerCase().includes(q) ||
        entry.department.toLowerCase().includes(q) ||
        entry.extension.toLowerCase().includes(q)
    ).slice(0, 8); // Limit results
  }, [query, data]);

  return (
    <div className="relative w-full rounded-[24px] bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-xl p-2 sm:p-4 z-50">
      <div className="relative flex items-center bg-white/50 dark:bg-slate-800/50 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary transition-all border border-white/40 dark:border-slate-600/50 shadow-inner">
        <Search className="absolute left-4 w-6 h-6 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, designation, department or extension..."
          className="w-full py-4 pl-14 pr-4 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/50 dark:border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <ul className="divide-y divide-border">
              {results.map((entry) => (
                <li 
                  key={entry.id} 
                  onClick={() => {
                    addRecentContact(entry);
                    setSelectedEntry(entry);
                  }}
                  className="p-4 hover:bg-muted/50 transition-colors flex flex-col justify-between gap-4 cursor-pointer"
                >
                  <div className="flex flex-col w-full">
                    <span className="font-semibold text-foreground flex items-center gap-2 flex-wrap">
                      <User className="w-4 h-4 text-primary" /> {entry.name} <span className="text-primary font-bold ml-1 bg-primary/10 px-2 py-0.5 rounded-md">{entry.extension}</span>
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Building2 className="w-3.5 h-3.5" /> {entry.designation} <span className="opacity-50">•</span> {entry.department}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No results found for "{query}"</p>
            </div>
          )}
        </div>
      )}

      {selectedEntry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => { setSelectedEntry(null); setQuery(""); }}>
          <div 
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 md:p-8 max-w-md w-full relative border border-white/20 dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => { setSelectedEntry(null); setQuery(""); }}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-center gap-4 mt-2">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-2 shadow-inner">
                <User className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{selectedEntry.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
                  <Building2 className="w-4 h-4" /> {selectedEntry.designation} <span className="opacity-50">•</span> {selectedEntry.department}
                </p>
              </div>
              <div className="w-full h-px bg-border my-2" />
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6 w-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                <p className="text-xs text-primary uppercase font-bold tracking-widest mb-3">Extension Number</p>
                <div className="flex items-center justify-center gap-4">
                  <Phone className="w-8 h-8 text-primary" />
                  <span className="text-6xl font-black text-primary tracking-tighter drop-shadow-sm">{selectedEntry.extension}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
