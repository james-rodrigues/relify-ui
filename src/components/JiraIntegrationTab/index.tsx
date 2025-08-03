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
import { Add as AddIcon, Check as CheckIcon, Remove as RemoveIcon } from '@mui/icons-material';

interface JiraEntry {
  jiraId: string;
  fixVersion: string;
  changeNumber: string;
  testCaseJiraId: string;
  repositoriesInvolved: string;
  status: 'Draft' | 'Activated' | 'Ready';
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
    comments: ''
  });
  const [entries, setEntries] = useState<JiraEntry[]>(jiraIntegrationData as JiraEntry[]);

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
      status: 'Draft',
      jetLink: `https://jet.company.com/job/${newEntry.jiraId}`,
      spinnakerLink: 'https://spinnaker.company.com/applications/default/executions',
      changeType: 'Feature Enhancement', // Default
      comments: newEntry.comments
    };
    
    setEntries(prev => [...prev, newJiraEntry]);
    setDialogOpen(false);
    setNewEntry({ jiraId: '', comments: '' }); // Reset form
  };

  const handleMarkReady = (index: number) => {
    setEntries(prev => prev.map((entry, i) => 
      i === index ? { ...entry, status: 'Activated' as const } : entry
    ));
  };

  const handleDescope = (index: number) => {
    setEntries(prev => prev.filter((_, i) => i !== index));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'default';
      case 'Ready':
        return 'warning';
      case 'Activated':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <div className="jira-content">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
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
            label="Comments" 
            value={newEntry.comments} 
            onChange={e => handleEntryChange('comments', e.target.value)}
            multiline
            rows={4}
            placeholder="Enter comments about this Jira ticket..."
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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '16px',
                border: 'none',
              }}>Jira ID</TableCell>
              <TableCell sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '16px',
                border: 'none',
              }}>Fix Version</TableCell>
              <TableCell sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '16px',
                border: 'none',
              }}>Change Number</TableCell>
              <TableCell sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '16px',
                border: 'none',
              }}>Test Case Jira ID</TableCell>
              <TableCell sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '16px',
                border: 'none',
              }}>Repositories Involved</TableCell>
              <TableCell sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '16px',
                border: 'none',
              }}>Status</TableCell>
              <TableCell sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '16px',
                border: 'none',
              }}>JET Link</TableCell>
              <TableCell sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '16px',
                border: 'none',
              }}>Spinnaker Link</TableCell>
              <TableCell sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '16px',
                border: 'none',
              }}>Change Type</TableCell>
              <TableCell sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '16px',
                border: 'none',
              }}>Comments</TableCell>
              <TableCell sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '16px',
                border: 'none',
              }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow 
                key={index}
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(102, 126, 234, 0.05)',
                  },
                  '&:nth-of-type(even)': {
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  },
                }}
              >
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  fontWeight: 600,
                  color: '#2c3e50',
                  fontSize: '0.95rem',
                }}>{entry.jiraId}</TableCell>
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  color: '#666',
                  fontWeight: 500,
                }}>{entry.fixVersion}</TableCell>
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  color: '#666',
                  fontWeight: 500,
                }}>{entry.changeNumber}</TableCell>
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  color: '#666',
                  fontWeight: 500,
                }}>{entry.testCaseJiraId}</TableCell>
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  color: '#666',
                  fontWeight: 500,
                }}>{entry.repositoriesInvolved}</TableCell>
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
                  <Link 
                    href={entry.jetLink} 
                    target="_blank" 
                    rel="noopener"
                    sx={{
                      color: '#667eea',
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      }
                    }}
                  >
                    View JET
                  </Link>
                </TableCell>
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                }}>
                  <Link 
                    href={entry.spinnakerLink} 
                    target="_blank" 
                    rel="noopener"
                    sx={{
                      color: '#667eea',
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      }
                    }}
                  >
                    View Spinnaker
                  </Link>
                </TableCell>
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  color: '#555',
                }}>{entry.changeType}</TableCell>
                <TableCell sx={{ 
                  maxWidth: 200, 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis',
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  color: '#666',
                }}>
                  {entry.comments}
                </TableCell>
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {entry.status !== 'Activated' && (
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        startIcon={<CheckIcon />}
                        onClick={() => handleMarkReady(index)}
                        sx={{
                          textTransform: 'none',
                          fontWeight: 600,
                        }}
                      >
                        Mark Ready
                      </Button>
                    )}
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<RemoveIcon />}
                      onClick={() => handleDescope(index)}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Descope
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default JiraIntegrationTab;
