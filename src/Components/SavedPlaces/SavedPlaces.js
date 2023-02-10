import React from 'react'
import './SavedPlaces.scss'
import NavBar from '../NavBar/NavBar'

const SavedPlaces = () => {
  return (
    <>
    <NavBar />
      <div className='saved-container'>
        <h1 className='saved-title'>Saved Places</h1>
        <div className='saved-places-container'>
          <div className='saved-plaace-card'>
            <img src='https://static01.nyt.com/images/2016/08/19/dining/19DEATH-WEB/19DEATH-WEB-superJumbo.jpg' alt='death and co'>
            <h3>Denver</h3>
            <p>Death & Co.</p>
          </div>
      </div>
    </>
  )
}
export default SavedPlaces