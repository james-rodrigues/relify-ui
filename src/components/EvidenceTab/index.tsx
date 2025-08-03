import React, { useState, useCallback } from 'react';
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
  Link,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { Add as AddIcon, CloudUpload as UploadIcon, InsertDriveFile as FileIcon } from '@mui/icons-material';

interface EvidenceEntry {
  task: string;
  taskInstruction: string;
  evidenceLink: string;
  evidenceFileName: string;
  assignedGroup: 'L2 Team' | 'AD Team' | 'Ops Team' | 'Product Team';
  pointOfContact: string;
}

interface EvidenceTabProps {
  releaseName: string;
}

const EvidenceTab: React.FC<EvidenceTabProps> = ({
  releaseName,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    task: '',
    taskInstruction: '',
    assignedGroup: 'L2 Team' as 'L2 Team' | 'AD Team' | 'Ops Team' | 'Product Team',
    pointOfContact: '',
    uploadedFile: null as File | null
  });
  const [dragOver, setDragOver] = useState(false);
  const [entries, setEntries] = useState<EvidenceEntry[]>([
    {
      task: 'user-service deployment',
      taskInstruction: 'Deploy the latest version of user-service to production environment. Ensure all health checks pass and monitor for any issues during the deployment process.',
      evidenceLink: 'https://evidence.company.com/files/user-service-deploy-logs.pdf',
      evidenceFileName: 'user-service-deploy-logs.pdf',
      assignedGroup: 'Ops Team',
      pointOfContact: 'john.doe@company.com'
    },
    {
      task: 'Frontend application testing',
      taskInstruction: 'Perform comprehensive end-to-end testing of the frontend application including all new features, regression testing, and user acceptance criteria validation.',
      evidenceLink: 'https://evidence.company.com/files/frontend-test-results.zip',
      evidenceFileName: 'frontend-test-results.zip',
      assignedGroup: 'L2 Team',
      pointOfContact: 'jane.smith@company.com'
    },
    {
      task: 'Database migration validation',
      taskInstruction: 'Validate that all database migrations have been applied correctly and verify data integrity. Run performance tests on critical queries.',
      evidenceLink: 'https://evidence.company.com/files/db-migration-report.json',
      evidenceFileName: 'db-migration-report.json',
      assignedGroup: 'AD Team',
      pointOfContact: 'mike.wilson@company.com'
    },
    {
      task: 'Product feature verification',
      taskInstruction: 'Verify that all new product features are working as expected and meet the acceptance criteria defined in the product requirements.',
      evidenceLink: 'https://evidence.company.com/files/feature-verification.docx',
      evidenceFileName: 'feature-verification.docx',
      assignedGroup: 'Product Team',
      pointOfContact: 'sarah.johnson@company.com'
    }
  ]);

  const handleEntryChange = (field: keyof typeof newEntry, value: string) => {
    setNewEntry(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = useCallback((file: File) => {
    setNewEntry(prev => ({ ...prev, uploadedFile: file }));
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleAddEntry = () => {
    if (!newEntry.task.trim() || !newEntry.taskInstruction.trim() || !newEntry.uploadedFile || !newEntry.pointOfContact.trim()) {
      return;
    }

    // Mock file upload - in real app, you'd upload to a server
    const mockFileUrl = `https://evidence.company.com/files/${newEntry.uploadedFile.name}`;
    
    const newEvidenceEntry: EvidenceEntry = {
      task: newEntry.task,
      taskInstruction: newEntry.taskInstruction,
      evidenceLink: mockFileUrl,
      evidenceFileName: newEntry.uploadedFile.name,
      assignedGroup: newEntry.assignedGroup,
      pointOfContact: newEntry.pointOfContact
    };
    
    setEntries(prev => [...prev, newEvidenceEntry]);
    setDialogOpen(false);
    setNewEntry({ 
      task: '', 
      taskInstruction: '', 
      assignedGroup: 'L2 Team',
      pointOfContact: '',
      uploadedFile: null 
    });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewEntry({ 
      task: '', 
      taskInstruction: '', 
      assignedGroup: 'L2 Team',
      pointOfContact: '',
      uploadedFile: null 
    });
  };

  return (
    <div className="evidence-content">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
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

      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="md">
        <DialogTitle>Add Evidence Entry</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth 
            margin="normal" 
            label="Task (Repo name or Manual)" 
            value={newEntry.task} 
            onChange={e => handleEntryChange('task', e.target.value)}
            placeholder="e.g., user-service deployment or Manual database cleanup"
          />
          
          <TextField 
            fullWidth 
            margin="normal" 
            label="Task Instruction"
            multiline
            rows={4}
            value={newEntry.taskInstruction} 
            onChange={e => handleEntryChange('taskInstruction', e.target.value)}
            placeholder="Enter detailed instructions for the task..."
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Assigned Group</InputLabel>
            <Select
              value={newEntry.assignedGroup}
              label="Assigned Group"
              onChange={(e) => handleEntryChange('assignedGroup', e.target.value)}
            >
              <MenuItem value="L2 Team">L2 Team</MenuItem>
              <MenuItem value="AD Team">AD Team</MenuItem>
              <MenuItem value="Ops Team">Ops Team</MenuItem>
              <MenuItem value="Product Team">Product Team</MenuItem>
            </Select>
          </FormControl>
          
          <TextField 
            fullWidth 
            margin="normal" 
            label="Point of Contact" 
            value={newEntry.pointOfContact} 
            onChange={e => handleEntryChange('pointOfContact', e.target.value)}
            placeholder="e.g., john.doe@company.com"
          />
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Evidence Files
            </Typography>
            <Box
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              sx={{
                border: `2px dashed ${dragOver ? '#1976d2' : '#ccc'}`,
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                backgroundColor: dragOver ? '#f3f7ff' : '#fafafa',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#1976d2',
                  backgroundColor: '#f3f7ff'
                }
              }}
              onClick={() => document.getElementById('file-upload-input')?.click()}
            >
              <input
                id="file-upload-input"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
                accept=".pdf,.doc,.docx,.zip,.png,.jpg,.jpeg,.json,.txt,.log"
              />
              
              {newEntry.uploadedFile ? (
                <Box>
                  <FileIcon sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {newEntry.uploadedFile.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {(newEntry.uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                  <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                    Click to change file
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <UploadIcon sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
                  <Typography variant="body1">
                    Drag and drop files here, or click to browse
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Supports: PDF, DOC, ZIP, Images, JSON, TXT, LOG files
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          
          {newEntry.task && newEntry.taskInstruction && newEntry.uploadedFile && newEntry.pointOfContact && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Ready to add evidence for <strong>{newEntry.task}</strong> assigned to <strong>{newEntry.assignedGroup}</strong> with contact <strong>{newEntry.pointOfContact}</strong>
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleDialogClose}
            sx={{
              color: '#666',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                color: '#333',
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAddEntry}
            disabled={!newEntry.task.trim() || !newEntry.taskInstruction.trim() || !newEntry.uploadedFile || !newEntry.pointOfContact.trim()}
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
            Add Evidence
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
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Task
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Task Instruction
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Evidence
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Assigned Group
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Point of Contact
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
                <TableCell sx={{ fontWeight: 500 }}>{entry.task}</TableCell>
                <TableCell sx={{ 
                  fontWeight: 400,
                  maxWidth: '300px',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap'
                }}>
                  {entry.taskInstruction}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FileIcon fontSize="small" color="action" />
                    <Link 
                      href={entry.evidenceLink} 
                      target="_blank" 
                      rel="noopener"
                      sx={{
                        color: '#6495ED',
                        textDecoration: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          textDecoration: 'underline',
                          color: '#4169E1',
                        },
                      }}
                    >
                      {entry.evidenceFileName}
                    </Link>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 2,
                      py: 0.5,
                      borderRadius: '16px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      backgroundColor: 
                        entry.assignedGroup === 'L2 Team' ? '#e3f2fd' :
                        entry.assignedGroup === 'AD Team' ? '#f3e5f5' :
                        entry.assignedGroup === 'Ops Team' ? '#e8f5e8' :
                        '#fff3e0',
                      color:
                        entry.assignedGroup === 'L2 Team' ? '#1976d2' :
                        entry.assignedGroup === 'AD Team' ? '#7b1fa2' :
                        entry.assignedGroup === 'Ops Team' ? '#388e3c' :
                        '#f57c00',
                    }}
                  >
                    {entry.assignedGroup}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#1976d2' }}>
                  {entry.pointOfContact}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EvidenceTab;

