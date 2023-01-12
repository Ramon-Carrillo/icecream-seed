import React from 'react'
import { useNavigate } from 'react-router-dom'
import IceCreamImage from './IceCreamImage'
import FocusLink from '../structure/FocusLink'
import propTypes from 'prop-types'

const IceCreamCard = ({ children, to, iceCreamId, heading }) => {
  const navigate = useNavigate()

  const onItemClickHandler = (to) => {
    navigate(to, { focus: true })
  }

  const onLinkClickHandler = (e) => {
    //* Prevent the click event from bubbling up to the parent element
    e.stopPropagation()
  }
  return (
    <section className="card" onClick={onItemClickHandler}>
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCreamId} />
      </div>
      <div className="text-container">
        <h3>
          <FocusLink to={to} onClick={onLinkClickHandler}>
            {heading}
          </FocusLink>
        </h3>
        {children}
      </div>
    </section>
  )
}

IceCreamCard.propTypes = {
  children: propTypes.node,
  to: propTypes.string.isRequired,
  iceCreamId: propTypes.number.isRequired,
  heading: propTypes.string.isRequired,
}

export default IceCreamCard
