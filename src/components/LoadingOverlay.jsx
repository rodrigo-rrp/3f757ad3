import React from 'react'
import { Box, CircularProgress } from '@mui/material'

const LoadingOverlay = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default LoadingOverlay
