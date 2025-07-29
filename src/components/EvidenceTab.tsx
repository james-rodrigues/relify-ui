import React from 'react';
import Typography from '@mui/material/Typography';

interface EvidenceTabProps {
  releaseName: string;
}

const EvidenceTab: React.FC<EvidenceTabProps> = ({
  releaseName,
}) => {
  return (
    <div className="evidence-content">
      <Typography variant="h5" className="section-title">
        Post Implementation Evidences
      </Typography>
      <Typography variant="body1" className="section-description">
        Post-deployment verification and evidence for {releaseName}.
      </Typography>
      <Typography variant="body2">
        This section contains screenshots, logs, test results, 
        and other evidence confirming successful deployment and operation.
      </Typography>
    </div>
  );
};

export default EvidenceTab;
