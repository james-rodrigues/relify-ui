import React from 'react';
import Typography from '@mui/material/Typography';

interface ImplementationPlanTabProps {
  releaseName: string;
  releaseDate: string;
}

const ImplementationPlanTab: React.FC<ImplementationPlanTabProps> = ({
  releaseName,
  releaseDate,
}) => {
  return (
    <div className="implementation-content">
      <Typography variant="h5" className="section-title">
        Implementation Plan
      </Typography>
      <Typography variant="body1" className="section-description">
        Step-by-step implementation plan for {releaseName}.
      </Typography>
      <Typography variant="body2">
        This section contains the detailed implementation timeline, 
        deployment steps, rollback procedures, and technical specifications.
      </Typography>
    </div>
  );
};

export default ImplementationPlanTab;

