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
import ReleaseCard from './ReleaseCard'
import CreateReleaseDialog, { type ReleaseFormData } from './CreateReleaseDialog'
import './Releases.scss'

const Releases = () => {
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
    <div>
      {/* Search and Create Section */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search by Release ID, Release Name, or Fix Version"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ 
            minWidth: { xs: '100%', sm: '400px' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: 'white',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#667eea',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#667eea',
              }
            },
            '& .MuiInputBase-input::placeholder': {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#667eea' }} />
              </InputAdornment>
            ),
          }}
        />
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateDialogOpen(true)}
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1.5,
            minWidth: '160px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Create Release
        </Button>
      </Box>

      {/* Current Releases Accordion */}
      <Accordion 
        sx={{ 
          mb: 2,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          '&:before': {
            display: 'none'
          }
        }}
      >
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon sx={{ color: '#667eea' }} />}
          sx={{ 
            '& .MuiAccordionSummary-content': {
              margin: '20px 0'
            }
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700,
              color: '#2c3e50',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            🚀 Current Releases Planned
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <ReleaseCard 
                title="July Monthly" 
                type="monthly" 
                status="planned" 
                progress={65} 
                date="July 30, 2025" 
                description="Monthly release with new features, bug fixes, and performance improvements." 
                onTitleClick={() => console.log('Navigate to July Monthly details')}
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
                onTitleClick={() => console.log('Navigate to July Offcycle details')}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Past Releases Accordion */}
      <Accordion 
        sx={{ 
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(56, 142, 60, 0.05) 100%)',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          '&:before': {
            display: 'none'
          }
        }}
      >
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon sx={{ color: '#4caf50' }} />}
          sx={{ 
            '& .MuiAccordionSummary-content': {
              margin: '20px 0'
            }
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700,
              color: '#2c3e50',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            ✅ Past Releases
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <ReleaseCard 
                title="June Monthly" 
                type="monthly" 
                status="completed" 
                date="June 30, 2025" 
                description="Major feature release with enhanced UI, new integrations, and performance optimizations." 
                onTitleClick={() => console.log('Navigate to June Monthly details')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReleaseCard 
                title="June Offcycle" 
                type="offcycle" 
                status="completed" 
                date="June 20, 2025" 
                description="Emergency security patch and critical bug fixes deployed successfully." 
                onTitleClick={() => console.log('Navigate to June Offcycle details')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReleaseCard 
                title="May Monthly" 
                type="monthly" 
                status="completed" 
                date="May 31, 2025" 
                description="Comprehensive release with new dashboard, analytics features, and mobile support." 
                onTitleClick={() => console.log('Navigate to May Monthly details')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReleaseCard 
                title="May Offcycle" 
                type="offcycle" 
                status="completed" 
                date="May 15, 2025" 
                description="Quick deployment for API improvements and database optimizations." 
                onTitleClick={() => console.log('Navigate to May Offcycle details')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReleaseCard 
                title="April Monthly" 
                type="monthly" 
                status="completed" 
                date="April 30, 2025" 
                description="Spring release featuring redesigned interface and enhanced automation capabilities." 
                onTitleClick={() => console.log('Navigate to April Monthly details')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ReleaseCard 
                title="April Offcycle" 
                type="offcycle" 
                status="completed" 
                date="April 10, 2025" 
                description="Hotfix release addressing user-reported issues and performance bottlenecks." 
                onTitleClick={() => console.log('Navigate to April Offcycle details')}
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
