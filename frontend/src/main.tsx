import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import CliLogApp from './CliLogApp.tsx'
import { ToastProvider, ThemeProvider } from '@/context'
import { ToastContainer } from '@/components/ui'
import './styles/index.css'

const params = new URLSearchParams(window.location.search)
const view = params.get('view')
const root = (
  view === 'logs' ? (
    <CliLogApp />
  ) : (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <App />
        <ToastContainer position="top-right" />
      </ToastProvider>
    </ThemeProvider>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {root}
  </StrictMode>,
)
