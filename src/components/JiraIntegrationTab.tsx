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
  const [entries, setEntries] = useState<JiraEntry[]>([
    {
      jiraId: 'PROJ-1234',
      fixVersion: 'v2.1.0',
      changeNumber: 'CHG0012345',
      testCaseJiraId: 'TEST-5678',
      repositoriesInvolved: 'user-service, api-gateway',
      status: 'Draft',
      jetLink: 'https://jet.company.com/job/PROJ-1234',
      spinnakerLink: 'https://spinnaker.company.com/applications/app/executions',
      changeType: 'Feature Enhancement',
      comments: 'New authentication flow implementation'
    },
    {
      jiraId: 'PROJ-5678',
      fixVersion: 'v2.1.0',
      changeNumber: 'CHG0012346',
      testCaseJiraId: 'TEST-9012',
      repositoriesInvolved: 'frontend-app',
      status: 'Ready',
      jetLink: 'https://jet.company.com/job/PROJ-5678',
      spinnakerLink: 'https://spinnaker.company.com/applications/frontend/executions',
      changeType: 'Defect',
      comments: 'Fix dashboard loading issue'
    },
    {
      jiraId: 'PROJ-9012',
      fixVersion: 'v2.1.0',
      changeNumber: 'CHG0012347',
      testCaseJiraId: 'TEST-3456',
      repositoriesInvolved: 'infrastructure',
      status: 'Activated',
      jetLink: 'https://jet.company.com/job/PROJ-9012',
      spinnakerLink: 'https://spinnaker.company.com/applications/infra/executions',
      changeType: 'Infra/Config Updates',
      comments: 'Kubernetes cluster configuration updates'
    }
  ]);

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
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleAddEntry}
            disabled={!newEntry.jiraId.trim()}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: 'white' }}>Jira ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: 'white' }}>Fix Version</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: 'white' }}>Change Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: 'white' }}>Test Case Jira ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: 'white' }}>Repositories Involved</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: 'white' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: 'white' }}>JET Link</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: 'white' }}>Spinnaker Link</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: 'white' }}>Change Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: 'white' }}>Comments</TableCell>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.jiraId}</TableCell>
                <TableCell>{entry.fixVersion}</TableCell>
                <TableCell>{entry.changeNumber}</TableCell>
                <TableCell>{entry.testCaseJiraId}</TableCell>
                <TableCell>{entry.repositoriesInvolved}</TableCell>
                <TableCell>
                  <Chip 
                    label={entry.status} 
                    color={getStatusColor(entry.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Link href={entry.jetLink} target="_blank" rel="noopener">
                    View JET
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={entry.spinnakerLink} target="_blank" rel="noopener">
                    View Spinnaker
                  </Link>
                </TableCell>
                <TableCell>{entry.changeType}</TableCell>
                <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {entry.comments}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {entry.status !== 'Activated' && (
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        startIcon={<CheckIcon />}
                        onClick={() => handleMarkReady(index)}
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
