import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FocusLink from '../structure/FocusLink'

import propTypes from 'prop-types'

//*Components
import IceCreamImage from './IceCreamImage'
import LoaderMessage from '../structure/LoaderMessage'
import Main from '../structure/Main'

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

  const onItemClickHandler = (to) => {
    navigate(to, { focus: true })
  }

  const onLinkClickHandler = (e) => {
    //* Prevent the click event from bubbling up to the parent element
    e.stopPropagation()
  }

  return (
    <Main headingText="Rock your taste buds with one of these!">
      <LoaderMessage
        loadingMessage="Loading Menu"
        isLoading={isLoading}
        doneMessage="Loading Menu is Complete"
      />
      {menu.length > 0 ? (
        <ul className="container">
          {menu.map(({ id, iceCream, price, description, inStock, quantity }) => (
            <li key={id.toString()}>
              <section
                className="card"
                onClick={() => onItemClickHandler(`/menu-items/${id.toString()}`)}>
                <div className="image-container">
                  <IceCreamImage iceCreamId={iceCream.id} />
                </div>
                <div className="text-container">
                  <h3>
                    <FocusLink
                      to={`/menu-items/${id.toString()}`}
                      onClick={onLinkClickHandler}>
                      {iceCream.name}
                    </FocusLink>
                  </h3>
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
