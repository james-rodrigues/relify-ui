// src/utils/helpers.ts

import { Release, MonthOption } from '../types';

export const MONTHS: MonthOption[] = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' }
];

export const generateYears = (range: number = 10): number[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: range }, (_, i) => currentYear - 5 + i);
};

export const filterReleasesByDate = (
  releases: Release[],
  month: number | '',
  year: number | ''
): Release[] => {
  if (!month || !year) return [];
  
  return releases.filter(release => {
    const releaseDate = new Date(release.releaseDate);
    return releaseDate.getMonth() + 1 === month && 
           releaseDate.getFullYear() === year;
  });
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getStatusColor = (status: Release['status']): string => {
  const statusColors: Record<Release['status'], string> = {
    'Completed': 'success',
    'In Progress': 'warning',
    'Scheduled': 'info',
    'Failed': 'error',
    'Cancelled': 'default'
  };
  
  return statusColors[status] || 'default';
};

export const getMonthName = (monthValue: number | ''): string => {
  if (!monthValue) return '';
  const month = MONTHS.find(m => m.value === monthValue);
  return month ? month.label : '';
};