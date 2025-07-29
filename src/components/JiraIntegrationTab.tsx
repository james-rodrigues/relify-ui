import React from 'react';
import Typography from '@mui/material/Typography';

interface JiraIntegrationTabProps {
  releaseName: string;
}

const JiraIntegrationTab: React.FC<JiraIntegrationTabProps> = ({
  releaseName,
}) => {
  return (
    <div className="jira-content">
      <Typography variant="h5" className="section-title">
        Jira Integration
      </Typography>
      <Typography variant="body1" className="section-description">
        Jira tickets and project tracking for {releaseName}.
      </Typography>
      <Typography variant="body2">
        This section would show linked Jira tickets, project progress, 
        and issue tracking information related to this release.
      </Typography>
    </div>
  );
};

export default JiraIntegrationTab;
