import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminContent from './AdminContent'
import SuccessBanner from './SuccessBanner'
import './styles.scss'

// Import API service
import { apiService } from '../../services/api'

export interface AdminPanelProps {
  onClose: () => void
}

const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('Release Governance Activities')
  const [tableData, setTableData] = useState<Record<string, any[]>>({})
  const [successBanner, setSuccessBanner] = useState({ open: false, message: '' })
  const [refreshKey] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load initial data for all menu items
  useEffect(() => {
    const loadInitialData = async () => {
      console.log('[AdminPanel] Starting to load initial data...')
      setLoading(true)
      setError(null)
      
      const menuItems = [
        'Release Governance Activities',
        'Release Activities Categories', 
        'Release Activities',
        'Release Schedule',
        'Release Activity Owners',
        'Point of Contacts',
        'Applications'
      ]

      try {
        console.log('[AdminPanel] API Service mode:', apiService.getMode())
        console.log('[AdminPanel] API Service base URL:', apiService.getBaseUrl())
        
        const dataPromises = menuItems.map(async (menuItem) => {
          console.log(`[AdminPanel] Loading data for: ${menuItem}`)
          try {
            const response = await apiService.getData(menuItem)
            console.log(`[AdminPanel] Response for ${menuItem}:`, response)
            return { menuItem, data: response.success ? response.data : [], response }
          } catch (err) {
            console.error(`[AdminPanel] Error loading ${menuItem}:`, err)
            return { menuItem, data: [], error: err }
          }
        })

        const results = await Promise.all(dataPromises)
        const newTableData: Record<string, any[]> = {}
        
        results.forEach(({ menuItem, data, response, error }) => {
          if (error) {
            console.warn(`[AdminPanel] Failed to load ${menuItem}:`, error)
          } else if (response && !response.success) {
            console.warn(`[AdminPanel] API error for ${menuItem}:`, response.error || response.message)
          }
          newTableData[menuItem] = data
        })

        setTableData(newTableData)
        console.log('[AdminPanel] Successfully loaded all data:', newTableData)
        console.log(`[AdminPanel] Loaded data in ${apiService.getMode()} mode from ${apiService.getBaseUrl()}`)
      } catch (error: any) {
        console.error('[AdminPanel] Fatal error loading initial data:', error)
        setError(error.message || 'Failed to load data')
        setSuccessBanner({
          open: true,
          message: `Error loading data: ${error.message || 'Unknown error'}`
        })
      } finally {
        console.log('[AdminPanel] Finished loading initial data, setting loading to false')
        setLoading(false)
      }
    }

    loadInitialData()
  }, [refreshKey])

  const handleAddEntry = async (menuItem: string, newEntry: Record<string, any>) => {
    setLoading(true)
    try {
      const response = await apiService.create(menuItem, newEntry)
      
      if (response.success) {
        // Update local state with the new entry
        setTableData(prev => ({
          ...prev,
          [menuItem]: [...(prev[menuItem] || []), response.data]
        }))

        // Show success banner
        setSuccessBanner({
          open: true,
          message: response.message || `Entry created successfully in ${response.mode} mode!`
        })
      } else {
        throw new Error(response.error || 'Failed to create entry')
      }
    } catch (error: any) {
      console.error('[AdminPanel] Error creating entry:', error)
      setSuccessBanner({
        open: true,
        message: `Error creating entry: ${error.message}`
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEditEntry = async (menuItem: string, editedEntry: Record<string, any>) => {
    setLoading(true)
    try {
      const response = await apiService.update(menuItem, editedEntry.id, editedEntry)
      
      if (response.success) {
        // Update local state with the edited entry
        setTableData(prev => ({
          ...prev,
          [menuItem]: prev[menuItem].map(item => 
            item.id === editedEntry.id ? response.data : item
          )
        }))

        // Show success banner
        setSuccessBanner({
          open: true,
          message: response.message || `Entry updated successfully in ${response.mode} mode!`
        })
      } else {
        throw new Error(response.error || 'Failed to update entry')
      }
    } catch (error: any) {
      console.error('[AdminPanel] Error updating entry:', error)
      setSuccessBanner({
        open: true,
        message: `Error updating entry: ${error.message}`
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRefreshData = async () => {
    setLoading(true)
    try {
      // Refresh data for current menu item
      const response = await apiService.getData(selectedMenuItem)
      
      if (response.success) {
        setTableData(prev => ({
          ...prev,
          [selectedMenuItem]: response.data
        }))
        
        setSuccessBanner({
          open: true,
          message: response.message || `Data refreshed successfully from ${response.mode} mode!`
        })
      } else {
        throw new Error(response.error || 'Failed to refresh data')
      }
    } catch (error: any) {
      console.error('[AdminPanel] Error refreshing data:', error)
      setSuccessBanner({
        open: true,
        message: `Error refreshing data: ${error.message}`
      })
    } finally {
      setLoading(false)
    }
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
            loading={loading}
            error={error}
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
