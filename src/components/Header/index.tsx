import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material'
import { Code as CodeIcon, Settings as SettingsIcon } from '@mui/icons-material'
import './styles.scss'

interface HeaderProps {
  onSettingsClick?: () => void
}

const Header = ({ onSettingsClick }: HeaderProps) => {
  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        position: 'sticky', 
        top: 0,
        background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <CodeIcon sx={{ mr: 1, fontSize: '2rem', color: 'white' }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 800,
              fontSize: '1.8rem',
              color: 'white',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Relify
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={onSettingsClick}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.05)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <SettingsIcon />
          </IconButton>
          <Button 
            variant="outlined" 
            sx={{ 
              mr: 2,
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              transition: 'none !important',
              transform: 'none !important',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'none !important'
              }
            }}
          >
            Login
          </Button>
        <Button 
          variant="contained"
          sx={{
            background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
            boxShadow: '0 4px 15px rgba(238, 90, 82, 0.4)',
            transition: 'none !important',
            transform: 'none !important',
            '&:hover': {
              background: 'linear-gradient(45deg, #ee5a52, #ff6b6b)',
              boxShadow: '0 6px 20px rgba(238, 90, 82, 0.6)',
              transform: 'none !important'
            }
          }}
        >
          Sign Up
        </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
