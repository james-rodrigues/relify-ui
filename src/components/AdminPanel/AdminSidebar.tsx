import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Typography,
  Divider,
  IconButton
} from '@mui/material'
import { 
  Close as CloseIcon,
  AdminPanelSettings as AdminIcon,
  Category as CategoryIcon,
  Assignment as AssignmentIcon,
  Contacts as ContactsIcon,
  Person as PersonIcon,
  Apps as AppsIcon
} from '@mui/icons-material'

interface AdminSidebarProps {
  selectedItem: string
  onItemSelect: (item: string) => void
  onClose: () => void
}

const menuItems = [
  { label: 'Release Governance Activities', icon: <AdminIcon /> },
  { label: 'Release Activities Categories', icon: <CategoryIcon /> },
  { label: 'Release Activities', icon: <AssignmentIcon /> },
  { label: 'Point of Contacts', icon: <ContactsIcon /> },
  { label: 'Release Activity Owners', icon: <PersonIcon /> },
  { label: 'Applications', icon: <AppsIcon /> }
]

const AdminSidebar = ({ selectedItem, onItemSelect, onClose }: AdminSidebarProps) => {
  return (
    <Box className="admin-sidebar">
      <Box className="admin-sidebar-header">
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700,
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <AdminIcon sx={{ color: '#667eea' }} />
          Admin Control Panel
        </Typography>
        <IconButton 
          onClick={onClose}
          sx={{ 
            color: '#666',
            '&:hover': { 
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              color: '#667eea'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ padding: 0 }}>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              selected={selectedItem === item.label}
              onClick={() => onItemSelect(item.label)}
              sx={{
                py: 1.5,
                px: 2,
                minHeight: 'auto',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  borderRight: '4px solid #667eea',
                  '& .MuiListItemText-primary': {
                    color: '#667eea',
                    fontWeight: 600
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#667eea'
                  }
                },
                '&:hover': {
                  backgroundColor: 'rgba(102, 126, 234, 0.05)',
                },
                transition: 'all 0.2s ease'
              }}
            >
              <Box sx={{ mr: 1.5, display: 'flex', alignItems: 'flex-start', pt: 0.25 }}>
                {item.icon}
              </Box>
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.85rem',
                  fontWeight: selectedItem === item.label ? 600 : 500,
                  lineHeight: 1.3,
                  wordBreak: 'break-word',
                  whiteSpace: 'normal'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default AdminSidebar
