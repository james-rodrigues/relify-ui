interface ActivityTemplate {
  id: string;
  activityName: string;
  daysOffset: number; // Days from the base date (June 4th for Monthly releases)
  assignee: string;
  status: 'completed' | 'pending' | 'overdue';
}

interface ActivityTimelineItem {
  id: string;
  activityName: string;
  activityDueDate: string;
  status: 'completed' | 'pending' | 'overdue';
  assignee: string;
}

// Activity templates with day offsets from the base date (June 4th)
const ACTIVITY_TEMPLATES: ActivityTemplate[] = [
  {
    id: '1',
    activityName: 'Scope Update Request',
    daysOffset: 0, // June 4th (base date)
    assignee: 'Product Team',
    status: 'completed'
  },
  {
    id: '2',
    activityName: 'Scope Updates Locked',
    daysOffset: 14, // +14 days from June 4th
    assignee: 'Release Manager',
    status: 'completed'
  },
  {
    id: '3',
    activityName: 'Scope Review Call',
    daysOffset: 15, // +1 day from previous
    assignee: 'Stakeholders',
    status: 'completed'
  },
  {
    id: '4',
    activityName: 'UAT Deploy - Branches Cut',
    daysOffset: 16, // +1 day from previous
    assignee: 'DevOps Team',
    status: 'completed'
  },
  {
    id: '5',
    activityName: 'UAT Healthcheck',
    daysOffset: 22, // +6 days from previous
    assignee: 'QA Team',
    status: 'completed'
  },
  {
    id: '6',
    activityName: 'Perf Ops Healthcheck',
    daysOffset: 23, // +1 day from previous
    assignee: 'Performance Team',
    status: 'completed'
  },
  {
    id: '7',
    activityName: 'Impl Plan Review',
    daysOffset: 30, // +7 days from previous
    assignee: 'Tech Leads',
    status: 'pending'
  },
  {
    id: '8',
    activityName: 'Go/No-Go Decision',
    daysOffset: 31, // +1 day from previous
    assignee: 'Release Committee',
    status: 'pending'
  },
  {
    id: '9',
    activityName: 'CR Evidence & Submit',
    daysOffset: 32, // +1 day from previous
    assignee: 'Compliance Team',
    status: 'pending'
  },
  {
    id: '10',
    activityName: 'Deployment Week',
    daysOffset: 35, // +3 days from previous (start of deployment week)
    assignee: 'DevOps Team',
    status: 'pending'
  },
  {
    id: '11',
    activityName: 'Release Retro',
    daysOffset: 47, // +12 days from deployment start
    assignee: 'All Teams',
    status: 'pending'
  }
];

/**
 * Generates activity timeline based on release date and type
 * @param releaseDate - The target release date (e.g., "2025-07-31" for July Monthly)
 * @param releaseType - Type of release ('monthly' or 'offcycle')
 * @returns Array of activity timeline items with calculated dates
 */
export const generateActivityTimeline = (
  releaseDate: string,
  releaseType: 'monthly' | 'offcycle'
): ActivityTimelineItem[] => {
  const targetDate = new Date(releaseDate);
  
  // For monthly releases, Scope Update Request starts on June 4th
  // For off-cycle releases, we can adjust the base date as needed
  let baseDate: Date;
  
  if (releaseType === 'monthly') {
    // For July 2025 Monthly, base date is June 4, 2025
    baseDate = new Date(targetDate.getFullYear(), 5, 4); // Month is 0-indexed, so 5 = June
  } else {
    // For off-cycle releases, we can start the activities earlier
    baseDate = new Date(targetDate);
    baseDate.setDate(baseDate.getDate() - 57); // Start 57 days before release
  }

  return ACTIVITY_TEMPLATES.map(template => {
    const activityDate = new Date(baseDate);
    activityDate.setDate(baseDate.getDate() + template.daysOffset);
    
    // Determine status based on current date
    const currentDate = new Date();
    let status = template.status;
    
    if (activityDate < currentDate) {
      status = 'completed';
    } else if (activityDate.getTime() === currentDate.getTime()) {
      status = 'pending';
    } else {
      // Check if activity is overdue (past due date but not completed)
      const daysDiff = Math.floor((currentDate.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff > 0 && template.status === 'pending') {
        status = 'overdue';
      }
    }

    return {
      id: template.id,
      activityName: template.activityName,
      activityDueDate: activityDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
      status,
      assignee: template.assignee
    };
  });
};

/**
 * Gets the activity timeline for a specific release
 * This function can be used to replace the static mock data
 */
export const getActivityTimelineForRelease = (
  releaseName: string,
  releaseDate: string,
  releaseType: 'monthly' | 'offcycle'
): ActivityTimelineItem[] => {
  return generateActivityTimeline(releaseDate, releaseType);
};
