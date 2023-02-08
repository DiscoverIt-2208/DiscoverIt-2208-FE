import React from 'react';
import './PlaceCard.scss';

const PlaceCard = ({places}) => {
  
  const eachPlace = places.map(place => {
    return (
      <div>
        <div className='card-container'>
          <img className='card-img' src={place.image} alt={`${place.name}`}/>
        </div>
        <h3>{place.name}</h3>
      </div>
    )
  })

  return (
    <div className='place-card-container'>
      {eachPlace}
    </div>
  )
}

export default PlaceCard