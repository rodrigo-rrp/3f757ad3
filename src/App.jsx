import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Header from './components/Header.jsx'
import Activities from './components/Activities.jsx'
import { ActivityProvider } from './contexts/activityContext.js'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Activities />,
  },
])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ActivityProvider>
        <div className='container'>
          <Header />
          <div className='container-view'>
            <RouterProvider router={router} />
          </div>
        </div>
      </ActivityProvider>
    </QueryClientProvider>
  )
}

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)

export default App
