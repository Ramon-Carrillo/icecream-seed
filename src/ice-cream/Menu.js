import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { getMenu } from '../data/iceCreamData'

const Menu = () => {
  const [menu, setMenu] = useState([])

  useEffect(() => {
    let isMounted = true
    const getMenuData = async () => {
      const menuData = await getMenu()
      if (isMounted) {
        setMenu(menuData)
      }
    }
    getMenuData()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main>
      <Helmet>
        <title>Menu - Ultimate Ice Cream</title>
      </Helmet>
      <h2 className="main-heading">Rock your taste buds with one of these!</h2>
      {menu.length > 0 ? (
        <ul className="container">
          {menu.map(({ id, iceCream, price, description, inStock, quantity }) => (
            <li key={id.toString()}>
              <section className="card">
                <div className="image-container"> </div>
                <div className="text-container">
                  <h3>{iceCream.name}</h3>
                  <div className="content card-content">
                    <p className="price">{`$ ${price.toFixed(2)}`}</p>
                    <p className={`stock${inStock ? '' : ' out'}`}>
                      {inStock ? `${quantity}` : `Currently out of stock`}
                    </p>
                    <p className="description">{description}</p>
                  </div>
                </div>
              </section>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your menu is empty!</p>
      )}
    </main>
  )
}

export default Menu
