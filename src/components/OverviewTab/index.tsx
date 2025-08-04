import React from 'react';
import {
  Typography,
  IconButton,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Paper,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import Link from '@mui/material/Link';

interface OverviewTabProps {
  releaseName: string;
  releaseDate: string;
  releaseType: 'monthly' | 'offcycle';
  fixVersion: string;
  snowLink: string;
  isNotesEditMode: boolean;
  setIsNotesEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  releaseNotes: string;
  setReleaseNotes: React.Dispatch<React.SetStateAction<string>>;
  isMetricsEditMode: boolean;
  setIsMetricsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  keyMetrics: string;
  setKeyMetrics: React.Dispatch<React.SetStateAction<string>>;
  handleSendReleaseNotes: () => Promise<void>;
  sendingActivityEmails: Set<string>;
  handleSendActivityEmail: (activityId: string, activityName: string) => Promise<void>;
  formatDate: (dateString: string) => string;
  getStatusColor: (status: string) => 'success' | 'warning' | 'error' | 'default';
  activityTimeline: {
    id: string;
    activityName: string;
    activityDueDate: string;
    status: 'completed' | 'pending' | 'overdue';
    assignee: string;
  }[];
  isSending: boolean;
  handleSaveNotes: () => Promise<void>;
  handleSaveMetrics: () => Promise<void>;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  releaseName,
  fixVersion,
  snowLink,
  isNotesEditMode,
  setIsNotesEditMode,
  releaseNotes,
  setReleaseNotes,
  isMetricsEditMode,
  setIsMetricsEditMode,
  keyMetrics,
  setKeyMetrics,
  handleSendReleaseNotes,
  sendingActivityEmails,
  handleSendActivityEmail,
  formatDate,
  getStatusColor,
  activityTimeline,
  isSending,
  handleSaveNotes,
  handleSaveMetrics,
}) => {
  return (
    <div className="overview-content">
      <Typography variant="h5" className="section-title">
        Release Overview
      </Typography>

      {/* Fix Version and SNOW Link Row */}
      <div className="overview-header">
        <div className="header-row">
          <div className="header-field">
            <Typography variant="body2" className="field-label">
              Fix Version:
            </Typography>
            <Typography variant="body1" className="field-value">
              {fixVersion}
            </Typography>
          </div>
          <div className="header-field">
            <Typography variant="body2" className="field-label">
              SNOW Link:
            </Typography>
            <Link href={snowLink} target="_blank" rel="noopener noreferrer" className="field-link">
              {snowLink.split('/').pop()}
            </Link>
          </div>
          <div className="header-field">
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={handleSendReleaseNotes}
              disabled={isSending}
              className="send-notes-btn"
            >
              {isSending ? 'Sending...' : 'Send Release Notes'}
            </Button>
          </div>
        </div>
      </div>

      <div className="overview-cards">
        {/* Release Notes Section */}
        <div className="overview-card">
          <div className="card-header">
            <Typography variant="h6" className="card-title">
              Release Notes
            </Typography>
            <IconButton
              onClick={() => setIsNotesEditMode(!isNotesEditMode)}
              className="edit-icon"
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </div>

          {isNotesEditMode ? (
            <div className="edit-container">
              <TextField
                multiline
                rows={6}
                fullWidth
                value={releaseNotes}
                onChange={(e) => setReleaseNotes(e.target.value)}
                placeholder="Enter release notes... Use • for bullet points or 1. for numbered lists"
                className="editable-textarea"
                variant="outlined"
              />
              <div className="edit-actions">
                <Button
                  startIcon={<SaveIcon />}
                  onClick={handleSaveNotes}
                  variant="contained"
                  size="small"
                  className="save-btn"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => setIsNotesEditMode(false)}
                  variant="outlined"
                  size="small"
                  className="cancel-btn"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Typography variant="body2" className="card-content" style={{ whiteSpace: 'pre-line' }}>
              {releaseNotes}
            </Typography>
          )}
        </div>

        {/* Key Metrics Section */}
        <div className="overview-card">
          <div className="card-header">
            <Typography variant="h6" className="card-title">
              Key Metrics
            </Typography>
            <IconButton
              onClick={() => setIsMetricsEditMode(!isMetricsEditMode)}
              className="edit-icon"
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </div>

          {isMetricsEditMode ? (
            <div className="edit-container">
              <TextField
                multiline
                rows={6}
                fullWidth
                value={keyMetrics}
                onChange={(e) => setKeyMetrics(e.target.value)}
                placeholder="Enter key metrics... Use • for bullet points or 1. for numbered lists"
                className="editable-textarea"
                variant="outlined"
              />
              <div className="edit-actions">
                <Button
                  startIcon={<SaveIcon />}
                  onClick={handleSaveMetrics}
                  variant="contained"
                  size="small"
                  className="save-btn"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => setIsMetricsEditMode(false)}
                  variant="outlined"
                  size="small"
                  className="cancel-btn"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Typography variant="body2" className="card-content" style={{ whiteSpace: 'pre-line' }}>
              {keyMetrics}
            </Typography>
          )}
        </div>
      </div>

      {/* Activity Timeline Section */}
      <div className="activity-timeline-section">
        <Typography variant="h6" className="timeline-title">
          Activity Timeline
        </Typography>
        <TableContainer component={Paper} className="timeline-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="table-header">Activity Name</TableCell>
                <TableCell className="table-header">Activity Due Date</TableCell>
                <TableCell className="table-header">Assignee</TableCell>
                <TableCell className="table-header">Status</TableCell>
                <TableCell className="table-header" align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activityTimeline.map((activity) => (
                <TableRow key={activity.id} className="table-row">
                  <TableCell className="activity-name">
                    {activity.activityName}
                  </TableCell>
                  <TableCell className="activity-date">
                    {formatDate(activity.activityDueDate)}
                  </TableCell>
                  <TableCell className="assignee">
                    {activity.assignee}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        activity.status.charAt(0).toUpperCase() +
                        activity.status.slice(1)
                      }
                      color={getStatusColor(activity.status) as any}
                      size="small"
                      className="status-chip"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<SendIcon />}
                      onClick={() => handleSendActivityEmail(activity.id, activity.activityName)}
                      disabled={sendingActivityEmails.has(activity.id)}
                      className="send-email-btn"
                    >
                      {sendingActivityEmails.has(activity.id)
                        ? 'Sending...'
                        : 'Send Email'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default OverviewTab;
