import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useUniqueIds from '../hooks/useUniqueIds'

import { Helmet } from 'react-helmet-async'

//* Components
import LoaderMessage from '../structure/LoaderMessage'
import IceCreamImage from './IceCreamImage'

//* Data
import { getMenuItem } from '../data/iceCreamData'
import { putMenuItem } from '../data/iceCreamData'

//* Styles
import '../styles/forms-spacer.scss'

const EditIceCream = () => {
  const isMounted = useRef(true)
  const [menuItem, setMenuItem] = useState({
    price: '0.00',
    inStock: true,
    quantity: '0',
    description: '',
    iceCream: {},
  })
  const [isLoading, setIsLoading] = useState(false)
  const [descriptionId, stockId, quantityId, priceId] = useUniqueIds(4)

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
            id,
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

  const onChangeHandler = (e) => {
    let newMenuItemData = {
      ...menuItem,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }

    if (e.target.name === 'quantity') {
      newMenuItemData.inStock = e.target.value !== '0'
    }

    if (e.target.name === 'inStock' && !e.target.checked) {
      newMenuItemData.quantity = '0'
    }

    setMenuItem(newMenuItemData)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    const { id, price, inStock, quantity, description, iceCream } = menuItem

    const submitItem = {
      id,
      iceCream: { id: iceCream.id },
      price: parseFloat(price),
      inStock,
      quantity: parseInt(quantity),
      description,
    }
    putMenuItem(submitItem).then(() => {
      navigate('/')
    })
  }

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
      {!isLoading && (
        <div className="form-frame">
          <div className="image-container">
            <IceCreamImage iceCreamId={menuItem.iceCream.id} />
          </div>
          <div className="form-container">
            <dl>
              <dt>Name :</dt>
              <dd>{menuItem.iceCream.name}</dd>
            </dl>
            <form onSubmit={onSubmitHandler}>
              <label htmlFor={descriptionId}>Description :</label>
              <textarea
                id={descriptionId}
                name="description"
                rows="3"
                value={menuItem.description}
                onChange={onChangeHandler}
              />
              <label htmlFor={stockId}>In Stock :</label>
              <div className="checkbox-wrapper">
                <input
                  id={stockId}
                  type="checkbox"
                  name="inStock"
                  checked={menuItem.inStock}
                  onChange={onChangeHandler}
                />
                <div className="checkbox-wrapper-checked" />
              </div>
              <label htmlFor={quantityId}>Quantity :</label>
              <select
                id={quantityId}
                name="quantity"
                value={menuItem.quantity}
                onChange={onChangeHandler}>
                <option value="0">0</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
              <label htmlFor={priceId}>Price :</label>
              <input
                id={priceId}
                type="number"
                step="0.01"
                name="price"
                value={menuItem.price}
                onChange={onChangeHandler}
              />
              <div className="button-container">
                <button className="ok" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

export default EditIceCream
