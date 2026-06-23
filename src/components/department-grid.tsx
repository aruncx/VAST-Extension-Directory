"use client";

import { ExtensionEntry } from "@/lib/data";
import { Building2, ChevronRight, Layers } from "lucide-react";
import Link from "next/link";

export function DepartmentGrid({
  departments,
  data,
}: {
  departments: string[];
  data: ExtensionEntry[];
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Layers className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Departments & Offices</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {departments.map((dept) => {
          const count = data.filter((d) => d.department === dept).length;
          return (
            <Link
              key={dept}
              href={`/departments/${encodeURIComponent(dept)}`}
              className="group bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all shrink-0">
                  <Building2 className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">{dept}</h3>
                  <p className="text-sm text-muted-foreground mt-1 font-medium">
                    {count} {count === 1 ? "contact" : "contacts"}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
