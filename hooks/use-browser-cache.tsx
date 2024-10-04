'use client';

import { useEffect } from 'react';

/**
 * Custom hook for working with the browser cache.
 * @returns An object containing functions for setting, getting, and clearing cache.
 */
const useBrowserCache = (key: string) => {
  const setCache = (value: any): void => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const getCache = (): any => {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  };

  const clearCache = (): void => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  };

  useEffect(() => {
    if (window === undefined) {
      throw new Error('useBrowserCache must be used in the browser');
    }
  }, []);

  return { setCache, getCache, clearCache };
};

export default useBrowserCache;