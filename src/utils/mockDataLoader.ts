// Mock data loader utility to centralize data loading
import overviewData from '../mockData/overviewData.json'
import releaseScopeData from '../mockData/releaseScopeData.json'
import releasesData from '../mockData/releasesData.json'
import implementationPlanData from '../mockData/implementationPlanData.json'
import jiraIntegrationData from '../mockData/jiraIntegrationData.json'
import applicationPipelinesData from '../mockData/applicationPipelinesData.json'
import evidenceData from '../mockData/evidenceData.json'

// Types
export interface Release {
  id: string
  title: string
  type: 'monthly' | 'offcycle'
  status: 'planned' | 'completed'
  progress?: number
  date: string
  description: string
  fixVersion: string
  releaseCoordinator?: string
  releaseSupervisor?: string
}

export interface ReleasesData {
  currentReleases: Release[]
  pastReleases: Release[]
}

export interface OverviewData {
  activityTimeline: ActivityTimelineItem[]
  releaseNotes: string
  keyMetrics: string
}

export interface ActivityTimelineItem {
  id: string
  activityName: string
  activityDueDate: string
  status: 'completed' | 'pending' | 'overdue'
  assignee: string
}

export interface ReleaseScopeEntry {
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

// Utility functions to get specific data
export const getReleasesData = (): ReleasesData => {
  return releasesData as ReleasesData
}

export const getOverviewData = (): OverviewData => {
  return overviewData as OverviewData
}

export const getReleaseScopeData = (): ReleaseScopeEntry[] => {
  return releaseScopeData as ReleaseScopeEntry[]
}

export const getImplementationPlanData = () => {
  return implementationPlanData
}

export const getJiraIntegrationData = () => {
  return jiraIntegrationData
}

export const getApplicationPipelinesData = () => {
  return applicationPipelinesData
}

export const getEvidenceData = () => {
  return evidenceData
}

// Helper function to find release by title and date
export const findRelease = (title: string, date: string): Release | null => {
  const { currentReleases, pastReleases } = getReleasesData()
  const allReleases = [...currentReleases, ...pastReleases]
  
  return allReleases.find(release => 
    release.title === title && release.date === date
  ) || null
}

// Helper function to get fix version for a release
export const getFixVersionForRelease = (title: string, date: string): string => {
  const release = findRelease(title, date)
  if (release) {
    return release.fixVersion
  }
  
  // Fallback to generating fix version if not found
  const releaseDate = new Date(date)
  const year = releaseDate.getFullYear()
  const month = String(releaseDate.getMonth() + 1).padStart(2, '0')
  const day = String(releaseDate.getDate()).padStart(2, '0')
  const prefix = title.toLowerCase().includes('monthly') ? 'MS' : 'OS'
  return `${prefix}${year}-${month}-${day}`
}

// Helper function to generate SNOW link from fix version
export const generateSnowLink = (fixVersion: string): string => {
  // Generate a consistent change number based on the fix version hash
  let hash = 0
  for (let i = 0; i < fixVersion.length; i++) {
    const char = fixVersion.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  const changeNum = Math.abs(hash) % 90000000 + 10000000
  const changeNumber = `CHG${changeNum}`
  return `https://servicenow.company.com/change_request.do?sysparm_query=number=${changeNumber}`
}
