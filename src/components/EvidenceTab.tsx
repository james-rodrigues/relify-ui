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
  Alert
} from '@mui/material';
import { Add as AddIcon, CloudUpload as UploadIcon, InsertDriveFile as FileIcon } from '@mui/icons-material';

interface EvidenceEntry {
  repoName: string;
  evidenceLink: string;
  fileName: string;
  uploadDate: string;
}

interface EvidenceTabProps {
  releaseName: string;
}

const EvidenceTab: React.FC<EvidenceTabProps> = ({
  releaseName,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    repoName: '',
    uploadedFile: null as File | null
  });
  const [dragOver, setDragOver] = useState(false);
  const [entries, setEntries] = useState<EvidenceEntry[]>([
    {
      repoName: 'user-service',
      evidenceLink: 'https://evidence.company.com/files/user-service-deploy-logs.pdf',
      fileName: 'user-service-deploy-logs.pdf',
      uploadDate: '2024-01-15'
    },
    {
      repoName: 'frontend-app',
      evidenceLink: 'https://evidence.company.com/files/frontend-test-results.zip',
      fileName: 'frontend-test-results.zip',
      uploadDate: '2024-01-14'
    },
    {
      repoName: 'api-gateway',
      evidenceLink: 'https://evidence.company.com/files/gateway-performance-metrics.json',
      fileName: 'gateway-performance-metrics.json',
      uploadDate: '2024-01-13'
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
    if (!newEntry.repoName.trim() || !newEntry.uploadedFile) {
      return;
    }

    // Mock file upload - in real app, you'd upload to a server
    const mockFileUrl = `https://evidence.company.com/files/${newEntry.uploadedFile.name}`;
    
    const newEvidenceEntry: EvidenceEntry = {
      repoName: newEntry.repoName,
      evidenceLink: mockFileUrl,
      fileName: newEntry.uploadedFile.name,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    
    setEntries(prev => [...prev, newEvidenceEntry]);
    setDialogOpen(false);
    setNewEntry({ repoName: '', uploadedFile: null }); // Reset form
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewEntry({ repoName: '', uploadedFile: null });
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

      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Evidence Entry</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth 
            margin="normal" 
            label="Repository Name" 
            value={newEntry.repoName} 
            onChange={e => handleEntryChange('repoName', e.target.value)}
            placeholder="e.g., user-service"
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
          
          {newEntry.repoName && newEntry.uploadedFile && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Ready to upload evidence for <strong>{newEntry.repoName}</strong>
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
            disabled={!newEntry.repoName.trim() || !newEntry.uploadedFile}
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

      <TableContainer component={Paper}>
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
                Repository Name
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Evidence Link
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                File Name
              </TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)', 
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Upload Date
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
                <TableCell sx={{ fontWeight: 500 }}>{entry.repoName}</TableCell>
                <TableCell>
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
                    View Evidence
                  </Link>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FileIcon fontSize="small" color="action" />
                    <span style={{ fontWeight: 500 }}>{entry.fileName}</span>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{entry.uploadDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EvidenceTab;
