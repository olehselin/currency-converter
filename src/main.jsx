import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CurrencyConverter from './App'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrencyConverter />
  </StrictMode>
)
