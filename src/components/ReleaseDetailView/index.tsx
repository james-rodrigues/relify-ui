import React, { useState } from 'react'
import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Container,
  Paper,
  Snackbar,
  Alert
} from '@mui/material'
import { 
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material'
import { 
  getOverviewData,
  getFixVersionForRelease,
  generateSnowLink
} from '../../utils/mockDataLoader'
import './styles.scss'
import OverviewTab from '../OverviewTab'
import ReleaseScope from '../ReleaseScope'
import ImplementationPlanTab from '../ImplementationPlanTab'
import JiraIntegrationTab from '../JiraIntegrationTab'
import ApplicationPipelinesTab from '../ApplicationPipelinesTab'
import EvidenceTab from '../EvidenceTab'

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

// Local interfaces
interface ReleaseNotesData {
  releaseName: string
  fixVersion: string
  snowLink: string
  releaseNotes: string
  recipientEmails: string[]
}

interface ApiResponse {
  success: boolean
  message?: string
  error?: string
}

// Mock service functions

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
  // Load mock data
  const overviewData = getOverviewData()
  
  // State management
  const [activeTab, setActiveTab] = useState(0)
  const [isNotesEditMode, setIsNotesEditMode] = useState(false)
  const [releaseNotes, setReleaseNotes] = useState(overviewData.releaseNotes)
  const [isSending, setIsSending] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const [sendingActivityEmails, setSendingActivityEmails] = useState<Set<string>>(new Set())
  
  // Get fix version and generate SNOW link
  const fixVersion = getFixVersionForRelease(releaseName, releaseDate)
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


  const handleSendReleaseNotes = async () => {
    setIsSending(true)
    const releaseNotesData: ReleaseNotesData = {
      releaseName,
      fixVersion,
      snowLink,
      releaseNotes,
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


  // Get record counts for each tab
  const getRecordCount = (tabIndex: number) => {
    switch (tabIndex) {
      case 0: // Overview
        return overviewData.activityTimeline?.length || 0
      case 1: // Release Scope
        return 4 // Mock count - in real app, get from ReleaseScope component
      case 2: // Implementation Plan
        return 3 // Mock count - in real app, get from ImplementationPlan component
      case 3: // Jira
        return 15 // Mock count - in real app, get from JiraIntegration component
      case 4: // Pipelines
        return 8 // Mock count - in real app, get from ApplicationPipelines component
      case 5: // Evidence
        return 12 // Mock count - in real app, get from Evidence component
      default:
        return 0
    }
  }

  const tabs = [
    'Overview',
    'Release Scope',
    'Implementation Plan',
    'Jira',
    'Pipelines',
    'Post Implementation Evidences'
  ]

  return (
    <Box className="release-detail-view">
      <Box className="detail-header">
        <Container maxWidth={false} sx={{ maxWidth: '1400px' }}>
          <Box className="header-content">
            <Box className="back-section">
              <IconButton onClick={onBack} className="back-button">
                <ArrowBackIcon />
              </IconButton>
            </Box>
            
            <Box className="title-section">
              <Typography variant="h3" className="release-title">
                {releaseName}
              </Typography>
              <Typography variant="h6" className="release-subtitle">
                {releaseDate} • {releaseType === 'monthly' ? '📅 Monthly Release' : '⚡ Off-cycle Release'}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box className="detail-content">
        <Container 
          maxWidth={false} 
          sx={{ 
            maxWidth: '1400px', 
            height: '100%',
            px: { xs: 2, sm: 3, md: 4 },
            '@media (max-width: 600px)': {
              px: 1
            }
          }}
        >
          <Paper className="content-paper" sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            mx: { xs: 0, sm: 1, md: 2 }
          }}>
            <Box className="tabs-container" sx={{ position: 'relative' }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                className="detail-tabs"
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTabs-root': {
                    borderRadius: '12px 12px 0 0'
                  },
                  '& .MuiTab-root': {
                    borderRadius: '8px 8px 0 0',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    minHeight: 48,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(100, 149, 237, 0.08)'
                    }
                  },
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                    background: 'linear-gradient(90deg, #6495ED, #9370DB)'
                  },
                  '& .Mui-selected': {
                    color: '#6495ED',
                    backgroundColor: 'rgba(100, 149, 237, 0.05)'
                  }
                }}
              >
                {tabs.map((tab, index) => (
                  <Tab 
                    key={index} 
                    label={tab} 
                    className="detail-tab"
                  />
                ))}
              </Tabs>
              
              {/* Record Count Display */}
              <Box sx={{
                position: 'absolute',
                top: 8,
                right: 16,
                backgroundColor: 'rgba(100, 149, 237, 0.1)',
                borderRadius: '16px',
                padding: '4px 12px',
                border: '1px solid rgba(100, 149, 237, 0.2)',
                zIndex: 1
              }}>
                <Typography variant="caption" sx={{ 
                  color: '#6495ED',
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }}>
                  {getRecordCount(activeTab)} records
                </Typography>
              </Box>
            </Box>

            <Box className="tab-panels" sx={{ flex: 1, overflow: 'auto' }}>
              <TabPanel value={activeTab} index={0}>
                <OverviewTab
                  releaseName={releaseName}
                  releaseDate={releaseDate}
                  releaseType={releaseType}
                  fixVersion={fixVersion}
                  snowLink={snowLink}
                  isNotesEditMode={isNotesEditMode}
                  setIsNotesEditMode={setIsNotesEditMode}
                  releaseNotes={releaseNotes}
                  setReleaseNotes={setReleaseNotes}
                  handleSendReleaseNotes={handleSendReleaseNotes}
                  sendingActivityEmails={sendingActivityEmails}
                  handleSendActivityEmail={handleSendActivityEmail}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                  activityTimeline={overviewData.activityTimeline}
                  isSending={isSending}
                  handleSaveNotes={handleSaveNotes}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <ReleaseScope />
              </TabPanel>

              <TabPanel value={activeTab} index={2}>
                <ImplementationPlanTab
                  releaseName={releaseName}
                  releaseDate={releaseDate}
                />
              </TabPanel>

              <TabPanel value={activeTab} index={3}>
                <JiraIntegrationTab
                  releaseName={releaseName}
                />
              </TabPanel>

              <TabPanel value={activeTab} index={4}>
                <ApplicationPipelinesTab
                  releaseName={releaseName}
                />
              </TabPanel>

              <TabPanel value={activeTab} index={5}>
                <EvidenceTab
                  releaseName={releaseName}
                />
              </TabPanel>
            </Box>
          </Paper>
        </Container>
      </Box>
      
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
    </Box>
  )
}

export default ReleaseDetailView
