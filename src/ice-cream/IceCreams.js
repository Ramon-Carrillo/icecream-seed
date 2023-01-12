import React, { useState, useEffect } from 'react'
import Main from '../structure/Main'
import LoaderMessage from '../structure/LoaderMessage'
import IceCreamCardContainer from './IceCreamCardContainer'
import IceCreamCard from './IceCreamCard'
import { getIceCreams } from '../data/iceCreamData'
import { useParams } from 'react-router-dom'

const IceCreams = () => {
  const [iceCreams, setIceCreams] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { history } = useParams()

  useEffect(() => {
    let isMounted = true
    getIceCreams().then((iceCreams) => {
      if (isMounted) {
        setIceCreams(iceCreams)
        setIsLoading(false)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Main headingText="Choose your poison and enjoy!">
      <LoaderMessage
        loadingMessage="Loading the stock list"
        doneMessage="Loading stock list complete"
        isLoading={isLoading}
      />
      {iceCreams.length > 0 ? (
        <IceCreamCardContainer>
          {iceCreams.map(({ id, name }) => (
            <IceCreamCard
              key={id}
              iceCreamId={id}
              heading={name}
              to="/"
              history={history}
            />
          ))}
        </IceCreamCardContainer>
      ) : (
        !isLoading && <p className="fully-stocked">Your menu is fully stocked!</p>
      )}
    </Main>
  )
}

export default IceCreams
