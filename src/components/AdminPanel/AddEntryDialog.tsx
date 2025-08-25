import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { useState, useEffect } from 'react'

interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'right' | 'left' | 'center'
  format?: (value: any) => string
}

interface AddEntryDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: Record<string, any>) => void
  columns: Column[]
  title: string
  editingEntry?: Record<string, any> | null
  isEdit?: boolean
}

const AddEntryDialog = ({ 
  open, 
  onClose, 
  onSubmit, 
  columns, 
  title, 
  editingEntry, 
  isEdit = false 
}: AddEntryDialogProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Filter out ID and edit columns since they're not editable
  const editableColumns = columns.filter(col => col.id !== 'id' && col.id !== 'edit')

  useEffect(() => {
    if (open) {
      // Reset form when dialog opens
      const initialData: Record<string, any> = {}
      editableColumns.forEach(col => {
        if (isEdit && editingEntry && editingEntry[col.id] !== undefined) {
          // Pre-fill with existing data for edit mode
          initialData[col.id] = editingEntry[col.id]
        } else if (col.id === 'color') {
          initialData[col.id] = '#3498db'
        } else {
          initialData[col.id] = ''
        }
      })
      setFormData(initialData)
      setErrors({})
    }
  }, [open, isEdit, editingEntry])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    editableColumns.forEach(col => {
      if (!formData[col.id] || formData[col.id].toString().trim() === '') {
        newErrors[col.id] = `${col.label} is required`
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData)
      // Don't call onClose() immediately, let the parent handle it
    }
  }

  const getFieldType = (columnId: string) => {
    if (columnId.toLowerCase().includes('email')) return 'email'
    if (columnId.toLowerCase().includes('date')) return 'date'
    if (columnId.toLowerCase().includes('time') && columnId !== 'activityLeadTime' && columnId !== 'activityLeadTimeWrt') return 'datetime-local'
    if (columnId.toLowerCase().includes('url')) return 'url'
    if (columnId.toLowerCase().includes('version') || columnId.toLowerCase().includes('count') || columnId.toLowerCase().includes('activities') || columnId === 'activityLeadTime' || columnId.toLowerCase().includes('leadtime')) return 'number'
    return 'text'
  }

  const getSelectOptions = (columnId: string) => {
    const optionsMap: Record<string, string[]> = {
      'status': ['Active', 'Inactive', 'Pending', 'Completed', 'In Progress', 'Maintenance'],
      'type': ['Technical', 'Testing', 'Security', 'Documentation', 'Monitoring', 'Business', 'Primary', 'Alternate'],
      'appType': ['Backend Service', 'Web Application', 'Mobile App', 'Microservice', 'Data Visualization', 'API Service'],
      'isAutomated': ['Yes', 'No'],
      'modeOfCommunication': ['API', 'Email', 'Slack', 'Teams', 'SMS', 'Webhook'],
      'platform': ['AWS ECS', 'React/Node.js', 'React/Python', 'Java Spring Boot', 'Node.js', 'React Native', 'Kubernetes'],
      'deploymentPlatform': ['AWS ECS Fargate', 'AWS S3/CloudFront', 'Kubernetes', 'AWS EKS', 'AWS Lambda', 'App Store/Google Play'],
      'activityLeadTimeWrt': ['Business Days', 'Calendar Days', 'Business Hours', 'Calendar Hours', 'Weeks'],
      'department': ['Engineering', 'Quality Assurance', 'Operations', 'Security', 'Data Team', 'Product'],
      'role': ['Release Manager', 'QA Lead', 'DevOps Engineer', 'Security Analyst', 'Developer', 'Product Manager', 'Technical Lead'],
      'team': ['Backend Team', 'Frontend Team', 'QA Team', 'DevOps Team', 'Data Team', 'Security Team', 'Mobile Team'],
      'changeType': ['Defect', 'Feature Enhancement', 'Infra/Config Updates'],
      'readinessState': ['Ready', 'In Progress']
    }
    return optionsMap[columnId] || []
  }

  const renderField = (column: Column) => {
    const selectOptions = getSelectOptions(column.id)
    
    if (selectOptions.length > 0) {
      return (
        <FormControl fullWidth margin="normal" key={column.id}>
          <InputLabel>{column.label}</InputLabel>
          <Select
            value={formData[column.id] || ''}
            onChange={(e) => handleInputChange(column.id, e.target.value)}
            label={column.label}
            error={!!errors[column.id]}
          >
            {selectOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
          {errors[column.id] && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
              {errors[column.id]}
            </Typography>
          )}
        </FormControl>
      )
    }

    if (column.id === 'color') {
      return (
        <TextField
          key={column.id}
          fullWidth
          margin="normal"
          label={column.label}
          type="color"
          value={formData[column.id] || '#3498db'}
          onChange={(e) => handleInputChange(column.id, e.target.value)}
          error={!!errors[column.id]}
          helperText={errors[column.id]}
          InputProps={{
            sx: { height: 56 }
          }}
        />
      )
    }

    return (
      <TextField
        key={column.id}
        fullWidth
        margin="normal"
        label={column.label}
        type={getFieldType(column.id)}
        value={formData[column.id] || ''}
        onChange={(e) => handleInputChange(column.id, e.target.value)}
        error={!!errors[column.id]}
        helperText={errors[column.id]}
        multiline={column.id === 'activityDetails' || column.id === 'description' || column.id === 'comments'}
        rows={column.id === 'activityDetails' || column.id === 'description' || column.id === 'comments' ? 3 : 1}
      />
    )
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)',
          color: 'white',
          fontWeight: 700
        }}
      >
        {isEdit ? 'Edit' : 'Add New'} {title.replace(/s$/, '')}
        <Button
          onClick={onClose}
          sx={{ 
            minWidth: 'auto',
            color: 'white',
            '&:hover': { 
              backgroundColor: 'rgba(255, 255, 255, 0.1)' 
            }
          }}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {editableColumns.map(column => renderField(column))}
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            borderColor: '#ccc',
            color: '#666',
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            padding: '8px 24px',
            '&:hover': {
              borderColor: '#999',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            }
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            padding: '8px 24px',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            }
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddEntryDialog
