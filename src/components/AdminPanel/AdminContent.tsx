import { Box, Typography, Paper } from '@mui/material'
import { useState } from 'react'
import AdminTable from './AdminTable'
import AddEntryDialog from './AddEntryDialog'

interface AdminContentProps {
  selectedMenuItem: string
  tableData: Record<string, any[]>
  onAddEntry: (menuItem: string, newEntry: Record<string, any>) => void
  onRefreshData: () => void
}

// Mock data for each table - in a real application, this would come from APIs
const tableConfigs = {
  'Release Governance Activities': {
    title: 'Release Governance Activities',
    columns: [
      { id: 'id', label: 'ID', minWidth: 70 },
      { id: 'name', label: 'Activity Name', minWidth: 200 },
      { id: 'description', label: 'Description', minWidth: 300 },
      { id: 'category', label: 'Category', minWidth: 150 },
      { id: 'status', label: 'Status', minWidth: 100 }
    ],
    data: [
      { id: '1', name: 'Code Review', description: 'Mandatory code review process', category: 'Quality', status: 'Active' },
      { id: '2', name: 'Security Scan', description: 'Automated security vulnerability scanning', category: 'Security', status: 'Active' },
      { id: '3', name: 'Performance Testing', description: 'Load and performance testing', category: 'Quality', status: 'Active' },
      { id: '4', name: 'Documentation Update', description: 'Update release documentation', category: 'Documentation', status: 'Pending' }
    ]
  },
  'Release Activities Categories': {
    title: 'Release Activities Categories',
    columns: [
      { id: 'id', label: 'ID', minWidth: 70 },
      { id: 'name', label: 'Category Name', minWidth: 200 },
      { id: 'description', label: 'Description', minWidth: 300 },
      { id: 'color', label: 'Color', minWidth: 100 },
      { id: 'count', label: 'Activities Count', minWidth: 150 }
    ],
    data: [
      { id: '1', name: 'Quality', description: 'Quality assurance activities', color: '#3498db', count: '15' },
      { id: '2', name: 'Security', description: 'Security-related activities', color: '#e74c3c', count: '8' },
      { id: '3', name: 'Documentation', description: 'Documentation activities', color: '#2ecc71', count: '5' },
      { id: '4', name: 'Deployment', description: 'Deployment-related activities', color: '#f39c12', count: '12' }
    ]
  },
  'Release Activities': {
    title: 'Release Activities',
    columns: [
      { id: 'id', label: 'ID', minWidth: 70 },
      { id: 'name', label: 'Activity Name', minWidth: 200 },
      { id: 'assignee', label: 'Assignee', minWidth: 150 },
      { id: 'dueDate', label: 'Due Date', minWidth: 120 },
      { id: 'status', label: 'Status', minWidth: 100 }
    ],
    data: [
      { id: '1', name: 'API Testing', assignee: 'John Doe', dueDate: '2024-02-15', status: 'In Progress' },
      { id: '2', name: 'UI Review', assignee: 'Jane Smith', dueDate: '2024-02-10', status: 'Completed' },
      { id: '3', name: 'Database Migration', assignee: 'Bob Johnson', dueDate: '2024-02-20', status: 'Pending' },
      { id: '4', name: 'Integration Testing', assignee: 'Alice Brown', dueDate: '2024-02-18', status: 'In Progress' }
    ]
  },
  'Point of Contacts': {
    title: 'Point of Contacts',
    columns: [
      { id: 'id', label: 'ID', minWidth: 70 },
      { id: 'name', label: 'Name', minWidth: 150 },
      { id: 'email', label: 'Email', minWidth: 200 },
      { id: 'role', label: 'Role', minWidth: 150 },
      { id: 'department', label: 'Department', minWidth: 150 }
    ],
    data: [
      { id: '1', name: 'John Doe', email: 'john.doe@company.com', role: 'Release Manager', department: 'Engineering' },
      { id: '2', name: 'Jane Smith', email: 'jane.smith@company.com', role: 'QA Lead', department: 'Quality Assurance' },
      { id: '3', name: 'Bob Johnson', email: 'bob.johnson@company.com', role: 'DevOps Engineer', department: 'Operations' },
      { id: '4', name: 'Alice Brown', email: 'alice.brown@company.com', role: 'Security Analyst', department: 'Security' }
    ]
  },
  'Release Activity Owners': {
    title: 'Release Activity Owners',
    columns: [
      { id: 'id', label: 'ID', minWidth: 70 },
      { id: 'name', label: 'Owner Name', minWidth: 150 },
      { id: 'email', label: 'Email', minWidth: 200 },
      { id: 'activities', label: 'Owned Activities', minWidth: 100 },
      { id: 'team', label: 'Team', minWidth: 150 }
    ],
    data: [
      { id: '1', name: 'Sarah Wilson', email: 'sarah.wilson@company.com', activities: '5', team: 'Backend Team' },
      { id: '2', name: 'Mike Davis', email: 'mike.davis@company.com', activities: '3', team: 'Frontend Team' },
      { id: '3', name: 'Lisa Chen', email: 'lisa.chen@company.com', activities: '7', team: 'QA Team' },
      { id: '4', name: 'Tom Rodriguez', email: 'tom.rodriguez@company.com', activities: '4', team: 'DevOps Team' }
    ]
  },
  'Applications': {
    title: 'Applications',
    columns: [
      { id: 'id', label: 'ID', minWidth: 70 },
      { id: 'name', label: 'Application Name', minWidth: 200 },
      { id: 'version', label: 'Version', minWidth: 100 },
      { id: 'owner', label: 'Owner', minWidth: 150 },
      { id: 'status', label: 'Status', minWidth: 100 }
    ],
    data: [
      { id: '1', name: 'User Management API', version: '2.1.0', owner: 'Backend Team', status: 'Active' },
      { id: '2', name: 'Customer Portal', version: '1.5.2', owner: 'Frontend Team', status: 'Active' },
      { id: '3', name: 'Analytics Dashboard', version: '3.0.1', owner: 'Data Team', status: 'Active' },
      { id: '4', name: 'Payment Gateway', version: '1.8.4', owner: 'Payment Team', status: 'Maintenance' }
    ]
  }
}

const AdminContent = ({ 
  selectedMenuItem, 
  tableData, 
  onAddEntry, 
  onRefreshData 
}: AdminContentProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const config = tableConfigs[selectedMenuItem as keyof typeof tableConfigs]

  const handleRefresh = () => {
    onRefreshData()
  }

  const handleAddEntryClick = () => {
    setDialogOpen(true)
  }

  const handleDialogSubmit = (newEntry: Record<string, any>) => {
    onAddEntry(selectedMenuItem, newEntry)
    setDialogOpen(false)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
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
          p: 3 // Add padding inside the paper container
        }}
      >
        <AdminTable 
          columns={config.columns}
          data={tableData[selectedMenuItem] || []}
          onRefresh={handleRefresh}
          onAddEntry={handleAddEntryClick}
        />
      </Paper>
      
      <AddEntryDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
        columns={config.columns}
        title={config.title}
      />
    </Box>
  )
}

export default AdminContent
