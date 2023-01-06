import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Helmet } from 'react-helmet-async'

//* Components
import LoaderMessage from '../structure/LoaderMessage'

//* Data
import { getMenuItem } from '../data/iceCreamData'

const EditIceCream = ({ match }) => {
  const isMounted = useRef(true)
  const [menuItem, setMenuItem] = useState({})
  const [loading, setLoading] = useState(false)

  let navigate = useNavigate()
  let { menuItemId } = useParams()

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      try {
        const { id, price, inStock, quantity, description, iceCream } = await getMenuItem(
          menuItemId
        )
        if (isMounted.current) {
          setMenuItem({
            id,
            price: price.toFixed(2),
            inStock,
            quantity: quantity.toString(),
            description,
            iceCream,
          })
          setLoading(false)
        }
      } catch (error) {
        if (error.response.status === 404 && !isMounted.current) {
          return navigate('/')
        }
      }
      return () => {
        isMounted.current = false
      }
    })()

    //  getMenuItem(menuItemId)
  }, [menuItemId, navigate])

  //     .then(({ id, price, inStock, quantity, description, iceCream }) => {
  //       console.log(
  //         (menuItemId = { id, price, inStock, quantity, description, iceCream })
  //       )
  //       if (isMounted.current) {
  //         setMenuItem({
  //           id,
  //           price: price.toFixed(2),
  //           inStock,
  //           quantity: quantity.toString(),
  //           description,
  //           iceCream,
  //         })
  //         setLoading(false)
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response.status === 404 && !isMounted.current) {
  //         return navigate('/')
  //       }
  //     })
  // }, [menuItemId, navigate])
  // console.log(menuItem)

  return (
    <main>
      <Helmet>
        <title>Edit Ice Cream | Ultimate Ice Cream</title>
      </Helmet>
      <h2 className="main-heading">Update this beauty</h2>
      <LoaderMessage
        loadingMessage="Loading Ice Cream..."
        doneMessage="Ice Cream Loaded!"
        isLoading={loading}
      />
    </main>
  )
}

EditIceCream.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
}

export default EditIceCream
