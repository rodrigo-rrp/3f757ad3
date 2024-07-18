import React, { useState } from 'react'
import {
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material'
import { useActivityContext } from '../contexts/activityContext'

import LoadingOverlay from './LoadingOverlay.jsx'
import { CallMade, CallReceived, PhoneMissed } from '@mui/icons-material'
import dayjs from 'dayjs'

const parseSecondsToMinutes = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds}s`
}

const Activities = () => {
  const { activities, isLoading } = useActivityContext()
  const [selectedActivity, setSelectedActivity] = useState(null)

  const groupedByDate = activities.reduce((acc, activity) => {
    const date = dayjs(activity.created_at).format('YYYY-MM-DD')
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(activity)
    return acc
  }, {})

  if (isLoading) return <LoadingOverlay />

  const isInbound = (activity) => activity.direction === 'inbound'

  return (
    <Box>
      <Box>
        <Button size='small'>Archive All</Button>
      </Box>
      {Object.keys(groupedByDate)
        .sort((a, b) => dayjs(b).unix() - dayjs(a).unix())
        .map((date) => (
          <List
            key={date}
            dense
            subheader={
              <Box sx={{ my: 1, textAlign: 'center' }}>
                <Chip label={dayjs(date).format('DD MMMM YYYY')} />
              </Box>
            }
          >
            {groupedByDate[date]
              .sort(
                (a, b) =>
                  dayjs(b.created_at).unix() - dayjs(a.created_at).unix()
              )
              .map((a, index) => (
                <ListItem
                  key={a.id}
                  disablePadding
                  dense
                  divider={index === groupedByDate[date].length - 1}
                >
                  <ListItemButton onClick={() => setSelectedActivity(a)}>
                    <ListItemText
                      primary={dayjs(a.created_at).format('hh:mma')}
                      sx={{ flex: '0 1 auto', pr: 3 }}
                    />
                    <ListItemText
                      primary={
                        <>
                          {a.call_type === 'missed'
                            ? 'Missed call'
                            : `${isInbound(a) ? 'Incoming' : 'Outgoing'}: ${
                                a.duration > 60
                                  ? parseSecondsToMinutes(a.duration)
                                  : `${a.duration}s`
                              }`}
                        </>
                      }
                      secondary={isInbound(a) ? a.from : a.to}
                    />
                    <ListItemSecondaryAction>
                      {a.call_type === 'missed' ? (
                        <PhoneMissed color='error' />
                      ) : (
                        <>{isInbound(a) ? <CallReceived /> : <CallMade />}</>
                      )}
                    </ListItemSecondaryAction>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        ))}
    </Box>
  )
}

export default Activities
