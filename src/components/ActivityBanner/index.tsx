import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import { Schedule as ScheduleIcon, ChevronLeft as PrevIcon, ChevronRight as NextIcon } from '@mui/icons-material';
import { getOverviewData } from '../../utils/mockDataLoader';
import './styles.scss';

interface Activity {
  id: string;
  activityName: string;
  activityDueDate: string;
  status: 'completed' | 'pending' | 'overdue';
  assignee: string;
  releaseName?: string;
}

interface ActivityBannerProps {
  currentReleases?: Array<{
    id: string;
    title: string;
    date: string;
    type: 'monthly' | 'offcycle';
  }>;
  onActivityClick?: (releaseName: string, releaseDate: string, releaseType: 'monthly' | 'offcycle') => void;
}

const ActivityBanner: React.FC<ActivityBannerProps> = ({ currentReleases = [], onActivityClick }) => {
  const [upcomingActivities, setUpcomingActivities] = useState<Activity[]>([]);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

  useEffect(() => {
    // Get activities from all current releases
    const allActivities: Activity[] = [];
    const currentDate = new Date();

    // For now, we'll use the mock overview data
    // In a real app, you'd fetch activities for each current release
    const overviewData = getOverviewData();
    
    // Additional activity types for variety
    const additionalActivities = [
      { name: 'Code Freeze', daysFromNow: 3, status: 'pending' as const },
      { name: 'Security Review', daysFromNow: 5, status: 'pending' as const },
      { name: 'Performance Testing', daysFromNow: 7, status: 'pending' as const },
      { name: 'Documentation Update', daysFromNow: 2, status: 'pending' as const },
      { name: 'Stakeholder Review', daysFromNow: 4, status: 'pending' as const },
      { name: 'Final Testing', daysFromNow: 6, status: 'pending' as const },
      { name: 'Release Approval', daysFromNow: 8, status: 'pending' as const },
    ];
    
    // Simulate multiple releases by creating variations of activities
    currentReleases.forEach((release, releaseIndex) => {
      // Get base activities from overview data
      const baseActivities = overviewData.activityTimeline
        .filter(activity => {
          const activityDate = new Date(activity.activityDueDate);
          return activityDate >= currentDate && activity.status !== 'completed';
        })
        .slice(0, 3); // Limit to 3 base activities per release

      // Add base activities with varied dates
      baseActivities.forEach((activity, actIndex) => {
        const dayOffset = (releaseIndex * 2) + actIndex;
        const newDate = new Date(currentDate.getTime() + (dayOffset * 86400000));
        
        allActivities.push({
          ...activity,
          releaseName: release.title,
          id: `${release.id}-${activity.id}`,
          activityDueDate: newDate.toISOString().split('T')[0]
        });
      });

      // Add some additional varied activities for each release
      const releaseSpecificActivities = additionalActivities.slice(releaseIndex * 2, (releaseIndex * 2) + 2);
      releaseSpecificActivities.forEach((addActivity, actIndex) => {
        const activityDate = new Date(currentDate.getTime() + (addActivity.daysFromNow + releaseIndex) * 86400000);
        
        allActivities.push({
          id: `${release.id}-extra-${actIndex}`,
          activityName: addActivity.name,
          activityDueDate: activityDate.toISOString().split('T')[0],
          status: addActivity.status,
          assignee: 'Team Lead',
          releaseName: release.title
        });
      });
    });

    // If no current releases provided, use default activities
    if (currentReleases.length === 0) {
      const defaultActivities = overviewData.activityTimeline
        .filter(activity => {
          const activityDate = new Date(activity.activityDueDate);
          return activityDate >= currentDate && activity.status !== 'completed';
        })
        .slice(0, 5)
        .map(activity => ({
          ...activity,
          releaseName: 'Summer Release 2024'
        }));

      allActivities.push(...defaultActivities);
    }

    // Sort by date (closest to current date first)
    allActivities.sort((a, b) => new Date(a.activityDueDate).getTime() - new Date(b.activityDueDate).getTime());
    
    // Always show closest activities from current releases first
    setUpcomingActivities(allActivities);
  }, [currentReleases]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleActivityClick = (activity: Activity) => {
    if (onActivityClick && activity.releaseName) {
      // Find the corresponding release to get its date and type
      const release = currentReleases.find(r => r.title === activity.releaseName);
      if (release) {
        onActivityClick(release.title, release.date, release.type);
      } else {
        // Fallback for default release
        onActivityClick(activity.releaseName, '2024-08-15', 'monthly');
      }
    }
  };

  const getDaysUntilDue = (dateString: string): number => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handlePrevActivity = () => {
    setCurrentActivityIndex((prev) => {
      if (prev === 0) {
        return upcomingActivities.length - 1;
      }
      return prev - 1;
    });
  };

  const handleNextActivity = () => {
    setCurrentActivityIndex((prev) => {
      if (prev === upcomingActivities.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  // Reset current index when activities change
  useEffect(() => {
    setCurrentActivityIndex(0);
  }, [upcomingActivities]);

  if (upcomingActivities.length === 0) {
    return null;
  }

  const currentActivity = upcomingActivities[currentActivityIndex];
  const daysUntilDue = getDaysUntilDue(currentActivity.activityDueDate);
  const daysText = daysUntilDue === 0 ? 'today' : daysUntilDue === 1 ? 'tomorrow' : `in ${daysUntilDue} days`;

  return (
    <Box className="activity-banner">
      <Box className="banner-content">
        <IconButton 
          className="nav-button prev-button"
          onClick={handlePrevActivity}
          disabled={upcomingActivities.length <= 1}
          sx={{ 
            color: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <PrevIcon />
        </IconButton>
        
        <Box 
          className="activity-message"
          onClick={() => handleActivityClick(currentActivity)}
          sx={{ 
            cursor: onActivityClick ? 'pointer' : 'default',
            flex: 1,
            textAlign: 'center',
            '&:hover': {
              opacity: onActivityClick ? 0.8 : 1
            }
          }}
        >
          <Typography variant="body1" className="activity-text">
            <strong>{currentActivity.activityName}</strong> is due {daysText} for <strong>{currentActivity.releaseName} Release</strong>
          </Typography>
        </Box>
        
        <IconButton 
          className="nav-button next-button"
          onClick={handleNextActivity}
          disabled={upcomingActivities.length <= 1}
          sx={{ 
            color: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <NextIcon />
        </IconButton>
      </Box>
      
      {upcomingActivities.length > 1 && (
        <Box className="activity-indicators">
          {upcomingActivities.map((_, index) => (
            <Box
              key={index}
              className={`indicator ${index === currentActivityIndex ? 'active' : ''}`}
              onClick={() => setCurrentActivityIndex(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: index === currentActivityIndex 
                  ? 'rgba(255, 255, 255, 0.9)' 
                  : 'rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
                margin: '0 4px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.7)'
                }
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ActivityBanner;
