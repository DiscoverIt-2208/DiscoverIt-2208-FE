import React, { useEffect, useState } from 'react';
import './PlaceCard.scss';
import SampleData from '../../sampleData/samplePlaces.js';

const PlaceCard = () => {

  const [places, setPlaces] = useState([])

  useEffect(() => {
    setPlaces(SampleData)
    console.log(places)
  }, [places])

  return (
    <div>PlaceCard</div>
  )
}

export default PlaceCard