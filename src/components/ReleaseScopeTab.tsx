import React from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Sync as SyncIcon } from '@mui/icons-material';

interface ReleaseScopeEntry {
  changeRequestNumber: string;
  sealId: string;
  teamName: string;
  keyDevLead: string;
  productContact: string;
  sreKTDone: 'Yes' | 'No' | 'N/A';
  runbookUpdateDone: 'Yes' | 'No' | 'N/A';
  drmComments: string;
  snowflakeImpact: string;
  techLead: string;
  initiativeLink: string;
  epicLink: string;
  storyLink: string;
  personOnCallPrimary: string;
  personOnCallSecondary: string;
  changesInvolved: string;
  servicesToBeDeployed: string;
  upstreamDownstreamImpact: 'Yes' | 'No' | 'N/A';
  istTested: 'Yes' | 'No' | 'N/A';
  uatTested: 'Yes' | 'No' | 'N/A';
  relatedIncidents: string;
  releaseBranchName: string;
  manualTaskComments: string;
}

interface ReleaseScopeTabProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newEntry: ReleaseScopeEntry;
  handleEntryChange: (field: keyof ReleaseScopeEntry, value: string) => void;
  handleAddEntry: () => void;
  entries: ReleaseScopeEntry[];
  handleEditEntry: (index: number) => void;
  handleSyncToConfluence?: () => void;
}

