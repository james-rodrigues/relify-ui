// src/components/ReleaseTable.tsx

import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { CheckCircle, Schedule, Error, Cancel, HourglassEmpty } from '@mui/icons-material';
import { ReleaseTableProps } from '../types';
import { formatDate, getMonthName } from '../utils/helpers';

const ReleaseTable: React.FC<ReleaseTableProps> = ({
  releases,
  selectedMonth,
  selectedYear,
  isLoading = false
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle fontSize="small" />;
      case 'In Progress':
        return <HourglassEmpty fontSize="small" />;
      case 'Scheduled':
        return <Schedule fontSize="small" />;
      case 'Failed':
        return <Error fontSize="small" />;
      case 'Cancelled':
        return <Cancel fontSize="small" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'Scheduled':
        return 'info';
      case 'Failed':
        return 'error';
      case 'Cancelled':
        return 'default';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading release data...
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          Release Details - {getMonthName(selectedMonth)} {selectedYear}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
          {releases.length} release{releases.length !== 1 ? 's' : ''} found
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3 }}>
        {releases.length > 0 ? (
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Release ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Release Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Version
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    SNOW Number
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Fix Version
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Merchant Impact
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {releases.map((release, index) => (
                  <TableRow 
                    key={release.releaseId}
                    sx={{ 
                      '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                      '&:hover': { bgcolor: 'action.selected' },
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {release.releaseId}
                    </TableCell>
                    <TableCell>{formatDate(release.releaseDate)}</TableCell>
                    <TableCell sx={{ maxWidth: 200 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {release.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={release.version} 
                        size="small" 
                        variant="outlined"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace' }}>
                      {release.snowNumber}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                      {release.fixVersion}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={release.isMerchantImpacting ? 'Yes' : 'No'}
                        color={release.isMerchantImpacting ? 'error' : 'success'}
                        size="small"
                        variant="filled"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(release.status)}
                        label={release.status}
                        color={getStatusColor(release.status)}
                        size="small"
                        variant="filled"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert 
            severity="info" 
            sx={{ 
              borderRadius: 2,
              '& .MuiAlert-message': {
                fontSize: '1rem'
              }
            }}
          >
            <Typography variant="h6" gutterBottom>
              No releases found
            </Typography>
            <Typography variant="body2">
              No releases were found for {getMonthName(selectedMonth)} {selectedYear}. 
              Try selecting a different month or year.
            </Typography>
          </Alert>
        )}
      </Box>
    </Paper>
  );
};

export default ReleaseTable;