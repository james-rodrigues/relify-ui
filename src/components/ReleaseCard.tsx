import { Card, CardContent, Typography, Chip, Box, LinearProgress } from '@mui/material'
import { 
  Schedule as ScheduleIcon, 
  CheckCircle as CheckCircleIcon,
  PlayArrow as PlayIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material'

interface ReleaseCardProps {
  title: string
  type: 'monthly' | 'offcycle'
  status: 'planned' | 'completed'
  progress?: number
  date?: string
  description?: string
}

const ReleaseCard = ({ title, type, status, progress = 0, date, description }: ReleaseCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'planned':
        return type === 'monthly' ? '#667eea' : '#764ba2'
      case 'completed':
        return '#4caf50'
      default:
        return '#666'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'planned':
        return <ScheduleIcon sx={{ fontSize: '1.2rem' }} />
      case 'completed':
        return <CheckCircleIcon sx={{ fontSize: '1.2rem' }} />
      default:
        return <PlayIcon sx={{ fontSize: '1.2rem' }} />
    }
  }

  return (
    <Card 
      sx={{ 
        height: '320px', // Fixed height for consistent sizing
        minHeight: '320px',
        background: `linear-gradient(135deg, ${getStatusColor()}15 0%, ${getStatusColor()}08 100%)`,
        border: `2px solid ${getStatusColor()}30`,
        borderRadius: '16px',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 20px 40px ${getStatusColor()}30`,
          border: `2px solid ${getStatusColor()}60`,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${getStatusColor()}, ${getStatusColor()}80)`,
        }
      }}
    >
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              color: '#2c3e50',
              fontSize: '1.3rem'
            }}
          >
            {title}
          </Typography>
          
          <Chip
            icon={getStatusIcon()}
            label={status === 'planned' ? 'Planned' : 'Completed'}
            size="small"
            sx={{
              backgroundColor: getStatusColor(),
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
              '& .MuiChip-icon': {
                color: 'white'
              }
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Chip
            label={type === 'monthly' ? '📅 Monthly' : '⚡ Off-cycle'}
            size="small"
            variant="outlined"
            sx={{
              borderColor: getStatusColor(),
              color: getStatusColor(),
              fontWeight: 500,
              mb: 1
            }}
          />
        </Box>

        {date && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: '#666' }}>
            <CalendarIcon sx={{ fontSize: '1rem', mr: 1 }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {date}
            </Typography>
          </Box>
        )}

        {description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              flex: 1,
              lineHeight: 1.5
            }}
          >
            {description}
          </Typography>
        )}

        {status === 'planned' && progress > 0 && (
          <Box sx={{ mt: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Progress
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                {progress}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: `${getStatusColor()}20`,
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${getStatusColor()}, ${getStatusColor()}80)`,
                  borderRadius: 3,
                }
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default ReleaseCard
