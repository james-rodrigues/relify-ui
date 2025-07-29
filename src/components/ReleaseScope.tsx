import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton
} from '@mui/material';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon, Edit as EditIcon } from '@mui/icons-material';

interface ReleaseScopeEntry {
  changeRequestNumber: string;
  sealId: string;
  teamName: string;
  keyDevLead: string;
  productContact: string;
  sreKTDone: 'Yes' | 'No' | 'N/A';
  runbookUpdateDone: 'Yes' | 'No' | 'N/A';
  drmComments: string;
  snowflakeImpact: string;
  techLead: string;
  initiativeLink: string;
  epicLink: string;
  storyLink: string;
  personOnCallPrimary: string;
  personOnCallSecondary: string;
  changesInvolved: string;
  servicesToBeDeployed: string;
  upstreamDownstreamImpact: 'Yes' | 'No' | 'N/A';
  istTested: 'Yes' | 'No' | 'N/A';
  uatTested: 'Yes' | 'No' | 'N/A';
  relatedIncidents: string;
  releaseBranchName: string;
  manualTaskComments: string;
}

const ReleaseScope: React.FC = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [entries, setEntries] = React.useState<ReleaseScopeEntry[]>([
    {
      changeRequestNumber: 'CR-001',
      sealId: 'SEAL-12345',
      teamName: 'Frontend Development Team',
      keyDevLead: 'John Smith',
      productContact: 'Anna Taylor',
      sreKTDone: 'Yes',
      runbookUpdateDone: 'No',
      drmComments: 'DRM review completed with minor recommendations',
      snowflakeImpact: 'Medium Impact - UI Changes',
      techLead: 'Julie Brown',
      initiativeLink: 'https://jira.company.com/browse/INIT-001',
      epicLink: 'https://jira.company.com/browse/EPIC-101',
      storyLink: 'https://jira.company.com/browse/STORY-202',
      personOnCallPrimary: 'Alex Johnson',
      personOnCallSecondary: 'Maria Garcia',
      changesInvolved: 'API Updates, Database Schema Changes, UI Improvements',
      servicesToBeDeployed: 'UserService, AuthService, NotificationService',
      upstreamDownstreamImpact: 'No',
      istTested: 'Yes',
      uatTested: 'Yes',
      relatedIncidents: 'INC-2024-001, INC-2024-007',
      releaseBranchName: 'release/v2.1.0',
      manualTaskComments: 'Please review manual tasks prior to deployment. Ensure all config files are updated.'
    },
    {
      changeRequestNumber: 'CR-002',
      sealId: 'SEAL-67890',
      teamName: 'Backend Services Team',
      keyDevLead: 'Mike Johnson',
      productContact: 'Sarah Wilson',
      sreKTDone: 'No',
      runbookUpdateDone: 'Yes',
      drmComments: 'DRM approved with conditions - monitoring required',
      snowflakeImpact: 'Low Impact - Performance Optimization',
      techLead: 'Robert Davis',
      initiativeLink: 'https://jira.company.com/browse/INIT-002',
      epicLink: 'https://jira.company.com/browse/EPIC-102',
      storyLink: 'https://jira.company.com/browse/STORY-203',
      personOnCallPrimary: 'David Chen',
      personOnCallSecondary: 'Linda Rodriguez',
      changesInvolved: 'Performance Optimizations, Caching Layer Updates',
      servicesToBeDeployed: 'CacheService, DataProcessingService',
      upstreamDownstreamImpact: 'Yes',
      istTested: 'N/A',
      uatTested: 'Yes',
      relatedIncidents: 'INC-2024-003',
      releaseBranchName: 'release/v2.1.1',
      manualTaskComments: 'Additional testing required for performance improvements. Monitor resource usage post-deployment.'
    }
  ]);
  const [newEntry, setNewEntry] = React.useState<ReleaseScopeEntry>({
    changeRequestNumber: '',
    sealId: '',
    teamName: '',
    keyDevLead: '',
    productContact: '',
    sreKTDone: 'N/A',
    runbookUpdateDone: 'N/A',
    drmComments: '',
    snowflakeImpact: '',
    techLead: '',
    initiativeLink: '',
    epicLink: '',
    storyLink: '',
    personOnCallPrimary: '',
    personOnCallSecondary: '',
    changesInvolved: '',
    servicesToBeDeployed: '',
    upstreamDownstreamImpact: 'N/A',
    istTested: 'N/A',
    uatTested: 'N/A',
    relatedIncidents: '',
    releaseBranchName: '',
    manualTaskComments: '',
  });

  const handleInputChange = (field: keyof ReleaseScopeEntry, value: string) => {
    setNewEntry(prev => ({ ...prev, [field]: value }));
  };

  const handleAddOrUpdateEntry = () => {
    if (editingIndex !== null) {
      // Update existing entry
      setEntries(prev => prev.map((entry, index) => 
        index === editingIndex ? newEntry : entry
      ));
      setEditingIndex(null);
    } else {
      // Add new entry
      setEntries(prev => [...prev, newEntry]);
    }
    
    // Reset form
    setNewEntry({
      changeRequestNumber: '',
      sealId: '',
      teamName: '',
      keyDevLead: '',
      productContact: '',
      sreKTDone: 'N/A',
      runbookUpdateDone: 'N/A',
      drmComments: '',
      snowflakeImpact: '',
      techLead: '',
      initiativeLink: '',
      epicLink: '',
      storyLink: '',
      personOnCallPrimary: '',
      personOnCallSecondary: '',
      changesInvolved: '',
      servicesToBeDeployed: '',
      upstreamDownstreamImpact: 'N/A',
      istTested: 'N/A',
      uatTested: 'N/A',
      relatedIncidents: '',
      releaseBranchName: '',
      manualTaskComments: '',
    });
    setDialogOpen(false);
  };

  const handleEditEntry = (index: number) => {
    setEditingIndex(index);
    setNewEntry(entries[index]);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingIndex(null);
    setNewEntry({
      changeRequestNumber: '',
      sealId: '',
      teamName: '',
      keyDevLead: '',
      productContact: '',
      sreKTDone: 'N/A',
      runbookUpdateDone: 'N/A',
      drmComments: '',
      snowflakeImpact: '',
      techLead: '',
      initiativeLink: '',
      epicLink: '',
      storyLink: '',
      personOnCallPrimary: '',
      personOnCallSecondary: '',
      changesInvolved: '',
      servicesToBeDeployed: '',
      upstreamDownstreamImpact: 'N/A',
      istTested: 'N/A',
      uatTested: 'N/A',
      relatedIncidents: '',
      releaseBranchName: '',
      manualTaskComments: '',
    });
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {/* Header with Add Entry button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Release Scope Entries ({entries.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Add Entry
        </Button>
      </Box>

      {/* Dialog for adding/editing entries */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>{editingIndex !== null ? 'Edit Release Entry' : 'Add Release Entry'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {Object.keys(newEntry).map(field => (
              <TextField
                key={field}
                fullWidth
                label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                value={newEntry[field as keyof ReleaseScopeEntry]}
                onChange={e => handleInputChange(field as keyof ReleaseScopeEntry, e.target.value)}
                multiline={field === 'drmComments' || field === 'manualTaskComments'}
                rows={field === 'drmComments' || field === 'manualTaskComments' ? 3 : 1}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddOrUpdateEntry} variant="contained" color="primary">
            {editingIndex !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Accordions for displaying entries */}
      {entries.map((entry, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: '#f5f5f5' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Release Scope Item {index + 1}
              </Typography>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditEntry(index);
                }}
                sx={{ ml: 1 }}
              >
                <EditIcon />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1}>
              {Object.entries(entry).map(([key, value]) => (
                <Typography key={key} variant="body2">
                  <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value || '-'}
                </Typography>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ReleaseScope;

