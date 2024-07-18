import { createContext, useContext, useState, useEffect } from 'react'
import { useQuery } from 'react-query'

export const ActivityContext = createContext()

export const useActivityContext = () => useContext(ActivityContext)

const fetchActivities = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_ENDPOINT_URL}/activities`
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([])
  const { error, isLoading, refetch } = useQuery(
    'activities',
    fetchActivities,
    {
      onSuccess: (data) => setActivities(data),
    }
  )

  useEffect(() => {
    refetch()
  }, [])

  return (
    <ActivityContext.Provider value={{ activities, isLoading }}>
      {children}
    </ActivityContext.Provider>
  )
}
