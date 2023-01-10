export const validateDescription = (description) =>
  description ? null : 'Description is required'

export const validateQuantity = (quantity, inStock) =>
  inStock && quantity === '0' ? 'Quantity is required' : null

export const validatePrice = (price) => {
  const regex = /^[0-9]+(\.[0-9][0-9])$/
  if (!price || price === '0.00') {
    return 'Price is required'
  } else if (!regex.test(price.trim())) {
    return 'Price must be in the format 0.00'
  }
  return null
}
