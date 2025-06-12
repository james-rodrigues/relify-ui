// src/types/index.ts

export interface Release {
  releaseId: string;
  releaseDate: string;
  name: string;
  version: string;
  snowNumber: string;
  fixVersion: string;
  isMerchantImpacting: boolean;
  status: 'Completed' | 'In Progress' | 'Scheduled' | 'Failed' | 'Cancelled';
}

export interface FilterParams {
  month: number;
  year: number;
}

export interface MonthOption {
  value: number;
  label: string;
}

export interface FilterSectionProps {
  selectedMonth: number | '';
  selectedYear: number | '';
  onMonthChange: (month: number | '') => void;
  onYearChange: (year: number | '') => void;
  onSubmit: () => void;
  onReset: () => void;
  isLoading?: boolean;
}

export interface ReleaseTableProps {
  releases: Release[];
  selectedMonth: number | '';
  selectedYear: number | '';
  isLoading?: boolean;
}

export interface LayoutProps {
  children: React.ReactNode;
}