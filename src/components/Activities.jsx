import React from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material'
import { useActivityContext } from '../contexts/activityContext'

import LoadingOverlay from './LoadingOverlay.jsx'
import { CallMade, CallReceived, Phone, PhoneMissed } from '@mui/icons-material'

const Activities = () => {
  const { activities, isLoading } = useActivityContext()
  console.log(activities)

  const groupedByDate = activities.reduce((acc, activity) => {
    const date = new Date(activity.created_at).toDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(activity)
    return acc
  }, {})
  console.log(groupedByDate)

  if (isLoading) return <LoadingOverlay />

  return (
    <Box>
      <List>
        {activities.map((a) => (
          <ListItem key={a.id} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {a.call_type === 'answered' && <Phone color='success' />}
                {a.call_type === 'missed' && <PhoneMissed color='error' />}
              </ListItemIcon>
              <ListItemText
                primary={`${
                  a.call_type === 'missed'
                    ? 'Missed call'
                    : `${
                        a.direction === 'inbound' ? 'Incoming' : 'Outgoing'
                      }: ${a.duration} sec`
                }`}
                secondary={a.direction === 'inbound' ? a.from : a.to}
              />
              <ListItemSecondaryAction>
                {a.direction === 'inbound' ? <CallReceived /> : <CallMade />}
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Activities
