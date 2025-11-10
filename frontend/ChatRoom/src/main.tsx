import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'swiper/css'
import 'swiper/css/pagination'
// import App from './App.tsx'
import App from './Room.tsx'

createRoot(document.getElementById('root')!).render(
  <App />
  // <StrictMode>
  //   <App />
  // </StrictMode>,
)
