import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Box,
  Button
} from '@mui/material'
import { 
  Refresh as RefreshIcon, 
  Add as AddIcon
} from '@mui/icons-material'
import { useState } from 'react'

interface Column {
  id: string
  label: string
  minWidth?: number
  align?: 'right' | 'left' | 'center'
  format?: (value: any) => string
}

interface AdminTableProps {
  columns: Column[]
  data: Record<string, any>[]
  onRefresh?: () => void
  onAddEntry?: () => void
}

const AdminTable = ({ columns, data, onRefresh, onAddEntry }: AdminTableProps) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      'Active': '#2ecc71',
      'Inactive': '#95a5a6',
      'Pending': '#f39c12',
      'Completed': '#3498db',
      'In Progress': '#e67e22',
      'Maintenance': '#9b59b6'
    }
    return statusColors[status] || '#95a5a6'
  }

  const renderCellContent = (column: Column, value: any) => {
    // Handle status columns with chips
    if (column.id === 'status' && typeof value === 'string') {
      return (
        <Chip
          label={value}
          sx={{
            backgroundColor: getStatusColor(value),
            color: 'white',
            fontWeight: 500,
            fontSize: '0.75rem'
          }}
          size="small"
        />
      )
    }

    // Handle color columns with color preview
    if (column.id === 'color' && typeof value === 'string' && value.startsWith('#')) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              backgroundColor: value,
              borderRadius: '50%',
              border: '1px solid #e0e0e0'
            }}
          />
          <span>{value}</span>
        </Box>
      )
    }

    // Apply custom formatting if provided
    if (column.format) {
      return column.format(value)
    }

    return value
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
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
            transition: 'all 0.3s ease',
          }}
        >
          Refresh
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddEntry}
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
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="admin table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ 
                    minWidth: column.minWidth,
                    background: 'linear-gradient(135deg, #6495ED 0%, #9370DB 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: 'none'
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow 
                  hover 
                  role="checkbox" 
                  tabIndex={-1} 
                  key={index}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(102, 126, 234, 0.04)'
                    }
                  }}
                >
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell 
                        key={column.id} 
                        align={column.align}
                        sx={{
                          borderBottom: '1px solid #f0f0f0',
                          py: 1.5
                        }}
                      >
                        {renderCellContent(column, value)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: '1px solid #e9ecef',
          backgroundColor: '#f8f9fa'
        }}
      />
    </Box>
  )
}

export default AdminTable
