import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner'
import { BrowserRouter, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <>
  <div className='min-h-screen text-white bg-primary'>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
    </div>
  </>
)
