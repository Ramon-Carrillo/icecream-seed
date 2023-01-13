import React, { useEffect, useRef, useState } from 'react'
import useUniqueIds from '../hooks/useUniqueIds'
import useValidation from '../hooks/useValidation'

//* Components
import IceCreamImage from './IceCreamImage'
import ErrorContainer from './ErrorContainer'

//* Utils
import { validatePrice, validateDescription, validateQuantity } from '../utils/validators'

const IceCream = ({
  iceCream = {},
  price = 0,
  quantity = 0,
  inStock = true,
  description = '',
  onSubmit,
  onDelete,
}) => {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [internalData, setInternalData] = useState({
    description: '',
    inStock: true,
    quantity: '0',
    price: '0.00',
  })

  const [
    descriptionId,
    descriptionErrorId,
    stockId,
    quantityId,
    quantityErrorId,
    priceId,
    priceErrorId,
  ] = useUniqueIds(7)

  const formRef = useRef(null)

  const [descriptionError, descriptionErrorProps] = useValidation(
    internalData.description,
    validateDescription,
    descriptionErrorId,
    hasSubmitted,
    true
  )

  const [quantityError, quantityErrorProps] = useValidation(
    internalData.quantity,
    validateQuantity,
    internalData.inStock,
    quantityErrorId,
    hasSubmitted,
    false
  )

  const [priceError, priceErrorProps] = useValidation(
    internalData.price,
    validatePrice,
    priceErrorId,
    hasSubmitted,
    true
  )

  useEffect(() => {
    setInternalData({
      price: price.toFixed(2),
      inStock,
      quantity: quantity.toString(),
      description,
    })
  }, [price, quantity, inStock, description])

  const onChangeHandler = (e) => {
    let newInternalData = {
      ...internalData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }

    if (e.target.name === 'quantity') {
      newInternalData.inStock = e.target.value !== '0'
    }

    if (e.target.name === 'inStock' && !e.target.checked) {
      newInternalData.quantity = '0'
    }

    setInternalData(newInternalData)
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
      onSubmit({
        iceCream: { id: iceCream.id },
        price: parseFloat(internalData.price),
        inStock: internalData.inStock,
        quantity: parseInt(internalData.quantity),
        description: internalData.description,
      })
    }
  }

  return (
    <div className="form-frame">
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCream.id} />
      </div>
      <div className="form-container">
        <dl>
          <dt>Name :</dt>
          <dd>{iceCream.name}</dd>
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
              value={internalData.description}
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
              checked={internalData.inStock}
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
              value={internalData.quantity}
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
              value={internalData.price}
              onChange={onChangeHandler}
              {...priceErrorProps}
            />
          </ErrorContainer>
          <div className="button-container">
            <button className="ok" type="submit">
              Save
            </button>
            {onDelete && (
              <button className="warning" type="button" onClick={onDelete}>
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default IceCream
