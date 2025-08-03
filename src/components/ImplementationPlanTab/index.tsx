import React, { useState } from 'react';
import implementationPlanData from '../../mockData/implementationPlanData.json';
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
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon
} from '@mui/icons-material';

interface ImplementationEntry {
  repoName: string;
  backoutBranchName: string;
  pocNames: string;
  preImplementationSteps: string;
  implementationSteps: string;
  postValidationSteps: string;
  backoutSteps: string;
  backoutValidationSteps: string;
}

interface ImplementationPlanTabProps {
  releaseName: string;
  releaseDate: string;
}

const ImplementationPlanTab: React.FC<ImplementationPlanTabProps> = ({
  releaseName,
  releaseDate,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newEntry, setNewEntry] = useState({
    repoName: '',
    backoutBranchName: '',
    pocNames: ''
  });
  const [editEntry, setEditEntry] = useState<ImplementationEntry | null>(null);
  const [entries, setEntries] = useState<ImplementationEntry[]>(implementationPlanData as ImplementationEntry[]);

  const handleEntryChange = (field: keyof typeof newEntry, value: string) => {
    setNewEntry(prev => ({ ...prev, [field]: value }));
  };

  const handleAddEntry = () => {
    const defaultSteps = 'TBD - Please update implementation steps';
    const newImplementationEntry: ImplementationEntry = {
      repoName: newEntry.repoName,
      backoutBranchName: newEntry.backoutBranchName,
      pocNames: newEntry.pocNames,
      preImplementationSteps: defaultSteps,
      implementationSteps: defaultSteps,
      postValidationSteps: defaultSteps,
      backoutSteps: defaultSteps,
      backoutValidationSteps: defaultSteps
    };
    
    setEntries(prev => [...prev, newImplementationEntry]);
    setDialogOpen(false);
    setNewEntry({ repoName: '', backoutBranchName: '', pocNames: '' }); // Reset form
  };

  const handleEditEntry = (index: number) => {
    setEditingIndex(index);
    setEditEntry(entries[index]);
    setEditDialogOpen(true);
  };

  const handleUpdateEntry = () => {
    if (editingIndex !== null && editEntry) {
      setEntries(prev => prev.map((entry, index) => 
        index === editingIndex ? editEntry : entry
      ));
      setEditDialogOpen(false);
      setEditingIndex(null);
      setEditEntry(null);
    }
  };

  const handleEditEntryChange = (field: keyof ImplementationEntry, value: string) => {
    if (editEntry) {
      setEditEntry(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  return (
    <div className="implementation-content">
      <Typography variant="h5" className="section-title" sx={{ mb: 2 }}>
        Implementation Plan for {releaseName}
      </Typography>
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
        <DialogTitle>Add Implementation Entry</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth 
            margin="normal" 
            label="Repository Name" 
            value={newEntry.repoName} 
            onChange={e => handleEntryChange('repoName', e.target.value)}
            placeholder="e.g., user-service"
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Backout Branch Name" 
            value={newEntry.backoutBranchName} 
            onChange={e => handleEntryChange('backoutBranchName', e.target.value)}
            placeholder="e.g., user-service-backout"
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="POC Names" 
            value={newEntry.pocNames} 
            onChange={e => handleEntryChange('pocNames', e.target.value)}
            placeholder="e.g., John Doe, Jane Smith"
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
            disabled={!newEntry.repoName.trim() || !newEntry.pocNames.trim()}
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

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Edit Implementation Steps</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth 
            margin="normal" 
            label="Repository Name" 
            value={editEntry?.repoName || ''} 
            onChange={e => handleEditEntryChange('repoName', e.target.value)}
            disabled
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="POC Names" 
            value={editEntry?.pocNames || ''} 
            onChange={e => handleEditEntryChange('pocNames', e.target.value)}
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Pre Implementation Steps" 
            value={editEntry?.preImplementationSteps || ''} 
            onChange={e => handleEditEntryChange('preImplementationSteps', e.target.value)}
            multiline
            rows={3}
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Implementation Steps" 
            value={editEntry?.implementationSteps || ''} 
            onChange={e => handleEditEntryChange('implementationSteps', e.target.value)}
            multiline
            rows={3}
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Post Validation Steps" 
            value={editEntry?.postValidationSteps || ''} 
            onChange={e => handleEditEntryChange('postValidationSteps', e.target.value)}
            multiline
            rows={3}
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Backout Steps" 
            value={editEntry?.backoutSteps || ''} 
            onChange={e => handleEditEntryChange('backoutSteps', e.target.value)}
            multiline
            rows={3}
          />
          <TextField 
            fullWidth 
            margin="normal" 
            label="Backout Validation Steps" 
            value={editEntry?.backoutValidationSteps || ''} 
            onChange={e => handleEditEntryChange('backoutValidationSteps', e.target.value)}
            multiline
            rows={3}
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
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {entries.map((entry, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: '#f5f5f5' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {entry.repoName}
                </Typography>
                <Chip 
                  label={entry.pocNames} 
                  color="primary" 
                  variant="outlined" 
                  size="small"
                />
              </Box>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditEntry(index);
                }}
                sx={{ ml: 'auto' }}
              >
                Edit
              </Button>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Pre Implementation Steps" 
                  secondary={entry.preImplementationSteps}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Implementation Steps" 
                  secondary={entry.implementationSteps}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Post Validation Steps" 
                  secondary={entry.postValidationSteps}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="warning" />
                </ListItemIcon>
                <ListItemText 
                  primary="Backout Steps" 
                  secondary={entry.backoutSteps}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="warning" />
                </ListItemIcon>
                <ListItemText 
                  primary="Backout Validation Steps" 
                  secondary={entry.backoutValidationSteps}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default ImplementationPlanTab;

