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
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddEntry}>Add</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Repo Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Comments</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Repo Type</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Release Branch Link</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Draft PR Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.repoName}</TableCell>
                <TableCell>{entry.comments}</TableCell>
                <TableCell>{entry.repoType}</TableCell>
                <TableCell><a href={entry.releaseBranchLink}>View Release</a></TableCell>
                <TableCell><a href={entry.draftPRLink}>View Draft PR</a></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ApplicationPipelinesTab;
