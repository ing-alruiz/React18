import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './Routing/AppRouter.jsx';
import './index.css'
import './fonts.css'
import './fontAwesome.js' // Import the fontAwesome.js file
import './i18n'; // Import i18n configuration
import { AuthProvider } from '@Contexts/Auth/AuthContext.jsx'; // Import AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>,
)
