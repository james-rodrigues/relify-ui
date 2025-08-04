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
import overviewData from '../../mockData/overviewData.json'
import releaseScopeData from '../../mockData/releaseScopeData.json'
import { getActivityTimelineForRelease } from '../../utils/activityTimelineUtils'
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

interface ReleaseScopeEntry {
  changeRequestNumber: string
  sealId: string
  teamName: string
  keyDevLead: string
  productContact: string
  sreKTDone: 'Yes' | 'No' | 'N/A'
  runbookUpdateDone: 'Yes' | 'No' | 'N/A'
  drmComments: string
  snowflakeImpact: string
  techLead: string
  initiativeLink: string
  epicLink: string
  storyLink: string
  personOnCallPrimary: string
  personOnCallSecondary: string
  changesInvolved: string
  servicesToBeDeployed: string
  upstreamDownstreamImpact: 'Yes' | 'No' | 'N/A'
  istTested: 'Yes' | 'No' | 'N/A'
  uatTested: 'Yes' | 'No' | 'N/A'
  relatedIncidents: string
  releaseBranchName: string
  manualTaskComments: string
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

const getMockActivityTimeline = (releaseDate: string, releaseType: 'monthly' | 'offcycle'): ActivityTimelineItem[] => {
  return getActivityTimelineForRelease('Release', releaseDate, releaseType)
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
  const [releaseNotes, setReleaseNotes] = useState(overviewData.releaseNotes)
  const [keyMetrics, setKeyMetrics] = useState(overviewData.keyMetrics)
  const [isSending, setIsSending] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const [activityTimeline] = useState(getMockActivityTimeline(releaseDate, releaseType))
  const [sendingActivityEmails, setSendingActivityEmails] = useState<Set<string>>(new Set())
  
  // Release Scope table state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [entries, setEntries] = useState<ReleaseScopeEntry[]>(releaseScopeData as ReleaseScopeEntry[])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [newEntry, setNewEntry] = useState<ReleaseScopeEntry>({
    changeRequestNumber: '',
    sealId: '',
    teamName: '',
    keyDevLead: '',
    productContact: '',
    sreKTDone: 'N/A',
    runbookUpdateDone: 'N/A',
    drmComments: '',
    snowflakeImpact: '',
    techLead: '',
    initiativeLink: '',
    epicLink: '',
    storyLink: '',
    personOnCallPrimary: '',
    personOnCallSecondary: '',
    changesInvolved: '',
    servicesToBeDeployed: '',
    upstreamDownstreamImpact: 'N/A',
    istTested: 'N/A',
    uatTested: 'N/A',
    relatedIncidents: '',
    releaseBranchName: '',
    manualTaskComments: ''
  })

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

  // Release Scope handlers
  const handleEntryChange = (field: keyof ReleaseScopeEntry, value: string) => {
    setNewEntry(prev => ({ ...prev, [field]: value }))
  }

  const handleAddEntry = () => {
    if (editingIndex !== null) {
      // Update existing entry
      setEntries(prev => prev.map((entry, index) => 
        index === editingIndex ? newEntry : entry
      ))
      setEditingIndex(null)
    } else {
      // Add new entry
      setEntries(prev => [...prev, newEntry])
    }
    
    // Reset form
    setNewEntry({
      changeRequestNumber: '',
      sealId: '',
      teamName: '',
      keyDevLead: '',
      productContact: '',
      sreKTDone: 'N/A',
      runbookUpdateDone: 'N/A',
      drmComments: '',
      snowflakeImpact: '',
      techLead: '',
      initiativeLink: '',
      epicLink: '',
      storyLink: '',
      personOnCallPrimary: '',
      personOnCallSecondary: '',
      changesInvolved: '',
      servicesToBeDeployed: '',
      upstreamDownstreamImpact: 'N/A',
      istTested: 'N/A',
      uatTested: 'N/A',
      relatedIncidents: '',
      releaseBranchName: '',
      manualTaskComments: ''
    })
    setDialogOpen(false)
  }

  const handleEditEntry = (index: number) => {
    setNewEntry(entries[index])
    setEditingIndex(index)
    setDialogOpen(true)
  }

  const resetDialog = () => {
    setNewEntry({
      changeRequestNumber: '',
      sealId: '',
      teamName: '',
      keyDevLead: '',
      productContact: '',
      sreKTDone: 'N/A',
      runbookUpdateDone: 'N/A',
      drmComments: '',
      snowflakeImpact: '',
      techLead: '',
      initiativeLink: '',
      epicLink: '',
      storyLink: '',
      personOnCallPrimary: '',
      personOnCallSecondary: '',
      changesInvolved: '',
      servicesToBeDeployed: '',
      upstreamDownstreamImpact: 'N/A',
      istTested: 'N/A',
      uatTested: 'N/A',
      relatedIncidents: '',
      releaseBranchName: '',
      manualTaskComments: ''
    })
    setEditingIndex(null)
    setDialogOpen(false)
  }

  const handleSyncToConfluence = async () => {
    // Mock function for syncing to Confluence
    showSnackbar('Successfully synced Release Scope to Confluence!', 'success')
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
        <Container maxWidth={false} sx={{ maxWidth: '1400px', height: '100%' }}>
          <Paper className="content-paper" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box className="tabs-container">
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
                  isMetricsEditMode={isMetricsEditMode}
                  setIsMetricsEditMode={setIsMetricsEditMode}
                  keyMetrics={keyMetrics}
                  setKeyMetrics={setKeyMetrics}
                  handleSendReleaseNotes={handleSendReleaseNotes}
                  sendingActivityEmails={sendingActivityEmails}
                  handleSendActivityEmail={handleSendActivityEmail}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                  activityTimeline={activityTimeline}
                  isSending={isSending}
                  handleSaveNotes={handleSaveNotes}
                  handleSaveMetrics={handleSaveMetrics}
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
