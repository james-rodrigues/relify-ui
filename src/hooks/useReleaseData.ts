// src/hooks/useReleaseData.ts

import { useState, useCallback } from 'react';
import { Release } from '../types';
import { mockReleaseData } from '../data/mockData';
import { filterReleasesByDate } from '../utils/helpers';

interface UseReleaseDataReturn {
  releases: Release[];
  isLoading: boolean;
  error: string | null;
  fetchReleases: (month: number | '', year: number | '') => Promise<void>;
  clearReleases: () => void;
}

export const useReleaseData = (): UseReleaseDataReturn => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReleases = useCallback(async (month: number | '', year: number | '') => {
    if (!month || !year) {
      setError('Please select both month and year');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const filteredReleases = filterReleasesByDate(mockReleaseData, month, year);
      setReleases(filteredReleases);
    } catch (err) {
      setError('Failed to fetch release data');
      console.error('Error fetching releases:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearReleases = useCallback(() => {
    setReleases([]);
    setError(null);
  }, []);

  return {
    releases,
    isLoading,
    error,
    fetchReleases,
    clearReleases
  };
};