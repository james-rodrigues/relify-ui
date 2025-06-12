// src/components/Layout.tsx

import React from 'react';
import { Container, Typography, Box, AppBar, Toolbar } from '@mui/material';
import { LayoutProps } from '../types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Release Automation
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            align="center" 
            color="primary.main"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Release Management Dashboard
          </Typography>
          <Typography 
            variant="subtitle1" 
            align="center" 
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Track and manage software releases efficiently
          </Typography>
        </Box>
        
        {children}
      </Container>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
          py: 3,
          mt: 'auto'
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 Release Automation System. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;