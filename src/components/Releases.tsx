import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ReleaseCard from './ReleaseCard'

const Releases = () => (
  <div>
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
          <Grid item xs={12} sm={6} md={4}>
            <ReleaseCard 
              title="Release Monthly" 
              type="monthly" 
              status="planned" 
              progress={65} 
              date="July 30, 2025" 
              description="Monthly release with new features, bug fixes, and performance improvements." 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReleaseCard 
              title="Release Offcycle" 
              type="offcycle" 
              status="planned" 
              progress={30} 
              date="August 15, 2025" 
              description="Critical hotfix release for security vulnerabilities and urgent issues." 
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>

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
          <Grid item xs={12} sm={6} md={4}>
            <ReleaseCard 
              title="June Offcycle" 
              type="offcycle" 
              status="completed" 
              date="June 20, 2025" 
              description="Emergency security patch and critical bug fixes deployed successfully." 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReleaseCard 
              title="June Monthly" 
              type="monthly" 
              status="completed" 
              date="June 30, 2025" 
              description="Major feature release with enhanced UI, new integrations, and performance optimizations." 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReleaseCard 
              title="May Offcycle" 
              type="offcycle" 
              status="completed" 
              date="May 15, 2025" 
              description="Quick deployment for API improvements and database optimizations." 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReleaseCard 
              title="May Monthly" 
              type="monthly" 
              status="completed" 
              date="May 31, 2025" 
              description="Comprehensive release with new dashboard, analytics features, and mobile support." 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReleaseCard 
              title="April Offcycle" 
              type="offcycle" 
              status="completed" 
              date="April 10, 2025" 
              description="Hotfix release addressing user-reported issues and performance bottlenecks." 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ReleaseCard 
              title="April Monthly" 
              type="monthly" 
              status="completed" 
              date="April 30, 2025" 
              description="Spring release featuring redesigned interface and enhanced automation capabilities." 
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  </div>
)

export default Releases
