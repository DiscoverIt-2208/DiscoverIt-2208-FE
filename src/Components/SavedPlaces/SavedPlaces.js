import React from 'react'
import { Link } from 'react-router-dom'
import './SavedPlaces.scss'
import NavBar from '../NavBar/NavBar'
import Death from '../assets/deathandco.jpg'


const SavedPlaces = ({ city, places }) => {

  const placeDetails = places.map((place) => {
    return (
      <Link to={`/${city}/${place.id}`} key={place.name} className="place-thumb">
        <div id={`${place.id}`} className='saved-place-card'>
          <img className='saved-image' src={Death} alt='death and co' />
          <h3>{city}</h3>
          <p>{place.name}</p>
        </div>
      </Link>
    );
  });

  return (
    <>
    <NavBar />
      <div className='saved-container'>
        <h1 className='saved-title'>Saved Places</h1>
        <div className='saved-places-container'>
          {placeDetails}
        </div>
      </div>
    </>
  )
}
export default SavedPlaces