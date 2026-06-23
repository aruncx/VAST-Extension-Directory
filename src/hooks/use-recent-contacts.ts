import { useState, useEffect, useCallback } from 'react';
import { ExtensionEntry } from '@/lib/data';

const RECENT_CONTACTS_KEY = 'vast_recent_contacts';
const MAX_RECENT = 8;

export function useRecentContacts() {
  const [recentContacts, setRecentContacts] = useState<ExtensionEntry[]>([]);

  const loadRecentContacts = useCallback(() => {
    try {
      const stored = localStorage.getItem(RECENT_CONTACTS_KEY);
      if (stored) {
        setRecentContacts(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse recent contacts from localStorage', e);
    }
  }, []);

  useEffect(() => {
    loadRecentContacts();

    // Listen for custom event to update state across components
    const handleStorageChange = () => loadRecentContacts();
    window.addEventListener('recentContactsUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('recentContactsUpdated', handleStorageChange);
    };
  }, [loadRecentContacts]);

  const addRecentContact = useCallback((contact: ExtensionEntry) => {
    try {
      const stored = localStorage.getItem(RECENT_CONTACTS_KEY);
      let currentRecent: ExtensionEntry[] = stored ? JSON.parse(stored) : [];
      
      // Remove if it already exists
      currentRecent = currentRecent.filter(c => c.id !== contact.id);
      
      // Add to beginning
      currentRecent.unshift(contact);
      
      // Limit to MAX_RECENT
      if (currentRecent.length > MAX_RECENT) {
        currentRecent = currentRecent.slice(0, MAX_RECENT);
      }
      
      localStorage.setItem(RECENT_CONTACTS_KEY, JSON.stringify(currentRecent));
      setRecentContacts(currentRecent);
      
      // Dispatch custom event to notify other instances of the hook
      window.dispatchEvent(new Event('recentContactsUpdated'));
    } catch (e) {
      console.error('Failed to save recent contact to localStorage', e);
    }
  }, []);

  return { recentContacts, addRecentContact };
}
