import React, { useState } from 'react'
import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Container,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material'
import { 
  ArrowBack as ArrowBackIcon, 
  Edit as EditIcon,
  Save as SaveIcon,
  Send as SendIcon
} from '@mui/icons-material'
import './ReleaseDetailView.scss'

interface ReleaseDetailViewProps {
  releaseName: string
  releaseDate: string
  releaseType: 'monthly' | 'offcycle'
  onBack: () => void
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className="tab-panel"
    >
      {value === index && (
        <Box className="tab-content">
          {children}
        </Box>
      )}
    </div>
  )
}

// Local interfaces for mock data
interface ReleaseNotesData {
  releaseName: string
  fixVersion: string
  snowLink: string
  releaseNotes: string
  keyMetrics: string
  recipientEmails: string[]
}

interface ActivityTimelineItem {
  id: string
  activityName: string
  activityDueDate: string
  status: 'completed' | 'pending' | 'overdue'
  assignee: string
}

interface ApiResponse {
  success: boolean
  message?: string
  error?: string
}

// Mock service functions
const generateFixVersion = (releaseDate: string, releaseType: 'monthly' | 'offcycle'): string => {
  const date = new Date(releaseDate)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const prefix = releaseType === 'monthly' ? 'M' : 'O'
  return `${prefix}${year}${month}${day}`
}

const generateSnowLink = (fixVersion: string): string => {
  return `https://servicenow.company.com/change_request.do?sysparm_query=number=${fixVersion}`
}

const getMockActivityTimeline = (): ActivityTimelineItem[] => {
  return [
    {
      id: '1',
      activityName: 'Code Review and Testing',
      activityDueDate: '2024-01-15',
      status: 'completed',
      assignee: 'John Doe'
    },
    {
      id: '2', 
      activityName: 'Security Assessment',
      activityDueDate: '2024-01-20',
      status: 'pending',
      assignee: 'Jane Smith'
    },
    {
      id: '3',
      activityName: 'Production Deployment',
      activityDueDate: '2024-01-18',
      status: 'overdue',
      assignee: 'Bob Johnson'
    },
    {
      id: '4',
      activityName: 'Post Deployment Validation',
      activityDueDate: '2024-01-25',
      status: 'pending',
      assignee: 'Alice Brown'
    }
  ]
}

const saveReleaseNotes = async (_releaseName: string, _notes: string): Promise<ApiResponse> => {
  // Mock API call with delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { success: true, message: 'Release notes saved successfully!' }
}

const saveKeyMetrics = async (_releaseName: string, _metrics: string): Promise<ApiResponse> => {
  // Mock API call with delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { success: true, message: 'Key metrics saved successfully!' }
}

const sendReleaseNotesMock = async (data: ReleaseNotesData): Promise<ApiResponse> => {
  // Mock API call with delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  return { 
    success: true, 
    message: `Release notes sent to ${data.recipientEmails.length} stakeholders` 
  }
}

const sendActivityEmailMock = async (_activityId: string, activityName: string): Promise<ApiResponse> => {
  // Mock API call with delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  return { 
    success: true, 
    message: `Email sent for activity: ${activityName}` 
  }
}

