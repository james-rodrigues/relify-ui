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
  Link,
  Chip,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Add as AddIcon, 
  ExpandMore as ExpandMoreIcon, 
  Edit as EditIcon,
  Assignment as ChangeIcon,
  Group as TeamIcon,
  Person as PersonIcon,
  Build as BuildIcon,
  Link as LinkIcon,
  Security as SecurityIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Timeline as TimelineIcon,
  CloudQueue as ServiceIcon,
  BugReport as IncidentIcon,
  Code as CodeIcon,
  Info as InfoIcon,
  Storage as DataIcon
} from '@mui/icons-material';
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
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {entry.changeRequestNumber || `Change Request ${index + 1}`}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip 
                    label={entry.teamName || 'Unknown Team'} 
                    color="primary" 
                    variant="filled" 
                    size="small"
                    sx={{ bgcolor: '#6495ED', color: 'white' }}
                  />
                  <Chip 
                    label={entry.snowflakeImpact || 'Impact TBD'} 
                    color="secondary" 
                    variant="outlined" 
                    size="small"
                    sx={{ 
                      borderColor: entry.snowflakeImpact === 'High Impact' ? '#f44336' : 
                                   entry.snowflakeImpact === 'Medium Impact' ? '#ff9800' : '#4caf50',
                      color: entry.snowflakeImpact === 'High Impact' ? '#f44336' : 
                             entry.snowflakeImpact === 'Medium Impact' ? '#ff9800' : '#4caf50'
                    }}
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
            {/* Change Request Details Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#2c3e50' }}>
                Change Request Details
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
                    <ChangeIcon sx={{ color: '#6495ED', fontSize: '18px', mr: 1 }} />
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#333' }}>
                      Change Request Number
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {entry.changeRequestNumber || 'Not specified'}
                  </Typography>
                </Box>
                <Box sx={{ 
                  p: 2,
                  bgcolor: 'rgba(100, 149, 237, 0.03)',
                  borderRadius: '8px',
                  border: '1px solid rgba(100, 149, 237, 0.1)'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <SecurityIcon sx={{ color: '#6495ED', fontSize: '18px', mr: 1 }} />
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#333' }}>
                      SEAL ID
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {entry.sealId || 'Not specified'}
                  </Typography>
                </Box>
                <Box sx={{ 
                  p: 2,
                  bgcolor: 'rgba(100, 149, 237, 0.03)',
                  borderRadius: '8px',
                  border: '1px solid rgba(100, 149, 237, 0.1)'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CodeIcon sx={{ color: '#6495ED', fontSize: '18px', mr: 1 }} />
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#333' }}>
                      Release Branch
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {entry.releaseBranchName || 'Not specified'}
                  </Typography>
                </Box>
                <Box sx={{ 
                  p: 2,
                  bgcolor: 'rgba(100, 149, 237, 0.03)',
                  borderRadius: '8px',
                  border: '1px solid rgba(100, 149, 237, 0.1)'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DataIcon sx={{ color: '#6495ED', fontSize: '18px', mr: 1 }} />
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#333' }}>
                      Snowflake Impact
                    </Typography>
                  </Box>
                  <Chip 
                    label={entry.snowflakeImpact || 'Impact TBD'} 
                    size="small"
                    sx={{ 
                      bgcolor: entry.snowflakeImpact === 'High Impact' ? '#f44336' : 
                               entry.snowflakeImpact === 'Medium Impact' ? '#ff9800' : '#4caf50',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Team & Contacts Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#2c3e50' }}>
                Team & Contacts
              </Typography>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                gap: 2
              }}>
                <Card sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <TeamIcon sx={{ color: '#6495ED', fontSize: '20px', mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Development Team
                      </Typography>
                    </Box>
                    <List dense sx={{ p: 0 }}>
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <PersonIcon sx={{ color: '#666', fontSize: '16px' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Key Dev Lead" 
                          secondary={entry.keyDevLead || 'Not assigned'}
                          primaryTypographyProps={{ fontSize: '0.75rem', color: '#999' }}
                          secondaryTypographyProps={{ fontSize: '0.85rem', color: '#333' }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <BuildIcon sx={{ color: '#666', fontSize: '16px' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Tech Lead" 
                          secondary={entry.techLead || 'Not assigned'}
                          primaryTypographyProps={{ fontSize: '0.75rem', color: '#999' }}
                          secondaryTypographyProps={{ fontSize: '0.85rem', color: '#333' }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <PersonIcon sx={{ color: '#666', fontSize: '16px' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Product Contact" 
                          secondary={entry.productContact || 'Not assigned'}
                          primaryTypographyProps={{ fontSize: '0.75rem', color: '#999' }}
                          secondaryTypographyProps={{ fontSize: '0.85rem', color: '#333' }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
                <Card sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <SecurityIcon sx={{ color: '#6495ED', fontSize: '20px', mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                        On-Call Contacts
                      </Typography>
                    </Box>
                    <List dense sx={{ p: 0 }}>
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <PersonIcon sx={{ color: '#4caf50', fontSize: '16px' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Primary On-Call" 
                          secondary={entry.personOnCallPrimary || 'Not assigned'}
                          primaryTypographyProps={{ fontSize: '0.75rem', color: '#999' }}
                          secondaryTypographyProps={{ fontSize: '0.85rem', color: '#333' }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <PersonIcon sx={{ color: '#ff9800', fontSize: '16px' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Secondary On-Call" 
                          secondary={entry.personOnCallSecondary || 'Not assigned'}
                          primaryTypographyProps={{ fontSize: '0.75rem', color: '#999' }}
                          secondaryTypographyProps={{ fontSize: '0.85rem', color: '#333' }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            {/* Release Information Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#2c3e50' }}>
                Release Information
              </Typography>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                gap: 2
              }}>
                <Card sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <ServiceIcon sx={{ color: '#6495ED', fontSize: '20px', mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Services & Changes
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#666', mb: 1, display: 'block' }}>
                      Services to Deploy:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#333', mb: 2, whiteSpace: 'pre-wrap' }}>
                      {entry.servicesToBeDeployed || 'None specified'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666', mb: 1, display: 'block' }}>
                      Changes Involved:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#333', whiteSpace: 'pre-wrap' }}>
                      {entry.changesInvolved || 'None specified'}
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <CheckIcon sx={{ color: '#6495ED', fontSize: '20px', mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Testing Status
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>IST Tested:</Typography>
                        <Chip 
                          label={entry.istTested || 'N/A'} 
                          size="small"
                          color={entry.istTested === 'Yes' ? 'success' : entry.istTested === 'No' ? 'error' : 'default'}
                          variant="outlined"
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>UAT Tested:</Typography>
                        <Chip 
                          label={entry.uatTested || 'N/A'} 
                          size="small"
                          color={entry.uatTested === 'Yes' ? 'success' : entry.uatTested === 'No' ? 'error' : 'default'}
                          variant="outlined"
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>SRE KT Done:</Typography>
                        <Chip 
                          label={entry.sreKTDone || 'N/A'} 
                          size="small"
                          color={entry.sreKTDone === 'Yes' ? 'success' : entry.sreKTDone === 'No' ? 'error' : 'default'}
                          variant="outlined"
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>Runbook Updated:</Typography>
                        <Chip 
                          label={entry.runbookUpdateDone || 'N/A'} 
                          size="small"
                          color={entry.runbookUpdateDone === 'Yes' ? 'success' : entry.runbookUpdateDone === 'No' ? 'error' : 'default'}
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            {/* Links & References Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#2c3e50' }}>
                Links & References
              </Typography>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                gap: 2
              }}>
                <Card sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <LinkIcon sx={{ color: '#6495ED', fontSize: '20px', mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                        JIRA Links
                      </Typography>
                    </Box>
                    <List dense sx={{ p: 0 }}>
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemText 
                          primary="Initiative" 
                          secondary={
                            entry.initiativeLink ? (
                              <Link 
                                href={entry.initiativeLink} 
                                target="_blank" 
                                sx={{ color: '#6495ED', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                              >
                                {entry.initiativeLink}
                              </Link>
                            ) : 'Not specified'
                          }
                          primaryTypographyProps={{ fontSize: '0.75rem', color: '#999' }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemText 
                          primary="Epic" 
                          secondary={
                            entry.epicLink ? (
                              <Link 
                                href={entry.epicLink} 
                                target="_blank" 
                                sx={{ color: '#6495ED', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                              >
                                {entry.epicLink}
                              </Link>
                            ) : 'Not specified'
                          }
                          primaryTypographyProps={{ fontSize: '0.75rem', color: '#999' }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemText 
                          primary="Story" 
                          secondary={
                            entry.storyLink ? (
                              <Link 
                                href={entry.storyLink} 
                                target="_blank" 
                                sx={{ color: '#6495ED', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                              >
                                {entry.storyLink}
                              </Link>
                            ) : 'Not specified'
                          }
                          primaryTypographyProps={{ fontSize: '0.75rem', color: '#999' }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
                <Card sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <IncidentIcon sx={{ color: '#f44336', fontSize: '20px', mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Related Incidents
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: entry.relatedIncidents ? '#333' : '#999' }}>
                      {entry.relatedIncidents || 'None reported'}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            {/* Comments Section */}
            {(entry.drmComments || entry.manualTaskComments) && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#2c3e50' }}>
                  Comments & Notes
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {entry.drmComments && (
                    <Card sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <InfoIcon sx={{ color: '#6495ED', fontSize: '18px', mr: 1 }} />
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#333' }}>
                            DRM Comments
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#666', whiteSpace: 'pre-wrap' }}>
                          {entry.drmComments}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                  {entry.manualTaskComments && (
                    <Card sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <WarningIcon sx={{ color: '#ff9800', fontSize: '18px', mr: 1 }} />
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#333' }}>
                            Manual Task Comments
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#666', whiteSpace: 'pre-wrap' }}>
                          {entry.manualTaskComments}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </Box>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ReleaseScope;

