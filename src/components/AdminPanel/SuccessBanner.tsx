import { Alert, Slide, Box } from '@mui/material'
import { CheckCircle as CheckIcon } from '@mui/icons-material'
import { useEffect, useState } from 'react'

interface SuccessBannerProps {
  open: boolean
  message: string
  onClose: () => void
  autoHideDuration?: number
}

const SuccessBanner = ({ 
  open, 
  message, 
  onClose, 
  autoHideDuration = 3000 
}: SuccessBannerProps) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (open) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
        setTimeout(onClose, 300) // Wait for slide out animation
      }, autoHideDuration)

      return () => clearTimeout(timer)
    } else {
      setShow(false)
    }
  }, [open, autoHideDuration, onClose, message])

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 100, // Below the sticky header
        right: 24,
        zIndex: 1400,
        minWidth: 320,
        maxWidth: 400
      }}
    >
      <Slide direction="left" in={show} mountOnEnter unmountOnExit>
        <Alert
          icon={<CheckIcon />}
          severity="success"
          onClose={() => {
            setShow(false)
            setTimeout(onClose, 300)
          }}
          sx={{
            background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(46, 204, 113, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            '& .MuiAlert-icon': {
              color: 'white'
            },
            '& .MuiAlert-action': {
              color: 'white',
              '& .MuiIconButton-root': {
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }
            },
            '& .MuiAlert-message': {
              fontWeight: 500,
              fontSize: '0.95rem'
            }
          }}
        >
          {message}
        </Alert>
      </Slide>
    </Box>
  )
}

export default SuccessBanner