const ReleaseDetailView: React.FC<ReleaseDetailViewProps> = ({
  releaseName,
  releaseDate,
  releaseType,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const [isNotesEditMode, setIsNotesEditMode] = useState(false)
  const [isMetricsEditMode, setIsMetricsEditMode] = useState(false)
  const [releaseNotes, setReleaseNotes] = useState('• Implement new features for enhanced user experience\n• Fix critical bugs and performance issues\n• Update security protocols and dependencies')
  const [keyMetrics, setKeyMetrics] = useState('• Features: 12 new features\n• Bug Fixes: 8 critical issues resolved\n• Performance: 15% improvement expected')
  const [isSending, setIsSending] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const [activityTimeline] = useState(getMockActivityTimeline())
  const [sendingActivityEmails, setSendingActivityEmails] = useState<Set<string>>(new Set())

  const fixVersion = generateFixVersion(releaseDate, releaseType)
  const snowLink = generateSnowLink(fixVersion)

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleSaveNotes = async () => {
    // In a real app, you'd save to backend here
    const response = await saveReleaseNotes(releaseName, releaseNotes)
    if (response.success) {
      setIsNotesEditMode(false)
      showSnackbar('Release notes saved successfully!', 'success')
    } else {
      showSnackbar('Failed to save release notes', 'error')
    }
  }

  const handleSaveMetrics = async () => {
    // In a real app, you'd save to backend here
    const response = await saveKeyMetrics(releaseName, keyMetrics)
    if (response.success) {
      setIsMetricsEditMode(false)
      showSnackbar('Key metrics saved successfully!', 'success')
    } else {
      showSnackbar('Failed to save key metrics', 'error')
    }
  }

  const handleSendReleaseNotes = async () => {
    setIsSending(true)
    const releaseNotesData: ReleaseNotesData = {
      releaseName,
      fixVersion,
      snowLink,
      releaseNotes,
      keyMetrics,
      recipientEmails: ['stakeholder1@company.com', 'stakeholder2@company.com'] // In real app, get from user input
    }

    // Using mock implementation for demo
    const response = await sendReleaseNotesMock(releaseNotesData)
    
    setIsSending(false)
    if (response.success) {
      showSnackbar(response.message || 'Release notes sent successfully!', 'success')
    } else {
      showSnackbar(response.error || 'Failed to send release notes', 'error')
    }
  }

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  const handleSendActivityEmail = async (activityId: string, activityName: string) => {
    setSendingActivityEmails(prev => new Set(prev).add(activityId))
    
    const response = await sendActivityEmailMock(activityId, activityName)
    
    setSendingActivityEmails(prev => {
      const newSet = new Set(prev)
      newSet.delete(activityId)
      return newSet
    })
    
    if (response.success) {
      showSnackbar(response.message || 'Activity email sent successfully!', 'success')
    } else {
      showSnackbar(response.error || 'Failed to send activity email', 'error')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'pending':
        return 'warning'
      case 'overdue':
        return 'error'
      default:
        return 'default'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const tabs = [
    'Overview',
    'Release Scope',
    'Implementation Plan',
    'Jira',
    'Application Pipelines',
    'Post Implementation Evidences'
  ]

  return (
    <div className="release-detail-view">
      <div className="detail-header">
        <Container maxWidth="lg">
          <div className="header-content">
            <div className="back-section">
              <IconButton onClick={onBack} className="back-button">
                <ArrowBackIcon />
              </IconButton>
            </div>
            
            <div className="title-section">
              <Typography variant="h3" className="release-title">
                {releaseName}
              </Typography>
              <Typography variant="h6" className="release-subtitle">
                {releaseDate} • {releaseType === 'monthly' ? '📅 Monthly Release' : '⚡ Off-cycle Release'}
              </Typography>
            </div>
          </div>
        </Container>
      </div>

      <div className="detail-content">
        <Container maxWidth="lg">
          <Paper className="content-paper">
            <div className="tabs-container">
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                className="detail-tabs"
                variant="scrollable"
                scrollButtons="auto"
              >
                {tabs.map((tab, index) => (
                  <Tab key={index} label={tab} className="detail-tab" />
                ))}
              </Tabs>
            </div>

            <div className="tab-panels">
              <TabPanel value={activeTab} index={0}>
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
                            <TableCell className="table-header">Status</TableCell>
                            <TableCell className="table-header">Assignee</TableCell>
                            <TableCell className="table-header" align="center">Action</TableCell>
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
                              <TableCell>
                                <Chip
                                  label={activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                                  color={getStatusColor(activity.status) as any}
                                  size="small"
                                  className="status-chip"
                                />
                              </TableCell>
                              <TableCell className="assignee">
                                {activity.assignee}
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
                                  {sendingActivityEmails.has(activity.id) ? 'Sending...' : 'Send Email'}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value={activeTab} index={1}>
                <div className="scope-content">
                  <Typography variant="h5" className="section-title">
                    Release Scope
                  </Typography>
                  <Typography variant="body1" className="section-description">
                    Detailed scope and requirements for {releaseName}.
                  </Typography>
                  <Typography variant="body2">
                    This section would contain detailed information about what is included 
                    and excluded from this release, feature specifications, and acceptance criteria.
                  </Typography>
                </div>
              </TabPanel>

              <TabPanel value={activeTab} index={2}>
                <div className="implementation-content">
                  <Typography variant="h5" className="section-title">
                    Implementation Plan
                  </Typography>
                  <Typography variant="body1" className="section-description">
                    Step-by-step implementation plan for {releaseName}.
                  </Typography>
                  <Typography variant="body2">
                    This section contains the detailed implementation timeline, 
                    deployment steps, rollback procedures, and technical specifications.
                  </Typography>
                </div>
              </TabPanel>

              <TabPanel value={activeTab} index={3}>
                <div className="jira-content">
                  <Typography variant="h5" className="section-title">
                    Jira Integration
                  </Typography>
                  <Typography variant="body1" className="section-description">
                    Jira tickets and project tracking for {releaseName}.
                  </Typography>
                  <Typography variant="body2">
                    This section would show linked Jira tickets, project progress, 
                    and issue tracking information related to this release.
                  </Typography>
                </div>
              </TabPanel>

              <TabPanel value={activeTab} index={4}>
                <div className="pipelines-content">
                  <Typography variant="h5" className="section-title">
                    Application Pipelines
                  </Typography>
                  <Typography variant="body1" className="section-description">
                    CI/CD pipeline status and deployment information for {releaseName}.
                  </Typography>
                  <Typography variant="body2">
                    This section displays the current status of build pipelines, 
                    deployment stages, and automated testing results.
                  </Typography>
                </div>
              </TabPanel>

              <TabPanel value={activeTab} index={5}>
                <div className="evidence-content">
                  <Typography variant="h5" className="section-title">
                    Post Implementation Evidences
                  </Typography>
                  <Typography variant="body1" className="section-description">
                    Post-deployment verification and evidence for {releaseName}.
                  </Typography>
                  <Typography variant="body2">
                    This section contains screenshots, logs, test results, 
                    and other evidence confirming successful deployment and operation.
                  </Typography>
                </div>
              </TabPanel>
            </div>
          </Paper>
        </Container>
      </div>
      
      {/* Snackbar for user feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ReleaseDetailView
