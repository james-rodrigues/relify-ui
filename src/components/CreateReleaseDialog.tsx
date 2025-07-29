import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Typography
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
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e9ecef',
          pb: 2,
          mb: 2
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#2c3e50' }}>
          🚀 Create New Release
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TextField
            fullWidth
            label="Release Name"
            value={formData.releaseName}
            onChange={handleInputChange('releaseName')}
            required
            variant="outlined"
          />
          
          <TextField
            fullWidth
            label="Fix Version"
            value={formData.fixVersion}
            onChange={handleInputChange('fixVersion')}
            required
            variant="outlined"
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
          />

          <TextField
            fullWidth
            label="Seal IDs"
            value={formData.sealIds}
            onChange={handleInputChange('sealIds')}
            placeholder="Enter comma-separated seal IDs"
            variant="outlined"
          />

          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 600, color: '#2c3e50', mb: 1 }}>
              Client Impact
            </FormLabel>
            <RadioGroup
              value={formData.clientImpact}
              onChange={handleInputChange('clientImpact')}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          <TextField
            fullWidth
            label="Release Branch Name"
            value={formData.releaseBranchName}
            onChange={handleInputChange('releaseBranchName')}
            required
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Change Number"
            value={formData.changeNumber}
            onChange={handleInputChange('changeNumber')}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Implementation Plan Link"
            value={formData.implementationPlanLink}
            onChange={handleInputChange('implementationPlanLink')}
            placeholder="https://..."
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Release Scope Page Link"
            value={formData.releaseScopePageLink}
            onChange={handleInputChange('releaseScopePageLink')}
            placeholder="https://..."
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Release Coordinator Name"
            value={formData.releaseCoordinatorName}
            onChange={handleInputChange('releaseCoordinatorName')}
            required
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Release Supervisor Name"
            value={formData.releaseSupervisorName}
            onChange={handleInputChange('releaseSupervisorName')}
            required
            variant="outlined"
          />
        </div>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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

export default CreateReleaseDialog
