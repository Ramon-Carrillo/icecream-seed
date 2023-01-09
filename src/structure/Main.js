import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

const Main = ({ children, headingText, headingLevel = 2 }) => {
  const heading = useRef(null)
  const H = `h${headingLevel}`
  const location = useLocation()

  useEffect(() => {
    if (location.state && location.state.focus) {
      heading.current.focus()
    }
    window.scrollTo(0, 0)
  }, [location.state])

  return (
    <main tabIndex="-1" id="main">
      <Helmet>
        <title>{headingText} | Ultimate Ice Cream </title>
      </Helmet>
      <H className="main-heading" ref={heading} tabIndex="-1">
        {headingText}
      </H>
      {children}
    </main>
  )
}

Main.prototype = {
  headingText: PropTypes.string.isRequired,
  headingLevel: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      focus: PropTypes.bool,
    }),
  }),
}
export default Main
