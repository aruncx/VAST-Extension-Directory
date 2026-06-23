"use client";

import { ExtensionEntry } from "@/lib/data";
import { Phone, Clock, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { useRecentContacts } from "@/hooks/use-recent-contacts";

export function QuickAccess({ data }: { data: ExtensionEntry[] }) {
  const { recentContacts, addRecentContact } = useRecentContacts();


  const handleCopy = (contact: ExtensionEntry) => {
    navigator.clipboard.writeText(contact.extension);
    addRecentContact(contact);
  };

  const renderCards = (contacts: ExtensionEntry[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-4">
      {contacts.map((contact) => (
        <button
          key={contact.id}
          onClick={() => handleCopy(contact)}
          className="text-left bg-card border border-border p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col justify-between h-full focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <div>
            <p className="text-[10px] sm:text-xs font-bold tracking-wider text-primary uppercase mb-1 line-clamp-1">{contact.department}</p>
            <h3 className="text-foreground font-semibold text-sm sm:text-base line-clamp-2 leading-tight">{contact.designation || contact.name}</h3>
          </div>
          <div className="mt-3 flex items-center justify-center text-primary font-bold bg-primary/5 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors w-full">
            <span className="text-sm sm:text-lg">{contact.extension}</span>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-12">

      {/* Recent Extensions Section */}
      {recentContacts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Recent Extensions</h2>
          </div>
          {renderCards(recentContacts)}
        </div>
      )}
    </div>
  );
}
