import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Card,
  CardContent,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" className="mui-app-bar">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Relify UI - React 19 + Vite + MUI + SCSS
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" className="mui-container">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <div className="logo-container">
            <img src={viteLogo} alt="Vite logo" className="logo" />
            <img src={reactLogo} alt="React logo" className="logo react" />
          </div>
          <Typography variant="h3" component="h1" gutterBottom>
            Vite + React 19 + MUI + SCSS
          </Typography>
        </Box>

        <Card sx={{ mb: 4 }} className="mui-card">
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Counter Example with SCSS Styling
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => setCount((count) => count + 1)}
              sx={{ mb: 2 }}
            >
              Count is {count}
            </Button>
            <Typography variant="body1" color="text.secondary">
              Edit <code>src/App.tsx</code> and <code>src/App.scss</code> to customize styling
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Click on the Vite and React logos to learn more
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
