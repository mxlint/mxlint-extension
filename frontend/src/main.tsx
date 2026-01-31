import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ToastProvider, ThemeProvider } from '@/context'
import { ToastContainer } from '@/components/ui'
import './styles/index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <App />
        <ToastContainer position="top-right" />
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
)
