import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useUniqueIds from '../hooks/useUniqueIds'
import useValidation from '../hooks/useValidation'

//* Components
import LoaderMessage from '../structure/LoaderMessage'
import IceCreamImage from './IceCreamImage'
import Main from '../structure/Main'
import ErrorContainer from '../ice-cream/ErrorContainer'

//* Utils
import { validatePrice, validateDescription, validateQuantity } from '../utils/validators'

//* Data
import { getMenuItem } from '../data/iceCreamData'
import { putMenuItem } from '../data/iceCreamData'
import { deleteMenuItem } from '../data/iceCreamData'

const EditIceCream = () => {
  const isMounted = useRef(true)
  const formRef = useRef(null)
  let navigate = useNavigate()
  let { menuItemId } = useParams()
  const [menuItem, setMenuItem] = useState({
    price: '0.00',
    inStock: true,
    quantity: '0',
    description: '',
    iceCream: {},
  })
  const [isLoading, setIsLoading] = useState(false)
  const [
    descriptionId,
    descriptionErrorId,
    stockId,
    quantityId,
    quantityErrorId,
    priceId,
    priceErrorId,
  ] = useUniqueIds(7)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const [descriptionError, descriptionErrorProps] = useValidation(
    menuItem.description,
    validateDescription,
    descriptionErrorId,
    hasSubmitted,
    true
  )

  const [quantityError, quantityErrorProps] = useValidation(
    menuItem.quantity,
    validateQuantity,
    menuItem.inStock,
    quantityErrorId,
    hasSubmitted,
    false
  )

  const [priceError, priceErrorProps] = useValidation(
    menuItem.price,
    validatePrice,
    priceErrorId,
    hasSubmitted,
    true
  )

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
          navigate('/', { focus: true })
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

    setHasSubmitted(true)

    if (descriptionError || quantityError || priceError) {
      setTimeout(() => {
        const errorControl = formRef.current.querySelector('[aria-invalid="true"]')
        errorControl.focus()
      })
    } else {
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
        navigate('/', { focus: true })
      })
    }
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
        <div className="form-frame">
          <div className="image-container">
            <IceCreamImage iceCreamId={menuItem.iceCream.id} />
          </div>
          <div className="form-container">
            <dl>
              <dt>Name :</dt>
              <dd>{menuItem.iceCream.name}</dd>
            </dl>
            <form onSubmit={onSubmitHandler} noValidate ref={formRef}>
              <label htmlFor={descriptionId}>
                Description<span aria-hidden="true">*</span> :
              </label>
              <ErrorContainer
                errorText={descriptionError}
                errorId={descriptionErrorId}
                hasSubmitted={hasSubmitted}>
                <textarea
                  id={descriptionId}
                  name="description"
                  rows="3"
                  value={menuItem.description}
                  onChange={onChangeHandler}
                  {...descriptionErrorProps}
                />
              </ErrorContainer>
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
              <ErrorContainer
                errorText={quantityError}
                errorId={quantityErrorId}
                hasSubmitted={hasSubmitted}>
                <select
                  id={quantityId}
                  name="quantity"
                  value={menuItem.quantity}
                  onChange={onChangeHandler}
                  {...quantityErrorProps}>
                  <option value="0">0</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              </ErrorContainer>
              <label htmlFor={priceId}>
                Price<span aria-hidden="true">*</span> :
              </label>
              <ErrorContainer
                errorText={priceError}
                errorId={priceErrorId}
                hasSubmitted={hasSubmitted}>
                <input
                  id={priceId}
                  type="number"
                  step="0.01"
                  name="price"
                  value={menuItem.price}
                  onChange={onChangeHandler}
                  {...priceErrorProps}
                />
              </ErrorContainer>
              <div className="button-container">
                <button className="ok" type="submit">
                  Save
                </button>
                <button className="warning" type="button" onClick={onDeleteHandler}>
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Main>
  )
}

export default EditIceCream
