import { Card, CardContent, Typography, Chip, Box, LinearProgress, Link } from '@mui/material'
import { 
  Schedule as ScheduleIcon, 
  CheckCircle as CheckCircleIcon,
  PlayArrow as PlayIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material'
import './ReleaseCard.scss'

interface ReleaseCardProps {
  title: string
  type: 'monthly' | 'offcycle'
  status: 'planned' | 'completed'
  progress?: number
  date?: string
  description?: string
  onTitleClick?: () => void
}

const ReleaseCard = ({ title, type, status, progress = 0, date, description, onTitleClick }: ReleaseCardProps) => {
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
        return <ScheduleIcon className="status-icon" />
      case 'completed':
        return <CheckCircleIcon className="status-icon" />
      default:
        return <PlayIcon className="status-icon" />
    }
  }

  const getCardClassName = () => {
    const baseClass = 'release-card'
    if (status === 'completed') {
      return `${baseClass} release-card--completed`
    } else if (status === 'planned') {
      return type === 'monthly' 
        ? `${baseClass} release-card--planned-monthly`
        : `${baseClass} release-card--planned-offcycle`
    }
    return baseClass
  }

  return (
    <Card className={getCardClassName()}>
      <CardContent className="card-content">
        <Box className="header-section">
          <Link
            component="button"
            variant="h6"
            onClick={onTitleClick}
            className="title-link"
            style={{ color: onTitleClick ? undefined : '#2c3e50' }}
          >
            {title}
          </Link>
          
          <Chip
            icon={getStatusIcon()}
            label={status === 'planned' ? 'Planned' : 'Completed'}
            size="small"
            className="status-chip"
            style={{
              backgroundColor: getStatusColor(),
              color: 'white'
            }}
          />
        </Box>

        <Box className="type-section">
          <Chip
            label={type === 'monthly' ? '📅 Monthly' : '⚡ Off-cycle'}
            size="small"
            variant="outlined"
            className="type-chip"
            style={{
              borderColor: getStatusColor(),
              color: getStatusColor()
            }}
          />
        </Box>

        {date && (
          <Box className="date-section">
            <CalendarIcon className="date-icon" />
            <Typography variant="body2" className="date-text">
              {date}
            </Typography>
          </Box>
        )}

        {description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            className="description-section"
          >
            {description}
          </Typography>
        )}

        {status === 'planned' && progress > 0 && (
          <Box className="progress-section">
            <Box className="progress-header">
              <Typography variant="body2" color="text.secondary" className="progress-label">
                Progress
              </Typography>
              <Typography variant="body2" color="text.secondary" className="progress-value">
                {progress}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              className="progress-bar"
              style={{
                backgroundColor: `${getStatusColor()}20`
              }}
              sx={{
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${getStatusColor()}, ${getStatusColor()}80)`
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
