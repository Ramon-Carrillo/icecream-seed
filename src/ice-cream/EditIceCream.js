import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

//* Components
import LoaderMessage from '../structure/LoaderMessage'
import Main from '../structure/Main'
import IceCream from './IceCream'

//* Data
import { getMenuItem } from '../data/iceCreamData'
import { putMenuItem } from '../data/iceCreamData'
import { deleteMenuItem } from '../data/iceCreamData'

const EditIceCream = () => {
  const isMounted = useRef(true)
  let navigate = useNavigate()
  let { menuItemId } = useParams()
  const [menuItem, setMenuItem] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getMenuItem(menuItemId)
      .then((item) => {
        if (!isMounted.current) {
          setMenuItem(item)
          setIsLoading(false)
        }
      })
      .catch((error) => {
        if (error.response.status === 404 && isMounted.current) {
          navigate('/', { focus: true })
        }
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuItemId])

  const onSubmitHandler = (updatedItem) => {
    putMenuItem({ id: menuItem.id, ...updatedItem }).then(() => {
      navigate('/', { focus: true })
    })
  }

  const onDeleteHandler = () => {
    deleteMenuItem(menuItem.id).then(() => {
      navigate('/', { focus: true })
    })
  }

  return (
    <Main headingText="Update this beauty">
      <LoaderMessage
        loadingMessage="Loading Ice Cream..."
        doneMessage="Ice Cream Loaded!"
        isLoading={isLoading}
      />
      {!isLoading && (
        <IceCream {...menuItem} onDelete={onDeleteHandler} onSubmit={onSubmitHandler} />
      )}
    </Main>
  )
}

EditIceCream.propTypes = {
  IceCream: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  price: PropTypes.number,
  quantity: PropTypes.number,
  inStock: PropTypes.bool,
  description: PropTypes.string,
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
}

export default EditIceCream
