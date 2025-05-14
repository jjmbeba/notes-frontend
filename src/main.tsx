import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import './index.css'
import Layout from './layouts/index.tsx'
import AddTaskPage from './pages/add-task.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<App />} />
            <Route path='/add-task' element={<AddTaskPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
