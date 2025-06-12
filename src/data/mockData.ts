// src/data/mockData.ts

import { Release } from '../types';

export const mockReleaseData: Release[] = [
  {
    releaseId: 'REL-2024-001',
    releaseDate: '2024-01-15',
    name: 'Q1 Feature Release',
    version: '1.2.0',
    snowNumber: 'CHG0012345',
    fixVersion: '1.2.0-fix1',
    isMerchantImpacting: true,
    status: 'Completed'
  },
  {
    releaseId: 'REL-2024-002',
    releaseDate: '2024-01-28',
    name: 'Security Patch Release',
    version: '1.2.1',
    snowNumber: 'CHG0012346',
    fixVersion: '1.2.1-fix1',
    isMerchantImpacting: false,
    status: 'Completed'
  },
  {
    releaseId: 'REL-2024-003',
    releaseDate: '2024-02-10',
    name: 'Mobile App Update',
    version: '2.0.0',
    snowNumber: 'CHG0012347',
    fixVersion: '2.0.0-fix1',
    isMerchantImpacting: true,
    status: 'In Progress'
  },
  {
    releaseId: 'REL-2024-004',
    releaseDate: '2024-02-25',
    name: 'API Enhancement Release',
    version: '1.3.0',
    snowNumber: 'CHG0012348',
    fixVersion: '1.3.0-fix1',
    isMerchantImpacting: false,
    status: 'Scheduled'
  },
  {
    releaseId: 'REL-2024-005',
    releaseDate: '2024-03-05',
    name: 'Database Migration',
    version: '1.3.1',
    snowNumber: 'CHG0012349',
    fixVersion: '1.3.1-fix1',
    isMerchantImpacting: true,
    status: 'Completed'
  },
  {
    releaseId: 'REL-2024-006',
    releaseDate: '2024-03-20',
    name: 'Performance Optimization',
    version: '1.4.0',
    snowNumber: 'CHG0012350',
    fixVersion: '1.4.0-fix1',
    isMerchantImpacting: false,
    status: 'Failed'
  },
  {
    releaseId: 'REL-2024-007',
    releaseDate: '2024-04-12',
    name: 'UI/UX Improvements',
    version: '1.5.0',
    snowNumber: 'CHG0012351',
    fixVersion: '1.5.0-fix1',
    isMerchantImpacting: true,
    status: 'Scheduled'
  },
  {
    releaseId: 'REL-2024-008',
    releaseDate: '2024-05-18',
    name: 'Integration Updates',
    version: '1.6.0',
    snowNumber: 'CHG0012352',
    fixVersion: '1.6.0-fix1',
    isMerchantImpacting: false,
    status: 'In Progress'
  },
  {
    releaseId: 'REL-2024-009',
    releaseDate: '2024-06-10',
    name: 'Summer Release',
    version: '2.1.0',
    snowNumber: 'CHG0012353',
    fixVersion: '2.1.0-fix1',
    isMerchantImpacting: true,
    status: 'Completed'
  }
];