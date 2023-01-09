import React from 'react'
import FocusLink from './FocusLink'

//*Img
import iceCreamImg from '../assets/img/ultimate-ice-cream.svg'

const Header = () => {
  return (
    <header>
      <h1>
        <img src={iceCreamImg} alt="" />
        Ultimate Ice Cream
      </h1>
      <nav>
        <FocusLink to="/">Menu</FocusLink>
      </nav>
    </header>
  )
}

export default Header
