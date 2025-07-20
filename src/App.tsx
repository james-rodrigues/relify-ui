import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Paper,
  Grid,
  Button,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { 
  RocketLaunch as RocketIcon,
  AutoFixHigh as AutoIcon,
  Timeline as TimelineIcon,
  Speed as SpeedIcon 
} from '@mui/icons-material'
import './App.scss'

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
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" className="mui-app-bar" elevation={0} sx={{ position: 'sticky', top: 0 }}>
        <Toolbar sx={{ py: 1 }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 700,
              fontSize: '1.5rem',
              color: 'primary.main',
              letterSpacing: '-0.02em'
            }}
          >
            Relify
          </Typography>
          <Button 
            variant="outlined" 
            sx={{ mr: 1 }}
          >
            Login
          </Button>
          <Button 
            variant="contained"
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        {/* Hero Section */}
      <Box className="hero-section" sx={{ 
        background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        color: 'white',
        py: 8,
        textAlign: 'center'
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Relify
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            "Streamline your software releases with intelligent automation"
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '600px', mx: 'auto', opacity: 0.8 }}>
            Eliminate the complexity of release management. Relify automates your entire release pipeline, 
            from code commits to production deployment, ensuring consistent and reliable software delivery.
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
          Why Choose Relify?
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ 
              p: 3, 
              textAlign: 'center', 
              height: '280px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <Box>
                <AutoIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Intelligent Automation
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Smart release pipelines that adapt to your workflow and eliminate manual errors.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ 
              p: 3, 
              textAlign: 'center', 
              height: '280px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <Box>
                <SpeedIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Lightning Fast
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Deploy releases 10x faster with optimized build and deployment processes.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ 
              p: 3, 
              textAlign: 'center', 
              height: '280px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <Box>
                <TimelineIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Complete Visibility
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Track every release with detailed analytics and real-time monitoring.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ 
              p: 3, 
              textAlign: 'center', 
              height: '280px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <Box>
                <RocketIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Zero Downtime
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Blue-green deployments and rollback capabilities ensure continuous availability.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ 
        bgcolor: 'primary.main', 
        color: 'primary.contrastText',
        py: 4,
        mt: 'auto'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="flex-start">
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Relify
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                Streamlining software releases with intelligent automation
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                © 2025 JP Morgan Chase & Co. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ 
              textAlign: { xs: 'left', md: 'right' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'flex-start', md: 'flex-end' }
            }}>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                <strong>Contact Support</strong>
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Email: One Disputes
              </Typography>
            </Grid>
          </Grid>
          
          <Box sx={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.2)', 
            mt: 3, 
            pt: 3,
            textAlign: 'center'
          }}>
            <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.875rem' }}>
              This application is proprietary to JP Morgan Chase & Co. Unauthorized access or distribution is prohibited.
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
