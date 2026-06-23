"use client";

import { useState, useMemo } from "react";
import { Search, Phone, User, Building2 } from "lucide-react";
import { useRecentContacts } from "@/hooks/use-recent-contacts";
import { ExtensionEntry } from "@/lib/data";

export function GlobalSearch({ data }: { data: ExtensionEntry[] }) {
  const [query, setQuery] = useState("");
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
    <div className="relative w-full shadow-2xl rounded-2xl bg-card/80 backdrop-blur-md border border-border p-2 sm:p-4">
      <div className="relative flex items-center bg-background rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary transition-all shadow-inner">
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
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50 max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <ul className="divide-y divide-border">
              {results.map((entry) => (
                <li 
                  key={entry.id} 
                  onClick={() => addRecentContact(entry)}
                  className="p-4 hover:bg-muted/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" /> {entry.name}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Building2 className="w-3.5 h-3.5" /> {entry.designation} <span className="opacity-50">•</span> {entry.department}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold whitespace-nowrap self-start sm:self-auto">
                    <Phone className="w-4 h-4" /> 
                    <span>{entry.extension}</span>
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
    </div>
  );
}
