import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { ServiciosProvider } from './context/ServiciosContext.jsx'
import { CitasProvider } from './context/CitasContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ServiciosProvider>
      <CitasProvider>
        <App />
      </CitasProvider>
    </ServiciosProvider>
  </StrictMode>,
)
