import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Helmet } from 'react-helmet-async'

//* Components
import LoaderMessage from '../structure/LoaderMessage'

//* Data
import { getMenuItem } from '../data/iceCreamData'

const EditIceCream = () => {
  const isMounted = useRef(true)
  const [menuItem, setMenuItem] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  let navigate = useNavigate()
  let { menuItemId } = useParams()

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getMenuItem(menuItemId)
      .then(({ id, price, inStock, quantity, description, iceCream }) => {
        if (!isMounted.current) {
          setMenuItem({
            id: id,
            price: price.toFixed(2),
            inStock,
            quantity: quantity.toString(),
            description,
            iceCream: iceCream,
          })
          setIsLoading(false)
        }
      })
      .catch((error) => {
        if (error.response.status === 404 && isMounted.current) {
          navigate('/')
        }
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuItemId])
  console.log(menuItem)

  return (
    <main>
      <Helmet>
        <title>Edit Ice Cream | Ultimate Ice Cream</title>
      </Helmet>
      <h2 className="main-heading">Update this beauty</h2>
      <LoaderMessage
        loadingMessage="Loading Ice Cream..."
        doneMessage="Ice Cream Loaded!"
        isLoading={isLoading}
      />
    </main>
  )
}

export default EditIceCream
