import { 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  Container,
  Box
} from '@mui/material'
import { useState } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import Releases from './components/Releases'
import ReleaseDetailView from './components/ReleaseDetailView'
import './App.scss'
import './components/NoAnimations.scss'

// Create a professional theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50', // Dark blue-grey
      light: '#34495e',
      dark: '#1a252f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3498db', // Professional blue
      light: '#5dade2',
      dark: '#2980b9',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#5a6c7d',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Inter", "Segoe UI", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #e9ecef',
          transition: 'none !important',
          transform: 'none !important',
          '&:hover': {
            transform: 'none !important',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          transition: 'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease !important',
          transform: 'none !important',
          '&:hover': {
            transform: 'none !important',
          },
          // Disable ripple effect
          '& .MuiTouchRipple-root': {
            display: 'none',
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          transition: 'none !important',
          transform: 'none !important',
          '&:hover': {
            transform: 'none !important',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          transition: 'none !important',
          transform: 'none !important',
          '&:hover': {
            transform: 'none !important',
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          transition: 'none !important',
          transform: 'none !important',
          '&:hover': {
            transform: 'none !important',
          },
        },
      },
    },
  },
})

interface SelectedRelease {
  name: string
  date: string
  type: 'monthly' | 'offcycle'
}

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'detail'>('dashboard')
  const [selectedRelease, setSelectedRelease] = useState<SelectedRelease | null>(null)

  const handleReleaseClick = (name: string, date: string, type: 'monthly' | 'offcycle') => {
    setSelectedRelease({ name, date, type })
    setCurrentView('detail')
  }

  const handleBackToDashboard = () => {
    setCurrentView('dashboard')
    setSelectedRelease(null)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {currentView === 'dashboard' ? (
        <Box className="app-container">
          <Header />
          <HeroSection />
          <Container maxWidth="lg" className="main-content">
            <Releases onReleaseClick={handleReleaseClick} />
          </Container>
        </Box>
      ) : (
        selectedRelease && (
          <ReleaseDetailView
            releaseName={selectedRelease.name}
            releaseDate={selectedRelease.date}
            releaseType={selectedRelease.type}
            onBack={handleBackToDashboard}
          />
        )
      )}
    </ThemeProvider>
  )
}

export default App
