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
  IconButton,
  Grid,
  Link
} from '@mui/material';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon, Edit as EditIcon } from '@mui/icons-material';
import { getReleaseScopeData, type ReleaseScopeEntry } from '../../utils/mockDataLoader';

// Interface extends from mock data loader to include jiraIds field
interface ReleaseScopeEntryWithJira extends ReleaseScopeEntry {
  jiraIds: string;
}

const ReleaseScope: React.FC = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  // Load initial data and add jiraIds field for compatibility
  const initialEntries: ReleaseScopeEntryWithJira[] = getReleaseScopeData().map(entry => ({
    ...entry,
    jiraIds: 'REL-1001, REL-1002' // Default jira IDs for demo
  }));
  const [entries, setEntries] = React.useState<ReleaseScopeEntryWithJira[]>(initialEntries);
  // Helper function to create default entry
  const createDefaultEntry = (): ReleaseScopeEntryWithJira => ({
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
    jiraIds: '',
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

  const [newEntry, setNewEntry] = React.useState<ReleaseScopeEntryWithJira>(createDefaultEntry());

  const handleInputChange = (field: keyof ReleaseScopeEntryWithJira, value: string) => {
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
    setNewEntry(createDefaultEntry());
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
    setNewEntry(createDefaultEntry());
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
                value={newEntry[field as keyof ReleaseScopeEntryWithJira]}
                onChange={e => handleInputChange(field as keyof ReleaseScopeEntryWithJira, e.target.value)}
                multiline={field === 'drmComments' || field === 'manualTaskComments'}
                rows={field === 'drmComments' || field === 'manualTaskComments' ? 3 : 1}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDialog}
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
            onClick={handleAddOrUpdateEntry} 
            variant="contained"
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
            {editingIndex !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Accordions for displaying entries */}
      {entries.map((entry, index) => (
        <Accordion key={index} sx={{ mb: 2, borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: 'linear-gradient(to right, #f0f0f0, #e0e0e0)'}}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                Release Scope Item {index + 1}
              </Typography>
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
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                {Object.entries(entry).map(([key, value]) => {
                  const isLink = key.includes('Link') || key.includes('link');
                  const isJiraField = key.toLowerCase().includes('jira') || key.toLowerCase().includes('epic') || key.toLowerCase().includes('initiative') || key.toLowerCase().includes('story');
                  const isIncidentField = key.toLowerCase().includes('incident') || key.toLowerCase().includes('related');
                  const isBooleanField = typeof value === 'string' && ['yes', 'no', 'n/a'].includes(value.toLowerCase());
                  const isRightColumn = isLink || isJiraField || isIncidentField || isBooleanField;

                  return isRightColumn ? null : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }} key={key}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 1 }}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#555', wordBreak: 'break-word' }}>
                        {value || '-'}
                      </Typography>
                    </Box>
                  );
                })}
              </Grid>
              <Grid item xs={12} md={6}>
                {Object.entries(entry).map(([key, value]) => {
                  const isLink = key.includes('Link') || key.includes('link');
                  const isJiraField = key.toLowerCase().includes('jira') || key.toLowerCase().includes('epic') || key.toLowerCase().includes('initiative') || key.toLowerCase().includes('story');
                  const isIncidentField = key.toLowerCase().includes('incident') || key.toLowerCase().includes('related');
                  const isBooleanField = typeof value === 'string' && ['yes', 'no', 'n/a'].includes(value.toLowerCase());
                  const isRightColumn = isLink || isJiraField || isIncidentField || isBooleanField;
                  const linkValues = typeof value === 'string' ? value.split(', ') : [];

                  let displayValue = value;
                  if (isBooleanField) {
                    displayValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                  }

                  return isRightColumn ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }} key={key}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 1 }}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Typography>
                      {isLink || isJiraField ? (
                        linkValues.map((link, idx) => (
                          <Link 
                            key={idx}
                            href={isLink ? link : `https://jira.company.com/browse/${link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: '#6495ED',
                              textDecoration: 'none',
                              fontWeight: 500,
                              '&:hover': {
                                textDecoration: 'underline',
                                color: '#4169E1',
                              },
                              display: 'block',
                              mb: 0.5
                            }}
                          >
                            {link}
                          </Link>
                        ))
                      ) : (
                        <Typography variant="body2" sx={{ color: isBooleanField ? '#0070f3' : '#555', fontWeight: isBooleanField ? 'bold' : 'normal' }}>
                          {displayValue || '-'}
                        </Typography>
                      )}
                    </Box>
                  ) : null;
                })}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ReleaseScope;

