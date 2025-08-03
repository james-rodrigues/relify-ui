# Mock Data Structure

This directory contains JSON files with mock data for each tab in the Release Detail View. This separation makes it easier to edit and maintain test data for development purposes.

## Files Overview

### `evidenceData.json`
Contains mock data for the Evidence Tab with the following structure:
- `task`: Task name (repo name or manual task)
- `taskInstruction`: Detailed instructions for the task
- `evidenceLink`: URL to the evidence file
- `evidenceFileName`: Name of the evidence file
- `assignedGroup`: One of 'L2 Team', 'AD Team', 'Ops Team', 'Product Team'
- `pointOfContact`: Email or contact information for the responsible person

### `applicationPipelinesData.json`
Contains mock data for the Application Pipelines Tab:
- `repoName`: Repository name
- `comments`: Comments about the repository
- `repoType`: One of 'Backend', 'UI', 'Infra'
- `releaseBranchLink`: URL to the release branch comparison
- `draftPRLink`: URL to the draft pull request
- `environment`: One of 'Development', 'Staging', 'Production'
- `jetLink`: URL to the JET deployment page
- `deploymentLink`: URL to the deployment page

### `implementationPlanData.json`
Contains mock data for the Implementation Plan Tab:
- `repoName`: Repository name
- `backoutBranchName`: Name of the backout branch
- `pocNames`: Point of contact names (comma-separated)
- `preImplementationSteps`: Steps to perform before implementation
- `implementationSteps`: Main implementation steps
- `postValidationSteps`: Validation steps after implementation
- `backoutSteps`: Steps to perform if backout is needed
- `backoutValidationSteps`: Validation steps for backout

### `jiraIntegrationData.json`
Contains mock data for the Jira Integration Tab:
- `jiraId`: Jira ticket ID
- `fixVersion`: Fix version for the release
- `changeNumber`: Change request number
- `testCaseJiraId`: Test case Jira ID
- `repositoriesInvolved`: Comma-separated list of repositories
- `status`: One of 'Draft', 'Ready', 'Activated'
- `jetLink`: URL to JET job
- `spinnakerLink`: URL to Spinnaker application
- `changeType`: One of 'Defect', 'Feature Enhancement', 'Infra/Config Updates'
- `comments`: Additional comments

### `overviewData.json`
Contains mock data for the Overview Tab:
- `activityTimeline`: Array of activity timeline items with:
  - `id`: Unique identifier
  - `activityName`: Name of the activity
  - `activityDueDate`: Due date in YYYY-MM-DD format
  - `status`: One of 'completed', 'pending', 'overdue'
  - `assignee`: Person assigned to the activity
- `releaseNotes`: Multi-line string with release notes (supports bullet points and numbered lists)
- `keyMetrics`: Multi-line string with key metrics (supports bullet points and numbered lists)

### `releaseScopeData.json`
Contains mock data for the Release Scope Tab:
- `changeRequestNumber`: Change request number
- `sealId`: SEAL ID
- `teamName`: Name of the team
- `keyDevLead`: Key development lead
- `productContact`: Product contact person
- `sreKTDone`: One of 'Yes', 'No', 'N/A'
- `runbookUpdateDone`: One of 'Yes', 'No', 'N/A'
- `drmComments`: DRM-related comments
- `snowflakeImpact`: Description of Snowflake impact
- `techLead`: Technical lead
- `initiativeLink`: URL to initiative in Jira
- `epicLink`: URL to epic in Jira
- `storyLink`: URL to story in Jira
- `personOnCallPrimary`: Primary on-call person
- `personOnCallSecondary`: Secondary on-call person
- `changesInvolved`: Description of changes involved
- `servicesToBeDeployed`: Services to be deployed
- `upstreamDownstreamImpact`: One of 'Yes', 'No', 'N/A'
- `istTested`: One of 'Yes', 'No', 'N/A'
- `uatTested`: One of 'Yes', 'No', 'N/A'
- `relatedIncidents`: Related incident numbers
- `releaseBranchName`: Name of the release branch
- `manualTaskComments`: Comments about manual tasks

## Usage

Each component imports its respective JSON file and uses it to initialize state:

```typescript
import evidenceData from '../../mockData/evidenceData.json';

// In component
const [entries, setEntries] = useState<EvidenceEntry[]>(evidenceData as EvidenceEntry[]);
```

## Editing Mock Data

To modify the test data, simply edit the corresponding JSON file. The changes will be reflected immediately in the development environment after a page refresh.

## Data Relationships

- The `overviewData.json` contains data that's used in the main ReleaseDetailView component
- Each tab-specific JSON file contains data used by individual tab components
- All JSON files use realistic sample data that represents typical enterprise software release scenarios

## Adding New Mock Data

When adding new fields or data structures:

1. Update the corresponding JSON file with the new structure
2. Update the TypeScript interfaces in the component files
3. Update this README to document the new fields
4. Test the changes to ensure they work correctly

This structure makes it easy to maintain different data sets for testing various scenarios and edge cases.
