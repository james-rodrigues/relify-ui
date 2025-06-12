import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import FilterSection from './components/FilterSection';
import ReleaseTable from './components/ReleaseTable';
import { useReleaseData } from './hooks/useReleaseData';

// Create MUI light theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

const App: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number | ''>('');
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const [showTable, setShowTable] = useState<boolean>(false);

  const { releases, isLoading, error, fetchReleases, clearReleases } = useReleaseData();

  const handleSubmit = async (): Promise<void> => {
    if (selectedMonth && selectedYear) {
      await fetchReleases(selectedMonth, selectedYear);
      setShowTable(true);
    }
  };

  const handleReset = (): void => {
    setSelectedMonth('');
    setSelectedYear('');
    setShowTable(false);
    clearReleases();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <FilterSection
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
          onSubmit={handleSubmit}
          onReset={handleReset}
          isLoading={isLoading}
        />
        
        {showTable && (
          <ReleaseTable
            releases={releases}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            isLoading={isLoading}
          />
        )}

        {error && (
          <div style={{ marginTop: '16px' }}>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#ffebee', 
              borderRadius: '8px',
              border: '1px solid #f44336',
              color: '#c62828'
            }}>
              {error}
            </div>
          </div>
        )}
      </Layout>
    </ThemeProvider>
  );
};

export default App;// src/App.tsx