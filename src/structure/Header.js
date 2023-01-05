import React from 'react'
import { NavLink } from 'react-router-dom'

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
        <NavLink to="/">Menu</NavLink>
      </nav>
    </header>
  )
}

export default Header
