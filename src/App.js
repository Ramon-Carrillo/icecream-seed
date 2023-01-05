import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

//* Components
import Header from './structure/Header'
import Footer from './structure/Footer'
import Menu from './ice-cream/Menu'
import EditIceCream from './ice-cream/EditIceCream'

//* Styles
import './styles/ice-cream.scss'

function App() {
  return (
    <Router>
      <HelmetProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/menu-items/:menuItemId" element={<EditIceCream />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </HelmetProvider>
    </Router>
  )
}

export default App
