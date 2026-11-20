import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource-variable/geist-mono'
import './styles/index.css'
import { LanguageProvider } from './i18n/LanguageProvider'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
