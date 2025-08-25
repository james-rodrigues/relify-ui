import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Grid, 
  Typography,
  TextField,
  Button,
  InputAdornment,
  Box,
  Container
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material'
import { useState, useMemo } from 'react'
import ReleaseCard from '../ReleaseCard'
import CreateReleaseDialog, { type ReleaseFormData } from '../CreateReleaseDialog'
import { getReleasesData, type Release } from '../../utils/mockDataLoader'
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

  // Filter releases based on search term
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return []
    
    const allReleases = [...currentReleases, ...pastReleases]
    const term = searchTerm.toLowerCase()
    
    return allReleases.filter(release => 
      release.id.toLowerCase().includes(term) ||
      release.title.toLowerCase().includes(term) ||
      release.fixVersion.toLowerCase().includes(term)
    )
  }, [searchTerm, currentReleases, pastReleases])

  // Filter current and past releases when searching
  const filteredCurrentReleases = useMemo(() => {
    if (searchTerm.trim()) return []
    return currentReleases
  }, [searchTerm, currentReleases])

  const filteredPastReleases = useMemo(() => {
    if (searchTerm.trim()) return []
    return pastReleases
  }, [searchTerm, pastReleases])

  return (
    <Box sx={{ width: '100%', px: 0 }}>
      {/* Search and Create Section */}
      <Container maxWidth={false} sx={{ px: { xs: 3, md: 6 }, mb: 3, mt: 4 }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 2
        }}>
          <TextField
            variant="outlined"
            placeholder="Search releases..."
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            sx={{
              width: { xs: '200px', md: '280px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                '&:hover fieldset': {
                  borderColor: '#6495ED',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6495ED',
                  borderWidth: '1px'
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#6495ED', fontSize: '18px' }} />
                </InputAdornment>
              )
            }}
          />
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setCreateDialogOpen(true)}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Create Release
          </Button>
        </Box>
      </Container>

      {/* Search Results Accordion */}
      {searchTerm.trim() && (
        <Box sx={{ width: '100%', mb: 2, px: { xs: 3, md: 6 } }}>
          <Accordion 
            defaultExpanded
            sx={{ 
              width: '100%',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              borderRadius: '12px',
              overflow: 'hidden',
              '&::before': { display: 'none' }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #e9ecef',
                '& .MuiAccordionSummary-content': {
                  margin: '16px 0'
                }
              }}
            >
              <Typography 
                variant="h5" 
                sx={{
                  fontWeight: 600,
                  color: '#2c3e50',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                🔍 Search Results ({searchResults.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 3 }}>
              {searchResults.length > 0 ? (
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 3, 
                  justifyContent: 'center' 
                }}>
                  {searchResults.map((release) => (
                    <ReleaseCard 
                      key={release.id}
                      title={release.title}
                      type={release.type}
                      status={release.status}
                      progress={release.progress}
                      date={release.date}
                      releaseId={release.id}
                      fixVersion={release.fixVersion}
                      description={release.description}
                      onTitleClick={() => onReleaseClick(release.title, release.date, release.type)}
                    />
                  ))}
                </Box>
              ) : (
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 4,
                  color: '#666'
                }}>
                  <SearchIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    No releases found
                  </Typography>
                  <Typography variant="body2">
                    Try adjusting your search term "{searchTerm}"
                  </Typography>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        </Box>
      )}

      {/* Current Releases Accordion */}
      {!searchTerm.trim() && (
        <Box sx={{ width: '100%', mb: 2, px: { xs: 3, md: 6 } }}>
          <Accordion 
            defaultExpanded
            sx={{ 
              width: '100%',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              borderRadius: '12px',
              overflow: 'hidden',
              '&::before': { display: 'none' }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #e9ecef',
                '& .MuiAccordionSummary-content': {
                  margin: '16px 0'
                }
              }}
            >
              <Typography 
                variant="h5" 
                sx={{
                  fontWeight: 600,
                  color: '#2c3e50',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                🚀 Current Releases Planned ({filteredCurrentReleases.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 3, 
                justifyContent: 'center' 
              }}>
                {filteredCurrentReleases.map((release) => (
                  <ReleaseCard 
                    key={release.id}
                    title={release.title}
                    type={release.type}
                    status={release.status}
                    progress={release.progress}
                    date={release.date}
                    releaseId={release.id}
                    fixVersion={release.fixVersion}
                    description={release.description}
                    onTitleClick={() => onReleaseClick(release.title, release.date, release.type)}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}

      {/* Past Releases Accordion */}
      {!searchTerm.trim() && (
        <Box sx={{ width: '100%', mb: 2, px: { xs: 3, md: 6 } }}>
          <Accordion 
            sx={{ 
              width: '100%',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              borderRadius: '12px',
              overflow: 'hidden',
              '&::before': { display: 'none' }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #e9ecef',
                '& .MuiAccordionSummary-content': {
                  margin: '16px 0'
                }
              }}
            >
              <Typography 
                variant="h5" 
                sx={{
                  fontWeight: 600,
                  color: '#2c3e50',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                ✅ Past Releases ({filteredPastReleases.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 3, 
                justifyContent: 'center' 
              }}>
                {filteredPastReleases.map((release) => (
                  <ReleaseCard 
                    key={release.id}
                    title={release.title}
                    type={release.type}
                    status={release.status}
                    date={release.date}
                    releaseId={release.id}
                    fixVersion={release.fixVersion}
                    description={release.description}
                    onTitleClick={() => onReleaseClick(release.title, release.date, release.type)}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}

      {/* Create Release Dialog */}
      <CreateReleaseDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreateRelease}
      />
    </Box>
  )
}

export default Releases
