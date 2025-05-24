import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './Routing/AppRouter.jsx';
import './index.css'
import './fonts.css'
import './fontAwesome.js' // Import the fontAwesome.js file
import './i18n'; // Import i18n configuration

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