const ReleaseScopeTab: React.FC<ReleaseScopeTabProps> = ({
  dialogOpen,
  setDialogOpen,
  newEntry,
  handleEntryChange,
  handleAddEntry,
  entries,
  handleEditEntry,
  handleSyncToConfluence,
}) => {
  return (
    <div className="scope-content" style={{ width: '100%', overflowX: 'auto' }}>
      <div className="scope-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginBottom: '20px' }}>
        <Button
          variant="outlined"
          startIcon={<SyncIcon />}
          onClick={handleSyncToConfluence}
          className="sync-confluence-btn"
        >
          Sync to Confluence
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          className="add-entry-btn"
        >
          Add Entry
        </Button>
      </div>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Add Release Entry</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Change Request Number" 
                value={newEntry.changeRequestNumber} 
                onChange={(e) => handleEntryChange('changeRequestNumber', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Seal Id" 
                value={newEntry.sealId} 
                onChange={(e) => handleEntryChange('sealId', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Team Name" 
                value={newEntry.teamName} 
                onChange={(e) => handleEntryChange('teamName', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Key Dev Lead" 
                value={newEntry.keyDevLead} 
                onChange={(e) => handleEntryChange('keyDevLead', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Product Contact" 
                value={newEntry.productContact} 
                onChange={(e) => handleEntryChange('productContact', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Tech Lead" 
                value={newEntry.techLead} 
                onChange={(e) => handleEntryChange('techLead', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Initiative Link" 
                value={newEntry.initiativeLink} 
                onChange={(e) => handleEntryChange('initiativeLink', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Epic Link" 
                value={newEntry.epicLink} 
                onChange={(e) => handleEntryChange('epicLink', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Story Link" 
                value={newEntry.storyLink} 
                onChange={(e) => handleEntryChange('storyLink', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Primary On Call" 
                value={newEntry.personOnCallPrimary} 
                onChange={(e) => handleEntryChange('personOnCallPrimary', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Secondary On Call" 
                value={newEntry.personOnCallSecondary} 
                onChange={(e) => handleEntryChange('personOnCallSecondary', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Changes Involved" 
                value={newEntry.changesInvolved} 
                onChange={(e) => handleEntryChange('changesInvolved', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Services To Be Deployed" 
                value={newEntry.servicesToBeDeployed} 
                onChange={(e) => handleEntryChange('servicesToBeDeployed', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Upstream/Downstream Impact" 
                value={newEntry.upstreamDownstreamImpact} 
                onChange={(e) => handleEntryChange('upstreamDownstreamImpact', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="IST Tested" 
                value={newEntry.istTested} 
                onChange={(e) => handleEntryChange('istTested', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="UAT Tested" 
                value={newEntry.uatTested} 
                onChange={(e) => handleEntryChange('uatTested', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Related Incidents" 
                value={newEntry.relatedIncidents} 
                onChange={(e) => handleEntryChange('relatedIncidents', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Release Branch Name" 
                value={newEntry.releaseBranchName} 
                onChange={(e) => handleEntryChange('releaseBranchName', e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Manual Task Comments" 
                value={newEntry.manualTaskComments} 
                onChange={(e) => handleEntryChange('manualTaskComments', e.target.value)} 
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEntry}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer 
        component={Paper} 
        className="scope-table" 
        sx={{ 
          width: '100%', 
          maxWidth: '100%',
          overflowX: 'scroll',
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          }
        }}
      >
        <Table sx={{ minWidth: '3500px', tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell 
                className="table-header" 
                sx={{ 
                  minWidth: '80px', 
                  width: '80px',
                  position: 'sticky', 
                  left: 0, 
                  zIndex: 3, 
                  bgcolor: '#1976d2',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                Action
              </TableCell>
              <TableCell 
                className="table-header" 
                sx={{ 
                  minWidth: '150px', 
                  width: '150px',
                  position: 'sticky', 
                  left: '80px', 
                  zIndex: 3, 
                  bgcolor: '#1976d2',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                Change Request Number
              </TableCell>
              <TableCell className="table-header" sx={{ minWidth: '120px', width: '120px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Seal Id</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '120px', width: '120px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Team Name</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '120px', width: '120px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Key Dev Lead</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '120px', width: '120px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Product Contact</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '120px', width: '120px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Tech Lead</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '120px', width: '120px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>SRE KT Done</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '150px', width: '150px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Runbook Update Done</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '150px', width: '150px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>DRM Comments</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '130px', width: '130px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Snowflake Impact</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '150px', width: '150px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Initiative Link</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '120px', width: '120px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Epic Link</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '120px', width: '120px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Story Link</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '180px', width: '180px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Point of Contact</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '200px', width: '200px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Changes Involved</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '180px', width: '180px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Services To Be Deployed</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '180px', width: '180px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Upstream/Downstream Impact</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '100px', width: '100px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>IST Tested</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '100px', width: '100px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>UAT Tested</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '150px', width: '150px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Related Incidents</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '160px', width: '160px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Release Branch Name</TableCell>
              <TableCell className="table-header" sx={{ minWidth: '200px', width: '200px', bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Manual Task Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell sx={{ position: 'sticky', left: 0, zIndex: 2, bgcolor: 'background.paper' }}>
                  <IconButton size="small" onClick={() => handleEditEntry(index)}>
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ position: 'sticky', left: '80px', zIndex: 2, bgcolor: 'background.paper' }}>{entry.changeRequestNumber}</TableCell>
                <TableCell>{entry.sealId}</TableCell>
                <TableCell>{entry.teamName}</TableCell>
                <TableCell>{entry.keyDevLead}</TableCell>
                <TableCell>{entry.productContact}</TableCell>
                <TableCell>{entry.techLead}</TableCell>
                <TableCell>{entry.sreKTDone}</TableCell>
                <TableCell>{entry.runbookUpdateDone}</TableCell>
                <TableCell>{entry.drmComments}</TableCell>
                <TableCell>{entry.snowflakeImpact}</TableCell>
                <TableCell>{entry.initiativeLink}</TableCell>
                <TableCell>{entry.epicLink}</TableCell>
                <TableCell>{entry.storyLink}</TableCell>
                <TableCell>
                  <div style={{ fontSize: '0.875rem' }}>
                    <div><strong>Primary:</strong> {entry.personOnCallPrimary}</div>
                    <div><strong>Secondary:</strong> {entry.personOnCallSecondary}</div>
                  </div>
                </TableCell>
                <TableCell>{entry.changesInvolved}</TableCell>
                <TableCell>{entry.servicesToBeDeployed}</TableCell>
                <TableCell>{entry.upstreamDownstreamImpact}</TableCell>
                <TableCell>{entry.istTested}</TableCell>
                <TableCell>{entry.uatTested}</TableCell>
                <TableCell>{entry.relatedIncidents}</TableCell>
                <TableCell>{entry.releaseBranchName}</TableCell>
                <TableCell>{entry.manualTaskComments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReleaseScopeTab;
