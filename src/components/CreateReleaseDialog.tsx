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
import './CreateReleaseDialog.scss'

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
    releaseSupervisorName: ''
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
      releaseSupervisorName: ''
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
          className: 'dialog-paper'
        }}
      >
        <div className="dialog-header">
          <IconButton onClick={handleClose} className="close-button">
            <CloseIcon />
          </IconButton>
        </div>
        
        <DialogTitle className="dialog-title">
          <Typography variant="h5" className="title-text">
            🚀 Create New Release
          </Typography>
        </DialogTitle>

        <DialogContent className="dialog-content">
          <div className="form-container">
            {/* Basic Release Information */}
            <Typography variant="h6" className="section-title">
              📋 Basic Release Information
            </Typography>
            <div className="form-section">
              <TextField
                fullWidth
                label="Release Name"
                value={formData.releaseName}
                onChange={handleInputChange('releaseName')}
                required
                variant="outlined"
                className="form-field"
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Fix Version"
                value={formData.fixVersion}
                onChange={handleInputChange('fixVersion')}
                required
                variant="outlined"
                className="form-field"
                sx={{ mb: 3 }}
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
                className="form-field"
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Seal IDs"
                value={formData.sealIds}
                onChange={handleInputChange('sealIds')}
                placeholder="Enter comma-separated seal IDs"
                variant="outlined"
                className="form-field"
                sx={{ mb: 3 }}
              />
              <FormControl component="fieldset" className="radio-group-container" sx={{ mb: 3 }}>
                <FormLabel component="legend" className="radio-label">
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
            </div>

            <Divider className="section-divider" />

            {/* Technical Information */}
            <Typography variant="h6" className="section-title">
              ⚙️ Technical Information
            </Typography>
            <div className="form-section">
              <TextField
                fullWidth
                label="Release Branch Name"
                value={formData.releaseBranchName}
                onChange={handleInputChange('releaseBranchName')}
                required
                variant="outlined"
                className="form-field"
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Change Number"
                value={formData.changeNumber}
                onChange={handleInputChange('changeNumber')}
                variant="outlined"
                className="form-field"
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Implementation Plan Link"
                value={formData.implementationPlanLink}
                onChange={handleInputChange('implementationPlanLink')}
                placeholder="https://..."
                variant="outlined"
                className="form-field"
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Release Scope Page Link"
                value={formData.releaseScopePageLink}
                onChange={handleInputChange('releaseScopePageLink')}
                placeholder="https://..."
                variant="outlined"
                className="form-field"
                sx={{ mb: 3 }}
              />
            </div>

            <Divider className="section-divider" />

            {/* Team Information */}
            <Typography variant="h6" className="section-title">
              👥 Team Information
            </Typography>
            <div className="form-section">
              <TextField
                fullWidth
                label="Release Coordinator Name"
                value={formData.releaseCoordinatorName}
                onChange={handleInputChange('releaseCoordinatorName')}
                required
                variant="outlined"
                className="form-field"
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Release Supervisor Name"
                value={formData.releaseSupervisorName}
                onChange={handleInputChange('releaseSupervisorName')}
                required
                variant="outlined"
                className="form-field"
                sx={{ mb: 3 }}
              />
            </div>
          </div>
        </DialogContent>

        <DialogActions className="dialog-actions">
          <Button
            onClick={handleClose}
            variant="outlined"
            size="large"
            className="action-button cancel-button"
            sx={{
              color: '#666',
              fontWeight: 'bold',
              textTransform: 'none',
              borderColor: '#ddd',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                color: '#333',
                borderColor: '#bbb',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            size="large"
            className="action-button submit-button"
            sx={{
              background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(100, 149, 237, 0.3)',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #4169E1 0%, #8A2BE2 100%)',
                boxShadow: '0 6px 12px rgba(100, 149, 237, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
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
