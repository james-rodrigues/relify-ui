import React, { useState } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
  Apps as AppsIcon,
  Code as CodeIcon,
  Build as BuildIcon,
  Security as SecurityIcon,
  Verified as VerifiedIcon,
  Info as InfoIcon,
  Link as LinkIcon,
  Storage as StorageIcon,
  CloudQueue as CloudIcon,
  Search as SearchIcon
} from '@mui/icons-material';
interface ApplicationEntry {
  id: string;
  applicationId: string;
  appName: string;
  appType: string;
  projectName: string;
  platform: string;
  repositoryLink: string;
  deploymentPlatform: string;
  preImplementationSteps: string;
  implementationSteps: string;
  postValidationSteps: string;
  backoutSteps: string;
  backoutValidationSteps: string;
}

interface ApplicationsAccordionProps {
  onAddEntry: (entry: ApplicationEntry) => void;
  onEditEntry: (entry: ApplicationEntry) => void;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  data?: ApplicationEntry[];
}

const ApplicationsAccordion: React.FC<ApplicationsAccordionProps> = ({
  onAddEntry,
  onEditEntry,
  searchTerm,
  onSearchChange,
  data = [],
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newEntry, setNewEntry] = useState({
    applicationId: '',
    appName: '',
    appType: '',
    projectName: '',
    platform: '',
    repositoryLink: '',
    deploymentPlatform: ''
  });
  const [editEntry, setEditEntry] = useState<ApplicationEntry | null>(null);

  const handleEntryChange = (field: keyof typeof newEntry, value: string) => {
    setNewEntry(prev => ({ ...prev, [field]: value }));
  };

  const handleAddEntry = () => {
    const defaultSteps = 'TBD - Please update implementation steps';
    const newApplicationEntry: ApplicationEntry = {
      id: Date.now().toString(),
      applicationId: newEntry.applicationId,
      appName: newEntry.appName,
      appType: newEntry.appType,
      projectName: newEntry.projectName,
      platform: newEntry.platform,
      repositoryLink: newEntry.repositoryLink,
      deploymentPlatform: newEntry.deploymentPlatform,
      preImplementationSteps: defaultSteps,
      implementationSteps: defaultSteps,
      postValidationSteps: defaultSteps,
      backoutSteps: defaultSteps,
      backoutValidationSteps: defaultSteps
    };
    
    onAddEntry(newApplicationEntry);
    setDialogOpen(false);
    setNewEntry({
      applicationId: '',
      appName: '',
      appType: '',
      projectName: '',
      platform: '',
      repositoryLink: '',
      deploymentPlatform: ''
    });
  };

  const handleEditEntry = (index: number) => {
    setEditingIndex(index);
    setEditEntry(data[index]);
    setEditDialogOpen(true);
  };

  const handleUpdateEntry = () => {
    if (editingIndex !== null && editEntry) {
      onEditEntry(editEntry);
      setEditDialogOpen(false);
      setEditingIndex(null);
      setEditEntry(null);
    }
  };

  const handleEditEntryChange = (field: keyof ApplicationEntry, value: string) => {
    if (editEntry) {
      setEditEntry(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  const getStepIcon = (stepType: string) => {
    switch (stepType) {
      case 'preImplementation':
        return <BuildIcon sx={{ color: '#6495ED', fontSize: '20px' }} />;
      case 'implementation':
        return <CodeIcon sx={{ color: '#4169E1', fontSize: '20px' }} />;
      case 'postValidation':
        return <VerifiedIcon sx={{ color: '#6495ED', fontSize: '20px' }} />;
      case 'backout':
        return <SecurityIcon sx={{ color: '#9370DB', fontSize: '20px' }} />;
      case 'backoutValidation':
        return <CheckCircleIcon sx={{ color: '#8A2BE2', fontSize: '20px' }} />;
      default:
        return <CheckCircleIcon sx={{ color: '#6495ED', fontSize: '20px' }} />;
    }
  };

  // Filter entries based on search term (data is already filtered in parent component)
  const filteredEntries = data

  const appTypeOptions = ['Backend Service', 'Web Application', 'Mobile App', 'Microservice', 'Data Visualization', 'API Service'];
  const platformOptions = ['AWS ECS', 'React/Node.js', 'React/Python', 'Java Spring Boot', 'Node.js', 'React Native', 'Kubernetes'];
  const deploymentPlatformOptions = ['AWS ECS Fargate', 'AWS S3/CloudFront', 'Kubernetes', 'AWS EKS', 'AWS Lambda', 'App Store/Google Play'];

  return (
    <div className="applications-content">
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        gap: 2
      }}>
        <TextField
          placeholder="Search by Application Name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ 
            minWidth: 300,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '&:hover fieldset': {
                borderColor: '#6495ED',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#6495ED',
              }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#6495ED', fontSize: '20px' }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{
            background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(100, 149, 237, 0.3)',
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(135deg, #4169E1 0%, #8A2BE2 100%)',
              boxShadow: '0 6px 12px rgba(100, 149, 237, 0.4)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Add Application
        </Button>
      </Box>

      {/* Add Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Add Application Entry</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth 
            margin="normal" 
            label="Application ID" 
            value={newEntry.applicationId} 
            onChange={e => handleEntryChange('applicationId', e.target.value)}
            placeholder="e.g., APP001"
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Application Name" 
            value={newEntry.appName} 
            onChange={e => handleEntryChange('appName', e.target.value)}
            placeholder="e.g., User Management API"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>App Type</InputLabel>
            <Select
              value={newEntry.appType}
              onChange={e => handleEntryChange('appType', e.target.value)}
              label="App Type"
            >
              {appTypeOptions.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField 
            fullWidth 
            margin="normal" 
            label="Project Name" 
            value={newEntry.projectName} 
            onChange={e => handleEntryChange('projectName', e.target.value)}
            placeholder="e.g., Identity Platform"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Platform</InputLabel>
            <Select
              value={newEntry.platform}
              onChange={e => handleEntryChange('platform', e.target.value)}
              label="Platform"
            >
              {platformOptions.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField 
            fullWidth 
            margin="normal" 
            label="Repository Link" 
            value={newEntry.repositoryLink} 
            onChange={e => handleEntryChange('repositoryLink', e.target.value)}
            placeholder="https://github.com/company/repo-name"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Deployment Platform</InputLabel>
            <Select
              value={newEntry.deploymentPlatform}
              onChange={e => handleEntryChange('deploymentPlatform', e.target.value)}
              label="Deployment Platform"
            >
              {deploymentPlatformOptions.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDialogOpen(false)}
            sx={{
              borderColor: '#ccc',
              color: '#666',
              textTransform: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#999',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAddEntry}
            disabled={!newEntry.applicationId.trim() || !newEntry.appName.trim() || !newEntry.appType.trim()}
            sx={{
              background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(100, 149, 237, 0.3)',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #4169E1 0%, #8A2BE2 100%)',
                boxShadow: '0 6px 12px rgba(100, 149, 237, 0.4)',
                transform: 'translateY(-2px)',
              },
              '&:disabled': {
                background: '#ccc',
                color: '#999',
                boxShadow: 'none',
                transform: 'none',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth maxWidth="lg">
        <DialogTitle>Edit Application Steps</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField 
              fullWidth 
              margin="normal" 
              label="Application ID" 
              value={editEntry?.applicationId || ''} 
              onChange={e => handleEditEntryChange('applicationId', e.target.value)}
              disabled
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Application Name" 
              value={editEntry?.appName || ''} 
              onChange={e => handleEditEntryChange('appName', e.target.value)}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>App Type</InputLabel>
              <Select
                value={editEntry?.appType || ''}
                onChange={e => handleEditEntryChange('appType', e.target.value)}
                label="App Type"
              >
                {appTypeOptions.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField 
              fullWidth 
              margin="normal" 
              label="Project Name" 
              value={editEntry?.projectName || ''} 
              onChange={e => handleEditEntryChange('projectName', e.target.value)}
            />
          </Box>
          <TextField 
            fullWidth 
            margin="normal" 
            label="Pre Implementation Steps" 
            value={editEntry?.preImplementationSteps || ''} 
            onChange={e => handleEditEntryChange('preImplementationSteps', e.target.value)}
            multiline
            rows={4}
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Implementation Steps" 
            value={editEntry?.implementationSteps || ''} 
            onChange={e => handleEditEntryChange('implementationSteps', e.target.value)}
            multiline
            rows={4}
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Post Validation Steps" 
            value={editEntry?.postValidationSteps || ''} 
            onChange={e => handleEditEntryChange('postValidationSteps', e.target.value)}
            multiline
            rows={4}
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Backout Steps" 
            value={editEntry?.backoutSteps || ''} 
            onChange={e => handleEditEntryChange('backoutSteps', e.target.value)}
            multiline
            rows={4}
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Backout Validation Steps" 
            value={editEntry?.backoutValidationSteps || ''} 
            onChange={e => handleEditEntryChange('backoutValidationSteps', e.target.value)}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setEditDialogOpen(false)}
            sx={{
              borderColor: '#ccc',
              color: '#666',
              textTransform: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#999',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleUpdateEntry}
            sx={{
              background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(100, 149, 237, 0.3)',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #4169E1 0%, #8A2BE2 100%)',
                boxShadow: '0 6px 12px rgba(100, 149, 237, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {filteredEntries.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          py: 8,
          color: '#666'
        }}>
          <SearchIcon sx={{ fontSize: 64, mb: 2, color: '#ccc' }} />
          <Typography variant="h6" sx={{ mb: 1, color: '#666' }}>
            {searchTerm ? 'No applications found' : 'No applications available'}
          </Typography>
          <Typography variant="body2" sx={{ color: '#999' }}>
            {searchTerm ? `Try adjusting your search term "${searchTerm}"` : 'Add an application to get started'}
          </Typography>
        </Box>
      ) : (
        filteredEntries.map((entry, index) => (
        <Accordion key={entry.id} sx={{ mb: 2, borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: 'linear-gradient(to right, #f0f0f0, #e0e0e0)' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {entry.appName}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip 
                    label={entry.appType} 
                    color="primary" 
                    variant="filled" 
                    size="small"
                    sx={{ bgcolor: '#6495ED', color: 'white' }}
                  />
                  <Chip 
                    label={entry.platform} 
                    color="secondary" 
                    variant="outlined" 
                    size="small"
                    sx={{ borderColor: '#9370DB', color: '#9370DB' }}
                  />
                </Box>
              </Box>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditEntry(index);
                }}
                sx={{ ml: 1, color: '#6495ED' }}
              >
                <EditIcon />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: '#f9f9f9', p: 4 }}>
            {/* Application Metadata Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#2c3e50' }}>
                Application Details
              </Typography>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                gap: 2,
                mb: 3
              }}>
                <Box sx={{ 
                  p: 2,
                  bgcolor: 'rgba(100, 149, 237, 0.03)',
                  borderRadius: '8px',
                  border: '1px solid rgba(100, 149, 237, 0.1)'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <InfoIcon sx={{ color: '#6495ED', fontSize: '18px', mr: 1 }} />
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#333' }}>
                      Application ID
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {entry.applicationId}
                  </Typography>
                </Box>
                <Box sx={{ 
                  p: 2,
                  bgcolor: 'rgba(100, 149, 237, 0.03)',
                  borderRadius: '8px',
                  border: '1px solid rgba(100, 149, 237, 0.1)'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AppsIcon sx={{ color: '#6495ED', fontSize: '18px', mr: 1 }} />
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#333' }}>
                      Project Name
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {entry.projectName}
                  </Typography>
                </Box>
                <Box sx={{ 
                  p: 2,
                  bgcolor: 'rgba(100, 149, 237, 0.03)',
                  borderRadius: '8px',
                  border: '1px solid rgba(100, 149, 237, 0.1)'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <StorageIcon sx={{ color: '#6495ED', fontSize: '18px', mr: 1 }} />
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#333' }}>
                      Platform
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {entry.platform}
                  </Typography>
                </Box>
                <Box sx={{ 
                  p: 2,
                  bgcolor: 'rgba(100, 149, 237, 0.03)',
                  borderRadius: '8px',
                  border: '1px solid rgba(100, 149, 237, 0.1)'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CloudIcon sx={{ color: '#6495ED', fontSize: '18px', mr: 1 }} />
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#333' }}>
                      Deployment Platform
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {entry.deploymentPlatform}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                p: 2,
                bgcolor: 'rgba(100, 149, 237, 0.03)',
                borderRadius: '8px',
                border: '1px solid rgba(100, 149, 237, 0.1)',
                mb: 2
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LinkIcon sx={{ color: '#6495ED', fontSize: '18px', mr: 1 }} />
                  <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#333' }}>
                    Repository Link
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#6495ED', 
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#4169E1'
                    }
                  }}
                  onClick={() => window.open(entry.repositoryLink, '_blank')}
                >
                  {entry.repositoryLink}
                </Typography>
              </Box>
            </Box>

            {/* Implementation Steps Section */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#2c3e50' }}>
                Implementation Steps
              </Typography>
            </Box>
            <List sx={{ width: '100%', p: 0 }}>
              <ListItem
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  mb: 3, 
                  p: 2,
                  bgcolor: 'rgba(100, 149, 237, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(100, 149, 237, 0.1)'
                }}
              >
                <ListItemIcon sx={{ minWidth: '36px', mt: 0.5 }}>
                  {getStepIcon('preImplementation')}
                </ListItemIcon>
                <ListItemText 
                  primary="Pre Implementation Steps" 
                  secondary={entry.preImplementationSteps}
                  primaryTypographyProps={{ 
                    fontWeight: 'bold',
                    color: '#333',
                    fontSize: '0.95rem',
                    mb: 1
                  }}
                  secondaryTypographyProps={{
                    color: '#666',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap'
                  }}
                />
              </ListItem>
              <ListItem 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  mb: 3, 
                  p: 2,
                  bgcolor: 'rgba(100, 149, 237, 0.08)',
                  borderRadius: '8px',
                  border: '1px solid rgba(100, 149, 237, 0.15)'
                }}
              >
                <ListItemIcon sx={{ minWidth: '36px', mt: 0.5 }}>
                  {getStepIcon('implementation')}
                </ListItemIcon>
                <ListItemText 
                  primary="Implementation Steps" 
                  secondary={entry.implementationSteps}
                  primaryTypographyProps={{ 
                    fontWeight: 'bold',
                    color: '#333',
                    fontSize: '0.95rem',
                    mb: 1
                  }}
                  secondaryTypographyProps={{
                    color: '#666',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap'
                  }}
                />
              </ListItem>
              <ListItem 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  mb: 3, 
                  p: 2,
                  bgcolor: 'rgba(100, 149, 237, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(100, 149, 237, 0.1)'
                }}
              >
                <ListItemIcon sx={{ minWidth: '36px', mt: 0.5 }}>
                  {getStepIcon('postValidation')}
                </ListItemIcon>
                <ListItemText 
                  primary="Post Validation Steps" 
                  secondary={entry.postValidationSteps}
                  primaryTypographyProps={{ 
                    fontWeight: 'bold',
                    color: '#333',
                    fontSize: '0.95rem',
                    mb: 1
                  }}
                  secondaryTypographyProps={{
                    color: '#666',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap'
                  }}
                />
              </ListItem>
              <ListItem 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  mb: 3, 
                  p: 2,
                  bgcolor: 'rgba(147, 112, 219, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(147, 112, 219, 0.1)'
                }}
              >
                <ListItemIcon sx={{ minWidth: '36px', mt: 0.5 }}>
                  {getStepIcon('backout')}
                </ListItemIcon>
                <ListItemText 
                  primary="Backout Steps" 
                  secondary={entry.backoutSteps}
                  primaryTypographyProps={{ 
                    fontWeight: 'bold',
                    color: '#333',
                    fontSize: '0.95rem',
                    mb: 1
                  }}
                  secondaryTypographyProps={{
                    color: '#666',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap'
                  }}
                />
              </ListItem>
              <ListItem 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  p: 2,
                  bgcolor: 'rgba(138, 43, 226, 0.08)',
                  borderRadius: '8px',
                  border: '1px solid rgba(138, 43, 226, 0.15)'
                }}
              >
                <ListItemIcon sx={{ minWidth: '36px', mt: 0.5 }}>
                  {getStepIcon('backoutValidation')}
                </ListItemIcon>
                <ListItemText 
                  primary="Backout Validation Steps" 
                  secondary={entry.backoutValidationSteps}
                  primaryTypographyProps={{ 
                    fontWeight: 'bold',
                    color: '#333',
                    fontSize: '0.95rem',
                    mb: 1
                  }}
                  secondaryTypographyProps={{
                    color: '#666',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap'
                  }}
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        ))
      )}
    </div>
  );
};

export default ApplicationsAccordion;
