// API Configuration for different modes
export interface ApiConfig {
  mode: 'mock' | 'local' | 'aws';
  baseUrl: string;
  timeout: number;
  endpoints: {
    releaseGovernanceActivities: string;
    releaseActivitiesCategories: string;
    releaseActivities: string;
    releaseSchedule: string;
    releaseActivityOwners: string;
    pointOfContacts: string;
    applications: string;
    releases: string;
    applicationPipelines: string;
    evidence: string;
    implementationPlan: string;
    jiraIntegration: string;
    overview: string;
    releaseScope: string;
  };
  headers?: Record<string, string>;
  retryAttempts?: number;
  retryDelay?: number;
}

// Get configuration from environment variables
const getApiConfig = (): ApiConfig => {
  const mode = (import.meta.env.VITE_APP_MODE || 'mock') as 'mock' | 'local' | 'aws';
  
  return {
    mode,
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/mock-api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '5000'),
    endpoints: {
      releaseGovernanceActivities: import.meta.env.VITE_API_RELEASE_GOVERNANCE_ACTIVITIES || '/release-governance-activities',
      releaseActivitiesCategories: import.meta.env.VITE_API_RELEASE_ACTIVITIES_CATEGORIES || '/release-activities-categories',
      releaseActivities: import.meta.env.VITE_API_RELEASE_ACTIVITIES || '/release-activities',
      releaseSchedule: import.meta.env.VITE_API_RELEASE_SCHEDULE || '/release-schedule',
      releaseActivityOwners: import.meta.env.VITE_API_RELEASE_ACTIVITY_OWNERS || '/release-activity-owners',
      pointOfContacts: import.meta.env.VITE_API_POINT_OF_CONTACTS || '/point-of-contacts',
      applications: import.meta.env.VITE_API_APPLICATIONS || '/applications',
      releases: import.meta.env.VITE_API_RELEASES || '/releases',
      applicationPipelines: import.meta.env.VITE_API_APPLICATION_PIPELINES || '/application-pipelines',
      evidence: import.meta.env.VITE_API_EVIDENCE || '/evidence',
      implementationPlan: import.meta.env.VITE_API_IMPLEMENTATION_PLAN || '/implementation-plan',
      jiraIntegration: import.meta.env.VITE_API_JIRA_INTEGRATION || '/jira-integration',
      overview: import.meta.env.VITE_API_OVERVIEW || '/overview',
      releaseScope: import.meta.env.VITE_API_RELEASE_SCOPE || '/release-scope'
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    retryAttempts: mode === 'aws' ? 3 : 1,
    retryDelay: mode === 'aws' ? 1000 : 500
  };
};

export default getApiConfig;

// Constants for API endpoint mapping
export const ENDPOINT_MAPPING = {
  'Release Governance Activities': 'releaseGovernanceActivities',
  'Release Activities Categories': 'releaseActivitiesCategories',
  'Release Activities': 'releaseActivities',
  'Release Schedule': 'releaseSchedule',
  'Release Activity Owners': 'releaseActivityOwners',
  'Point of Contacts': 'pointOfContacts',
  'Applications': 'applications'
} as const;

export type EndpointKey = keyof typeof ENDPOINT_MAPPING;
