import React, { useEffect, useState, useRef } from 'react'

import PropTypes from 'prop-types'

const LoaderMessage = ({ loadingMessage, doneMessage, isLoading }) => {
  const [showLoadingMessage, setShowLoadingMessage] = useState(false)
  const [showDoneMessage, setShowDoneMessage] = useState(false)
  const isLoadingPreviousValue = useRef(null)

  useEffect(() => {
    let loadingMessageDelay
    let doneMessageDelay

    if (isLoading) {
      loadingMessageDelay = setTimeout(() => {
        setShowLoadingMessage(true)
      }, 300)
    } else {
      if (isLoadingPreviousValue.current) {
        setShowDoneMessage(true)
        doneMessageDelay = setTimeout(() => {
          setShowDoneMessage(false)
        }, 3000)
      }
    }
    isLoadingPreviousValue.current = isLoading
    return () => {
      clearTimeout(loadingMessageDelay)
      clearTimeout(doneMessageDelay)
      setShowLoadingMessage(false)
      setShowDoneMessage(false)
    }
  }, [isLoading])

  //* aria-live needs to be applied to container element not the rendered element of conditional rendering

  return (
    <div aria-live="assertive" aria-atomic="true">
      {showLoadingMessage && <p className="loading">{loadingMessage}</p>}
      {showDoneMessage && <p className="visually-hidden">{doneMessage}</p>}
    </div>
  )
}

LoaderMessage.propTypes = {
  loadingMessage: PropTypes.string.isRequired,
  doneMessage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
}

export default LoaderMessage
