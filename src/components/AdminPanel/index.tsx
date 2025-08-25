import { Box } from '@mui/material'
import { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminContent from './AdminContent'
import SuccessBanner from './SuccessBanner'
import './styles.scss'

// Import mock data
import releaseGovernanceActivitiesData from '../../mockData/releaseGovernanceActivities.json'
import releaseActivitiesCategoriesData from '../../mockData/releaseActivitiesCategories.json'
import releaseActivitiesData from '../../mockData/releaseActivities.json'
import releaseScheduleData from '../../mockData/releaseSchedule.json'
import pointOfContactsData from '../../mockData/pointOfContacts.json'
import releaseActivityOwnersData from '../../mockData/releaseActivityOwners.json'
import applicationsData from '../../mockData/applications.json'

export interface AdminPanelProps {
  onClose: () => void
}

// Initial data for all tables with reordered menus
const initialTableData = {
  'Release Governance Activities': releaseGovernanceActivitiesData,
  'Release Activities Categories': releaseActivitiesCategoriesData,
  'Release Activities': releaseActivitiesData,
  'Release Schedule': releaseScheduleData,
  'Release Activity Owners': releaseActivityOwnersData,
  'Point of Contacts': pointOfContactsData,
  'Applications': applicationsData
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

  const handleEditEntry = (menuItem: string, editedEntry: Record<string, any>) => {
    setTableData(prev => ({
      ...prev,
      [menuItem]: prev[menuItem as keyof typeof prev].map(item => 
        item.id === editedEntry.id ? editedEntry : item
      )
    }))

    // Show success banner
    setSuccessBanner({
      open: true,
      message: `Entry updated successfully!`
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
            onEditEntry={handleEditEntry}
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
