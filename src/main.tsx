import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import { config } from './config'

const container = document.getElementById(config.mountElementId)

if (!container) {
  throw new Error(`Mount element #${config.mountElementId} not found`)
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
