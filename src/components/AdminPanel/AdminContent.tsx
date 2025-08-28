import { Box, Typography, Paper, TextField, InputAdornment, Button, CircularProgress, Alert } from '@mui/material'
import { useState, useMemo } from 'react'
import { Search as SearchIcon, Refresh as RefreshIcon, Add as AddIcon } from '@mui/icons-material'
import AdminTable from './AdminTable'
import AddEntryDialog from './AddEntryDialog'
import ApplicationsAccordion from './ApplicationsAccordion'

interface AdminContentProps {
  selectedMenuItem: string
  tableData: Record<string, any[]>
  onAddEntry: (menuItem: string, newEntry: Record<string, any>) => void
  onEditEntry: (menuItem: string, editedEntry: Record<string, any>) => void
  onRefreshData: () => void
  loading?: boolean
  error?: string | null
}

// Table configurations with updated column definitions
const tableConfigs = {
  'Release Governance Activities': {
    title: 'Release Governance Activities',
    columns: [
      { id: 'edit', label: 'Edit', minWidth: 80 },
      { id: 'governanceActivityId', label: 'Governance Activity ID', minWidth: 180 },
      { id: 'governanceActivityName', label: 'Governance Activity Name', minWidth: 250 },
      { id: 'cutOffDaysLeadtime', label: 'Cut Off Days Leadtime', minWidth: 180 }
    ]
  },
  'Release Activities Categories': {
    title: 'Release Activities Categories',
    columns: [
      { id: 'edit', label: 'Edit', minWidth: 80 },
      { id: 'categoryId', label: 'Category ID', minWidth: 150 },
      { id: 'categoryName', label: 'Category Name', minWidth: 200 }
    ]
  },
  'Release Activities': {
    title: 'Release Activities',
    columns: [
      { id: 'edit', label: 'Edit', minWidth: 80 },
      { id: 'activityId', label: 'Activity ID', minWidth: 120 },
      { id: 'activityName', label: 'Activity Name', minWidth: 200 },
      { id: 'categoryId', label: 'Category ID', minWidth: 120 },
      { id: 'type', label: 'Type', minWidth: 100 },
      { id: 'activitySubjectPrefix', label: 'Activity Subject Prefix', minWidth: 180 },
      { id: 'activityDetails', label: 'Activity Details', minWidth: 250 },
      { id: 'isAutomated', label: 'Is Automated?', minWidth: 120 },
      { id: 'apiUrl', label: 'API URL', minWidth: 200 },
      { id: 'modeOfCommunication', label: 'Mode of Communication', minWidth: 180 },
      { id: 'governanceActivityId', label: 'Governance Activity ID', minWidth: 180 }
    ]
  },
  'Release Schedule': {
    title: 'Release Schedule',
    columns: [
      { id: 'edit', label: 'Edit', minWidth: 80 },
      { id: 'scheduleId', label: 'Schedule ID', minWidth: 120 },
      { id: 'activityId', label: 'Activity ID', minWidth: 120 },
      { id: 'activityLeadTime', label: 'Activity Lead Time', minWidth: 150 },
      { id: 'activityLeadTimeWrt', label: 'Activity Lead Time Wrt', minWidth: 180 },
      { id: 'activityTime', label: 'Activity Time', minWidth: 180 }
    ]
  },
  'Release Activity Owners': {
    title: 'Release Activity Owners',
    columns: [
      { id: 'edit', label: 'Edit', minWidth: 80 },
      { id: 'activityId', label: 'Activity ID', minWidth: 150 },
      { id: 'contactId', label: 'Contact ID', minWidth: 150 },
      { id: 'alternateContactId', label: 'Alternate Contact ID', minWidth: 180 }
    ]
  },
  'Point of Contacts': {
    title: 'Point of Contacts',
    columns: [
      { id: 'edit', label: 'Edit', minWidth: 80 },
      { id: 'contactId', label: 'Contact ID', minWidth: 120 },
      { id: 'type', label: 'Type', minWidth: 100 },
      { id: 'name', label: 'Name', minWidth: 150 },
      { id: 'role', label: 'Role', minWidth: 150 },
      { id: 'sid', label: 'SID', minWidth: 100 },
      { id: 'emailId', label: 'Email ID', minWidth: 200 }
    ]
  },
  'Applications': {
    title: 'Applications',
    columns: [
      { id: 'edit', label: 'Edit', minWidth: 80 },
      { id: 'applicationId', label: 'Application ID', minWidth: 130 },
      { id: 'appName', label: 'App Name', minWidth: 180 },
      { id: 'appType', label: 'App Type', minWidth: 140 },
      { id: 'projectName', label: 'Project Name', minWidth: 160 },
      { id: 'platform', label: 'Platform', minWidth: 140 },
      { id: 'repositoryLink', label: 'Repository Link', minWidth: 200 },
      { id: 'deploymentPlatform', label: 'Deployment Platform', minWidth: 180 }
    ]
  }
}

