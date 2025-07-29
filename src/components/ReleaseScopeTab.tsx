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
