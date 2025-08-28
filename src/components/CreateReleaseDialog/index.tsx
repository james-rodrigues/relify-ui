import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Typography,
  Box,
  Grid,
  Divider
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import './styles.scss'

interface CreateReleaseDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (releaseData: ReleaseFormData) => void
}

export interface ReleaseFormData {
  releaseName: string
  fixVersion: string
  releaseDate: string
  sealIds: string
  clientImpact: 'yes' | 'no'
  releaseBranchName: string
  changeNumber: string
  implementationPlanLink: string
  releaseScopePageLink: string
  releaseCoordinatorName: string
  releaseSupervisorName: string
  governanceContact: string
}

const CreateReleaseDialog: React.FC<CreateReleaseDialogProps> = ({
  open,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<ReleaseFormData>({
    releaseName: '',
    fixVersion: '',
    releaseDate: '',
    sealIds: '',
    clientImpact: 'no',
    releaseBranchName: '',
    changeNumber: '',
    implementationPlanLink: '',
    releaseScopePageLink: '',
    releaseCoordinatorName: '',
    releaseSupervisorName: '',
    governanceContact: ''
  })

  const handleInputChange = (field: keyof ReleaseFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleSubmit = () => {
    onSubmit(formData)
    // Reset form after submission
    setFormData({
      releaseName: '',
      fixVersion: '',
      releaseDate: '',
      sealIds: '',
      clientImpact: 'no',
      releaseBranchName: '',
      changeNumber: '',
      implementationPlanLink: '',
      releaseScopePageLink: '',
      releaseCoordinatorName: '',
      releaseSupervisorName: '',
      governanceContact: ''
    })
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <div className="create-release-dialog">
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          className: 'dialog-paper',
          sx: {
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
            fontWeight: 700,
            borderRadius: '12px 12px 0 0'
          }}
        >
          <Typography variant="h4" sx={{ 
            fontWeight: 700,
            color: '#ffffff'
          }}>
            Create New Release
          </Typography>
          <IconButton 
            onClick={handleClose} 
            sx={{ 
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 4 }}>
          <div className="form-container">
            {/* Basic Release Information */}
            <Typography variant="h6" sx={{ 
              fontWeight: 700,
              color: '#2c3e50',
              mb: 3,
              mt: 2
            }}>
              Basic Release Information
            </Typography>
              <TextField
                fullWidth
                label="Release Name"
                value={formData.releaseName}
                onChange={handleInputChange('releaseName')}
                required
                variant="outlined"
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
              />
              <TextField
                fullWidth
                label="Fix Version"
                value={formData.fixVersion}
                onChange={handleInputChange('fixVersion')}
                required
                variant="outlined"
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
              />
              <TextField
                fullWidth
                label="Release Date"
                type="date"
                value={formData.releaseDate}
                onChange={handleInputChange('releaseDate')}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
              />
              <TextField
                fullWidth
                label="Seal IDs"
                value={formData.sealIds}
                onChange={handleInputChange('sealIds')}
                placeholder="Enter comma-separated seal IDs"
                variant="outlined"
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
              />
              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend" sx={{ 
                  color: '#2c3e50',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}>
                  Client Impact
                </FormLabel>
                <RadioGroup
                  value={formData.clientImpact}
                  onChange={handleInputChange('clientImpact')}
                  row
                  sx={{ mt: 1 }}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>

            <Typography variant="h6" sx={{ 
              fontWeight: 700,
              color: '#2c3e50',
              mb: 3,
              mt: 4
            }}>
              Technical Information
            </Typography>
              <TextField
                fullWidth
                label="Release Branch Name"
                value={formData.releaseBranchName}
                onChange={handleInputChange('releaseBranchName')}
                required
                variant="outlined"
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
              />
              <TextField
                fullWidth
                label="Change Number"
                value={formData.changeNumber}
                onChange={handleInputChange('changeNumber')}
                variant="outlined"
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
              />
              <TextField
                fullWidth
                label="Implementation Plan Link"
                value={formData.implementationPlanLink}
                onChange={handleInputChange('implementationPlanLink')}
                placeholder="https://..."
                variant="outlined"
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
              />
              <TextField
                fullWidth
                label="Release Scope Page Link"
                value={formData.releaseScopePageLink}
                onChange={handleInputChange('releaseScopePageLink')}
                placeholder="https://..."
                variant="outlined"
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
              />

            <Typography variant="h6" sx={{ 
              fontWeight: 700,
              color: '#2c3e50',
              mb: 3,
              mt: 4
            }}>
              Team Information
            </Typography>
              <TextField
                fullWidth
                label="Release Coordinator Name"
                value={formData.releaseCoordinatorName}
                onChange={handleInputChange('releaseCoordinatorName')}
                required
                variant="outlined"
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
              />
              <TextField
                fullWidth
                label="Release Supervisor Name"
                value={formData.releaseSupervisorName}
                onChange={handleInputChange('releaseSupervisorName')}
                required
                variant="outlined"
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
              />
              <TextField
                fullWidth
                label="Governance Contact"
                value={formData.governanceContact}
                onChange={handleInputChange('governanceContact')}
                placeholder="Enter governance contact email or name"
                required
                variant="outlined"
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px'
                  }
                }}
              />
          </div>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={handleClose}
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
            Create Release
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateReleaseDialog
