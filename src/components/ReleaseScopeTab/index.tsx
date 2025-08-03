import React from 'react';
import { Typography, Box } from '@mui/material';

interface ReleaseScopeTabProps {
  releaseName: string;
}

const ReleaseScopeTab: React.FC<ReleaseScopeTabProps> = ({ releaseName }) => {
  return (
    <Box>
      <Typography variant="h6">
        Release Scope for {releaseName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        This component is under development.
      </Typography>
    </Box>
  );
};

export default ReleaseScopeTab;
