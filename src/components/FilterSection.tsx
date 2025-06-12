// src/components/FilterSection.tsx

import React from 'react';
import {
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  SelectChangeEvent
} from '@mui/material';
import { Search, Refresh } from '@mui/icons-material';
import { FilterSectionProps } from '../types';
import { MONTHS, generateYears } from '../utils/helpers';

const FilterSection: React.FC<FilterSectionProps> = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  onSubmit,
  onReset,
  isLoading = false
}) => {
  const years = generateYears();

  const handleMonthChange = (event: SelectChangeEvent<number | ''>) => {
    const value = event.target.value;
    onMonthChange(value === '' ? '' : Number(value));
  };

  const handleYearChange = (event: SelectChangeEvent<number | ''>) => {
    const value = event.target.value;
    onYearChange(value === '' ? '' : Number(value));
  };

  const isSubmitDisabled = !selectedMonth || !selectedYear || isLoading;

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: 2,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}
    >
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom 
        sx={{ 
          fontWeight: 600, 
          color: 'primary.main',
          mb: 3
        }}
      >
        Filter Releases
      </Typography>
      
      <Grid container spacing={3} alignItems="center">
        {/* Month Selector */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="month-select-label">Month</InputLabel>
            <Select
              labelId="month-select-label"
              value={selectedMonth}
              label="Month"
              onChange={handleMonthChange}
              disabled={isLoading}
            >
              <MenuItem value="">
                <em>Select Month</em>
              </MenuItem>
              {MONTHS.map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Year Selector */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              value={selectedYear}
              label="Year"
              onChange={handleYearChange}
              disabled={isLoading}
            >
              <MenuItem value="">
                <em>Select Year</em>
              </MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Search />}
              onClick={onSubmit}
              disabled={isSubmitDisabled}
              sx={{ 
                minWidth: 140,
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<Refresh />}
              onClick={onReset}
              disabled={isLoading}
              sx={{ 
                minWidth: 120,
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              Reset
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Helper Text */}
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ mt: 2 }}
      >
        Select a month and year to view the corresponding release details
      </Typography>
    </Paper>
  );
};

export default FilterSection;