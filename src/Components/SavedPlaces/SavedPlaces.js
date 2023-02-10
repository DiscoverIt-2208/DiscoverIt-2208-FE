import React from 'react'
import './SavedPlaces.scss'
import NavBar from '../NavBar/NavBar'
import Death from '../assets/deathandco.jpg'


const SavedPlaces = () => {
  return (
    <>
    <NavBar />
      <div className='saved-container'>
        <h1 className='saved-title'>Saved Places</h1>
        <div className='saved-places-container'>

          <div className='saved-place-card'>
            <img className='saved-image' src={Death} alt='death and co' />
            <h3>Denver</h3>
            <p>Death & Co.</p>
          </div>
          
          <div className='saved-place-card'>
            <img className='saved-image' src={Death} alt='death and co' />
            <h3>Denver</h3>
            <p>Death & Co.</p>
          </div>
          
          <div className='saved-place-card'>
            <img className='saved-image' src={Death} alt='death and co' />
            <h3>Denver</h3>
            <p>Death & Co.</p>
          </div>
          
          <div className='saved-place-card'>
            <img className='saved-image' src={Death} alt='death and co' />
            <h3>Denver</h3>
            <p>Death & Co.</p>
          </div>
          
          <div className='saved-place-card'>
            <img className='saved-image' src={Death} alt='death and co' />
            <h3>Denver</h3>
            <p>Death & Co.</p>
          </div>
          
          <div className='saved-place-card'>
            <img className='saved-image' src={Death} alt='death and co' />
            <h3>Denver</h3>
            <p>Death & Co.</p>
          </div>
          
          <div className='saved-place-card'>
            <img className='saved-image' src={Death} alt='death and co' />
            <h3>Denver</h3>
            <p>Death & Co.</p>
          </div>
          
          <div className='saved-place-card'>
            <img className='saved-image' src={Death} alt='death and co' />
            <h3>Denver</h3>
            <p>Death & Co.</p>
          </div>
          
          <div className='saved-place-card'>
            <img className='saved-image' src={Death} alt='death and co' />
            <h3>Denver</h3>
            <p>Death & Co.</p>
          </div>

        </div>
      </div>
    </>
  )
}
export default SavedPlaces