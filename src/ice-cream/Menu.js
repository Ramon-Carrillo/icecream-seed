import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import propTypes from 'prop-types'

//*Components
import LoaderMessage from '../structure/LoaderMessage'
import Main from '../structure/Main'
import IceCreamCard from './IceCreamCard'
import IceCreamCardContainer from './IceCreamCardContainer'

import { getMenu } from '../data/iceCreamData'

const Menu = ({ history }) => {
  const [menu, setMenu] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true
    const getMenuData = async () => {
      const menuData = await getMenu()
      if (isMounted) {
        setMenu(menuData)
        setIsLoading(false)
      }
    }
    getMenuData()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Main headingText="Rock your taste buds with one of these!">
      <LoaderMessage
        loadingMessage="Loading Menu"
        isLoading={isLoading}
        doneMessage="Loading Menu is Complete"
      />
      {menu.length > 0 ? (
        <IceCreamCardContainer>
          {menu.map(({ id, iceCream, price, description, inStock, quantity }) => (
            <IceCreamCard
              key={id.toString()}
              iceCreamId={iceCream.id}
              to={`/menu-items/${id.toString()}`}
              heading={iceCream.name}
              navigate={navigate}>
              <div className="content card-content">
                <p className="price">{`$ ${price.toFixed(2)}`}</p>
                <p className={`stock${inStock ? '' : ' out'}`}>
                  {inStock ? `${quantity}` : `Currently out of stock`}
                </p>
                <p className="description">{description}</p>
              </div>
            </IceCreamCard>
          ))}
        </IceCreamCardContainer>
      ) : (
        !isLoading && <p>Your menu is empty!</p>
      )}
    </Main>
  )
}

Menu.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }),
}

export default Menu
