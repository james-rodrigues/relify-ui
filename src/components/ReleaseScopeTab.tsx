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
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';

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
}

const ReleaseScopeTab: React.FC<ReleaseScopeTabProps> = ({
  dialogOpen,
  setDialogOpen,
  newEntry,
  handleEntryChange,
  handleAddEntry,
  entries,
  handleEditEntry,
}) => {
  return (
    <div className="scope-content" style={{ overflowX: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          style={{ margin: '10px 0' }}
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Edit</TableCell>
              <TableCell>Change Request Number</TableCell>
              <TableCell>Seal Id</TableCell>
              <TableCell>Team Name</TableCell>
              <TableCell>Key Dev Lead</TableCell>
              <TableCell>Product Contact</TableCell>
              <TableCell>Tech Lead</TableCell>
              <TableCell>SRE KT Done</TableCell>
              <TableCell>Runbook Update Done</TableCell>
              <TableCell>DRM Comments</TableCell>
              <TableCell>Snowflake Impact</TableCell>
              <TableCell>Initiative Link</TableCell>
              <TableCell>Epic Link</TableCell>
              <TableCell>Story Link</TableCell>
              <TableCell>Primary On Call</TableCell>
              <TableCell>Secondary On Call</TableCell>
              <TableCell>Changes Involved</TableCell>
              <TableCell>Services To Be Deployed</TableCell>
              <TableCell>Upstream/Downstream Impact</TableCell>
              <TableCell>IST Tested</TableCell>
              <TableCell>UAT Tested</TableCell>
              <TableCell>Related Incidents</TableCell>
              <TableCell>Release Branch Name</TableCell>
              <TableCell>Manual Task Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditEntry(index)}>
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
                <TableCell>{entry.changeRequestNumber}</TableCell>
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
                <TableCell>{entry.personOnCallPrimary}</TableCell>
                <TableCell>{entry.personOnCallSecondary}</TableCell>
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
