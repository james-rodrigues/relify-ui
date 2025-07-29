import React, { useState } from 'react'
import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Container,
  Paper
} from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
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

const ReleaseDetailView: React.FC<ReleaseDetailViewProps> = ({
  releaseName,
  releaseDate,
  releaseType,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
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
                  <Typography variant="body1" className="section-description">
                    This section contains the general overview of the {releaseName} release.
                    Here you would find key highlights, objectives, and summary information.
                  </Typography>
                  
                  <div className="overview-cards">
                    <div className="overview-card">
                      <Typography variant="h6" className="card-title">Release Objectives</Typography>
                      <Typography variant="body2">
                        • Implement new features for enhanced user experience
                        • Fix critical bugs and performance issues
                        • Update security protocols and dependencies
                      </Typography>
                    </div>
                    
                    <div className="overview-card">
                      <Typography variant="h6" className="card-title">Key Metrics</Typography>
                      <Typography variant="body2">
                        • Features: 12 new features
                        • Bug Fixes: 8 critical issues resolved
                        • Performance: 15% improvement expected
                      </Typography>
                    </div>
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
    </div>
  )
}

export default ReleaseDetailView
