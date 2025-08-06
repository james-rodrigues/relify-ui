import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Grid, 
  Typography,
  TextField,
  Button,
  InputAdornment
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material'
import { useState } from 'react'
import ReleaseCard from '../ReleaseCard'
import CreateReleaseDialog, { type ReleaseFormData } from '../CreateReleaseDialog'
import { getReleasesData } from '../../utils/mockDataLoader'
import './styles.scss'

interface ReleasesProps {
  onReleaseClick: (name: string, date: string, type: 'monthly' | 'offcycle') => void
}

const Releases: React.FC<ReleasesProps> = ({ onReleaseClick }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const { currentReleases, pastReleases } = getReleasesData()

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
            {currentReleases.map((release) => (
              <Grid key={release.id} item xs={12} sm={6}>
                <ReleaseCard 
                  title={release.title}
                  type={release.type}
                  status={release.status}
                  progress={release.progress}
                  date={release.date}
                  description={release.description}
                  onTitleClick={() => onReleaseClick(release.title, release.date, release.type)}
                />
              </Grid>
            ))}
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
            {pastReleases.map((release) => (
              <Grid key={release.id} item xs={12} sm={6}>
                <ReleaseCard 
                  title={release.title}
                  type={release.type}
                  status={release.status}
                  date={release.date}
                  description={release.description}
                  onTitleClick={() => onReleaseClick(release.title, release.date, release.type)}
                />
              </Grid>
            ))}
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
