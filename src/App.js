import React, { Fragment } from 'react'
import { HelmetProvider } from 'react-helmet-async'

//* Components
import Header from './structure/Header'
import Footer from './structure/Footer'
import Menu from './ice-cream/Menu'

//* Styles
import './styles/ice-cream.scss'

function App() {
  return (
    <HelmetProvider>
      <Header />
      <Menu />
      <Footer />
    </HelmetProvider>
  )
}

export default App
