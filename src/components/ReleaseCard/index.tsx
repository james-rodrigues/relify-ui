import { Card, CardContent, Typography, Chip, Box, LinearProgress, Link } from '@mui/material'
import { 
  Schedule as ScheduleIcon, 
  CheckCircle as CheckCircleIcon,
  PlayArrow as PlayIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material'
import './styles.scss'

interface ReleaseCardProps {
  title: string
  type: 'monthly' | 'offcycle'
  status: 'planned' | 'completed'
  progress?: number
  date?: string
  releaseId?: string
  fixVersion?: string
  description?: string
  onTitleClick?: () => void
}

const ReleaseCard = ({ title, type, status, progress = 0, date, releaseId, fixVersion, description, onTitleClick }: ReleaseCardProps) => {
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
            className={`title-link ${status}-${type}`}
          >
            {title}
          </Link>
          
          <Chip
            icon={getStatusIcon()}
            label={status === 'planned' ? 'Planned' : 'Completed'}
            size="small"
            className={`status-chip status-chip--${status}${status === 'planned' ? `-${type}` : ''}`}
          />
        </Box>

        <Box className="type-section">
          <Chip
            label={type === 'monthly' ? '📅 Monthly' : '⚡ Off-cycle'}
            size="small"
            variant="outlined"
            className={`type-chip type-chip--${status}${status === 'planned' ? `-${type}` : ''}`}
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

        <Box className="info-section">
          {releaseId && (
            <Typography variant="caption" color="text.secondary" className="info-item">
              <strong>Release ID:</strong> {releaseId.replace(/\D/g, '') || releaseId}
            </Typography>
          )}
          {fixVersion && (
            <Typography variant="caption" color="text.secondary" className="info-item">
              <strong>Fix Version:</strong> {fixVersion}
            </Typography>
          )}
        </Box>

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
              className={`progress-bar progress-bar--${status}${status === 'planned' ? `-${type}` : ''}`}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default ReleaseCard
