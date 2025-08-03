import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Grid, 
  Typography,
  Box,
  TextField,
  Button,
  InputAdornment
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material'
import { useState } from 'react'
import ReleaseCard from '../ReleaseCard'
import CreateReleaseDialog, { type ReleaseFormData } from '../CreateReleaseDialog'
import './styles.scss'

interface ReleasesProps {
  onReleaseClick: (name: string, date: string, type: 'monthly' | 'offcycle') => void
}

const Releases: React.FC<ReleasesProps> = ({ onReleaseClick }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const handleCreateRelease = (releaseData: ReleaseFormData) => {
    console.log('Creating release:', releaseData)
    // Here you would typically send the data to your backend API
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="releases-container">
      {/* Search and Create Section */}
      <div className="search-create-section">
        <TextField
          variant="outlined"
          placeholder="Search by Release ID, Release Name, or Fix Version"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-field"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="search-icon" />
              </InputAdornment>
            ),
            className: "search-input"
          }}
          inputProps={{
            className: "search-placeholder"
          }}
        />
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateDialogOpen(true)}
          className="create-button"
        >
          Create Release
        </Button>
      </div>

      {/* Current Releases Accordion */}
      <Accordion className="releases-accordion current-releases">
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon className="accordion-expand-icon" />}
          className="accordion-summary"
        >
          <Typography 
            variant="h5" 
            className="accordion-title"
          >
            🚀 Current Releases Planned
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="accordion-details">
          <Grid container spacing={3} className="cards-grid">
            <Grid item xs={12} sm={6}>
              <ReleaseCard 
                title="July Monthly" 
                type="monthly" 
                status="planned" 
                progress={65} 
                date="July 30, 2025" 
                description="Monthly release with new features, bug fixes, and performance improvements." 
                onTitleClick={() => onReleaseClick('July Monthly', 'July 30, 2025', 'monthly')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReleaseCard 
                title="July Offcycle" 
                type="offcycle" 
                status="planned" 
                progress={30} 
                date="July 15, 2025" 
                description="Critical hotfix release for security vulnerabilities and urgent issues." 
                onTitleClick={() => onReleaseClick('July Offcycle', 'July 15, 2025', 'offcycle')}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Past Releases Accordion */}
      <Accordion className="releases-accordion past-releases">
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon className="accordion-expand-icon" />}
          className="accordion-summary"
        >
          <Typography 
            variant="h5" 
            className="accordion-title"
          >
            ✅ Past Releases
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="accordion-details">
          <Grid container spacing={3} className="cards-grid">
            <Grid item xs={12} sm={6}>
              <ReleaseCard 
                title="June Monthly" 
                type="monthly" 
                status="completed" 
                date="June 30, 2025" 
                description="Major feature release with enhanced UI, new integrations, and performance optimizations." 
                onTitleClick={() => onReleaseClick('June Monthly', 'June 30, 2025', 'monthly')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReleaseCard 
                title="June Offcycle" 
                type="offcycle" 
                status="completed" 
                date="June 20, 2025" 
                description="Emergency security patch and critical bug fixes deployed successfully." 
                onTitleClick={() => onReleaseClick('June Offcycle', 'June 20, 2025', 'offcycle')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReleaseCard 
                title="May Monthly" 
                type="monthly" 
                status="completed" 
                date="May 31, 2025" 
                description="Comprehensive release with new dashboard, analytics features, and mobile support." 
                onTitleClick={() => onReleaseClick('May Monthly', 'May 31, 2025', 'monthly')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReleaseCard 
                title="May Offcycle" 
                type="offcycle" 
                status="completed" 
                date="May 15, 2025" 
                description="Quick deployment for API improvements and database optimizations." 
                onTitleClick={() => onReleaseClick('May Offcycle', 'May 15, 2025', 'offcycle')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReleaseCard 
                title="April Monthly" 
                type="monthly" 
                status="completed" 
                date="April 30, 2025" 
                description="Spring release featuring redesigned interface and enhanced automation capabilities." 
                onTitleClick={() => onReleaseClick('April Monthly', 'April 30, 2025', 'monthly')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReleaseCard 
                title="April Offcycle" 
                type="offcycle" 
                status="completed" 
                date="April 10, 2025" 
                description="Hotfix release addressing user-reported issues and performance bottlenecks." 
                onTitleClick={() => onReleaseClick('April Offcycle', 'April 10, 2025', 'offcycle')}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Create Release Dialog */}
      <CreateReleaseDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreateRelease}
      />
    </div>
  )
}

export default Releases
