import { Box } from '@mui/material'
import { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminContent from './AdminContent'
import SuccessBanner from './SuccessBanner'
import './styles.scss'

export interface AdminPanelProps {
  onClose: () => void
}

// Initial data for all tables
const initialTableData = {
  'Release Governance Activities': [
    { id: '1', name: 'Code Review', description: 'Mandatory code review process', category: 'Quality', status: 'Active' },
    { id: '2', name: 'Security Scan', description: 'Automated security vulnerability scanning', category: 'Security', status: 'Active' },
    { id: '3', name: 'Performance Testing', description: 'Load and performance testing', category: 'Quality', status: 'Active' },
    { id: '4', name: 'Documentation Update', description: 'Update release documentation', category: 'Documentation', status: 'Pending' }
  ],
  'Release Activities Categories': [
    { id: '1', name: 'Quality', description: 'Quality assurance activities', color: '#3498db', count: '15' },
    { id: '2', name: 'Security', description: 'Security-related activities', color: '#e74c3c', count: '8' },
    { id: '3', name: 'Documentation', description: 'Documentation activities', color: '#2ecc71', count: '5' },
    { id: '4', name: 'Deployment', description: 'Deployment-related activities', color: '#f39c12', count: '12' }
  ],
  'Release Activities': [
    { id: '1', name: 'API Testing', assignee: 'John Doe', dueDate: '2024-02-15', status: 'In Progress' },
    { id: '2', name: 'UI Review', assignee: 'Jane Smith', dueDate: '2024-02-10', status: 'Completed' },
    { id: '3', name: 'Database Migration', assignee: 'Bob Johnson', dueDate: '2024-02-20', status: 'Pending' },
    { id: '4', name: 'Integration Testing', assignee: 'Alice Brown', dueDate: '2024-02-18', status: 'In Progress' }
  ],
  'Point of Contacts': [
    { id: '1', name: 'John Doe', email: 'john.doe@company.com', role: 'Release Manager', department: 'Engineering' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@company.com', role: 'QA Lead', department: 'Quality Assurance' },
    { id: '3', name: 'Bob Johnson', email: 'bob.johnson@company.com', role: 'DevOps Engineer', department: 'Operations' },
    { id: '4', name: 'Alice Brown', email: 'alice.brown@company.com', role: 'Security Analyst', department: 'Security' }
  ],
  'Release Activity Owners': [
    { id: '1', name: 'Sarah Wilson', email: 'sarah.wilson@company.com', activities: '5', team: 'Backend Team' },
    { id: '2', name: 'Mike Davis', email: 'mike.davis@company.com', activities: '3', team: 'Frontend Team' },
    { id: '3', name: 'Lisa Chen', email: 'lisa.chen@company.com', activities: '7', team: 'QA Team' },
    { id: '4', name: 'Tom Rodriguez', email: 'tom.rodriguez@company.com', activities: '4', team: 'DevOps Team' }
  ],
  'Applications': [
    { id: '1', name: 'User Management API', version: '2.1.0', owner: 'Backend Team', status: 'Active' },
    { id: '2', name: 'Customer Portal', version: '1.5.2', owner: 'Frontend Team', status: 'Active' },
    { id: '3', name: 'Analytics Dashboard', version: '3.0.1', owner: 'Data Team', status: 'Active' },
    { id: '4', name: 'Payment Gateway', version: '1.8.4', owner: 'Payment Team', status: 'Maintenance' }
  ]
}

const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('Release Governance Activities')
  const [tableData, setTableData] = useState(initialTableData)
  const [successBanner, setSuccessBanner] = useState({ open: false, message: '' })
  const [refreshKey, setRefreshKey] = useState(0)

  const handleAddEntry = (menuItem: string, newEntry: Record<string, any>) => {
    const currentData = tableData[menuItem as keyof typeof tableData] || []
    const newId = (currentData.length + 1).toString()
    const entryWithId = { id: newId, ...newEntry }
    
    setTableData(prev => ({
      ...prev,
      [menuItem]: [...(prev[menuItem as keyof typeof prev] || []), entryWithId]
    }))

    // Show success banner
    setSuccessBanner({
      open: true,
      message: `Entry created successfully!`
    })
  }

  const handleRefreshData = () => {
    // Simulate data refresh
    setRefreshKey(prev => prev + 1)
    setSuccessBanner({
      open: true,
      message: 'Data refreshed successfully!'
    })
  }

  const closeBanner = () => {
    setSuccessBanner({ open: false, message: '' })
  }

  return (
    <Box className="admin-panel">
      <Box className="admin-panel-container">
        <AdminSidebar 
          selectedItem={selectedMenuItem}
          onItemSelect={setSelectedMenuItem}
          onClose={onClose}
        />
        <Box className="admin-content-wrapper">
          <AdminContent 
            key={refreshKey}
            selectedMenuItem={selectedMenuItem}
            tableData={tableData}
            onAddEntry={handleAddEntry}
            onRefreshData={handleRefreshData}
          />
        </Box>
      </Box>
      <SuccessBanner 
        open={successBanner.open}
        message={successBanner.message}
        onClose={closeBanner}
      />
    </Box>
  )
}

export default AdminPanel
