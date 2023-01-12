import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

//* Components
import Header from './structure/Header'
import Footer from './structure/Footer'
import Menu from './ice-cream/Menu'
import EditIceCream from './ice-cream/EditIceCream'
import IceCreams from './ice-cream/IceCreams'

//* Styles
import './styles/ice-cream.scss'

function App() {
  return (
    <Router>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <HelmetProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/ice-creams" element={<IceCreams />} />

          <Route path="/menu-items/:menuItemId" element={<EditIceCream />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </HelmetProvider>
    </Router>
  )
}

export default App
