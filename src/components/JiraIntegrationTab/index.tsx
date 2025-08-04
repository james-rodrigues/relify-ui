import React, { useState } from 'react';
import jiraIntegrationData from '../../mockData/jiraIntegrationData.json';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
  Link
} from '@mui/material';
import { Add as AddIcon, Check as CheckIcon, Remove as RemoveIcon, CheckCircle as ValidateIcon } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

interface JiraEntry {
  jiraId: string;
  fixVersion: string;
  changeNumber: string;
  testCaseJiraId: string;
  epicLink: string;
  initiativeLink: string;
  repositoriesInvolved: string;
  status: 'Open' | 'Ready for Review' | 'Under Refinement' | 'Ready' | 'In Progress' | 'Completed';
  readinessState: 'Ready' | 'In Progress';
  jetLink: string;
  spinnakerLink: string;
  changeType: 'Defect' | 'Feature Enhancement' | 'Infra/Config Updates';
  comments: string;
}

interface JiraIntegrationTabProps {
  releaseName: string;
}

const JiraIntegrationTab: React.FC<JiraIntegrationTabProps> = ({
  releaseName,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    jiraId: '',
    comments: '',
    epicLink: '',
    initiativeLink: ''
  });
  const [entries, setEntries] = useState<JiraEntry[]>(jiraIntegrationData as JiraEntry[]);
  const [descopeIndex, setDescopeIndex] = useState<number | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const handleEntryChange = (field: keyof typeof newEntry, value: string) => {
    setNewEntry(prev => ({ ...prev, [field]: value }));
  };

  const handleAddEntry = () => {
    const newJiraEntry: JiraEntry = {
      jiraId: newEntry.jiraId,
      fixVersion: 'v2.1.0', // Default value
      changeNumber: `CHG00${Math.floor(Math.random() * 100000)}`, // Mock change number
      testCaseJiraId: `TEST-${Math.floor(Math.random() * 10000)}`, // Mock test case ID
      repositoriesInvolved: 'TBD',
      status: 'Open',
      jetLink: `https://jet.company.com/job/${newEntry.jiraId}`,
      spinnakerLink: 'https://spinnaker.company.com/applications/default/executions',
      changeType: 'Feature Enhancement', // Default
      comments: newEntry.comments,
      epicLink: newEntry.epicLink,
      initiativeLink: newEntry.initiativeLink,
      readinessState: 'In Progress' // Default value
    };
    
    setEntries(prev => [...prev, newJiraEntry]);
    setDialogOpen(false);
    setNewEntry({ jiraId: '', comments: '', epicLink: '', initiativeLink: '' }); // Reset form
  };

  const handleMarkReady = (index: number) => {
    setEntries(prev => prev.map((entry, i) => 
      i === index ? { ...entry, status: 'Ready' as const } : entry
    ));
  };

  const handleDescopeConfirmation = (index: number) => {
    setDescopeIndex(index);
  };

  const confirmDescope = () => {
    if (descopeIndex !== null) {
      setEntries(prev => prev.filter((_, i) => i !== descopeIndex));
      setDescopeIndex(null);
    }
  };

  const cancelDescope = () => {
    setDescopeIndex(null);
  };

  const handleValidateAll = () => {
    setIsValidating(true);
    setTimeout(() => {
      setEntries(prev => prev.map(entry => ({ ...entry, readinessState: 'Ready' as const })));
      setIsValidating(false);
    }, 5000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'default';
      case 'Ready for Review':
        return 'info';
      case 'Under Refinement':
        return 'warning';
      case 'Ready':
        return 'primary';
      case 'In Progress':
        return 'secondary';
      case 'Completed':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <div className="jira-content">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          variant="contained"
          startIcon={<ValidateIcon />}
          onClick={handleValidateAll}
          disabled={isValidating}
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
          Validate
        </Button>
          {isValidating && (
            <CircularProgress 
              size={24} 
              sx={{ 
                color: '#667eea',
                ml: 1
              }} 
            />
          )}
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
            },
            '&:disabled': {
              opacity: 0.7,
              transform: 'none',
            }
          }}
        >
          Add Entry
        </Button>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Jira Entry</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth 
            margin="normal" 
            label="Jira ID" 
            value={newEntry.jiraId} 
            onChange={e => handleEntryChange('jiraId', e.target.value)}
            placeholder="e.g., PROJ-1234"
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Title" 
            value={newEntry.comments} 
            onChange={e => handleEntryChange('comments', e.target.value)}
            placeholder="Enter the Jira ticket title..."
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Epic Link" 
            value={newEntry.epicLink} 
            onChange={e => handleEntryChange('epicLink', e.target.value)}
            placeholder="e.g., EPIC-1234"
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Initiative Link" 
            value={newEntry.initiativeLink} 
            onChange={e => handleEntryChange('initiativeLink', e.target.value)}
            placeholder="e.g., INIT-1234"
          />
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
            disabled={!newEntry.jiraId.trim()}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textTransform: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
              '&:disabled': {
                opacity: 0.7,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer 
        component={Paper} 
        sx={{
          overflowX: 'auto',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>Jira ID</TableCell>
              <TableCell sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>Title</TableCell>
              <TableCell sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>Test Case Jira ID</TableCell>
              <TableCell sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>Epic Link</TableCell>
              <TableCell sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>Initiative Link</TableCell>
              <TableCell sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>Status</TableCell>
              <TableCell sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>Readiness State</TableCell>
              <TableCell sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow 
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                    transform: 'scale(1.01)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  fontWeight: 600,
                  color: '#2c3e50',
                  fontSize: '0.95rem',
                }}>
                  <a 
                    href={`https://jira.company.com/browse/${entry.jiraId}`}
                    target="_blank"
                    rel="noopener"
                    style={{
                      color: '#6495ED',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                      e.currentTarget.style.color = '#4169E1';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                      e.currentTarget.style.color = '#6495ED';
                    }}
                  >
                    {entry.jiraId}
                  </a>
                </TableCell>
                <TableCell sx={{ 
                  maxWidth: 300, 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis',
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  color: '#666',
                  fontWeight: 500,
                }}>
                  {entry.comments}
                </TableCell>
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  color: '#666',
                  fontWeight: 500,
                }}>
                  <a 
                    href={`https://jira.company.com/browse/${entry.testCaseJiraId}`}
                    target="_blank"
                    rel="noopener"
                    style={{
                      color: '#6495ED',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                      e.currentTarget.style.color = '#4169E1';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                      e.currentTarget.style.color = '#6495ED';
                    }}
                  >
                    {entry.testCaseJiraId}
                  </a>
                </TableCell>
                <TableCell>
                  <a 
                    href={`https://jira.company.com/browse/${entry.epicLink}`}
                    target="_blank"
                    rel="noopener"
                    style={{
                      color: '#6495ED',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                      e.currentTarget.style.color = '#4169E1';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                      e.currentTarget.style.color = '#6495ED';
                    }}
                  >
                    {entry.epicLink}
                  </a>
                </TableCell>
                <TableCell>
                  <a 
                    href={`https://jira.company.com/browse/${entry.initiativeLink}`}
                    target="_blank"
                    rel="noopener"
                    style={{
                      color: '#6495ED',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                      e.currentTarget.style.color = '#4169E1';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                      e.currentTarget.style.color = '#6495ED';
                    }}
                  >
                    {entry.initiativeLink}
                  </a>
                </TableCell>
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                }}>
                  <Chip 
                    label={entry.status} 
                    color={getStatusColor(entry.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                }}>
                  <Chip 
                    label={entry.readinessState} 
                    color={entry.readinessState === 'Ready' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                }}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDescopeConfirmation(index)}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      minWidth: '40px',
                      padding: '6px',
                    }}
                  >
                    <RemoveIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {descopeIndex !== null && (
        <Dialog open={true} onClose={cancelDescope} fullWidth maxWidth="xs">
          <DialogTitle>Confirm Descope</DialogTitle>
          <DialogContent>
            Are you sure you want to descope this row?
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={cancelDescope}
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
              onClick={confirmDescope}
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                color: 'white',
                textTransform: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #c82333 0%, #a71e2a 100%)',
                },
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default JiraIntegrationTab;
