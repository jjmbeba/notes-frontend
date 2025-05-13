import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import AddNotePage from './pages/add-note.tsx'
import Layout from './layouts/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />} />
          <Route path='/add-note' element={<AddNotePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
