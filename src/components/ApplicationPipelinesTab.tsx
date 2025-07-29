import React from 'react';
import Typography from '@mui/material/Typography';

interface ApplicationPipelinesTabProps {
  releaseName: string;
}

const ApplicationPipelinesTab: React.FC<ApplicationPipelinesTabProps> = ({
  releaseName,
}) => {
  return (
    <div className="pipelines-content">
      <Typography variant="h5" className="section-title">
        Application Pipelines
      </Typography>
      <Typography variant="body1" className="section-description">
        CI/CD pipeline status and deployment information for {releaseName}.
      </Typography>
      <Typography variant="body2">
        This section displays the current status of build pipelines, 
        deployment stages, and automated testing results.
      </Typography>
    </div>
  );
};

export default ApplicationPipelinesTab;
