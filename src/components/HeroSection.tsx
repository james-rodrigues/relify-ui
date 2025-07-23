import { Box, Container, Typography, Button, Chip } from '@mui/material'
import { Rocket as RocketIcon, Star as StarIcon } from '@mui/icons-material'

const HeroSection = () => {
  return (
    <Box 
      sx={{ 
        background: `
          linear-gradient(135deg, 
            rgba(102, 126, 234, 0.9) 0%, 
            rgba(118, 75, 162, 0.9) 50%,
            rgba(255, 107, 107, 0.9) 100%
          ),
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(138, 43, 226, 0.3) 0%, transparent 50%)
        `,
        color: 'white',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `,
          animation: 'float 20s ease-in-out infinite'
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 900,
            fontSize: { xs: '3rem', md: '4.5rem' },
            background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            mb: 2
          }}
        >
          Relify
        </Typography>
        
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4, 
            opacity: 0.95,
            fontWeight: 300,
            fontSize: { xs: '1.5rem', md: '2rem' },
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          Streamline your software releases with intelligent automation
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            maxWidth: '700px', 
            mx: 'auto', 
            opacity: 0.9,
            mb: 6,
            lineHeight: 1.6,
            fontWeight: 400
          }}
        >
          Eliminate the complexity of release management. Relify automates your entire release pipeline, 
          from code commits to production deployment, ensuring consistent and reliable software delivery.
        </Typography>
      </Container>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
      `}</style>
    </Box>
  )
}

export default HeroSection
