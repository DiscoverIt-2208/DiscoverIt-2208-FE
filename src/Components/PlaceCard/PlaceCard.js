import React from 'react';
import './PlaceCard.scss';

const PlaceCard = ({places}) => {
  console.log(places)
  const results = places.map(place => {
    return (
      <div className='card-container'>
        <img src={place.image}/>
        <h3>{place.name}</h3>
      </div>
    )
  })
}

export default PlaceCard