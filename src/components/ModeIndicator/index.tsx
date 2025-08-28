import { Box, Chip, Tooltip, Typography } from '@mui/material'
import { 
  CloudQueue as CloudIcon, 
  Computer as LocalIcon, 
  BugReport as MockIcon,
  CheckCircle as HealthyIcon,
  Error as ErrorIcon
} from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { apiService } from '../../services/api'

interface ModeIndicatorProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  showHealthStatus?: boolean
}

const ModeIndicator = ({ 
  position = 'bottom-right', 
  showHealthStatus = true 
}: ModeIndicatorProps) => {
  const [mode, setMode] = useState<'mock' | 'local' | 'aws'>('mock')
  const [baseUrl, setBaseUrl] = useState<string>('')
  const [healthStatus, setHealthStatus] = useState<'healthy' | 'error' | 'checking'>('checking')

  useEffect(() => {
    const currentMode = apiService.getMode()
    const currentBaseUrl = apiService.getBaseUrl()
    setMode(currentMode)
    setBaseUrl(currentBaseUrl)
    
    if (showHealthStatus) {
      checkHealth()
    }
  }, [showHealthStatus])

  const checkHealth = async () => {
    setHealthStatus('checking')
    try {
      const response = await apiService.healthCheck()
      setHealthStatus(response.success ? 'healthy' : 'error')
    } catch (error) {
      setHealthStatus('error')
    }
  }

  const getModeConfig = () => {
    switch (mode) {
      case 'mock':
        return {
          icon: <MockIcon />,
          label: 'Mock Mode',
          color: '#ff9800' as const,
          description: 'Using mock data for development'
        }
      case 'local':
        return {
          icon: <LocalIcon />,
          label: 'Local Mode',
          color: '#2196f3' as const,
          description: 'Connected to local development server'
        }
      case 'aws':
        return {
          icon: <CloudIcon />,
          label: 'AWS Mode',
          color: '#4caf50' as const,
          description: 'Connected to AWS production environment'
        }
    }
  }

  const getPositionStyles = () => {
    const baseStyles = {
      position: 'fixed' as const,
      zIndex: 1300,
      display: 'flex',
      alignItems: 'center',
      gap: 1,
    }

    switch (position) {
      case 'top-right':
        return { ...baseStyles, top: 20, right: 20 }
      case 'top-left':
        return { ...baseStyles, top: 20, left: 20 }
      case 'bottom-right':
        return { ...baseStyles, bottom: 20, right: 20 }
      case 'bottom-left':
        return { ...baseStyles, bottom: 20, left: 20 }
    }
  }

  const getHealthIcon = () => {
    switch (healthStatus) {
      case 'healthy':
        return <HealthyIcon sx={{ fontSize: 16, color: '#4caf50' }} />
      case 'error':
        return <ErrorIcon sx={{ fontSize: 16, color: '#f44336' }} />
      default:
        return null
    }
  }

  const config = getModeConfig()

  return (
    <Box sx={getPositionStyles()}>
      <Tooltip 
        title={
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              {config.label}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
              {config.description}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', fontFamily: 'monospace' }}>
              {baseUrl}
            </Typography>
            {showHealthStatus && (
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                Status: {healthStatus === 'checking' ? 'Checking...' : 
                         healthStatus === 'healthy' ? 'Healthy' : 'Error'}
              </Typography>
            )}
          </Box>
        }
        placement="left"
      >
        <Chip
          icon={config.icon}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <span>{config.label.replace(' Mode', '')}</span>
              {showHealthStatus && getHealthIcon()}
            </Box>
          }
          onClick={showHealthStatus ? checkHealth : undefined}
          sx={{
            backgroundColor: config.color,
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.75rem',
            cursor: showHealthStatus ? 'pointer' : 'default',
            '&:hover': showHealthStatus ? {
              backgroundColor: config.color,
              opacity: 0.8,
            } : {},
            '& .MuiSvgIcon-root': {
              color: 'white'
            }
          }}
          size="small"
        />
      </Tooltip>
    </Box>
  )
}

export default ModeIndicator
