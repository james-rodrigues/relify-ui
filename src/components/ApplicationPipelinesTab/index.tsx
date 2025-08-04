import React, { useState } from 'react';
import applicationPipelinesData from '../../mockData/applicationPipelinesData.json';
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
  IconButton
} from '@mui/material';
import { Add as AddIcon, Link as LinkIcon, Edit as EditIcon, GetApp as ExportIcon } from '@mui/icons-material';

interface ApplicationPipelinesEntry {
  repoName: string;
  comments: string;
  repoType: 'Backend' | 'UI' | 'Infra';
  releaseBranchLink: string;
  draftPRLink: string;
  environment: 'Development' | 'Staging' | 'Production';
  jetLink: string;
  deploymentLink: string;
}

interface ApplicationPipelinesTabProps {
  releaseName: string;
}

const Pipelines: React.FC<ApplicationPipelinesTabProps> = ({
  releaseName,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newEntry, setNewEntry] = useState({
    repoName: '',
    releaseBranchName: '',
    backoutBranchName: '',
    comments: ''
  });
  const [editEntry, setEditEntry] = useState<ApplicationPipelinesEntry | null>(null);
  const [entries, setEntries] = useState<ApplicationPipelinesEntry[]>(applicationPipelinesData as ApplicationPipelinesEntry[]);

  const handleEntryChange = (field: keyof typeof newEntry, value: string) => {
    setNewEntry(prev => ({ ...prev, [field]: value }));
  };

  const handleAddEntry = () => {
    setEntries(prev => [...prev, {
      repoName: newEntry.repoName,
      comments: newEntry.comments || 'No comments',
      repoType: 'Backend',
      releaseBranchLink: `https://github.com/${newEntry.repoName}/compare/${newEntry.releaseBranchName}`,
      draftPRLink: `https://github.com/${newEntry.repoName}/pull/new/${encodeURIComponent(newEntry.releaseBranchName)}`,
      environment: 'Development',
      jetLink: `https://jet.company.com/${newEntry.repoName}/deploy`,
      deploymentLink: `https://deploy.company.com/${newEntry.repoName}/latest`
    }]);
    setDialogOpen(false);
    setNewEntry({ repoName: '', releaseBranchName: '', backoutBranchName: '', comments: '' }); // Reset form
  };

  const handleExport = () => {
    const csvContent = [
      ['Repo Name', 'Repo Type', 'Current Environment', 'Jet Link', 'Deployment Link', 'Release Branch Link', 'Draft PR Link', 'Comments'],
      ...entries.map(entry => [
        entry.repoName,
        entry.repoType,
        entry.environment,
        entry.jetLink,
        entry.deploymentLink,
        entry.releaseBranchLink,
        entry.draftPRLink,
        entry.comments.replace(/\n/g, ' ').replace(/,/g, ';')
      ])
    ]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'pipelines.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditEntry({ ...entries[index] });
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (editingIndex !== null && editEntry) {
      const updatedEntries = [...entries];
      updatedEntries[editingIndex] = editEntry;
      setEntries(updatedEntries);
      setEditDialogOpen(false);
      setEditingIndex(null);
      setEditEntry(null);
    }
  };

  const handleEditCancel = () => {
    setEditDialogOpen(false);
    setEditingIndex(null);
    setEditEntry(null);
  };

  const handleEditEntryChange = (field: keyof ApplicationPipelinesEntry, value: string) => {
    if (editEntry) {
      setEditEntry(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  return (
    <div className="pipelines-content">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton
          sx={{ mr: 1, color: '#6495ED' }}
          aria-label="export"
          onClick={handleExport}
        >
          <ExportIcon />
        </IconButton>
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
            '&:disabled': {
              background: '#ccc',
              color: '#999',
              boxShadow: 'none',
              transform: 'none',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Add Entry
        </Button>
      </Box>
      
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Pipeline Entry</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth 
            margin="normal" 
            label="Repo Name" 
            value={newEntry.repoName} 
            onChange={e => handleEntryChange('repoName', e.target.value)} 
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Release Branch Name" 
            value={newEntry.releaseBranchName} 
            onChange={e => handleEntryChange('releaseBranchName', e.target.value)} 
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Backout Branch Name" 
            value={newEntry.backoutBranchName} 
            onChange={e => handleEntryChange('backoutBranchName', e.target.value)} 
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Comments"
            multiline
            rows={4}
            value={newEntry.comments || ''} 
            onChange={(e) => setNewEntry((prev) => ({ ...prev, comments: e.target.value }))}
            placeholder="Enter comments about this repository..."
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
            Add
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditCancel} fullWidth maxWidth="md">
        <DialogTitle>Edit Pipeline Entry</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth 
            margin="normal" 
            label="Repository Name" 
            value={editEntry?.repoName || ''} 
            onChange={e => handleEditEntryChange('repoName', e.target.value)}
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Repo Type"
            select
            SelectProps={{ native: true }}
            value={editEntry?.repoType || 'Backend'} 
            onChange={e => handleEditEntryChange('repoType', e.target.value as 'Backend' | 'UI' | 'Infra')}
          >
            <option value="Backend">Backend</option>
            <option value="UI">UI</option>
            <option value="Infra">Infra</option>
          </TextField>
          <TextField 
            fullWidth 
            margin="normal" 
            label="Current Environment"
            select
            SelectProps={{ native: true }}
            value={editEntry?.environment || 'Development'} 
            onChange={e => handleEditEntryChange('environment', e.target.value as 'Development' | 'Staging' | 'Production')}
          >
            <option value="Development">Development</option>
            <option value="Staging">Staging</option>
            <option value="Production">Production</option>
          </TextField>
          <TextField 
            fullWidth 
            margin="normal" 
            label="Jet Link" 
            value={editEntry?.jetLink || ''} 
            onChange={e => handleEditEntryChange('jetLink', e.target.value)}
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Deployment Link" 
            value={editEntry?.deploymentLink || ''} 
            onChange={e => handleEditEntryChange('deploymentLink', e.target.value)}
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Release Branch Link" 
            value={editEntry?.releaseBranchLink || ''} 
            onChange={e => handleEditEntryChange('releaseBranchLink', e.target.value)}
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Draft PR Link" 
            value={editEntry?.draftPRLink || ''} 
            onChange={e => handleEditEntryChange('draftPRLink', e.target.value)}
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Comments"
            multiline
            rows={4}
            value={editEntry?.comments || ''} 
            onChange={e => handleEditEntryChange('comments', e.target.value)}
            placeholder="Enter comments about this repository..."
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleEditCancel}
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
            onClick={handleEditSave}
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
            Save Changes
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
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                width: '60px',
              }}>
                {/* Empty header for edit column */}
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Repo Name
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Repo Type
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Current Environment
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Jet Link
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Deployment Link
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Release Branch Link
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Draft PR Link
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Comments
              </TableCell>
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
                <TableCell>
                  <EditIcon 
                    style={{ cursor: 'pointer', color: '#6495ED' }} 
                    onClick={() => handleEditClick(index)}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{entry.repoName}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{entry.repoType}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{entry.environment}</TableCell>
                <TableCell>
                  <a 
                    href={entry.jetLink}
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
                    View Jet
                  </a>
                </TableCell>
                <TableCell>
                  <a 
                    href={entry.deploymentLink}
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
                    View Deployment
                  </a>
                </TableCell>
                <TableCell>
                  <a 
                    href={entry.releaseBranchLink}
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
                    View Release
                  </a>
                </TableCell>
                <TableCell>
                  <a 
                    href={entry.draftPRLink}
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
                    View Draft PR
                  </a>
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 500,
                  maxWidth: '200px',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap'
                }}>
                  {entry.comments}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Pipelines;
