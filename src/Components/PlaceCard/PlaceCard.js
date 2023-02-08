import React from 'react';
import './PlaceCard.scss';

const PlaceCard = ({places}) => {
  
  places.map(place => {
    return (
      <div className='card-container'>
        <img src={place.image} alt={`image of ${place.name}`}/>
        <h3>{place.name}</h3>
      </div>
    )
  })
}

export default PlaceCard