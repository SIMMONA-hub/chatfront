import { useState, useMemo } from 'react';

export function useSearch<T>(
  items: T[],
  searchKey: keyof T,
  initialQuery: string = ''
) {
  const [query, setQuery] = useState(initialQuery);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    
    return items.filter(item => {
      const value = item[searchKey];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(query.toLowerCase());
      }
      return false;
    });
  }, [items, query, searchKey]);

  return {
    query,
    setQuery,
    filteredItems,
    hasResults: filteredItems.length > 0,
  };
}