const AdminContent = ({ 
  selectedMenuItem, 
  tableData, 
  onAddEntry, 
  onEditEntry,
  onRefreshData,
  loading = false,
  error = null
}: AdminContentProps) => {
  // ALL HOOKS MUST BE CALLED FIRST - BEFORE ANY EARLY RETURNS
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<Record<string, any> | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Get the search field for current menu
  const getSearchField = (menuItem: string) => {
    const searchFields: Record<string, string> = {
      'Release Governance Activities': 'governanceActivityName',
      'Release Activities Categories': 'categoryName', 
      'Release Activities': 'activityName',
      'Release Schedule': 'scheduleId',
      'Release Activity Owners': 'activityId',
      'Point of Contacts': 'name',
      'Applications': 'appName'
    }
    return searchFields[menuItem] || 'id'
  }

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return tableData[selectedMenuItem] || []
    }
    
    const searchField = getSearchField(selectedMenuItem)
    return (tableData[selectedMenuItem] || []).filter(item => {
      const searchValue = item[searchField]?.toString().toLowerCase() || ''
      return searchValue.includes(searchTerm.toLowerCase())
    })
  }, [tableData, selectedMenuItem, searchTerm])

  // NOW WE CAN DO EARLY RETURNS AFTER ALL HOOKS ARE DEFINED
  const config = tableConfigs[selectedMenuItem as keyof typeof tableConfigs]

  const handleRefresh = () => {
    onRefreshData()
  }

  const handleAddEntryClick = () => {
    setEditingEntry(null)
    setDialogOpen(true)
  }

  const handleEditEntryClick = (rowData: Record<string, any>) => {
    setEditingEntry(rowData)
    setDialogOpen(true)
  }

  const handleDialogSubmit = (entryData: Record<string, any>) => {
    if (editingEntry) {
      // Edit mode
      onEditEntry(selectedMenuItem, { ...editingEntry, ...entryData })
    } else {
      // Add mode
      onAddEntry(selectedMenuItem, entryData)
    }
    setDialogOpen(false)
    setEditingEntry(null)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setEditingEntry(null)
  }

  // Show loading indicator
  if (loading && (!tableData[selectedMenuItem] || tableData[selectedMenuItem].length === 0)) {
    return (
      <Box className="admin-content" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#666' }}>Loading {selectedMenuItem}...</Typography>
        </Box>
      </Box>
    )
  }

  if (!config) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" color="error">
          Invalid menu selection
        </Typography>
      </Box>
    )
  }

  // Special handling for Applications - use accordion layout
  if (selectedMenuItem === 'Applications') {
    return (
      <Box className="admin-content">
        <Box className="admin-content-header">
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              color: '#2c3e50',
              mb: 1
            }}
          >
            {config.title}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#5a6c7d',
              mb: 3
            }}
          >
            Manage and configure {config.title.toLowerCase()}
          </Typography>
        </Box>
        <Paper 
          elevation={1} 
          sx={{ 
            borderRadius: 2, 
            overflow: 'hidden',
            p: 3,
            position: 'relative'
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {loading && (
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              backgroundColor: 'rgba(255,255,255,0.8)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              zIndex: 1000 
            }}>
              <CircularProgress />
            </Box>
          )}
          <ApplicationsAccordion
            onAddEntry={(entry) => onAddEntry(selectedMenuItem, entry)}
            onEditEntry={(entry) => onEditEntry(selectedMenuItem, entry)}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            data={filteredData}
          />
        </Paper>
      </Box>
    )
  }

  return (
    <Box className="admin-content">
      <Box className="admin-content-header">
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            color: '#2c3e50',
            mb: 1
          }}
        >
          {config.title}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#5a6c7d',
            mb: 3
          }}
        >
          Manage and configure {config.title.toLowerCase()}
        </Typography>
      </Box>
      
      <Paper 
        elevation={1} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          p: 3, // Add padding inside the paper container
          position: 'relative'
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {loading && (
          <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: 'rgba(255,255,255,0.8)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 1000 
          }}>
            <CircularProgress />
          </Box>
        )}
        {/* Search and Action Bar */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          gap: 2
        }}>
          <TextField
            placeholder={`Search by ${getSearchField(selectedMenuItem) === 'appName' ? 'Application Name' : 
              getSearchField(selectedMenuItem) === 'activityName' ? 'Activity Name' :
              getSearchField(selectedMenuItem) === 'governanceActivityName' ? 'Governance Activity Name' :
              getSearchField(selectedMenuItem) === 'categoryName' ? 'Category Name' :
              getSearchField(selectedMenuItem) === 'name' ? 'Name' :
              getSearchField(selectedMenuItem) === 'scheduleId' ? 'Schedule ID' :
              getSearchField(selectedMenuItem) === 'activityId' ? 'Activity ID' : 'ID'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ 
              minWidth: 300,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '&:hover fieldset': {
                  borderColor: '#6495ED',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6495ED',
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#6495ED', fontSize: '20px' }} />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={loading}
              sx={{
                background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(100, 149, 237, 0.3)',
                textTransform: 'none',
                padding: '10px 20px',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4169E1 0%, #8A2BE2 100%)',
                  boxShadow: '0 6px 12px rgba(100, 149, 237, 0.4)',
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  background: '#ccc',
                  color: '#999',
                  boxShadow: 'none',
                  transform: 'none',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddEntryClick}
              disabled={loading}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                },
                '&:disabled': {
                  opacity: 0.7,
                  transform: 'none',
                }
              }}
            >
              Add Entry
            </Button>
          </Box>
        </Box>
        
        <AdminTable 
          columns={config.columns}
          data={filteredData}
          onRefresh={handleRefresh}
          onAddEntry={handleAddEntryClick}
          onEditEntry={handleEditEntryClick}
          hideActionButtons={true}
        />
      </Paper>
      
      <AddEntryDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
        columns={config.columns}
        title={config.title}
        editingEntry={editingEntry}
        isEdit={!!editingEntry}
      />
    </Box>
  )
}

export default AdminContent
