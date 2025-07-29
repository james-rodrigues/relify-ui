import React, { useState } from 'react';
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
  Box
} from '@mui/material';
import { Add as AddIcon, Link as LinkIcon } from '@mui/icons-material';

interface ApplicationPipelinesEntry {
  repoName: string;
  comments: string;
  repoType: 'Backend' | 'UI' | 'Infra';
  releaseBranchLink: string;
  draftPRLink: string;
}

interface ApplicationPipelinesTabProps {
  releaseName: string;
}

const ApplicationPipelinesTab: React.FC<ApplicationPipelinesTabProps> = ({
  releaseName,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    repoName: '',
    releaseBranchName: '',
    backoutBranchName: ''
  });
  const [entries, setEntries] = useState<ApplicationPipelinesEntry[]>([
    {
      repoName: 'user-service',
      comments: 'Authentication and user management updates',
      repoType: 'Backend',
      releaseBranchLink: 'https://github.com/company/user-service/compare/release/v2.1.0',
      draftPRLink: 'https://github.com/company/user-service/pull/142'
    },
    {
      repoName: 'frontend-app',
      comments: 'New dashboard features and UI improvements',
      repoType: 'UI',
      releaseBranchLink: 'https://github.com/company/frontend-app/compare/release/v1.8.0',
      draftPRLink: 'https://github.com/company/frontend-app/pull/89'
    },
    {
      repoName: 'api-gateway',
      comments: 'Rate limiting and security enhancements',
      repoType: 'Backend',
      releaseBranchLink: 'https://github.com/company/api-gateway/compare/release/v3.2.1',
      draftPRLink: 'https://github.com/company/api-gateway/pull/67'
    },
    {
      repoName: 'infrastructure',
      comments: 'Kubernetes deployment configs and monitoring',
      repoType: 'Infra',
      releaseBranchLink: 'https://github.com/company/infrastructure/compare/release/v1.5.0',
      draftPRLink: 'https://github.com/company/infrastructure/pull/23'
    }
  ]);

  const handleEntryChange = (field: keyof typeof newEntry, value: string) => {
    setNewEntry(prev => ({ ...prev, [field]: value }));
  };

  const handleAddEntry = () => {
    setEntries(prev => [...prev, {
      repoName: newEntry.repoName,
      comments: 'No comments',
      repoType: 'Backend',
      releaseBranchLink: `https://github.com/${newEntry.repoName}/compare/${newEntry.releaseBranchName}`,
      draftPRLink: `https://github.com/${newEntry.repoName}/pull/new/${encodeURIComponent(newEntry.releaseBranchName)}`
    }]);
    setDialogOpen(false);
    setNewEntry({ repoName: '', releaseBranchName: '', backoutBranchName: '' }); // Reset form
  };

  return (
    <div className="pipelines-content">
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
        <DialogTitle>Add Pipeline Entry</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="normal" label="Repo Name" value={newEntry.repoName} onChange={e => handleEntryChange('repoName', e.target.value)} />
          <TextField fullWidth margin="normal" label="Release Branch Name" value={newEntry.releaseBranchName} onChange={e => handleEntryChange('releaseBranchName', e.target.value)} />
          <TextField fullWidth margin="normal" label="Backout Branch Name" value={newEntry.backoutBranchName} onChange={e => handleEntryChange('backoutBranchName', e.target.value)} />
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
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textTransform: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
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
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '16px',
                border: 'none',
              }}>Repo Name</TableCell>
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
              }}>Repo Type</TableCell>
              <TableCell sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '16px',
                border: 'none',
              }}>Release Branch Link</TableCell>
              <TableCell sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '16px',
                border: 'none',
              }}>Draft PR Link</TableCell>
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
                }}>{entry.repoName}</TableCell>
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  color: '#666',
                  fontWeight: 500,
                }}>{entry.comments}</TableCell>
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                  color: '#555',
                }}>{entry.repoType}</TableCell>
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                }}>
                  <a 
                    href={entry.releaseBranchLink}
                    style={{
                      color: '#667eea',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                    onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    View Release
                  </a>
                </TableCell>
                <TableCell sx={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                }}>
                  <a 
                    href={entry.draftPRLink}
                    style={{
                      color: '#667eea',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                    onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    View Draft PR
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ApplicationPipelinesTab;
